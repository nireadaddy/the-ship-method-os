# Pluggable Backend Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a SHIP project pick its DB provider (Supabase, Neon, Cloudflare D1, or plain Postgres) at setup via one env var, with Auth.js wired uniformly on top, and document the free-tier-first scaling path.

**Architecture:** Drizzle ORM with two hand-maintained schema files — `schema.pg.ts` (pg-core, used by supabase/neon/postgres) and `schema.sqlite.ts` (sqlite-core, used by cloudflare-d1). A single `lib/db/index.ts` reads `DB_PROVIDER` and constructs the right Drizzle client. Auth.js (`next-auth@beta`) sits on top via `@auth/drizzle-adapter`, built per-request for the D1 case since its binding only exists inside a Cloudflare request context. Storage is an interface with only the Supabase implementation wired up.

**Tech Stack:** Next.js 16 (App Router, already in `starter-kit/`), TypeScript, Drizzle ORM + Drizzle Kit, `next-auth@beta` + `@auth/drizzle-adapter`, `postgres` (driver), `@neondatabase/serverless`, `@supabase/supabase-js`, Vitest (new — no test runner exists in `starter-kit/` yet).

## Global Constraints

- Provider selection (`DB_PROVIDER`) is a setup-time choice read once, not a runtime branch re-evaluated per request.
- Postgres-family providers (`supabase`, `neon`, `postgres`) share `schema.pg.ts`; `cloudflare-d1` uses the separate `schema.sqlite.ts`. These are hand-maintained, not derived from one source.
- `cloudflare-d1` only works if the app deploys to Cloudflare Workers/Pages via `@opennextjs/cloudflare` — it does not work on Vercel. This must be stated in `.env.example` and `DB_PROVIDER_GUIDE.md`, not just implied.
- Storage gets a real implementation only for Supabase; Cloudflare R2 and Vercel Blob are documented stubs that throw a clear "not implemented" error, not silent no-ops.
- All file paths below are relative to `starter-kit/` unless prefixed otherwise.

---

### Task 1: Backend dependencies and test runner

**Files:**
- Modify: `starter-kit/package.json`
- Create: `starter-kit/vitest.config.ts`

**Interfaces:**
- Produces: `npm run test` script (runs `vitest run`); the following packages available to later tasks: `drizzle-orm`, `drizzle-kit`, `postgres`, `@neondatabase/serverless`, `next-auth@beta`, `@auth/drizzle-adapter`, `@supabase/supabase-js`, `vitest`.

- [ ] **Step 1: Add dependencies**

Edit `starter-kit/package.json` — add to `dependencies`:

```json
    "drizzle-orm": "^0.36.0",
    "postgres": "^3.4.5",
    "@neondatabase/serverless": "^0.10.3",
    "next-auth": "5.0.0-beta.25",
    "@auth/drizzle-adapter": "^1.7.4",
    "@supabase/supabase-js": "^2.46.1",
```

Add to `devDependencies`:

```json
    "drizzle-kit": "^0.28.1",
    "vitest": "^2.1.5",
```

- [ ] **Step 2: Add the test script**

In `starter-kit/package.json`, in `"scripts"`, add:

```json
    "test": "vitest run",
```

- [ ] **Step 3: Create the Vitest config**

Create `starter-kit/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
  },
})
```

- [ ] **Step 4: Install**

Run (from `starter-kit/`): `npm install`
Expected: installs cleanly, `node_modules/drizzle-orm` and `node_modules/vitest` exist.

- [ ] **Step 5: Commit**

```bash
git add starter-kit/package.json starter-kit/package-lock.json starter-kit/vitest.config.ts
git commit -m "Add backend dependencies and Vitest test runner to starter-kit"
```

---

### Task 2: Postgres-family Drizzle schema

**Files:**
- Create: `starter-kit/lib/db/schema.pg.ts`

**Interfaces:**
- Produces: `users`, `accounts`, `sessions`, `verificationTokens` Drizzle pg-core tables, matching the exact shape `@auth/drizzle-adapter`'s Postgres adapter expects (table names `user`, `account`, `session`, `verificationToken`).

- [ ] **Step 1: Write the schema**

Create `starter-kit/lib/db/schema.pg.ts`:

```ts
import { integer, timestamp, pgTable, primaryKey, text } from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
```

- [ ] **Step 2: Type-check**

