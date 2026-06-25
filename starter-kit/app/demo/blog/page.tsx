"use client";

import * as React from "react";
import { Plus, Trash2, Send, Undo2, RotateCcw } from "lucide-react";

import { seedPosts, categories, type Post } from "@/lib/demo/blog-data";
import { useLocalStore, newId } from "@/lib/demo/use-local-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const selectClass =
  "flex h-11 w-full rounded-lg border border-input bg-card/60 px-3.5 py-2 text-sm text-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default function BlogDemoPage() {
  const { data: posts, setData: setPosts, reset } = useLocalStore<Post[]>(
    "demo:blog:posts",
    seedPosts
  );
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<"All" | "Draft" | "Published">("All");

  const visible = posts.filter((p) => filter === "All" || p.status === filter);

  function addPost(post: Post) {
    setPosts((prev) => [post, ...prev]);
    setComposerOpen(false);
  }

  function togglePublish(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "Published" ? "Draft" : "Published" } : p
      )
    );
  }

  function remove(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Blog / CMS · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Draft, publish, and delete posts — your content persists locally.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" onClick={() => setComposerOpen(true)}>
            <Plus className="h-4 w-4" />
            New post
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {(["All", "Published", "Draft"] as const).map((f) => (
          <Button key={f} size="sm" variant={f === filter ? "default" : "outline"} onClick={() => setFilter(f)}>
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.updated}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-medium text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <Button size="sm" variant="outline" onClick={() => togglePublish(post.id)}>
                  {post.status === "Published" ? (
                    <><Undo2 className="h-4 w-4" />Unpublish</>
                  ) : (
                    <><Send className="h-4 w-4" />Publish</>
                  )}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => remove(post.id)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {visible.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No posts here yet.
          </p>
        )}
      </div>

      <Dialog open={composerOpen} onOpenChange={setComposerOpen}>
        <DialogContent>
          <Composer onSave={addPost} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Composer({ onSave }: { onSave: (post: Post) => void }) {
  const [title, setTitle] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [category, setCategory] = React.useState(categories[0]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: newId("po"),
      title: title.trim(),
      excerpt: excerpt.trim() || "No excerpt yet.",
      category,
      status: "Draft",
      updated: "just now",
    });
  }

  return (
    <form onSubmit={submit}>
      <DialogHeader>
        <DialogTitle>New post</DialogTitle>
        <DialogDescription>Saved as a draft — publish it when ready.</DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" autoFocus />
        <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short excerpt" />
        <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <Button type="submit" className="mt-5 w-full">Save draft</Button>
    </form>
  );
}
