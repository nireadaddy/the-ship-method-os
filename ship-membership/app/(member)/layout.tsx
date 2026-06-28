import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, BookOpen, CreditCard } from "lucide-react";
import { PRODUCT } from "@/config";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/content",   label: "Content",   icon: BookOpen },
  { href: "/billing",   label: "Billing",   icon: CreditCard },
];

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 border-r border-[var(--color-border)] px-4 py-6 md:flex md:flex-col">
        <Link href="/dashboard" className="mb-8 px-2 text-base font-bold">{PRODUCT.name}</Link>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]">
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
          <UserButton />
          <span className="text-xs text-[var(--color-muted-foreground)]">Account</span>
        </div>
      </aside>
      <main className="flex-1 overflow-auto px-6 py-8">{children}</main>
    </div>
  );
}
