"use client";

import * as React from "react";
import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react";

import { course, modules as seedModules, type Module } from "@/lib/demo/membership-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MembershipDemoPage() {
  const [modules, setModules] = React.useState<Module[]>(seedModules);

  const allLessons = modules.flatMap((m) => m.lessons);
  const doneCount = allLessons.filter((l) => l.done).length;
  const pct = Math.round((doneCount / allLessons.length) * 100);

  function toggleLesson(moduleId: string, lessonId: string) {
    setModules((prev) =>
      prev.map((m) =>
        m.id !== moduleId
          ? m
          : {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lessonId ? { ...l, done: !l.done } : l
              ),
            }
      )
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Membership · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            {course.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gated lessons with progress tracking — mark lessons done to watch your progress update.
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 gap-1">
          <Lock className="h-3 w-3" />
          {course.tier} access
        </Badge>
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="label-mono text-muted-foreground">Your progress</p>
            <span className="text-sm font-medium text-foreground">
              {doneCount} / {allLessons.length} lessons
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">{pct}% complete</p>
        </CardHeader>
      </Card>

      <div className="space-y-5">
        {modules.map((module, mi) => (
          <div key={module.id}>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="label-mono text-muted-foreground">Module {mi + 1}</span>
              <h2 className="font-display text-lg font-medium text-foreground">{module.title}</h2>
            </div>
            <Card>
              <CardContent className="divide-y divide-border p-0">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3 p-4">
                    <button
                      onClick={() => toggleLesson(module.id, lesson.id)}
                      aria-label={lesson.done ? "Mark incomplete" : "Mark complete"}
                      className="shrink-0 text-primary transition-transform hover:scale-110"
                    >
                      {lesson.done ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm ${lesson.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="shrink-0">
                      <PlayCircle className="h-4 w-4" />
                      {lesson.done ? "Replay" : "Start"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
