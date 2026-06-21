"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function MemberLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push("/member/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Decorative panel — desktop only */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-card px-12 py-12 lg:flex">
        <div className="bg-grid absolute inset-0" />
        <div className="relative z-10">
          <span className="label-mono text-muted-foreground">SHIP Method OS</span>
        </div>
        <div className="relative z-10 max-w-md">
          <p className="font-display text-4xl leading-tight tracking-tight text-foreground">
            “Build the thing, ship the thing,
            <span className="text-primary"> repeat</span> the thing.”
          </p>
          <p className="label-mono mt-6 text-muted-foreground">
            Member Area — 2026
          </p>
        </div>
        <div className="relative z-10 h-px w-24 bg-primary/40" />
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center px-4 py-12 lg:w-1/2">
        <Card className="animate-fade-up w-full max-w-sm">
          <CardHeader className="space-y-1">
            <span className="label-mono text-primary">Welcome back</span>
            <CardTitle className="text-3xl">Log in</CardTitle>
            <CardDescription>
              Access your member dashboard and pick up where you left off.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="label-mono text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="label-mono text-muted-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Log In
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/member/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
