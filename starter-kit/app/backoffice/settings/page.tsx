"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Fabricated team roster for the Team tab (not in mock-data.ts).
const team = [
  { id: "tm_001", name: "Nuttadech J.", email: "nuttadechnd@gmail.com", role: "Owner" },
  { id: "tm_002", name: "Pim Anantasak", email: "pim@shipmethod.dev", role: "Admin" },
  { id: "tm_003", name: "Tum Charoensuk", email: "tum@shipmethod.dev", role: "Support" },
];

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  Owner: "default",
  Admin: "secondary",
  Support: "outline",
};

export default function BackofficeSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label-mono text-primary">Workspace</p>
        <h1 className="font-display text-2xl font-medium tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage organization, team access, and billing.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>
                Basic details about your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-sm space-y-2">
              <label className="label-mono text-muted-foreground" htmlFor="org-name">
                Organization name
              </label>
              <Input id="org-name" defaultValue="The SHIP Method OS" />
            </CardContent>
            <CardFooter>
              <Button onClick={() => {}}>Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>People with access to the backoffice.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="py-3 font-medium text-foreground">
                        {member.name}
                      </TableCell>
                      <TableCell className="py-3 text-muted-foreground">
                        {member.email}
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant={roleVariant[member.role] ?? "outline"}>
                          {member.role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card className="glow-primary border-primary/30">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your organization is on the Pro plan, billed monthly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/[0.06] p-4">
                <div>
                  <p className="font-display text-lg font-medium text-foreground">
                    Pro Plan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    $99/month &middot; renews on the 1st
                  </p>
                </div>
                <Badge>Active</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {}}>Upgrade Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
