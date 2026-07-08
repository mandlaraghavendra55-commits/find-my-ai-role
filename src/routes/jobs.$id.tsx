import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getJob } from "@/lib/jobs";
import { ArrowLeft, MapPin, Building2, Clock, Wallet } from "lucide-react";

export const Route = createFileRoute("/jobs/$id")({
  head: ({ params }) => {
    const job = getJob(params.id);
    if (!job) return { meta: [{ title: "Job not found — Kindling" }] };
    return {
      meta: [
        { title: `${job.title} at ${job.company} — Kindling` },
        { name: "description", content: job.description },
        { property: "og:title", content: `${job.title} at ${job.company}` },
        { property: "og:description", content: job.description },
      ],
    };
  },
  component: JobPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Job not found</h1>
        <p className="mt-2 text-muted-foreground">This role may have been filled or removed.</p>
        <Button asChild className="mt-6">
          <Link to="/">Browse jobs</Link>
        </Button>
      </div>
    </div>
  ),
});

function JobPage() {
  const { id } = Route.useParams();
  const job = getJob(id);
  if (!job) throw notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All jobs
        </Link>

        <header className="mt-6 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-2xl font-semibold">
            {job.logo}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight">{job.title}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{job.company}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
              <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" />{job.type}</span>
              <span className="inline-flex items-center gap-1.5"><Wallet className="h-4 w-4" />{job.salary}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />Posted {job.postedAt}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
              ))}
            </div>
          </div>
          <Button size="lg" asChild>
            <a href={job.applyUrl || "#apply"}>Apply now</a>
          </Button>
        </header>

        <article className="prose prose-neutral mt-8 max-w-none">
          <p className="text-base leading-relaxed text-foreground">{job.description}</p>

          <h2 className="mt-8 text-lg font-semibold">What you'll do</h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground">
            {job.responsibilities.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-lg font-semibold">What we're looking for</h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground">
            {job.requirements.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </article>

        <div id="apply" className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
          <h3 className="text-lg font-semibold">Interested in this role?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Reach out to {job.company} directly to introduce yourself.
          </p>
          <Button size="lg" className="mt-4" asChild>
            <a href={job.applyUrl || `mailto:jobs@${job.company.toLowerCase().replace(/\s+/g, "")}.com`}>
              Apply for this job
            </a>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}