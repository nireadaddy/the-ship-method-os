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
