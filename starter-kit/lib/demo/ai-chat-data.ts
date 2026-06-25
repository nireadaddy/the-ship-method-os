/** Mock data + canned-reply logic for the AI Chat live demo (app/demo/ai-chat). */

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export const seedMessages: ChatMessage[] = [
  { id: "msg1", role: "assistant", text: "Hi! I'm your SHIP assistant. Ask me how to start a project, pick a stack, or scope an MVP." },
];

export const suggestions = [
  "How do I scope an MVP?",
  "Which stack should I use?",
  "What goes in PROJECT.md?",
];

/** Deterministic canned replies so the demo works with no API key. */
export function cannedReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("mvp") || q.includes("scope")) {
    return "Scope your MVP to the single happy path that delivers the core value. List every feature, then cut anything that isn't required to prove that one thing. Capture it in PROJECT.md under MVP Scope.";
  }
  if (q.includes("stack") || q.includes("tech")) {
    return "For most web apps, start with Next.js + a Postgres provider (Supabase or Neon) and Tailwind. See 13-TECH-STACK/STACK_DECISION_MATRIX.md — pick the boring, well-supported option so you spend your time on the product.";
  }
  if (q.includes("project.md") || q.includes("structure")) {
    return "PROJECT.md holds Vision, Problem Statement, Target Audience, and MVP Scope. Fill it before writing feature code — run /ship and answer one question at a time.";
  }
  if (q.includes("hello") || q.includes("hi")) {
    return "Hey! Tell me what you're building and I'll help you structure it the SHIP way.";
  }
  return "Good question. In a real app I'd answer this using the latest Claude model with retrieval over your own docs. For this demo, try asking about MVP scope, tech stack, or PROJECT.md.";
}
