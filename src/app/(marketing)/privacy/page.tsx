"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Database,
  Share2,
  Lock,
  Cookie,
  UserCheck,
  Mail,
  ArrowLeft,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            At SkillVersity, we take your privacy seriously. This policy explains
            how we collect, use, and protect your personal information when you
            use our learning platform.
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
                { label: "Information We Collect", href: "#collect" },
                { label: "How We Use Data", href: "#use" },
                { label: "Data Sharing", href: "#sharing" },
                { label: "Data Security", href: "#security" },
                { label: "Cookies", href: "#cookies" },
                { label: "Your Rights", href: "#rights" },
                { label: "International", href: "#international" },
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

        {/* Section 1: Information We Collect */}
        <section id="collect" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                We collect information to provide and improve our services:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Information You Provide</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Account details (name, email, password)</li>
                    <li>• Profile information (bio, skills, experience)</li>
                    <li>• Educational background and certifications</li>
                    <li>• Payment information (processed securely by our payment providers)</li>
                    <li>• Content you create (courses, articles, comments)</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Automatically Collected</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Device information (browser, OS, device type)</li>
                    <li>• Usage data (pages visited, features used, time spent)</li>
                    <li>• Learning progress and assessment results</li>
                    <li>• IP address and approximate location</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: How We Use Data */}
        <section id="use" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">2. How We Use Your Data</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                We use your information for the following purposes:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { title: "Provide Services", desc: "Deliver courses, track progress, issue certificates" },
                  { title: "Personalization", desc: "Recommend courses and content based on your interests" },
                  { title: "Communication", desc: "Send updates, notifications, and support responses" },
                  { title: "Security", desc: "Protect accounts and detect fraudulent activity" },
                  { title: "Analytics", desc: "Improve platform features and user experience" },
                  { title: "Legal Compliance", desc: "Meet regulatory and legal obligations" },
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Data Sharing */}
        <section id="sharing" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">3. Data Sharing</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">Tutors</Badge>
                  <span className="text-muted-foreground text-sm">
                    Course instructors see enrolled student names and progress to provide support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">Companies</Badge>
                  <span className="text-muted-foreground text-sm">
                    If you opt-in to talent discovery, verified companies may view your public profile
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">Service Providers</Badge>
                  <span className="text-muted-foreground text-sm">
                    Payment processors, hosting providers, and analytics services under strict agreements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">Legal</Badge>
                  <span className="text-muted-foreground text-sm">
                    When required by law or to protect rights and safety
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Data Security */}
        <section id="security" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Lock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold">4. Data Security</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      All data encrypted in transit (TLS) and at rest
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Access Controls</h4>
                    <p className="text-sm text-muted-foreground">
                      Strict access policies and authentication
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      24/7 security monitoring and threat detection
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                  <Database className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Backups</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular encrypted backups with disaster recovery
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Cookies */}
        <section id="cookies" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Cookie className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold">5. Cookies & Tracking</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">Required for basic functionality</p>
                  </div>
                  <Badge>Required</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">Help us understand usage patterns</p>
                  </div>
                  <Badge variant="secondary">Optional</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">Remember your settings and preferences</p>
                  </div>
                  <Badge variant="secondary">Optional</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                You can manage cookie preferences in your browser settings.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: Your Rights */}
        <section id="rights" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold">6. Your Rights</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                You have the following rights regarding your personal data:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { right: "Access", desc: "Request a copy of your personal data" },
                  { right: "Correction", desc: "Update inaccurate or incomplete data" },
                  { right: "Deletion", desc: "Request deletion of your account and data" },
                  { right: "Portability", desc: "Export your data in a standard format" },
                  { right: "Objection", desc: "Opt-out of certain data processing" },
                  { right: "Restriction", desc: "Limit how we use your data" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <Badge variant="secondary" className="mt-0.5">✓</Badge>
                    <div>
                      <h4 className="font-medium">{item.right}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                To exercise these rights, contact us at privacy@skillversity.com.
                We will respond within 30 days.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 7: International */}
        <section id="international" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold">7. International Data Transfers</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                SkillVersity operates globally. Your data may be transferred to and
                processed in countries outside your residence. We ensure appropriate
                safeguards are in place:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">EU</Badge>
                  <span>GDPR-compliant data processing agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">US</Badge>
                  <span>Standard contractual clauses for data transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Global</Badge>
                  <span>Compliance with local data protection laws</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Section 8: Contact */}
        <section id="contact" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
              <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold">8. Contact Us</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                For privacy-related questions or to exercise your rights:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Privacy Team</h4>
                  <p className="text-sm text-muted-foreground">
                    privacy@skillversity.com
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Data Protection Officer</h4>
                  <p className="text-sm text-muted-foreground">
                    dpo@skillversity.com
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
              This Privacy Policy was last updated on {lastUpdated}.
              We may update this policy periodically. Significant changes will be
              communicated via email or platform notification.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/terms">Terms of Service</Link>
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
