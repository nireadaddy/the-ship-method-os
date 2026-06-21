import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Jordan Mills",
    role: "Operations Lead, Northwind Co.",
    initials: "JM",
    quote:
      "We replaced four separate tools with this in under a month. Our team finally has one source of truth.",
    featured: true,
  },
  {
    name: "Priya Anand",
    role: "Founder, Lattice Studio",
    initials: "PA",
    quote:
      "The automation alone saved us about 10 hours a week. It paid for itself in the first quarter.",
    featured: false,
  },
  {
    name: "Marcus Webb",
    role: "Head of Product, Brightline",
    initials: "MW",
    quote:
      "Setup took an afternoon, not a quarter. Our team adopted it without any real onboarding pain.",
    featured: false,
  },
];

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-grid relative py-28">
      <div className="container relative mx-auto px-4">
        <div className="mb-16 grid gap-6 lg:grid-cols-[0.6fr_1fr] lg:items-end">
          <p className="label-mono text-primary">Social proof</p>
          <h2 className="max-w-xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Loved by teams{" "}
            <span className="italic text-primary">everywhere</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="bg-card/90 backdrop-blur lg:col-span-3 lg:row-span-2">
            <CardContent className="flex h-full flex-col justify-between gap-8 p-8">
              <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/15 text-primary">
                    {featured.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{featured.name}</p>
                  <p className="label-mono text-muted-foreground">
                    {featured.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {rest.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={cn(
                "bg-card/90 backdrop-blur lg:col-span-2",
                index === 0 ? "lg:translate-y-6" : "lg:-translate-y-2"
              )}
            >
              <CardContent className="flex flex-col gap-5 p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
