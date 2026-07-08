import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Briefcase className="h-4 w-4" />
          </span>
          <span>Kindling</span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            — jobs for people who make things
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            Browse
          </Link>
          <Link
            to="/about"
            className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            About
          </Link>
          <Button asChild size="sm">
            <Link to="/post">Post a job</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Kindling. A demo job board.</p>
        <p>Built with TanStack Start on Lovable.</p>
      </div>
    </footer>
  );
}