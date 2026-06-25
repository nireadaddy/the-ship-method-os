"use client";

import * as React from "react";
import { Heart, MessageCircle, Repeat2, RotateCcw } from "lucide-react";

import { seedPosts, me, type FeedPost } from "@/lib/demo/social-data";
import { useLocalStore, newId } from "@/lib/demo/use-local-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SocialFeedDemoPage() {
  const { data: posts, setData: setPosts, reset } = useLocalStore<FeedPost[]>(
    "demo:social:posts",
    seedPosts
  );
  const [draft, setDraft] = React.useState("");

  function post(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setPosts((prev) => [
      { id: newId("fp"), author: me.author, handle: me.handle, text: draft.trim(), likes: 0, liked: false, time: "now" },
      ...prev,
    ]);
    setDraft("");
  }

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p
      )
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Social · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Feed
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Post and like — your feed persists locally across refreshes.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="shrink-0">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={post} className="flex gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="text-xs">You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="What's happening?"
                rows={2}
                className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={!draft.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs">
                    {p.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">{p.author}</span>{" "}
                    <span className="text-muted-foreground">{p.handle} · {p.time}</span>
                  </p>
                  <p className="mt-1 text-sm text-foreground">{p.text}</p>
                  <div className="mt-3 flex items-center gap-6 text-muted-foreground">
                    <button
                      onClick={() => toggleLike(p.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors hover:text-primary ${p.liked ? "text-primary" : ""}`}
                    >
                      <Heart className={`h-4 w-4 ${p.liked ? "fill-primary" : ""}`} />
                      {p.likes}
                    </button>
                    <span className="flex items-center gap-1.5 text-xs">
                      <MessageCircle className="h-4 w-4" />
                      {Math.floor(p.likes / 4)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs">
                      <Repeat2 className="h-4 w-4" />
                      {Math.floor(p.likes / 7)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
