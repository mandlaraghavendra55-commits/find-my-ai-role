import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllJobs, type JobType } from "@/lib/jobs";
import { MapPin, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kindling — Jobs for people who make things" },
      {
        name: "description",
        content:
          "A curated job board for engineers, designers, and makers. Search remote and on-site roles at fast-moving teams.",
      },
      { property: "og:title", content: "Kindling — the maker's job board" },
      {
        property: "og:description",
        content: "Curated roles at fast-moving teams. Remote-friendly.",
      },
    ],
  }),
  component: Index,
});

const TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];

function Index() {
  const jobs = useMemo(() => getAllJobs(), []);
  const [q, setQ] = useState("");
  const [type, setType] = useState<JobType | "All">("All");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = jobs.filter((j) => {
    if (remoteOnly && !j.remote) return false;
    if (type !== "All" && j.type !== type) return false;
    if (!q) return true;
    const hay = `${j.title} ${j.company} ${j.location} ${j.tags.join(" ")}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border/60 bg-gradient-to-b from-accent/50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Freshly curated
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Find work worth doing.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {jobs.length} open roles at teams building thoughtful software. No recruiter
            spam, no ghost listings.
          </p>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, company, tech…"
                className="h-11 border-0 pl-9 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button size="lg" onClick={() => {}}>
              Search
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(["All", ...TYPES] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  type === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
            <button
              onClick={() => setRemoteOnly((v) => !v)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                remoteOnly
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              Remote only
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "role" : "roles"}
          </h2>
        </div>

        <ul className="grid gap-3">
          {filtered.map((j) => (
            <li key={j.id}>
              <Link
                to="/jobs/$id"
                params={{ id: j.id }}
                className="block focus:outline-none"
              >
                <Card className="group flex flex-col gap-3 p-5 transition hover:border-primary/60 hover:shadow-md sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-semibold">
                    {j.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h3 className="truncate text-base font-semibold group-hover:text-primary">
                        {j.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">· {j.company}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {j.location}
                      </span>
                      <span>{j.type}</span>
                      <span>{j.salary}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {j.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-right">
                    {j.postedAt}
                  </div>
                </Card>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No roles match your filters. Try broadening the search.
            </li>
          )}
        </ul>
      </main>

      <SiteFooter />
    </div>
  );
}
