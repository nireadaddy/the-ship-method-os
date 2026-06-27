"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Eye, FileDown, Loader2 } from "lucide-react";

import { blueprints, type Blueprint } from "@/lib/blueprints";
import { applyBlueprint, type ApplyResult } from "@/app/actions/use-blueprint";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function BlueprintGallery() {
  const [active, setActive] = React.useState<Blueprint | null>(null);

  return (
    <>
      <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blueprints.map((blueprint) => {
          const Icon = blueprint.icon;
          return (
            <Card key={blueprint.slug} className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{blueprint.title}</CardTitle>
                <CardDescription>{blueprint.tagline}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActive(blueprint)}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          {active && <BlueprintPreview blueprint={active} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function BlueprintPreview({ blueprint }: { blueprint: Blueprint }) {
  const [copied, setCopied] = React.useState(false);
  const [applying, startApply] = React.useTransition();
  const [applyResult, setApplyResult] = React.useState<ApplyResult | null>(null);

  function useThisBlueprint() {
    setApplyResult(null);
    startApply(async () => {
      const result = await applyBlueprint(blueprint.slug);
      setApplyResult(result);
    });
  }

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(blueprint.prompt);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission).
      // Fail quietly — the prompt is still visible for manual selection.
      setCopied(false);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{blueprint.title}</DialogTitle>
        <DialogDescription>{blueprint.tagline}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-2 sm:grid-cols-2">
        {blueprint.demoReady && (
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/demo/${blueprint.slug}`}>
              <Eye className="h-4 w-4" />
              View live demo
            </Link>
          </Button>
        )}
        <Button
          variant="default"
          className={`w-full ${blueprint.demoReady ? "" : "sm:col-span-2"}`}
          onClick={useThisBlueprint}
          disabled={applying}
        >
          {applying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Writing docs…
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4" />
              Use this blueprint
            </>
          )}
        </Button>
      </div>

      {applyResult && (
        <div
          className={`rounded-lg border px-3 py-2 text-xs ${
            applyResult.ok
              ? "border-border bg-muted/40 text-foreground"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {applyResult.ok ? (
            <>
              {applyResult.written.length > 0 && (
                <p>✓ Wrote {applyResult.written.join(", ")} to <code>docs/</code></p>
              )}
              {applyResult.skipped.length > 0 && (
                <p className="text-muted-foreground">
                  Skipped {applyResult.skipped.join(", ")} (already exists)
                </p>
              )}
              <p className="mt-1 text-muted-foreground">Next: run <code>/ship</code> to fill them in.</p>
            </>
          ) : (
            <p>{applyResult.error}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <p className="label-mono mb-2 text-muted-foreground">MVP features</p>
          <ul className="space-y-1.5">
            {blueprint.featureChecklist.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="label-mono text-muted-foreground">Build prompt</p>
            <Button size="sm" onClick={copyPrompt}>
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy prompt
                </>
              )}
            </Button>
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg border border-border bg-muted/40 p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
            {blueprint.prompt}
          </pre>
        </div>

        <p className="text-xs text-muted-foreground">
          Copy this into Claude Code (or your AI agent) to build {blueprint.title} on
          top of this starter kit.
        </p>
      </div>
    </>
  );
}
