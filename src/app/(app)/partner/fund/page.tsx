"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, DollarSign, Users, TrendingUp } from "lucide-react";

export default function FundPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funding Portal</h1>
          <p className="text-muted-foreground">Invest in Pakistan's tech talent</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Heart className="mr-2 h-4 w-4" />
              Make Donation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount (PKR)</Label>
                <Input id="amount" type="number" placeholder="50000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <select id="purpose" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>General Fund</option>
                  <option>Scholarship Fund</option>
                  <option>Infrastructure Development</option>
                  <option>Course Development</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea id="message" placeholder="Your message..." rows={3} />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Proceed to Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR 2.5M</div>
            <p className="text-xs text-muted-foreground">Lifetime contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Supported</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Active scholarships</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Employment rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funding Opportunities</CardTitle>
          <CardDescription>Choose how you want to make an impact</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <Badge className="w-fit">Popular</Badge>
              <CardTitle className="mt-2">Sponsor a Cohort</CardTitle>
              <CardDescription>Fund a complete learning track for 50 students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">PKR 500,000</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 50 students enrolled</li>
                <li>✓ 6-month program</li>
                <li>✓ Quarterly impact reports</li>
                <li>✓ Recognition on platform</li>
              </ul>
              <Button className="w-full">Sponsor Now</Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Individual Scholarship</CardTitle>
              <CardDescription>Support one student's complete journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">PKR 50,000</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 1 student fully funded</li>
                <li>✓ 6-month program</li>
                <li>✓ Direct student updates</li>
                <li>✓ Mentorship opportunity</li>
              </ul>
              <Button className="w-full" variant="outline">
                Fund Scholarship
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Course Development</CardTitle>
              <CardDescription>Fund creation of new industry-relevant courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">PKR 200,000</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ New course created</li>
                <li>✓ Expert tutor hired</li>
                <li>✓ Unlimited student access</li>
                <li>✓ Course naming rights</li>
              </ul>
              <Button className="w-full" variant="outline">
                Fund Course
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>General Fund</CardTitle>
              <CardDescription>Support overall platform operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">Any Amount</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Flexible contribution</li>
                <li>✓ Platform improvements</li>
                <li>✓ Student support services</li>
                <li>✓ Tax deductible</li>
              </ul>
              <Button className="w-full" variant="outline">
                Contribute
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