Run (from `starter-kit/`): `npx tsc --noEmit`
Expected: no errors referencing `lib/db/schema.pg.ts`.

- [ ] **Step 3: Commit**

```bash
git add starter-kit/lib/db/schema.pg.ts
git commit -m "Add Postgres-family Drizzle schema for users/accounts/sessions"
```

---

### Task 3: Cloudflare D1 (SQLite) Drizzle schema

**Files:**
- Create: `starter-kit/lib/db/schema.sqlite.ts`

**Interfaces:**
- Produces: `users`, `accounts`, `sessions`, `verificationTokens` Drizzle sqlite-core tables, same table/column names as Task 2's pg schema, matching what `@auth/drizzle-adapter`'s SQLite adapter expects.

- [ ] **Step 1: Write the schema**

Create `starter-kit/lib/db/schema.sqlite.ts`:

```ts
import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
})

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
```

- [ ] **Step 2: Type-check**

Run (from `starter-kit/`): `npx tsc --noEmit`
Expected: no errors referencing `lib/db/schema.sqlite.ts`.

- [ ] **Step 3: Commit**

```bash
git add starter-kit/lib/db/schema.sqlite.ts
git commit -m "Add Cloudflare D1 (SQLite) Drizzle schema for users/accounts/sessions"
```

---

### Task 4: DB provider switch (`lib/db/index.ts`)

**Files:**
- Create: `starter-kit/lib/db/index.ts`
- Test: `starter-kit/lib/db/index.test.ts`

**Interfaces:**
- Consumes: `pgSchema` from `./schema.pg` (Task 2), `sqliteSchema` from `./schema.sqlite` (Task 3) — both as `import * as`.
- Produces: `export type DbProvider = "supabase" | "neon" | "cloudflare-d1" | "postgres"`; `export function getDb(d1Binding?: unknown): ReturnType<typeof drizzlePg> | ReturnType<typeof drizzleNeon> | ReturnType<typeof drizzleD1>` — reads `process.env.DB_PROVIDER`, throws `Error` with a message containing `"DB_PROVIDER"` on invalid/missing value, throws `Error` with a message containing `"DATABASE_URL"` when `supabase`/`neon`/`postgres` and that env var is unset, throws `Error` with a message containing `"d1Binding"` when `cloudflare-d1` and no binding argument is passed.

- [ ] **Step 1: Write the failing test**

Create `starter-kit/lib/db/index.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { getDb } from "./index"

describe("getDb", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("throws when DB_PROVIDER is missing", () => {
    vi.stubEnv("DB_PROVIDER", "")
    expect(() => getDb()).toThrow(/DB_PROVIDER/)
  })

  it("throws when DB_PROVIDER is invalid", () => {
    vi.stubEnv("DB_PROVIDER", "mongodb")
    expect(() => getDb()).toThrow(/DB_PROVIDER/)
  })

  it("throws when DB_PROVIDER=postgres and DATABASE_URL is missing", () => {
    vi.stubEnv("DB_PROVIDER", "postgres")
    vi.stubEnv("DATABASE_URL", "")
    expect(() => getDb()).toThrow(/DATABASE_URL/)
  })

  it("constructs a client for DB_PROVIDER=postgres given a connection string", () => {
    vi.stubEnv("DB_PROVIDER", "postgres")
    vi.stubEnv("DATABASE_URL", "postgres://user:pass@localhost:5432/db")
    expect(() => getDb()).not.toThrow()
  })

  it("constructs a client for DB_PROVIDER=supabase given a connection string", () => {
    vi.stubEnv("DB_PROVIDER", "supabase")
    vi.stubEnv("DATABASE_URL", "postgres://user:pass@localhost:5432/db")
    expect(() => getDb()).not.toThrow()
  })

  it("constructs a client for DB_PROVIDER=neon given a connection string", () => {
    vi.stubEnv("DB_PROVIDER", "neon")
    vi.stubEnv("DATABASE_URL", "postgres://user:pass@neon.example.com/db")
    expect(() => getDb()).not.toThrow()
  })

  it("throws when DB_PROVIDER=cloudflare-d1 and no binding is passed", () => {
    vi.stubEnv("DB_PROVIDER", "cloudflare-d1")
    expect(() => getDb()).toThrow(/d1Binding/)
  })

  it("constructs a client for DB_PROVIDER=cloudflare-d1 given a binding", () => {
    vi.stubEnv("DB_PROVIDER", "cloudflare-d1")
    const fakeBinding = {} as never
    expect(() => getDb(fakeBinding)).not.toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `starter-kit/`): `npx vitest run lib/db/index.test.ts`
Expected: FAIL — `Cannot find module './index'` (file doesn't exist yet).

- [ ] **Step 3: Write the implementation**

Create `starter-kit/lib/db/index.ts`:

```ts
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { drizzle as drizzleD1 } from "drizzle-orm/d1"
import * as pgSchema from "./schema.pg"
import * as sqliteSchema from "./schema.sqlite"

