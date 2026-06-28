import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Users, BookOpen, Settings } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { PRODUCT } from "@/config";

const NAV = [
  { href: "/admin",          label: "Overview",  icon: LayoutDashboard },
  { href: "/admin/members",  label: "Members",   icon: Users },
  { href: "/admin/content",  label: "Content",   icon: BookOpen },
  { href: "/admin/settings", label: "Settings",  icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  const admin = await isAdmin(userId ?? null);
  if (!admin) redirect("/dashboard");

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-secondary)] px-4 py-6 md:flex md:flex-col">
        <div className="mb-2 px-2">
          <p className="font-bold">{PRODUCT.name}</p>
          <p className="text-xs text-[var(--color-muted-foreground)]">Admin panel</p>
        </div>
        <div className="mb-6 border-b border-[var(--color-border)] pb-4" />
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-card)] hover:text-[var(--color-foreground)]">
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
          <UserButton />
          <div>
            <p className="text-xs font-medium">Admin</p>
            <Link href="/dashboard" className="text-xs text-[var(--color-muted-foreground)] hover:underline">Member view →</Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-[var(--color-background)] px-6 py-8">{children}</main>
    </div>
  );
}
