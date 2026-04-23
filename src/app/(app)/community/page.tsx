"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  GraduationCap,
  Users,
  Filter,
  BookOpen,
  ArrowRight,
  Building2,
  Sparkles,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { dummyProfiles } from "@/lib/dummy-data";
import {
  VerifiedBadge,
  CompanyBadge,
  GoldVerifiedBadge,
} from "@/components/ui/verified-badge";

// Skeleton Media for profile avatars
function SkeletonAvatar() {
  return (
    <div className="relative overflow-hidden rounded-full bg-muted h-20 w-20">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Users className="w-8 h-8 text-muted-foreground/30" />
      </div>
    </div>
  );
}

// Skeleton Company Logo
function SkeletonCompanyLogo() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted h-16 w-16">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Building2 className="w-6 h-6 text-muted-foreground/30" />
      </div>
    </div>
  );
}

// Featured skeleton profiles for showcase
const skeletonProfiles = [
  {
    id: "skeleton-1",
    name: "Sarah Ahmed",
    headline: "Senior React Developer",
    location: "Karachi",
    skills: ["React", "TypeScript", "Node.js"],
    isTutor: true,
    rating: 4.9,
    students: 450,
  },
  {
    id: "skeleton-2",
    name: "Ali Hassan",
    headline: "Data Science Lead",
    location: "Lahore",
    skills: ["Python", "ML", "TensorFlow"],
    isTutor: true,
    rating: 4.8,
    students: 320,
  },
  {
    id: "skeleton-3",
    name: "Fatima Khan",
    headline: "Cloud Architect",
    location: "Islamabad",
    skills: ["AWS", "DevOps", "Kubernetes"],
    isTutor: false,
    rating: 0,
    students: 0,
  },
];

// Featured companies for showcase
const skeletonCompanies = [
  { id: "c1", name: "TechCorp", industry: "Software", openings: 12 },
  { id: "c2", name: "DataFlow", industry: "Analytics", openings: 8 },
  { id: "c3", name: "CloudNine", industry: "Cloud", openings: 15 },
];

export default function CommunityPage() {
  const [profiles] = useState(dummyProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterAvailability, setFilterAvailability] = useState<string>("all");

  const filteredProfiles = profiles.filter((profile) => {
    const fullName =
      `${profile.user.first_name} ${profile.user.last_name}`.toLowerCase();
    const headline = profile.user.headline.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      headline.includes(searchQuery.toLowerCase()) ||
      profile.skills.some((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesRole =
      filterRole === "all" ||
      (filterRole === "tutor" && profile.user.tutor_approved) ||
      (filterRole === "learner" && !profile.user.tutor_approved);

    const matchesAvailability =
      filterAvailability === "all" ||
      (filterAvailability === "tutoring" && profile.available_for_tutoring) ||
      (filterAvailability === "mentoring" && profile.available_for_mentoring);

    return matchesSearch && matchesRole && matchesAvailability && profile.is_public;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">
            Connect with professionals, tutors, and members
          </p>
        </div>
        <Button asChild>
          <Link href="/profile/me">
            View My Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Featured Tutors Showcase with Skeleton */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Featured Tutors
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Top-rated tutors ready to help you learn
              </p>
            </div>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {skeletonProfiles
              .filter((p) => p.isTutor)
              .map((profile) => (
                <Link
                  key={profile.id}
                  href="/coming-soon"
                  className="block p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <SkeletonAvatar />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold truncate">{profile.name}</h4>
                        <VerifiedBadge size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {profile.headline}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-yellow-500">
                          ★ {profile.rating}
                        </span>
                        <span className="text-muted-foreground">
                          {profile.students} students
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Companies Showcase */}
      <Card className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Hiring Companies
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Companies looking for skilled professionals
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Get Notified
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {skeletonCompanies.map((company) => (
              <Link
                key={company.id}
                href="/coming-soon"
                className="block p-4 bg-background rounded-lg border hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <SkeletonCompanyLogo />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h4 className="font-semibold">{company.name}</h4>
                      <CompanyBadge size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {company.industry}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {company.openings} open positions
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profiles.length}</div>
            <p className="text-xs text-muted-foreground">Active professionals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Verified Tutors</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profiles.filter((p) => p.user.tutor_approved).length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to teach</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open to Mentoring</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profiles.filter((p) => p.available_for_mentoring).length}
            </div>
            <p className="text-xs text-muted-foreground">Available mentors</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, headline, or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="tutor">Tutors Only</SelectItem>
                <SelectItem value="learner">Members</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterAvailability} onValueChange={setFilterAvailability}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="tutoring">Available for Tutoring</SelectItem>
                <SelectItem value="mentoring">Open to Mentoring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Profiles Grid */}
      {filteredProfiles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((profile) => {
            const { user } = profile;
            const initials = `${user.first_name[0]}${user.last_name[0]}`;

            return (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-lg">
                        {user.first_name} {user.last_name}
                      </h3>
                      {user.tutor_approved && (
                        <VerifiedBadge size="sm" title="Verified Tutor" />
                      )}
                      {(user as any).is_company && (
                        <CompanyBadge size="sm" title="Verified Company" />
                      )}
                      {(user as any).is_sponsor && (
                        <GoldVerifiedBadge size="sm" title="Sponsor" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {user.headline}
                    </p>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-3 w-3" />
                      {user.location}
                    </div>

                    {/* Skills Preview */}
                    <div className="flex flex-wrap justify-center gap-1 mt-3">
                      {profile.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill.name} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                      {profile.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{profile.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Availability Badges */}
                    <div className="flex flex-wrap justify-center gap-1 mt-3">
                      {profile.available_for_tutoring && (
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600 border-green-600"
                        >
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Tutoring
                        </Badge>
                      )}
                      {profile.available_for_mentoring && (
                        <Badge
                          variant="outline"
                          className="text-xs text-blue-600 border-blue-600"
                        >
                          <BookOpen className="h-3 w-3 mr-1" />
                          Mentoring
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full mt-4" variant="outline" asChild>
                      <Link href={`/profile/${profile.user.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No profiles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setFilterRole("all");
              setFilterAvailability("all");
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Want to be discovered?</h3>
              <p className="text-muted-foreground">
                Complete your profile to appear in search results and get
                connected
              </p>
            </div>
            <Button asChild>
              <Link href="/profile/complete">Complete Your Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
