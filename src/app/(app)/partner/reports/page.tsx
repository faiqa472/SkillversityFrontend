import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, Users, Award, Briefcase } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Impact Reports</h1>
          <p className="text-muted-foreground">Track the impact of your contributions</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Full Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Impacted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18%</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Above industry average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Within 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary Increase</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145%</div>
            <p className="text-xs text-muted-foreground">Post-graduation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demographic Impact</CardTitle>
          <CardDescription>Breakdown of students supported by your contributions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Women in Tech</span>
              <span className="font-medium">35%</span>
            </div>
            <Progress value={35} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rural Areas</span>
              <span className="font-medium">28%</span>
            </div>
            <Progress value={28} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Low-Income Families</span>
              <span className="font-medium">52%</span>
            </div>
            <Progress value={52} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">First-Generation College</span>
              <span className="font-medium">41%</span>
            </div>
            <Progress value={41} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills Acquired</CardTitle>
            <CardDescription>Most popular skills among your sponsored students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { skill: "Full-Stack Development", count: 342 },
              { skill: "Data Science", count: 289 },
              { skill: "Cloud Computing", count: 234 },
              { skill: "Mobile Development", count: 198 },
              { skill: "DevOps", count: 156 },
            ].map((item) => (
              <div key={item.skill} className="flex items-center justify-between">
                <span className="text-sm">{item.skill}</span>
                <Badge variant="secondary">{item.count} students</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>Recent achievements from sponsored students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 border-b pb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Hired</Badge>
                <span className="font-medium">Ahmed Khan</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secured position as Junior Developer at Systems Limited
              </p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
            <div className="space-y-2 border-b pb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">Certified</Badge>
                <span className="font-medium">Sara Ali</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Completed Full-Stack Development certification
              </p>
              <p className="text-xs text-muted-foreground">5 days ago</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">Project</Badge>
                <span className="font-medium">Hassan Raza</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built and deployed E-Commerce platform (verified)
              </p>
              <p className="text-xs text-muted-foreground">1 week ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quarterly Reports</CardTitle>
          <CardDescription>Download detailed impact reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Q1 2024", "Q4 2023", "Q3 2023"].map((quarter) => (
            <div key={quarter} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{quarter} Impact Report</p>
                <p className="text-sm text-muted-foreground">Comprehensive analysis of program outcomes</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
