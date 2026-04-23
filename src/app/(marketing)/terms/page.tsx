"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Shield,
  Users,
  GraduationCap,
  Building2,
  CreditCard,
  AlertTriangle,
  Scale,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "December 1, 2024";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container max-w-4xl py-12">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Welcome to SkillVersity. These Terms of Service govern your use of our
            platform. By accessing or using SkillVersity, you agree to be bound by
            these terms.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl py-12 space-y-8">
        {/* Quick Navigation */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Quick Navigation</h2>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {[
                { label: "Acceptance", href: "#acceptance" },
                { label: "User Accounts", href: "#accounts" },
                { label: "Member Terms", href: "#members" },
                { label: "Tutor Terms", href: "#tutors" },
                { label: "Company Terms", href: "#companies" },
                { label: "Payments", href: "#payments" },
                { label: "Content", href: "#content" },
                { label: "Prohibited Use", href: "#prohibited" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  → {item.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Acceptance */}
        <section id="acceptance" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                By creating an account or using SkillVersity, you acknowledge that
                you have read, understood, and agree to be bound by these Terms of
                Service and our Privacy Policy.
              </p>
              <p className="text-muted-foreground">
                If you are using SkillVersity on behalf of an organization, you
                represent and warrant that you have the authority to bind that
                organization to these terms.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium">Eligibility Requirements:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• You must be at least 16 years old to use SkillVersity</li>
                  <li>• You must provide accurate and complete registration information</li>
                  <li>• You are responsible for maintaining the security of your account</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: User Accounts */}
        <section id="accounts" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">2. User Accounts</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                To access certain features of SkillVersity, you must create an
                account. You are responsible for:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <span>Maintaining the confidentiality of your login credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <span>All activities that occur under your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <span>Notifying us immediately of any unauthorized access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <span>Keeping your profile information accurate and up-to-date</span>
                </li>
              </ul>
              <Separator />
              <p className="text-sm text-muted-foreground">
                SkillVersity reserves the right to suspend or terminate accounts
                that violate these terms or engage in fraudulent activity.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Member Terms */}
        <section id="members" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">3. Member Terms</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                As a Member (learner) on SkillVersity, you agree to:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Learning Conduct</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Engage respectfully with tutors and peers</li>
                    <li>• Complete assessments honestly without cheating</li>
                    <li>• Provide constructive feedback on courses</li>
                    <li>• Respect intellectual property rights</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Course Access</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Access is granted for personal use only</li>
                    <li>• Do not share or redistribute course materials</li>
                    <li>• Certificates are non-transferable</li>
                    <li>• Refunds subject to our refund policy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Tutor Terms */}
        <section id="tutors" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold">4. Tutor Terms</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                As a Tutor on SkillVersity, you agree to the following additional
                terms:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Verification & Approval</h4>
                  <p className="text-sm text-muted-foreground">
                    All tutors must complete our verification process, which may
                    include identity verification, credential checks, and background
                    screening. Approval is at SkillVersity's sole discretion.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Content Standards</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create original, high-quality educational content</li>
                    <li>• Ensure accuracy and currency of information</li>
                    <li>• Respond to student inquiries within 48 hours</li>
                    <li>• Maintain professional conduct at all times</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Revenue & Payments</h4>
                  <p className="text-sm text-muted-foreground">
                    Tutors receive a percentage of course revenue as specified in
                    the Tutor Agreement. Payments are processed monthly for earnings
                    above the minimum threshold. SkillVersity retains a platform fee
                    for services provided.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Company Terms */}
        <section id="companies" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold">5. Company & Enterprise Terms</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Organizations using SkillVersity for corporate training or talent
                acquisition agree to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">✓</Badge>
                  <span>Use the platform only for legitimate business purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">✓</Badge>
                  <span>Comply with all applicable employment and data protection laws</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">✓</Badge>
                  <span>Respect candidate privacy when using talent discovery features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">✓</Badge>
                  <span>Maintain accurate company information and verification status</span>
                </li>
              </ul>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Enterprise agreements may include additional terms specific to your
                organization's needs. Contact our sales team for custom arrangements.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: Payments */}
        <section id="payments" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold">6. Payments & Refunds</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Payment Terms</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All prices are displayed in the listed currency</li>
                    <li>• Payment is required before course access</li>
                    <li>• We accept major credit cards and digital wallets</li>
                    <li>• Subscriptions auto-renew unless cancelled</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Refund Policy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30-day money-back guarantee on most courses</li>
                    <li>• Refunds processed within 5-10 business days</li>
                    <li>• Completed courses are not eligible for refunds</li>
                    <li>• Subscription refunds prorated based on usage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 7: Content & IP */}
        <section id="content" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <FileText className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold">7. Content & Intellectual Property</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                All content on SkillVersity, including courses, articles, and
                platform features, is protected by intellectual property laws.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Platform Content</h4>
                  <p className="text-sm text-muted-foreground">
                    SkillVersity owns all rights to the platform, branding, and
                    original content. Users may not copy, modify, or distribute
                    platform materials without permission.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">User-Generated Content</h4>
                  <p className="text-sm text-muted-foreground">
                    You retain ownership of content you create. By posting on
                    SkillVersity, you grant us a license to display, distribute,
                    and promote your content on the platform.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Course Materials</h4>
                  <p className="text-sm text-muted-foreground">
                    Tutors retain ownership of their course content. SkillVersity
                    has a license to host and distribute courses while they remain
                    on the platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 8: Prohibited Use */}
        <section id="prohibited" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold">8. Prohibited Conduct</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The following activities are strictly prohibited on SkillVersity:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  "Sharing account credentials with others",
                  "Uploading malicious code or viruses",
                  "Harassing or threatening other users",
                  "Posting false or misleading information",
                  "Scraping or automated data collection",
                  "Circumventing security measures",
                  "Impersonating others or misrepresenting identity",
                  "Violating intellectual property rights",
                  "Engaging in fraudulent transactions",
                  "Spamming or unsolicited advertising",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/10 rounded text-sm"
                  >
                    <span className="text-red-500">✕</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Violation of these terms may result in immediate account
                termination and potential legal action.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 9: Contact */}
        <section id="contact" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
              <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold">9. Contact Us</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact
                us:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">General Inquiries</h4>
                  <p className="text-sm text-muted-foreground">
                    support@skillversity.com
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Legal Department</h4>
                  <p className="text-sm text-muted-foreground">
                    legal@skillversity.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Note */}
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              These Terms of Service were last updated on {lastUpdated}.
              SkillVersity reserves the right to modify these terms at any time.
              Continued use of the platform constitutes acceptance of any changes.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
