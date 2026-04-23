"use client"

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  GitBranch, 
  Users, 
  MessageSquare, 
  UserCheck, 
  Clock, 
  Eye,
  Plus,
  ChevronDown,
  ChevronUp,
  Building2,
  Activity
} from "lucide-react"
import { CourseOutline, OutlineBranch } from '@/lib/store/platform-store'
import { cn } from '@/lib/utils'

interface CourseOutlineCardProps {
  outline: CourseOutline
  onView?: (outline: CourseOutline) => void
  onContribute?: (outline: CourseOutline) => void
  onDiscuss?: (outline: CourseOutline) => void
  className?: string
}

const BranchIndicator = memo(({ branch }: { branch: OutlineBranch }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded"
  >
    <div className="flex items-center gap-2">
      <Badge 
        variant={branch.type === 'main' ? 'default' : 'outline'} 
        className="text-xs"
      >
        {branch.name}
      </Badge>
      <span className="text-muted-foreground">{branch.type}</span>
    </div>
    <span className="text-muted-foreground">{branch.lastCommit}</span>
  </motion.div>
))

BranchIndicator.displayName = 'BranchIndicator'

export const CourseOutlineCard = memo<CourseOutlineCardProps>(({
  outline,
  onView,
  onContribute,
  onDiscuss,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group", className)}
    >
      <Card className="border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={outline.company.logo} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {outline.company.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg leading-tight">{outline.title}</CardTitle>
                <CardDescription className="text-sm flex items-center gap-2">
                  <Building2 className="h-3 w-3" />
                  {outline.company.name} • v{outline.version}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                className={cn("text-xs", statusColors[outline.status])}
                variant="secondary"
              >
                {outline.status.replace('_', ' ')}
              </Badge>
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Activity className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {outline.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {outline.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {outline.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{outline.technologies.length - 4} more
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{outline.estimatedDurationWeeks} weeks • {outline.difficultyLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{outline.contributorsCount} contributors</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span>{outline.tutorApplicationsCount} tutor applications</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>{outline.learnerRequestsCount} requests</span>
              </div>
            </div>
          </div>

          {/* Branches Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Branches ({outline.branches.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Button>
            </div>

            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 overflow-hidden"
                >
                  {outline.branches.map((branch) => (
                    <BranchIndicator key={branch.id} branch={branch} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1"
                >
                  {outline.branches.slice(0, 2).map((branch) => (
                    <BranchIndicator key={branch.id} branch={branch} />
                  ))}
                  {outline.branches.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{outline.branches.length - 2} more branches
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Updated {outline.lastUpdated}
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onView?.(outline)}
                className="h-8"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onDiscuss?.(outline)}
                className="h-8"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Discuss
              </Button>
              <Button 
                size="sm"
                onClick={() => onContribute?.(outline)}
                className="h-8"
              >
                <Plus className="h-3 w-3 mr-1" />
                Contribute
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

CourseOutlineCard.displayName = 'CourseOutlineCard'