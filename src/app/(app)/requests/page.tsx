"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

export default function RequestsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const requests = [
    {
      id: "1",
      title: "Custom DevOps Training",
      description: "Looking for a comprehensive DevOps course covering Docker, Kubernetes, and CI/CD pipelines.",
      budget: "50,000 PKR",
      timeline: "3 months",
      status: "open",
      offers: 3,
      createdAt: "2 days ago",
    },
    {
      id: "2",
      title: "React Native Mobile Development",
      description: "Need guidance on building cross-platform mobile apps with React Native.",
      budget: "40,000 PKR",
      timeline: "2 months",
      status: "in-progress",
      offers: 5,
      createdAt: "1 week ago",
    },
    {
      id: "3",
      title: "Machine Learning Fundamentals",
      description: "Want to learn ML basics with Python, scikit-learn, and TensorFlow.",
      budget: "60,000 PKR",
      timeline: "4 months",
      status: "completed",
      offers: 2,
      createdAt: "2 weeks ago",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <Send className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" => {
    switch (status) {
      case "open":
        return "default";
      case "in-progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Learning Requests</h1>
          <p className="text-muted-foreground">Post custom learning requirements and receive proposals</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Learning Request</DialogTitle>
              <DialogDescription>
                Describe what you want to learn and receive custom proposals from tutors
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Request Title</Label>
                <Input id="title" placeholder="e.g., Advanced React Development" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to learn, your current skill level, and your goals..."
                  rows={5}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (PKR)</Label>
                  <Input id="budget" type="number" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input id="timeline" placeholder="e.g., 3 months" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Awaiting proposals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Active learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">From tutors</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{request.title}</CardTitle>
                    <Badge variant={getStatusVariant(request.status)} className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      {request.status}
                    </Badge>
                  </div>
                  <CardDescription>{request.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Budget:</span> {request.budget}
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span> {request.timeline}
                  </div>
                  <div>
                    <span className="font-medium">Offers:</span> {request.offers}
                  </div>
                  <div>
                    <span className="font-medium">Posted:</span> {request.createdAt}
                  </div>
                </div>
                <Button variant="outline">View Offers</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
