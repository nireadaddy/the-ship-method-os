"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Toggles between the kit's two palettes (Ember dark / Daylight light) by
 * flipping the `dark` class on <html> and persisting the choice. The initial
 * class is set by the no-flash script in app/layout.tsx.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage may be unavailable; the toggle still works for the session.
    }
    setIsDark(next);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      title={mounted ? (isDark ? "Switch to Daylight" : "Switch to Ember") : "Toggle theme"}
      className={className}
    >
      {/* Render both and reveal by mode to stay stable before mount. */}
      <Sun className="hidden h-4 w-4 [.dark_&]:block" />
      <Moon className="h-4 w-4 [.dark_&]:hidden" />
    </Button>
  );
}