export type DbProvider = "supabase" | "neon" | "cloudflare-d1" | "postgres"

function getProvider(): DbProvider {
  const provider = process.env.DB_PROVIDER
  if (
    provider !== "supabase" &&
    provider !== "neon" &&
    provider !== "cloudflare-d1" &&
    provider !== "postgres"
  ) {
    throw new Error(
      `Invalid or missing DB_PROVIDER env var: "${provider}". Must be one of: supabase, neon, cloudflare-d1, postgres. See .env.example.`
    )
  }
  return provider
}

// D1's binding only exists inside a Cloudflare request context (there is no
// connection string for it), so callers on that path must pass it in.
export function getDb(d1Binding?: unknown) {
  const provider = getProvider()

  switch (provider) {
    case "supabase":
    case "postgres": {
      const connectionString = process.env.DATABASE_URL
      if (!connectionString) {
        throw new Error(
          `DATABASE_URL is required when DB_PROVIDER is "${provider}". See .env.example.`
        )
      }
      const client = postgres(connectionString)
      return drizzlePg(client, { schema: pgSchema })
    }
    case "neon": {
      const connectionString = process.env.DATABASE_URL
      if (!connectionString) {
        throw new Error(
          'DATABASE_URL is required when DB_PROVIDER is "neon". See .env.example.'
        )
      }
      const client = neon(connectionString)
      return drizzleNeon(client, { schema: pgSchema })
    }
    case "cloudflare-d1": {
      if (!d1Binding) {
        throw new Error(
          'DB_PROVIDER is "cloudflare-d1" but no d1Binding was passed to getDb(). ' +
            "D1's binding comes from the Cloudflare runtime context (e.g. getCloudflareContext().env.DB " +
            "from @opennextjs/cloudflare) — it cannot be constructed from an env var alone."
        )
      }
      return drizzleD1(d1Binding as never, { schema: sqliteSchema })
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run (from `starter-kit/`): `npx vitest run lib/db/index.test.ts`
Expected: PASS — all 8 tests green.

- [ ] **Step 5: Commit**

```bash
git add starter-kit/lib/db/index.ts starter-kit/lib/db/index.test.ts
git commit -m "Add DB_PROVIDER-driven Drizzle client switch with tests"
```

---

### Task 5: Drizzle Kit migration config

**Files:**
- Create: `starter-kit/drizzle.config.ts`

**Interfaces:**
- Consumes: `DB_PROVIDER`, `DATABASE_URL`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_API_TOKEN` env vars (defined in Task 6's `.env.example`).
- Produces: a `drizzle-kit`-compatible default export, switching schema/output directory/driver based on `DB_PROVIDER`.

- [ ] **Step 1: Write the config**

Create `starter-kit/drizzle.config.ts`:

```ts
import { defineConfig } from "drizzle-kit"

const provider = process.env.DB_PROVIDER

const config =
  provider === "cloudflare-d1"
    ? defineConfig({
        dialect: "sqlite",
        schema: "./lib/db/schema.sqlite.ts",
        out: "./drizzle/sqlite",
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
          databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID ?? "",
          token: process.env.CLOUDFLARE_API_TOKEN ?? "",
        },
      })
    : defineConfig({
        dialect: "postgresql",
        schema: "./lib/db/schema.pg.ts",
        out: "./drizzle/postgres",
        dbCredentials: {
          url: process.env.DATABASE_URL ?? "",
        },
      })

export default config
```

- [ ] **Step 2: Verify it loads**

Run (from `starter-kit/`): `DB_PROVIDER=postgres npx drizzle-kit generate --config=drizzle.config.ts`
Expected: drizzle-kit runs and either generates a migration into `./drizzle/postgres` or reports "No schema changes" — it must NOT error on loading the config itself.

- [ ] **Step 3: Commit**

```bash
git add starter-kit/drizzle.config.ts
git commit -m "Add Drizzle Kit config that switches dialect by DB_PROVIDER"
```

---

### Task 6: `.env.example`

**Files:**
- Create: `starter-kit/.env.example`

**Interfaces:**
- Produces: documented list of every env var consumed by Tasks 4, 5, 7, 8.

- [ ] **Step 1: Write the file**

Create `starter-kit/.env.example`:

```bash
# Pick exactly one provider. This is a setup-time choice, not runtime-switchable.
DB_PROVIDER=supabase # supabase | neon | cloudflare-d1 | postgres

# --- supabase | postgres | neon (Postgres-family — all use DATABASE_URL) ---
# Supabase: Project Settings -> Database -> Connection string (use the "Transaction pooler" URI for serverless)
# Neon: Project Dashboard -> Connection Details -> select "Pooled connection"
# Plain Postgres: your host's connection string, e.g. postgres://user:pass@host:5432/dbname
DATABASE_URL=

# --- cloudflare-d1 only ---
# D1 has no connection string at runtime — the binding comes from wrangler.toml
# and the Cloudflare Workers runtime, not an env var. The vars below are only
# used by `drizzle-kit` migration commands run from your local machine.
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_D1_DATABASE_ID=
CLOUDFLARE_API_TOKEN=

# IMPORTANT: DB_PROVIDER=cloudflare-d1 requires deploying this app to
# Cloudflare Workers/Pages via @opennextjs/cloudflare. It will NOT work on
# Vercel. See 13-TECH-STACK/DB_PROVIDER_GUIDE.md before picking this option.

# --- Auth.js (required regardless of DB_PROVIDER) ---
AUTH_SECRET=
# Add at least one provider's keys here once chosen, e.g.:
# AUTH_GITHUB_ID=
# AUTH_GITHUB_SECRET=

# --- Storage (optional — only needed once you wire up file uploads) ---
STORAGE_PROVIDER=supabase # supabase | cloudflare-r2 | vercel-blob (only supabase is implemented)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=uploads
```

- [ ] **Step 2: Commit**

```bash
git add starter-kit/.env.example
git commit -m "Add .env.example documenting all backend env vars"
```

---

### Task 7: Auth.js wiring (`lib/auth.ts`)

**Files:**
- Create: `starter-kit/lib/auth.ts`

**Interfaces:**
- Consumes: `getDb` from `./db` (Task 4); `pgSchema` from `./db/schema.pg` (Task 2); `sqliteSchema` from `./db/schema.sqlite` (Task 3).
- Produces: `export const { handlers, signIn, signOut, auth }` (the standard NextAuth v5 export shape), so future route handlers can `import { handlers } from "@/lib/auth"`.

- [ ] **Step 1: Write `lib/auth.ts`**

Create `starter-kit/lib/auth.ts`:

```ts
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { getDb } from "./db"
import * as pgSchema from "./db/schema.pg"
import * as sqliteSchema from "./db/schema.sqlite"

const provider = process.env.DB_PROVIDER
const schema = provider === "cloudflare-d1" ? sqliteSchema : pgSchema

// D1's binding only exists inside a Cloudflare request context, so the
// adapter is built per-request via NextAuth's config-function form instead
// of once at module scope (which is enough for every other provider).
export const { handlers, signIn, signOut, auth } = NextAuth(async () => {
  if (provider === "cloudflare-d1") {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare")
    const { env } = getCloudflareContext()
    return {
      adapter: DrizzleAdapter(getDb((env as { DB: unknown }).DB), schema),
      // No providers configured yet — add at least one (OAuth or
      // credentials) before this auth setup is functional.
      providers: [],
      session: { strategy: "database" },
    }
  }
  return {
    adapter: DrizzleAdapter(getDb(), schema),
    providers: [],
    session: { strategy: "database" },
  }
})
```

- [ ] **Step 2: Type-check**

Run (from `starter-kit/`): `npx tsc --noEmit`
Expected: no errors referencing `lib/auth.ts`. (An error about `@opennextjs/cloudflare` having no type declarations is acceptable and expected — that package is only installed when a project actually picks the `cloudflare-d1` path; if `tsc` fails to resolve the module entirely, wrap the import line's module specifier check by confirming the error is a missing-types warning, not a hard failure of unrelated code.)

- [ ] **Step 3: Commit**

```bash
git add starter-kit/lib/auth.ts
git commit -m "Wire Auth.js with DrizzleAdapter across all DB providers"
```

---

### Task 8: Storage interface + Supabase implementation (`lib/storage.ts`)

**Files:**
- Create: `starter-kit/lib/storage.ts`
- Test: `starter-kit/lib/storage.test.ts`

**Interfaces:**
- Produces: `export interface StorageClient { upload(path: string, file: Blob | Buffer, contentType: string): Promise<{ path: string; publicUrl: string }>; getPublicUrl(path: string): string; remove(path: string): Promise<void> }`; `export type StorageProvider = "supabase" | "cloudflare-r2" | "vercel-blob"`; `export function createStorageClient(): StorageClient` — throws an `Error` containing `"SUPABASE_URL"` when `STORAGE_PROVIDER=supabase` (the default) and that var is unset, throws an `Error` containing `"not implemented"` for `cloudflare-r2`/`vercel-blob`.

- [ ] **Step 1: Write the failing test**

Create `starter-kit/lib/storage.test.ts`:

```ts
import { describe, it, expect, afterEach, vi } from "vitest"
import { createStorageClient } from "./storage"

describe("createStorageClient", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("throws when STORAGE_PROVIDER=supabase and SUPABASE_URL is missing", () => {
    vi.stubEnv("STORAGE_PROVIDER", "supabase")
    vi.stubEnv("SUPABASE_URL", "")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "")
    expect(() => createStorageClient()).toThrow(/SUPABASE_URL/)
  })

  it("constructs a client when STORAGE_PROVIDER=supabase with credentials set", () => {
    vi.stubEnv("STORAGE_PROVIDER", "supabase")
    vi.stubEnv("SUPABASE_URL", "https://example.supabase.co")
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "fake-key")
    expect(() => createStorageClient()).not.toThrow()
  })

  it("throws a clear not-implemented error for cloudflare-r2", () => {
    vi.stubEnv("STORAGE_PROVIDER", "cloudflare-r2")
    expect(() => createStorageClient()).toThrow(/not implemented/)
  })

  it("throws a clear not-implemented error for vercel-blob", () => {
    vi.stubEnv("STORAGE_PROVIDER", "vercel-blob")
    expect(() => createStorageClient()).toThrow(/not implemented/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `starter-kit/`): `npx vitest run lib/storage.test.ts`
Expected: FAIL — `Cannot find module './storage'`.

- [ ] **Step 3: Write the implementation**

Create `starter-kit/lib/storage.ts`:

```ts
import { createClient } from "@supabase/supabase-js"

export interface StorageClient {
  upload(
    path: string,
    file: Blob | Buffer,
    contentType: string
  ): Promise<{ path: string; publicUrl: string }>
  getPublicUrl(path: string): string
  remove(path: string): Promise<void>
}

class SupabaseStorageClient implements StorageClient {
  private client: ReturnType<typeof createClient>
  private bucket: string

  constructor(supabaseUrl: string, supabaseKey: string, bucket: string) {
    this.client = createClient(supabaseUrl, supabaseKey)
    this.bucket = bucket
  }

  async upload(path: string, file: Blob | Buffer, contentType: string) {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .upload(path, file, { contentType, upsert: true })
    if (error) throw error
    return { path: data.path, publicUrl: this.getPublicUrl(data.path) }
  }

  getPublicUrl(path: string): string {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(path)
    return data.publicUrl
  }

  async remove(path: string): Promise<void> {
    const { error } = await this.client.storage.from(this.bucket).remove([path])
    if (error) throw error
  }
}

export type StorageProvider = "supabase" | "cloudflare-r2" | "vercel-blob"

export function createStorageClient(): StorageClient {
  const storageProvider = (process.env.STORAGE_PROVIDER || "supabase") as StorageProvider

  if (storageProvider === "supabase") {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "uploads"
    if (!url || !key) {
      throw new Error(
        "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required when STORAGE_PROVIDER=supabase. See .env.example."
      )
    }
    return new SupabaseStorageClient(url, key, bucket)
  }

  throw new Error(
    `STORAGE_PROVIDER="${storageProvider}" is not implemented yet — only "supabase" is wired up. ` +
      "See 13-TECH-STACK/DB_PROVIDER_GUIDE.md for how to add Cloudflare R2 or Vercel Blob."
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run (from `starter-kit/`): `npx vitest run lib/storage.test.ts`
Expected: PASS — all 4 tests green.

- [ ] **Step 5: Commit**

```bash
git add starter-kit/lib/storage.ts starter-kit/lib/storage.test.ts
git commit -m "Add storage client interface with Supabase implementation"
```

---

### Task 9: Update `starter-kit/README.md`

**Files:**
- Modify: `starter-kit/README.md`

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Replace the "Next step: real data" section**

In `starter-kit/README.md`, find this section (currently the last section in the file):

```markdown
## Next step: real data

When it's time to move off mock data, replace the contents of
`lib/mock-data.ts` (or the call sites that import from it) with real
Supabase queries. Before doing that, read:

- `../13-TECH-STACK/TECH_STACK.md` — the chosen stack and why.
- `../03-INSTRUCTION/DATABASE_SPEC.md` — the database schema this app
  should query against.
```

Replace it with:

```markdown
## Next step: real data

This kit ships with a real, pluggable backend in `lib/db/`, `lib/auth.ts`,
and `lib/storage.ts` — but it has no live database connection configured
yet. To turn it on:

1. Copy `.env.example` to `.env` and pick a `DB_PROVIDER`: `supabase`,
   `neon`, `cloudflare-d1`, or `postgres`. Read
   `../13-TECH-STACK/DB_PROVIDER_GUIDE.md` first if you're unsure which —
   it covers free-tier limits and which providers can deploy where.
2. Fill in that provider's connection details in `.env` (see the comments
   in `.env.example`).
3. Run `npx drizzle-kit generate` then apply the generated migration to
   create the `user`/`account`/`session`/`verificationToken` tables.
4. Add at least one Auth.js provider (OAuth or credentials) to the empty
   `providers: []` array in `lib/auth.ts` — auth won't work until you do.
5. Replace the contents of `lib/mock-data.ts` (or its call sites) with
   real queries against `getDb()` from `lib/db`.

Before writing your own tables, also read
`../03-INSTRUCTION/DATABASE_SPEC.md` for the schema-design template this
app's data model should follow.
```

- [ ] **Step 2: Commit**

```bash
git add starter-kit/README.md
git commit -m "Document the pluggable backend setup flow in starter-kit README"
```

---

### Task 10: Rewrite `TECH_STACK.md` §4 (Backend)

**Files:**
- Modify: `13-TECH-STACK/TECH_STACK.md` (the "## 4. Backend — Supabase" section, lines 128-161 as of this plan's writing)

**Interfaces:**
- None (documentation only). Must reference the new `DB_PROVIDER_GUIDE.md` from Task 11 by relative path `./DB_PROVIDER_GUIDE.md`.

- [ ] **Step 1: Replace the section**

In `13-TECH-STACK/TECH_STACK.md`, replace the entire `## 4. Backend — Supabase` section (from the `## 4. Backend — Supabase` heading through the `---` right before `## 5. Database — PostgreSQL`) with:

```markdown
## 4. Backend — pick a provider

**What it's for:** The database (and, for some providers, auth/storage)
underneath your product's data layer.

**Default recommendation:** Supabase, unless you have a specific reason to
pick something else (see `DB_PROVIDER_GUIDE.md` for those reasons). This OS
supports four providers, selected once at project setup via a `DB_PROVIDER`
env var in `starter-kit/.env` — not something you switch at runtime.

| Provider | Bundles auth/storage? | Deploy target | Best fit |
|---|---|---|---|
| **Supabase** | Yes (Auth, Storage, RLS) | Anywhere (Vercel default) | Most products — one platform, generous free tier |
| **Neon** | No — DB only | Anywhere (Vercel default) | Postgres-only projects, branching per PR/preview env |
| **Cloudflare D1** | No — DB only | Cloudflare Workers/Pages **only** | Projects already committed to the Cloudflare edge stack |
| **Plain Postgres** | No — DB only | Anywhere | You already have a Postgres host (Railway, self-hosted, etc.) |

Every provider gets the same Auth.js-based auth layer in `starter-kit/lib/auth.ts` and the same query layer in `starter-kit/lib/db/` (Drizzle ORM) — the provider only changes which driver gets constructed underneath.

**Read `./DB_PROVIDER_GUIDE.md` before choosing** — it covers free-tier ceilings, the concrete signal that means "you've outgrown the free tier," and the Cloudflare deploy-target constraint in detail.

**AI Prompt — Set up the chosen provider:**
```
Help me configure DB_PROVIDER=[supabase|neon|cloudflare-d1|postgres] for [product name/description], using the existing lib/db/, lib/auth.ts, and lib/storage.ts in starter-kit/.

Data this product needs to store: [list entities in plain English]
Who can see/edit what: [describe access rules in plain English]

Output:
1. The filled-in .env values needed for this provider (names only — I'll supply the actual secrets)
2. The Drizzle schema additions needed for the entities above, added to the existing lib/db/schema.pg.ts (or schema.sqlite.ts if DB_PROVIDER=cloudflare-d1)
3. The drizzle-kit commands to generate and apply the migration
4. If DB_PROVIDER=supabase: the Row Level Security (RLS) policies for every new table, as SQL, with a plain-English explanation of what each one allows/blocks
5. Flag explicitly if any access rule I described is ambiguous before writing it — do not guess at security rules.
```
```

- [ ] **Step 2: Commit**

```bash
git add "13-TECH-STACK/TECH_STACK.md"
git commit -m "Rewrite TECH_STACK.md backend section for multi-provider choice"
```

---

### Task 11: Create `13-TECH-STACK/DB_PROVIDER_GUIDE.md`

**Files:**
- Create: `13-TECH-STACK/DB_PROVIDER_GUIDE.md`

**Interfaces:**
- None (documentation only). Must be linked from Task 10's `TECH_STACK.md` change (already written above) and should itself link to `./STACK_DECISION_MATRIX.md`.

- [ ] **Step 1: Write the guide**

Create `13-TECH-STACK/DB_PROVIDER_GUIDE.md`:

```markdown
# DB_PROVIDER_GUIDE.md

**Phase:** S — Structure
**Purpose:** Pick a database provider for `starter-kit/`'s `DB_PROVIDER` env var. All four start free; this is about which free tier fits your product and what happens when you outgrow it.

---

## Quick comparison

| | Supabase | Neon | Cloudflare D1 | Plain Postgres |
|---|---|---|---|---|
| **Free tier** | 500MB DB, 1GB storage, 50K monthly active users (auth) | 0.5GB storage, 1 project, scale-to-zero compute | 5GB storage, 5M rows read/day | Depends entirely on host — many hosts (Railway, Fly) have no permanent free tier |
| **Bundles auth?** | Yes (Supabase Auth) | No — use Auth.js (already wired in `lib/auth.ts`) | No — use Auth.js | No — use Auth.js |
| **Bundles storage?** | Yes (Supabase Storage, already wired in `lib/storage.ts`) | No | No | No |
| **Deploy target** | Any (Vercel, Cloudflare, self-host) | Any | **Cloudflare Workers/Pages only** | Any |
| **Outgrow signal** | DB > 500MB or > 50K MAUs — upgrade to Pro ($25/mo) | Storage > 0.5GB or need >1 project — upgrade to a paid plan | Reads > 5M/day or storage > 5GB — upgrade to paid D1 | Whatever your host's free-tier cap is |

## Which one to pick

- **Default to Supabase** if you're not sure. One platform for DB + auth + storage means less to wire up and fewer free-tier ceilings to track separately.
- **Pick Neon** if you specifically want serverless Postgres with database branching per preview deploy (e.g. a branch-per-PR workflow on Vercel), and you're fine wiring auth/storage yourself — both are already wired via Auth.js / the storage interface, just point them elsewhere.
- **Pick Cloudflare D1** only if this project is already deploying to Cloudflare Workers/Pages via `@opennextjs/cloudflare`. D1 will not work if you deploy to Vercel — there is no connection string for it; the database binding only exists inside the Cloudflare runtime.
- **Pick plain Postgres** if you already have a Postgres host for other reasons (e.g. consolidating infra) and don't want another vendor account.

## Scaling path

All four follow the same shape: start on the free tier, and the moment you hit the "Outgrow signal" in the table above, that provider's paid tier is a config change (new connection string / plan upgrade), not a migration to a different provider. You only need to actually switch providers if you picked Cloudflare D1 and later need to deploy somewhere other than Cloudflare, or if you picked a provider's free tier and the paid tier no longer makes business sense at your scale.

## Next step

Once you've picked a provider, set `DB_PROVIDER` in `starter-kit/.env` (copy from `.env.example`) and follow `starter-kit/README.md`'s "Next step: real data" section. For the data model itself (which tables, fields, relationships your product needs beyond the auth tables this kit already includes), use [`../03-INSTRUCTION/DATABASE_SPEC.md`](../03-INSTRUCTION/DATABASE_SPEC.md). For whether your product type needs this backend at all, check [`STACK_DECISION_MATRIX.md`](./STACK_DECISION_MATRIX.md) first.
```

- [ ] **Step 2: Commit**

```bash
git add "13-TECH-STACK/DB_PROVIDER_GUIDE.md"
git commit -m "Add DB_PROVIDER_GUIDE.md comparing Supabase/Neon/D1/Postgres"
```

---

### Task 12: Update `DATABASE_SPEC.md` §6 (Migration Strategy)

**Files:**
- Modify: `03-INSTRUCTION/DATABASE_SPEC.md` (the "## 6. Migration Strategy" section, lines 169-190 as of this plan's writing)

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Replace the section**

In `03-INSTRUCTION/DATABASE_SPEC.md`, replace the `## 6. Migration Strategy` section (from that heading through the closing ``` ``` ``` of its worked example, right before `## 7. Sample Seed Data`) with:

```markdown
## 6. Migration Strategy

- **Tooling:** Drizzle Kit (`npx drizzle-kit generate`, then apply via your provider's apply step) — this is the default across every `DB_PROVIDER` option in `../13-TECH-STACK/DB_PROVIDER_GUIDE.md`. Schema lives in `starter-kit/lib/db/schema.pg.ts` (Supabase/Neon/plain Postgres) or `schema.sqlite.ts` (Cloudflare D1).
- **Naming convention:** Drizzle Kit auto-generates timestamped migration file names in `starter-kit/drizzle/postgres/` or `starter-kit/drizzle/sqlite/` — don't rename them after the fact.
- **Process:**
  1. Edit the relevant schema file, then run `npx drizzle-kit generate` to produce a migration.
  2. Apply it to your dev/staging database first (Postgres-family: `npx drizzle-kit migrate`; D1: `wrangler d1 migrations apply`) and smoke-test.
  3. Apply it to production during a low-traffic window.
  4. Never edit a migration file that has already run in any shared environment — write a new one instead.
- **Rollback plan:** Drizzle Kit doesn't generate down-migrations automatically — write the inverse SQL by hand and keep it alongside the migration that needs reverting, or restore from your provider's point-in-time backup if one is configured.
- **Breaking changes (column drops/renames):** always do a 2-step migration: add the new column → backfill → switch reads → drop the old column in a later release.

**Worked example:**
```
Tooling: Drizzle Kit, DB_PROVIDER=supabase
Naming: drizzle-kit auto-generates e.g. drizzle/postgres/0003_add_reminders_table.sql
Process: edit schema.pg.ts -> `npx drizzle-kit generate` -> apply to staging,
  smoke test (create+dispatch a test reminder) -> apply to production
Rollback: hand-written inverse SQL kept next to each migration that needs one
Breaking change example: renaming leads.status -> leads.stage was done as
  (1) add leads.stage column to schema.pg.ts, generate+apply,
  (2) backfill leads.stage from leads.status,
  (3) ship code reading stage,
  (4) drop status in a follow-up migration after 1 release cycle.
```
```

- [ ] **Step 2: Commit**

```bash
git add "03-INSTRUCTION/DATABASE_SPEC.md"
git commit -m "Update DATABASE_SPEC.md migration strategy to Drizzle Kit"
```

---

## Final verification

- [ ] Run (from `starter-kit/`): `npm run test` — expect all Vitest suites (Tasks 4 and 8) green.
- [ ] Run (from `starter-kit/`): `npx tsc --noEmit` — expect no errors outside the documented `@opennextjs/cloudflare` type-resolution caveat from Task 7.
- [ ] Run (from `starter-kit/`): `DB_PROVIDER=postgres npx drizzle-kit generate` and `DB_PROVIDER=cloudflare-d1 npx drizzle-kit generate` — both must load their respective config branch without erroring.
- [ ] Confirm `13-TECH-STACK/TECH_STACK.md`, `13-TECH-STACK/DB_PROVIDER_GUIDE.md`, `13-TECH-STACK/STACK_DECISION_MATRIX.md`, and `03-INSTRUCTION/DATABASE_SPEC.md` all cross-reference correctly (no dead relative links).
