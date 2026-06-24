"use client";

import * as React from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  StickyNote,
  Users2,
  CheckCircle2,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
} from "lucide-react";

import {
  STAGES,
  type Stage,
  type Deal,
  type Contact,
  contacts as seedContacts,
  deals as seedDeals,
  activities as seedActivities,
  formatCurrency,
  relativeDays,
} from "@/lib/demo/crm-data";
import { useLocalStore, newId } from "@/lib/demo/use-local-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const activityIcon = {
  call: Phone,
  email: Mail,
  note: StickyNote,
  meeting: Users2,
} as const;

const stageBadge: Record<Stage, "default" | "secondary" | "outline" | "destructive"> = {
  Lead: "outline",
  Qualified: "secondary",
  Proposal: "secondary",
  Negotiation: "default",
  Won: "default",
};

const selectClass =
  "flex h-11 w-full rounded-lg border border-input bg-card/60 px-3.5 py-2 text-sm text-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default function CrmDemoPage() {
  const { data: deals, setData: setDeals, reset: resetDeals } = useLocalStore<Deal[]>(
    "demo:crm:deals",
    seedDeals
  );
  const { data: contacts, setData: setContacts, reset: resetContacts } = useLocalStore<Contact[]>(
    "demo:crm:contacts",
    seedContacts
  );

  const [activeDealId, setActiveDealId] = React.useState<string | null>(null);
  const [dealForm, setDealForm] = React.useState<{ mode: "create" | "edit"; deal: Deal } | null>(null);
  const [contactFormOpen, setContactFormOpen] = React.useState(false);

  const contactById = React.useMemo(
    () => Object.fromEntries(contacts.map((c) => [c.id, c])),
    [contacts]
  );
  const activeDeal = deals.find((d) => d.id === activeDealId) ?? null;

  const openValue = deals.filter((d) => d.stage !== "Won").reduce((s, d) => s + d.value, 0);
  const inProgress = deals.filter((d) => d.stage !== "Won").length;
  const wonValue = deals.filter((d) => d.stage === "Won").reduce((s, d) => s + d.value, 0);

  function advanceStage(dealId: string) {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const idx = STAGES.indexOf(d.stage);
        return { ...d, stage: STAGES[Math.min(idx + 1, STAGES.length - 1)] };
      })
    );
  }

  function deleteDeal(dealId: string) {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    setActiveDealId(null);
  }

  function saveDeal(deal: Deal, mode: "create" | "edit") {
    setDeals((prev) =>
      mode === "create" ? [...prev, deal] : prev.map((d) => (d.id === deal.id ? deal : d))
    );
    setDealForm(null);
  }

  function addContact(contact: Contact) {
    setContacts((prev) => [...prev, contact]);
    setContactFormOpen(false);
  }

  function startCreate() {
    setDealForm({
      mode: "create",
      deal: {
        id: newId("d"),
        name: "",
        contactId: contacts[0]?.id ?? "",
        value: 0,
        stage: "Lead",
        ownerInitials: "JN",
      },
    });
  }

  function resetDemo() {
    resetDeals();
    resetContacts();
    setActiveDealId(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">CRM · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Pipeline
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A working CRM with full CRUD — changes persist locally across refreshes.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={resetDemo} title="Reset demo data">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" onClick={startCreate}>
            <Plus className="h-4 w-4" />
            New deal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Open pipeline" value={formatCurrency(openValue)} hint={`${inProgress} deals in progress`} />
        <MetricCard label="Deals in progress" value={String(inProgress)} hint="across all stages" />
        <MetricCard label="Won" value={formatCurrency(wonValue)} hint="closed this period" />
      </div>

      <Tabs defaultValue="pipeline">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {STAGES.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage} className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-foreground">{stage}</span>
                    <span className="label-mono text-muted-foreground">{stageDeals.length}</span>
                  </div>
                  <p className="-mt-2 text-xs text-muted-foreground">{formatCurrency(stageValue)}</p>
                  <div className="flex flex-col gap-2">
                    {stageDeals.map((deal) => {
                      const contact = contactById[deal.contactId];
                      return (
                        <button
                          key={deal.id}
                          onClick={() => setActiveDealId(deal.id)}
                          className="rounded-lg border border-border bg-card p-3 text-left shadow-soft transition-colors hover:border-primary/50"
                        >
                          <p className="text-sm font-medium text-foreground">{deal.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{contact?.company ?? "—"}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-foreground">
                              {formatCurrency(deal.value)}
                            </span>
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[10px]">{deal.ownerInitials}</AvatarFallback>
                            </Avatar>
                          </div>
                        </button>
                      );
                    })}
                    {stageDeals.length === 0 && (
                      <p className="rounded-lg border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
                        No deals
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <div className="mb-3 flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setContactFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Add contact
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Open deals</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => {
                    const openDeals = deals.filter(
                      (d) => d.contactId === contact.id && d.stage !== "Won"
                    ).length;
                    return (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {contact.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.title}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{contact.company}</TableCell>
                        <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={openDeals > 0 ? "secondary" : "outline"}>{openDeals}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="space-y-4 py-6">
              {seedActivities
                .slice()
                .sort((a, b) => a.daysAgo - b.daysAgo)
                .map((activity) => {
                  const Icon = activityIcon[activity.type];
                  const deal = deals.find((d) => d.id === activity.dealId);
                  const contact = deal ? contactById[deal.contactId] : undefined;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.summary}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {deal?.name ?? "Deleted deal"} · {contact?.company ?? "—"} · {relativeDays(activity.daysAgo)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deal detail */}
      <Dialog open={activeDeal !== null} onOpenChange={(open) => !open && setActiveDealId(null)}>
        <DialogContent>
          {activeDeal && (
            <DealDetail
              deal={activeDeal}
              contact={contactById[activeDeal.contactId]}
              onAdvance={() => advanceStage(activeDeal.id)}
              onEdit={() => setDealForm({ mode: "edit", deal: activeDeal })}
              onDelete={() => deleteDeal(activeDeal.id)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create / edit deal */}
      <Dialog open={dealForm !== null} onOpenChange={(open) => !open && setDealForm(null)}>
        <DialogContent>
          {dealForm && (
            <DealForm
              mode={dealForm.mode}
              initial={dealForm.deal}
              contacts={contacts}
              onSave={(deal) => saveDeal(deal, dealForm.mode)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add contact */}
      <Dialog open={contactFormOpen} onOpenChange={setContactFormOpen}>
        <DialogContent>
          <ContactForm onSave={addContact} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <p className="label-mono text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-medium text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardHeader>
    </Card>
  );
}

function DealDetail({
  deal,
  contact,
  onAdvance,
  onEdit,
  onDelete,
}: {
  deal: Deal;
  contact?: Contact;
  onAdvance: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const dealActivities = seedActivities
    .filter((a) => a.dealId === deal.id)
    .sort((a, b) => a.daysAgo - b.daysAgo);
  const isWon = deal.stage === "Won";

  return (
    <>
      <DialogHeader>
        <DialogTitle>{deal.name}</DialogTitle>
        <DialogDescription>
          {contact ? `${contact.name} · ${contact.title} · ${contact.company}` : "No contact"}
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
        <div>
          <p className="label-mono text-muted-foreground">Value</p>
          <p className="font-display text-xl font-medium text-foreground">{formatCurrency(deal.value)}</p>
        </div>
        <Badge variant={stageBadge[deal.stage]} className="gap-1">
          {isWon && <CheckCircle2 className="h-3.5 w-3.5" />}
          {deal.stage}
        </Badge>
      </div>

      <div>
        <p className="label-mono mb-2 text-muted-foreground">Activity</p>
        <div className="space-y-3">
          {dealActivities.length === 0 && (
            <p className="text-sm text-muted-foreground">No activity logged yet.</p>
          )}
          {dealActivities.map((activity) => {
            const Icon = activityIcon[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{activity.summary}</p>
                  <p className="text-xs text-muted-foreground">{relativeDays(activity.daysAgo)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button variant="outline" className="flex-1" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
        <Button className="flex-1" onClick={onAdvance} disabled={isWon}>
          {isWon ? "Won" : "Advance"}
          {!isWon && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );
}

function DealForm({
  mode,
  initial,
  contacts,
  onSave,
}: {
  mode: "create" | "edit";
  initial: Deal;
  contacts: Contact[];
  onSave: (deal: Deal) => void;
}) {
  const [name, setName] = React.useState(initial.name);
  const [contactId, setContactId] = React.useState(initial.contactId);
  const [value, setValue] = React.useState(String(initial.value));
  const [stage, setStage] = React.useState<Stage>(initial.stage);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      ...initial,
      name: name.trim(),
      contactId,
      value: Number(value) || 0,
      stage,
    });
  }

  return (
    <form onSubmit={submit}>
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "New deal" : "Edit deal"}</DialogTitle>
        <DialogDescription>
          {mode === "create" ? "Add a deal to the pipeline." : "Update this deal."}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 space-y-3">
        <div>
          <label className="label-mono mb-1 block text-muted-foreground">Deal name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme — annual plan" autoFocus />
        </div>
        <div>
          <label className="label-mono mb-1 block text-muted-foreground">Contact</label>
          <select className={selectClass} value={contactId} onChange={(e) => setContactId(e.target.value)}>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.company}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-mono mb-1 block text-muted-foreground">Value ($)</label>
            <Input type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <label className="label-mono mb-1 block text-muted-foreground">Stage</label>
            <select className={selectClass} value={stage} onChange={(e) => setStage(e.target.value as Stage)}>
              {STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Button type="submit" className="mt-5 w-full">
        {mode === "create" ? "Create deal" : "Save changes"}
      </Button>
    </form>
  );
}

function ContactForm({ onSave }: { onSave: (contact: Contact) => void }) {
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;
    onSave({
      id: newId("c"),
      name: name.trim(),
      title: title.trim() || "—",
      company: company.trim(),
      email: email.trim() || "—",
    });
  }

  return (
    <form onSubmit={submit}>
      <DialogHeader>
        <DialogTitle>Add contact</DialogTitle>
        <DialogDescription>New people show up immediately in the deal form.</DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoFocus />
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>
      <Button type="submit" className="mt-5 w-full">Add contact</Button>
    </form>
  );
}
