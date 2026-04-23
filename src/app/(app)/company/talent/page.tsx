"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockUsers, mockProjects } from "@/lib/mock-data";
import { Search, Filter, Award, BookOpen, Github, Linkedin, Mail, Star } from "lucide-react";
import Link from "next/link";

export default function TalentSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const candidates = mockUsers.filter((u) => u.role === "learner");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Talent Search</h1>
        <p className="text-muted-foreground">Find verified professionals for your team</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by skills, name, or experience..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>AI Match</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Verified profiles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Profiles</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">In your shortlist</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {candidates.map((candidate) => {
          const userProjects = mockProjects.filter((p) => p.userId === candidate.id && p.status === "verified");
          
          return (
            <Card key={candidate.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{candidate.name}</CardTitle>
                        <CardDescription className="mt-1">{candidate.bio}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button>
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Verified Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Verified Projects ({userProjects.length})
                    </h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {userProjects.slice(0, 2).map((project) => (
                        <div key={project.id} className="border rounded-lg p-3">
                          <p className="font-medium text-sm">{project.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {project.description}
                          </p>
                          <div className="flex gap-1 mt-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" size="sm">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/${candidate.id}`}>View Full Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
