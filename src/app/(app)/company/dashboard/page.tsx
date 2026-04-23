import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockJobs } from "@/lib/mock-data";
import { Briefcase, Users, Eye, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function CompanyDashboardPage() {
  const activeJobs = mockJobs;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground">Manage your hiring and talent acquisition</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-muted-foreground">Open positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Total received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4K</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Job Postings</CardTitle>
              <Button size="sm" asChild>
                <Link href="/company/jobs">View All</Link>
              </Button>
            </div>
            <CardDescription>Your current open positions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{job.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span className="text-sm text-muted-foreground">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Posted {job.postedAt.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>45 applications</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/company/jobs">Manage</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Button size="sm" variant="outline">View All</Button>
            </div>
            <CardDescription>Latest candidate applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Ahmed Khan", position: "Junior Full-Stack Developer", skills: ["Next.js", "TypeScript"], time: "2 hours ago" },
              { name: "Sara Ahmed", position: "Senior React Developer", skills: ["React", "Redux"], time: "5 hours ago" },
              { name: "Ali Hassan", position: "Python Backend Intern", skills: ["Python", "FastAPI"], time: "1 day ago" },
            ].map((applicant, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{applicant.name}</p>
                  <p className="text-sm text-muted-foreground">{applicant.position}</p>
                  <div className="flex gap-1 mt-2">
                    {applicant.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{applicant.time}</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiring Funnel</CardTitle>
          <CardDescription>Application status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { stage: "Applied", count: 127, color: "bg-blue-500" },
              { stage: "Screening", count: 45, color: "bg-yellow-500" },
              { stage: "Interview", count: 18, color: "bg-purple-500" },
              { stage: "Offer", count: 5, color: "bg-green-500" },
              { stage: "Hired", count: 8, color: "bg-primary" },
            ].map((stage) => (
              <div key={stage.stage} className="text-center">
                <div className={`h-2 ${stage.color} rounded-full mb-2`} />
                <p className="text-2xl font-bold">{stage.count}</p>
                <p className="text-sm text-muted-foreground">{stage.stage}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
