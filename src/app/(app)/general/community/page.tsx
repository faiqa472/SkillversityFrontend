import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, TrendingUp, Hash } from "lucide-react";
import Link from "next/link";

export default function GeneralCommunityPage() {
  const channels = [
    { name: "general", members: 10234, description: "General discussions" },
    { name: "career-advice", members: 5432, description: "Career tips and discussions" },
    { name: "tech-news", members: 8765, description: "Latest tech updates" },
    { name: "job-opportunities", members: 6543, description: "Job postings and referrals" },
    { name: "learning-resources", members: 4321, description: "Share learning materials" },
  ];

  const trendingTopics = [
    { title: "How to break into tech in 2024?", replies: 234, views: 5432 },
    { title: "Best resources for learning React", replies: 156, views: 3210 },
    { title: "Remote work opportunities", replies: 189, views: 4567 },
    { title: "Salary negotiation tips", replies: 267, views: 6789 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Community
        </h1>
        <p className="text-muted-foreground">Connect with members and professionals worldwide</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,234</div>
            <p className="text-xs text-muted-foreground">+234 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,543</div>
            <p className="text-xs text-muted-foreground">Ongoing conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Channels</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">Topic-based channels</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Channels</CardTitle>
            <CardDescription>Join the conversation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {channels.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{channel.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{channel.members.toLocaleString()} members</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trending Discussions
            </CardTitle>
            <CardDescription>Hot topics right now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <p className="font-medium hover:text-primary cursor-pointer">{topic.title}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-muted-foreground">{topic.replies} replies</span>
                  <span className="text-xs text-muted-foreground">{topic.views} views</span>
                  <Badge variant="secondary" className="text-xs">Hot</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-primary/20">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-lg font-semibold">Want to create your own discussions?</h3>
            <p className="text-sm text-muted-foreground">Complete your profile to post and engage fully</p>
          </div>
          <Button asChild>
            <Link href="/profile/complete">Complete Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
