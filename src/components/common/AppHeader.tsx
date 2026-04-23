"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useUserStore } from "@/store/useUserStore";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserRoleBadge } from "@/components/auth/RoleBadge";
import { Search, Bell, LogOut, User, Settings, GraduationCap } from "lucide-react";

/**
 * App Header Component
 * Top navigation with search, notifications, and user menu
 */
export function AppHeader() {
  const router = useRouter();
  const { logout } = useAuth();
  const user = useUserStore((state) => state.user);
  const { isTutor, isTutorPending, isLearner } = useRole();

  const handleLogout = async () => {
    // Call backend logout endpoint
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        await fetch("http://localhost:8000/api/users/auth/logout/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch {
      // Continue with logout even if API fails
    }
    
    // Clear local state
    logout();
    router.push("/");
  };

  const userName = user 
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User" 
    : "User";
  const userInitials = user 
    ? `${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`.toUpperCase() || "U" 
    : "U";
  const userEmail = user?.email || "";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses, articles, tutors..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button className="relative rounded-full p-2 hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full">
              <Avatar>
                <AvatarImage src="" alt={userName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{userName}</p>
                  <UserRoleBadge />
                </div>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile/me")}>
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            {/* Show "Become a Tutor" only for members who haven't applied */}
            {isLearner && !isTutor && !isTutorPending && (
              <DropdownMenuItem onClick={() => router.push("/tutor/apply")}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Become a Tutor
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
