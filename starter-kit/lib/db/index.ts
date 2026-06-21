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
