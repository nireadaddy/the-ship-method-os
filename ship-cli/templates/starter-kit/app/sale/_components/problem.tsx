import { AlertTriangle, Clock, FolderX } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Hours lost to busywork",
    description:
      "Your team spends more time updating status docs than actually doing the work that moves the business forward.",
  },
  {
    icon: FolderX,
    title: "Context scattered everywhere",
    description:
      "Decisions live in chat threads, files live in five different drives, and nobody can find the latest version of anything.",
  },
  {
    icon: AlertTriangle,
    title: "No visibility until it's too late",
    description:
      "Problems surface in a status meeting instead of the moment they happen, so small issues turn into missed deadlines.",
  },
];

export function Problem() {
  return (
    <section className="container mx-auto px-4 py-28">
      <div className="mb-16 grid gap-6 lg:grid-cols-[0.6fr_1fr] lg:items-end">
        <p className="label-mono text-primary">The problem</p>
        <h2 className="max-w-xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Sound <span className="italic text-primary">familiar?</span>
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <div
              key={problem.title}
              className="flex flex-col gap-5 bg-background p-8"
            >
              <span className="label-mono text-muted-foreground/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-medium leading-snug">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
