"use client";

import { Badge } from "@/components/ui/badge";
import { useRole } from "@/hooks/useRole";
import { ROLE_DISPLAY_NAMES, ROLE_BADGE_COLORS } from "@/lib/role-config";
import type { UserRole } from "@/types";
import { 
  User, 
  GraduationCap, 
  Building2, 
  Heart, 
  Shield,
  BookOpen,
  Users
} from "lucide-react";

const ROLE_ICONS: Record<UserRole, React.ComponentType<{ className?: string }>> = {
  guest: User,
  general: Users,
  learner: BookOpen,
  tutor: GraduationCap,
  company: Building2,
  sponsor: Heart,
  admin: Shield,
};

interface RoleBadgeProps {
  role?: UserRole;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Display badge for user role
 * Uses current user's role if not specified
 */
export function RoleBadge({ 
  role: propRole, 
  showIcon = true, 
  size = "md",
  className = "" 
}: RoleBadgeProps) {
  const { role: currentRole } = useRole();
  const role = propRole || currentRole;
  
  const Icon = ROLE_ICONS[role];
  const displayName = ROLE_DISPLAY_NAMES[role];
  const colorClass = ROLE_BADGE_COLORS[role];
  
  const sizeClasses = {
    sm: "text-xs py-0 px-1.5",
    md: "text-xs py-0.5 px-2",
    lg: "text-sm py-1 px-3",
  };
  
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  return (
    <Badge 
      variant="secondary" 
      className={`${colorClass} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon className={`${iconSizes[size]} mr-1`} />}
      {displayName}
    </Badge>
  );
}

/**
 * Display current user's role with pending status
 */
export function UserRoleBadge({ className = "" }: { className?: string }) {
  const { role, isTutorPending } = useRole();
  
  if (isTutorPending) {
    return (
      <div className="flex items-center gap-1">
        <RoleBadge role="learner" className={className} />
        <Badge variant="outline" className="text-xs py-0 text-yellow-600 border-yellow-300">
          Tutor Application Pending
        </Badge>
      </div>
    );
  }
  
  return <RoleBadge role={role} className={className} />;
}
