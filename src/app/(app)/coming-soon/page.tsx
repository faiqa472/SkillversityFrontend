"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  ArrowLeft,
  Bell,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function ComingSoonPage() {
  const router = useRouter();

  const upcomingFeatures = [
    { name: "Interactive Video Lessons", status: "In Development" },
    { name: "Live Coding Sessions", status: "Planned" },
    { name: "AI-Powered Learning Assistant", status: "In Development" },
    { name: "Skill Assessments & Certifications", status: "Planned" },
    { name: "Community Discussion Forums", status: "Planned" },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="relative">
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Rocket className="h-12 w-12 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-yellow-600" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-1.5">
            <Clock className="mr-2 h-3 w-3" />
            Coming Soon
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            Something Amazing is Brewing!
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We&apos;re working hard to bring you this feature. Stay tuned for updates!
          </p>
        </div>

        {/* Upcoming Features */}
        <Card className="text-left">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Upcoming Features
            </h3>
            <div className="space-y-3">
              {upcomingFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{feature.name}</span>
                  </div>
                  <Badge
                    variant={feature.status === "In Development" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {feature.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notify Me */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold">Want to be notified?</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll let you know when this feature is ready
                </p>
              </div>
              <Button variant="outline" disabled>
                Notify Me
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
