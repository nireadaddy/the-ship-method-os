"use client";

import * as React from "react";

import { users } from "@/lib/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockUser = users[0];

export default function MemberSettingsPage() {
  const [name, setName] = React.useState(mockUser.name);
  const [email, setEmail] = React.useState(mockUser.email);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Mock save only — no backend wired up.
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Settings
        </h2>
        <p className="mt-1 text-muted-foreground">
          Manage your account details and preferences.
        </p>
      </div>

      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle className="text-base">Account Information</CardTitle>
          <CardDescription>
            Update your name and email address.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="settings-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="settings-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>

      <Card
        className="animate-fade-up border-destructive/40 bg-destructive/[0.06]"
        style={{ animationDelay: "80ms" }}
      >
        <CardHeader>
          <span className="label-mono text-destructive">Danger Zone</span>
          <CardTitle className="text-base text-destructive">
            Delete account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This
            action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
