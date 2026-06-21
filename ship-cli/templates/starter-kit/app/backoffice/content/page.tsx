"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { members } from "@/lib/mock-data";

// Fabricated publish status, hardcoded per-row for visual variety (not in mock-data.ts).
const contentStatus: Record<string, "Published" | "Draft"> = {
  crs_001: "Published",
  crs_002: "Published",
  crs_003: "Draft",
  crs_004: "Draft",
  crs_005: "Published",
};

export default function BackofficeContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label-mono text-primary">Library</p>
          <h1 className="font-display text-2xl font-medium tracking-tight text-foreground">
            Content
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage courses and modules available to members.
          </p>
        </div>
        <Button onClick={() => {}}>
          <Plus className="h-4 w-4" />
          New Content
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((item) => {
                const status = contentStatus[item.id] ?? "Draft";
                return (
                  <TableRow key={item.id}>
                    <TableCell className="py-3 font-medium text-foreground">{item.title}</TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline">{item.tier}</Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge variant={status === "Published" ? "default" : "secondary"}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-end gap-2 py-3">
                      <Button variant="outline" size="sm" onClick={() => {}}>
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => {}}>
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
