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
