"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { users } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockUser = users[0];

const navItems = [
  { label: "Dashboard", href: "/member/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/member/content", icon: BookOpen },
  { label: "Billing", href: "/member/billing", icon: CreditCard },
  { label: "Settings", href: "/member/settings", icon: Settings },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const pageTitles: Record<string, string> = {
  "/member/dashboard": "Dashboard",
  "/member/content": "Courses",
  "/member/billing": "Billing",
  "/member/settings": "Settings",
};

export default function MemberAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const title = pageTitles[pathname] ?? "Member Area";

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-64 flex-col border-r border-border/70 bg-card shadow-soft">
        <div className="flex items-center gap-3 border-b border-border/70 px-6 py-6">
          <span className="font-display text-xl font-medium tracking-tight text-foreground">
            SHIP<span className="text-primary">.</span>
          </span>
        </div>

        <div className="flex items-center gap-3 border-b border-border/70 px-6 py-5">
          <Avatar>
            <AvatarFallback>{initials(mockUser.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {mockUser.name}
            </p>
            <p className="label-mono truncate text-muted-foreground">
              {mockUser.plan} plan
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="label-mono px-3 pb-2 text-muted-foreground/70">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/70 px-3 py-4">
          <button
            type="button"
            onClick={() => router.push("/member/login")}
            className="flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border/70 bg-card/60 px-8 py-4">
          <h1 className="font-display text-lg font-medium tracking-tight">{title}</h1>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {initials(mockUser.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
