export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  remote: boolean;
  type: JobType;
  salary: string;
  tags: string[];
  postedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl?: string;
};

export const seedJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Linear",
    logo: "◐",
    location: "Remote — Worldwide",
    remote: true,
    type: "Full-time",
    salary: "$150k – $210k",
    tags: ["React", "TypeScript", "Design systems"],
    postedAt: "2d ago",
    description:
      "Help us craft the fastest project management tool ever built. You'll own end-to-end features across our web app, from prototype to production.",
    responsibilities: [
      "Ship polished UI at a fast pace",
      "Own performance budgets and rendering pipeline",
      "Collaborate with design on interaction details",
    ],
    requirements: [
      "5+ years shipping production React",
      "Deep TypeScript fluency",
      "Care about craft and details",
    ],
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Vercel",
    logo: "▲",
    location: "San Francisco, CA",
    remote: false,
    type: "Full-time",
    salary: "$140k – $190k",
    tags: ["Figma", "Web", "Systems"],
    postedAt: "5h ago",
    description:
      "Design tools developers love. Own product surfaces from concept through launch alongside engineering.",
    responsibilities: [
      "Drive design end-to-end for a product area",
      "Prototype and validate with users",
      "Contribute to Geist design system",
    ],
    requirements: [
      "4+ years product design experience",
      "Strong systems thinking",
      "Comfortable in code",
    ],
  },
  {
    id: "3",
    title: "Backend Engineer, Payments",
    company: "Stripe",
    logo: "S",
    location: "Dublin, Ireland",
    remote: true,
    type: "Full-time",
    salary: "€110k – €160k",
    tags: ["Go", "Ruby", "Distributed systems"],
    postedAt: "1w ago",
    description:
      "Build the reliability primitives that move a meaningful percentage of global GDP.",
    responsibilities: [
      "Design fault-tolerant payment services",
      "Improve observability and on-call quality",
      "Mentor engineers across the org",
    ],
    requirements: [
      "6+ years backend engineering",
      "Experience with high-throughput systems",
      "Excellent written communication",
    ],
  },
  {
    id: "4",
    title: "Developer Relations Engineer",
    company: "Supabase",
    logo: "≈",
    location: "Remote — EU/US",
    remote: true,
    type: "Full-time",
    salary: "$120k – $170k",
    tags: ["Content", "Postgres", "Community"],
    postedAt: "3d ago",
    description:
      "Teach the world Postgres through demos, talks, videos and OSS contributions.",
    responsibilities: [
      "Create example apps and tutorials",
      "Speak at meetups and conferences",
      "Champion developer feedback internally",
    ],
    requirements: [
      "Strong writing and speaking skills",
      "Real-world app-building experience",
      "Love for open source",
    ],
  },
  {
    id: "5",
    title: "ML Research Intern",
    company: "Anthropic",
    logo: "✦",
    location: "San Francisco, CA",
    remote: false,
    type: "Internship",
    salary: "$12k / month",
    tags: ["PyTorch", "LLMs", "Research"],
    postedAt: "1d ago",
    description:
      "Contribute to research advancing safe, steerable, and reliable AI systems.",
    responsibilities: [
      "Run experiments on frontier models",
      "Publish internal write-ups",
      "Pair with senior researchers",
    ],
    requirements: [
      "PhD student in ML or related field",
      "Strong publication record",
      "PyTorch proficiency",
    ],
  },
  {
    id: "6",
    title: "Founding Growth Marketer",
    company: "Cursor",
    logo: "❯_",
    location: "New York, NY",
    remote: false,
    type: "Full-time",
    salary: "$130k – $180k + equity",
    tags: ["Growth", "SEO", "Lifecycle"],
    postedAt: "6d ago",
    description:
      "Own top-of-funnel growth for the AI code editor developers actually love.",
    responsibilities: [
      "Run growth experiments weekly",
      "Build lifecycle and onboarding flows",
      "Partner with eng on instrumentation",
    ],
    requirements: [
      "3+ years growth at a dev-tools company",
      "Analytical and hands-on",
      "Bias to ship",
    ],
  },
  {
    id: "7",
    title: "Staff Site Reliability Engineer",
    company: "Cloudflare",
    logo: "☁",
    location: "Remote — Americas",
    remote: true,
    type: "Full-time",
    salary: "$200k – $260k",
    tags: ["Kubernetes", "Networking", "SRE"],
    postedAt: "4d ago",
    description:
      "Keep 20% of the internet online. Lead reliability initiatives across our global edge.",
    responsibilities: [
      "Own SLOs for critical services",
      "Lead post-incident learning",
      "Reduce toil through automation",
    ],
    requirements: [
      "8+ years SRE or infra",
      "Deep Linux and networking knowledge",
      "Incident command experience",
    ],
  },
  {
    id: "8",
    title: "Content Designer",
    company: "Notion",
    logo: "N",
    location: "Remote — US",
    remote: true,
    type: "Contract",
    salary: "$90 – $130 / hr",
    tags: ["UX writing", "Docs", "Voice"],
    postedAt: "12h ago",
    description:
      "Shape the words that make Notion feel like Notion — across product, docs, and marketing.",
    responsibilities: [
      "Write and edit product copy",
      "Own voice and tone guidelines",
      "Partner with PM and design",
    ],
    requirements: [
      "5+ years UX writing",
      "Portfolio of shipped copy",
      "Comfortable with ambiguity",
    ],
  },
];

const KEY = "jobboard.custom.jobs.v1";

export function loadCustomJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCustomJob(job: Job) {
  const existing = loadCustomJobs();
  const next = [job, ...existing];
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getAllJobs(): Job[] {
  return [...loadCustomJobs(), ...seedJobs];
}

export function getJob(id: string): Job | undefined {
  return getAllJobs().find((j) => j.id === id);
}