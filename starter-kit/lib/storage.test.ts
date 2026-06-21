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
