"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockProjects } from "@/lib/mock-data";
import { CheckCircle, XCircle, Clock, Github, Globe } from "lucide-react";

export default function ValidationPage() {
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);
  const [feedback, setFeedback] = useState("");

  const pendingProjects = mockProjects.filter((p) => p.status === "pending");

  const handleVerify = (_approved: boolean) => {
    // Simulate verification
    setSelectedProject(null);
    setFeedback("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Skill Verification</h1>
        <p className="text-muted-foreground">Review and verify student project submissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProjects.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Submissions</CardTitle>
          <CardDescription>Projects waiting for your review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingProjects.map((project) => (
            <Card key={project.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Submitted {project.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.repositoryUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button onClick={() => setSelectedProject(project)}>
                      Review Project
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Project: {selectedProject?.title}</DialogTitle>
            <DialogDescription>
              Evaluate the project quality and provide feedback
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Project Details</h3>
              <p className="text-sm text-muted-foreground">{selectedProject?.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Review Checklist</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Code quality and organization</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Functionality meets requirements</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Best practices followed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Documentation provided</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Error handling implemented</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Feedback</h3>
              <Textarea
                placeholder="Provide detailed feedback for the student..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleVerify(false)}>
                <XCircle className="mr-2 h-4 w-4" />
                Request Changes
              </Button>
              <Button onClick={() => handleVerify(true)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify & Approve
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
