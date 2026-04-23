"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/useRole";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Heart,
  Award,
  Send,
  Search,
  BarChart,
  DollarSign,
  CheckCircle,
  Settings,
  Compass,
  Code,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const {
    isGeneral,
    isLearner,
    isTutor,
    isCompany,
    isSponsor,
    hasSelectedRole,
    isTutorPending,
    isProfileComplete
  } = useRole();

  const generalLinks = [
    { href: "/general/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/learn", label: "Courses", icon: GraduationCap },
    { href: "/tracks", label: "Learning Tracks", icon: Compass },
    { href: "/projects", label: "Projects", icon: Code },
    { href: "/community", label: "Community", icon: Users },
    { href: "/settings", label: "Edit Profile", icon: User },
  ];

  const memberLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/learn", label: "Courses", icon: GraduationCap },
    { href: "/tracks", label: "Learning Tracks", icon: Compass },
    { href: "/projects", label: "Projects", icon: Code },
    { href: "/requests", label: "My Requests", icon: Send },
    { href: "/articles", label: "Articles", icon: FileText },
    { href: "/profile/me", label: "My Portfolio", icon: Award },
    { href: "/community", label: "Community", icon: Users },
  ];

  const tutorLinks = [
    { href: "/tutor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tutor/courses", label: "My Courses", icon: GraduationCap },
    { href: "/tracks", label: "Learning Tracks", icon: Compass },
    { href: "/projects", label: "Projects", icon: Code },
    { href: "/requests", label: "Requests", icon: Send },
    { href: "/tutor/validation", label: "Verify Skills", icon: CheckCircle },
    { href: "/tutor/analytics", label: "Analytics", icon: BarChart },
    { href: "/community", label: "Community", icon: Users },
  ];

  const companyLinks = [
    { href: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/company/jobs", label: "Jobs", icon: Briefcase },
    { href: "/company/talent", label: "Talent Search", icon: Search },
    { href: "/tracks", label: "Learning Tracks", icon: Compass },
    { href: "/requests", label: "Requests", icon: Send },
  ];

  const sponsorLinks = [
    { href: "/partner/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/partner/fund", label: "Fund", icon: DollarSign },
    { href: "/partner/scholarships", label: "Scholarships", icon: Heart },
    { href: "/tracks", label: "Learning Tracks", icon: Compass },
    { href: "/partner/reports", label: "Impact Reports", icon: BarChart },
  ];

  // Determine which links to show based on actual role status
  let links = generalLinks; // Default for users who haven't selected a role

  if (isTutor) {
    links = tutorLinks;
  } else if (isCompany) {
    links = companyLinks;
  } else if (isSponsor) {
    links = sponsorLinks;
  } else if (isLearner && hasSelectedRole) {
    links = memberLinks;
  } else if (isGeneral || !hasSelectedRole) {
    links = generalLinks;
  }

  // Role upgrade options - only show for members who have completed onboarding
  const showRoleUpgrade = isLearner && hasSelectedRole && !isTutor && !isTutorPending;

  // Get the appropriate link for the SkillVersity logo/name
  // Points to onboarding until user selects a role, then to role-specific dashboard
  const getHomeLink = () => {
    // If user hasn't selected a role yet, always point to onboarding
    if (!hasSelectedRole) return "/onboarding";

    // After role selection, point to role-specific dashboard
    if (isTutor) return "/tutor/dashboard";
    if (isCompany) return "/company/dashboard";
    if (isSponsor) return "/partner/dashboard";
    if (isLearner) return "/dashboard";
    return "/onboarding";
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background flex flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href={getHomeLink()} className="text-xl font-bold">
          SkillVersity
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}

        {/* Role upgrade section - only for learners who haven't applied for tutor */}
        {showRoleUpgrade && (
          <div className="pt-4 mt-4 border-t">
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Grow Your Role
            </p>
            <Link
              href="/tutor/apply"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/tutor/apply"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <GraduationCap className="h-5 w-5" />
              Become a Tutor
            </Link>
          </div>
        )}

        {/* Show pending tutor status */}
        {isTutorPending && !isTutor && (
          <div className="pt-4 mt-4 border-t">
            <div className="px-3 py-2 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <p className="font-semibold">Tutor Application</p>
              <p>Pending review</p>
            </div>
          </div>
        )}
      </nav>

      {/* Footer with options */}
      <div className="border-t p-4 space-y-1">
        {/* Settings link */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>

        {/* Sponsor link - hide for sponsors */}
        {!isSponsor && (
          <Link
            href="/partner/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Heart className="h-5 w-5" />
            Become a Sponsor
          </Link>
        )}

        {/* Edit Profile - only show if profile not complete and role is selected */}
        {!isProfileComplete && hasSelectedRole && (
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-accent transition-colors"
          >
            <User className="h-5 w-5" />
            Edit Profile
          </Link>
        )}

        {/* Complete profile - only show if user hasn't selected a role */}
        {!hasSelectedRole && (
          <Link
            href="/onboarding"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-accent transition-colors"
          >
            <User className="h-5 w-5" />
            Get Started
          </Link>
        )}
      </div>
    </aside>
  );
}
