import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { getDb } from "./db"
import * as pgSchema from "./db/schema.pg"
import * as sqliteSchema from "./db/schema.sqlite"

const provider = process.env.DB_PROVIDER
const schema = (provider === "cloudflare-d1" ? sqliteSchema : pgSchema) as any

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
