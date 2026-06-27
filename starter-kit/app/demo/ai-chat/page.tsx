"use client";

import * as React from "react";
import { Send, Bot, User, RotateCcw } from "lucide-react";

import { seedMessages, suggestions, cannedReply, type ChatMessage } from "@/lib/demo/ai-chat-data";
import { useLocalStore, newId } from "@/lib/demo/use-local-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AiChatDemoPage() {
  const { data: messages, setData: setMessages, reset } = useLocalStore<ChatMessage[]>(
    "demo:ai-chat:messages",
    seedMessages
  );
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { id: newId("msg"), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: newId("msg"), role: "assistant", text: cannedReply(trimmed) }]);
      setTyping(false);
    }, 600);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">AI Chat · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Assistant
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A chat shell with canned replies — the conversation persists locally.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => { reset(); setTyping(false); }} className="shrink-0">
          <RotateCcw className="h-4 w-4" />
          Clear
        </Button>
      </div>

      <Card className="flex h-[28rem] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  m.role === "assistant" ? "bg-primary/10 text-primary" : "bg-secondary/20 text-secondary"
                }`}
              >
                {m.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "assistant"
                    ? "bg-muted/50 text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {suggestions.map((s) => (
              <Button key={s} size="sm" variant="outline" onClick={() => send(s)}>
                {s}
              </Button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex gap-2 border-t border-border p-3"
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something…" />
          <Button type="submit" size="icon" disabled={!input.trim() || typing}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
