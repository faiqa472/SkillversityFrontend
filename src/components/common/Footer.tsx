import Link from "next/link";
import { Separator } from "@/components/ui/separator";

/**
 * Global Footer Component
 * Comprehensive footer for all public pages
 */
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">SkillVersity</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Unlocking Pakistan&apos;s Youth Potential
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/auth/signup" className="hover:text-foreground">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">For</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#for-learners" className="hover:text-foreground">Learners</Link></li>
              <li><Link href="/#for-tutors" className="hover:text-foreground">Tutors</Link></li>
              <li><Link href="/#for-companies" className="hover:text-foreground">Companies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillVersity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
