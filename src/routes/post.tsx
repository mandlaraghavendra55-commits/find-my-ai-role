import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { saveCustomJob, type Job, type JobType } from "@/lib/jobs";
import { toast } from "sonner";

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Post a job — Kindling" },
      {
        name: "description",
        content: "Reach thousands of engineers, designers, and makers. Post your role in under a minute.",
      },
    ],
  }),
  component: PostPage,
});

const TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];

function PostPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time" as JobType,
    salary: "",
    tags: "",
    description: "",
    remote: true,
    applyUrl: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.company) {
      toast.error("Title and company are required");
      return;
    }
    const job: Job = {
      id: `custom-${Date.now()}`,
      title: form.title,
      company: form.company,
      logo: form.company[0]?.toUpperCase() || "★",
      location: form.location || "Remote",
      remote: form.remote,
      type: form.type,
      salary: form.salary || "Competitive",
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      postedAt: "just now",
      description: form.description || "No description provided.",
      responsibilities: ["Details available on application."],
      requirements: ["Details available on application."],
      applyUrl: form.applyUrl || undefined,
    };
    saveCustomJob(job);
    toast.success("Job posted");
    navigate({ to: "/jobs/$id", params: { id: job.id } });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Post a job</h1>
        <p className="mt-2 text-muted-foreground">
          Free while in preview. Your listing appears at the top of the feed.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Job title *</Label>
            <Input id="title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Senior Frontend Engineer" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="company">Company *</Label>
              <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Inc" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Remote — Worldwide" />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Employment type</Label>
              <div className="flex flex-wrap gap-1.5">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update("type", t)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      form.type === t ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary range</Label>
              <Input id="salary" value={form.salary} onChange={(e) => update("salary", e.target.value)} placeholder="$120k – $180k" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="React, TypeScript, Design systems" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apply">Application URL</Label>
            <Input id="apply" value={form.applyUrl} onChange={(e) => update("applyUrl", e.target.value)} placeholder="https://…" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Tell candidates about the role and team." />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.remote}
              onChange={(e) => update("remote", e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            Remote-friendly
          </label>
          <Button type="submit" size="lg" className="w-full">Publish job</Button>
          <p className="text-center text-xs text-muted-foreground">
            Posts are stored locally in your browser for this demo.
          </p>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}