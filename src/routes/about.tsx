import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kindling" },
      { name: "description", content: "Kindling is a curated job board for people who build thoughtful software." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight">About Kindling</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Kindling is a small, opinionated job board for engineers, designers, and other makers
          looking for their next thing.
        </p>
        <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-foreground">
          <p>
            Every listing is reviewed by a human. No ghost postings, no aggregated LinkedIn scraps,
            no recruiter spam. Just real roles at teams shipping real work.
          </p>
          <p>
            Post a role in under a minute. Candidates can browse, filter by employment type or
            remote status, and apply directly to your team.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}