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
