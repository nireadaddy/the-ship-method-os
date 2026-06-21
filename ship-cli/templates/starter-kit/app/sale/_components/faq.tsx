"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Can I try it before I pay?",
    answer:
      "Yes — every plan includes a free 14-day trial with full access to features. No credit card required to start.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel at any time from your account settings — changes apply immediately.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All data is encrypted in transit and at rest. Business plans also include SSO, audit logs, and role-based permissions.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes, switching to annual billing saves roughly two months compared to paying monthly. You can switch from your billing page.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Starter includes email support, Pro includes priority support, and Business includes a dedicated success manager.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, there are no long-term contracts. You can cancel from your account at any time and you won't be charged again.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="container mx-auto px-4 py-28">
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="label-mono text-primary">FAQ</p>
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Frequently asked{" "}
          <span className="italic text-primary">questions</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need to know before you get started.
        </p>
      </div>
      <div className="mx-auto max-w-2xl divide-y divide-border rounded-2xl border border-border">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40"
                aria-expanded={isOpen}
              >
                <span className="label-mono shrink-0 text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm font-medium transition-colors",
                    isOpen && "text-primary"
                  )}
                >
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300",
                    isOpen && "rotate-45 border-primary/50 text-primary"
                  )}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 pl-16 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
