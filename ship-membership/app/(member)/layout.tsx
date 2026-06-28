import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, FileText, Terminal, CreditCard } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/commands", label: "Commands", icon: Terminal },
  { href: "/account", label: "Account", icon: CreditCard },
];

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-[var(--color-border)] px-4 py-6 md:flex md:flex-col">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 px-2 text-lg font-bold">
          🚢 SHIP Method
        </Link>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
          <UserButton />
          <span className="text-sm text-[var(--color-muted-foreground)]">My account</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto px-6 py-8">{children}</main>
    </div>
  );
}
