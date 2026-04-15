import Link from "next/link";
import { Hammer } from "lucide-react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-navy dark:text-mint">
            <Hammer className="h-5 w-5 text-mint" />
            Forge
          </Link>
          <div className="flex items-center gap-3">
            <Link href="#demos" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demos
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/explore"
              className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light transition-all hover:shadow-md dark:bg-mint dark:text-deep dark:hover:bg-mint-dark"
            >
              Try Free →
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 font-heading text-sm font-bold text-navy dark:text-mint">
              <Hammer className="h-4 w-4 text-mint" /> Forge
            </div>
            <p className="text-xs text-muted-foreground text-center">
              A full-stack portfolio project by{" "}
              <a href="https://alliasgher.vercel.app" target="_blank" rel="noreferrer" className="underline hover:text-foreground transition-colors">
                Ali Asghar
              </a>
              {" "}· Next.js, Fastify, PostgreSQL
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="https://github.com/alliasgher/forge" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <Link href="/explore" className="text-mint hover:text-mint-dark transition-colors font-medium">Try it free</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
