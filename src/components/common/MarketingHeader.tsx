import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";

/**
 * Marketing Header Component
 * Clean, minimal header for public-facing pages
 */
export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SkillVersity</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/explore" className="transition-colors hover:text-foreground/80">
            Explore
          </Link>
          <Link href="/#features" className="transition-colors hover:text-foreground/80">
            Features
          </Link>
          <Link href="/#pricing" className="transition-colors hover:text-foreground/80">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
