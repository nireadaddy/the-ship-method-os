"use client";

import * as React from "react";

import {
  plan,
  usage,
  projects as seedProjects,
  team,
  compactNumber,
  type Project,
  type ProjectStatus,
} from "@/lib/demo/saas-data";
import { RotateCcw } from "lucide-react";

import { useLocalStore } from "@/lib/demo/use-local-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusVariant: Record<ProjectStatus, "default" | "secondary" | "outline"> = {
  Active: "default",
  Paused: "secondary",
  Archived: "outline",
};

const nextStatus: Record<ProjectStatus, ProjectStatus> = {
  Active: "Paused",
  Paused: "Active",
  Archived: "Archived",
};

export default function SaasDemoPage() {
  const { data: projects, setData: setProjects, reset } = useLocalStore<Project[]>(
    "demo:saas:projects",
    seedProjects
  );

  function toggleStatus(id: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: nextStatus[p.status] } : p))
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">SaaS · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Workspace
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A multi-tenant app shell: usage, the core project workflow, and team management.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Badge variant="secondary">
            {plan.name} · renews {plan.renews}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 sm:grid-cols-3">
            {usage.map((u) => {
              const pct = Math.round((u.used / u.limit) * 100);
              const fmt = (n: number) =>
                u.unit ? `${n} ${u.unit}` : compactNumber(n);
              return (
                <Card key={u.label}>
                  <CardHeader className="space-y-2">
                    <p className="label-mono text-muted-foreground">{u.label}</p>
                    <p className="font-display text-2xl font-medium text-foreground">
                      {fmt(u.used)}{" "}
                      <span className="text-sm text-muted-foreground">/ {fmt(u.limit)}</span>
                    </p>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{pct}% used</p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                      <TableCell className="text-muted-foreground">{p.members}</TableCell>
                      <TableCell className="text-muted-foreground">{p.updated}</TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => toggleStatus(p.id)}
                          disabled={p.status === "Archived"}
                          className="disabled:cursor-default"
                          title={p.status === "Archived" ? "" : "Click to toggle"}
                        >
                          <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {m.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">{m.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{m.email}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={m.role === "Owner" ? "default" : "outline"}>{m.role}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
