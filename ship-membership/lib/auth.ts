import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PRODUCT } from "@/config";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (user) return user;

  // First-time login — upsert
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
  const [created] = await db.insert(users).values({
    id: userId,
    email,
    name: clerkUser?.fullName ?? "",
    avatarUrl: clerkUser?.imageUrl ?? "",
    plan: "free",
  }).onConflictDoUpdate({
    target: users.id,
    set: { email, name: clerkUser?.fullName ?? "", updatedAt: new Date() },
  }).returning();
  return created;
}

export async function isAdmin(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  return PRODUCT.adminUserIds.includes(userId);
}
