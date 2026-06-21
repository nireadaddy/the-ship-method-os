import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Search,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Overview", href: "/backoffice", icon: LayoutDashboard },
  { label: "Users", href: "/backoffice/users", icon: Users },
  { label: "Content", href: "/backoffice/content", icon: FileText },
  { label: "Settings", href: "/backoffice/settings", icon: Settings },
];

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — deeper-than-base ink with a faint grid texture, kept
          visually distinct from the member sidebar (bg-card) while staying
          in the same warm-ink palette. */}
      <aside className="relative flex w-64 flex-col overflow-hidden border-r border-border/80 bg-[hsl(27_20%_5%)]">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" />

        <div className="relative z-10 flex items-center gap-3 border-b border-white/5 px-6 py-5">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <div>
            <p className="font-display text-base font-medium leading-none text-foreground">
              SHIP Admin
            </p>
            <p className="label-mono mt-1 text-muted-foreground/70">Admin</p>
          </div>
        </div>

        <nav className="relative z-10 flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/backoffice";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute -left-3 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="label-mono relative z-10 border-t border-white/5 px-4 py-4 text-muted-foreground/60">
          Mock-data UI shell — no backend wired up.
        </div>
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-3.5">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users, content..."
              className="h-10 pl-10"
              readOnly
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium leading-none text-foreground">
                Nuttadech J.
              </p>
              <p className="label-mono mt-1 text-muted-foreground/70">Admin</p>
            </div>
            <Avatar>
              <AvatarFallback>NJ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
