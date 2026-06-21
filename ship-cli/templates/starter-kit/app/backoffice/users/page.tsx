"use client";

import * as React from "react";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users, type MockUser } from "@/lib/mock-data";

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  active: "default",
  trialing: "secondary",
  past_due: "destructive",
  canceled: "outline",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function UsersTable({ data }: { data: MockUser[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="py-3 font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {initials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground">{user.name}</span>
              </div>
            </TableCell>
            <TableCell className="py-3 text-muted-foreground">{user.email}</TableCell>
            <TableCell className="py-3">
              <Badge variant="outline">{user.plan}</Badge>
            </TableCell>
            <TableCell className="py-3">
              <Badge variant={statusVariant[user.status] ?? "outline"}>
                {user.status.replace("_", " ")}
              </Badge>
            </TableCell>
            <TableCell className="py-3 text-muted-foreground">
              {new Date(user.joinedAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="py-3 text-right">
              <Button variant="outline" size="sm" onClick={() => {}}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BackofficeUsersPage() {
  const active = users.filter((u) => u.status === "active");
  const inactive = users.filter((u) => u.status !== "active");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label-mono text-primary">Accounts</p>
          <h1 className="font-display text-2xl font-medium tracking-tight text-foreground">
            Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all registered accounts.
          </p>
        </div>
        <Button onClick={() => {}}>
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({users.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({inactive.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <UsersTable data={users} />
            </TabsContent>
            <TabsContent value="active">
              <UsersTable data={active} />
            </TabsContent>
            <TabsContent value="inactive">
              <UsersTable data={inactive} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
