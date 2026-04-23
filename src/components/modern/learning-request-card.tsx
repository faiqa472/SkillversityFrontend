"use client"

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  MessageSquare, 
  Calendar,
  Target,
  Zap,
  TrendingUp,
  AlertCircle
} from "lucide-react"
import { LearningRequest } from '@/lib/store/platform-store'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface LearningRequestCardProps {
  request: LearningRequest
  onRespond?: (request: LearningRequest) => void
  onView?: (request: LearningRequest) => void
  showActions?: boolean
  className?: string
}

export const LearningRequestCard = memo<LearningRequestCardProps>(({
  request,
  onRespond,
  onView,
  showActions = true,
  className
}) => {
  const [, setIsHovered] = useState(false)

  const urgencyConfig = {
    low: { 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      icon: Clock,
      label: 'Flexible'
    },
    medium: { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      icon: Calendar,
      label: '2-3 months'
    },
    high: { 
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      icon: TrendingUp,
      label: 'Within 1 month'
    },
    urgent: { 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      icon: Zap,
      label: 'ASAP'
    }
  }

  const statusConfig = {
    open: { color: 'bg-green-500', label: 'Open for proposals' },
    in_progress: { color: 'bg-blue-500', label: 'In progress' },
    matched: { color: 'bg-purple-500', label: 'Matched with tutor' },
    completed: { color: 'bg-gray-500', label: 'Completed' },
    cancelled: { color: 'bg-red-500', label: 'Cancelled' }
  }

  const urgency = urgencyConfig[request.urgency as keyof typeof urgencyConfig]
  const status = statusConfig[request.status as keyof typeof statusConfig]
  const UrgencyIcon = urgency.icon

  const budgetDisplay = request.budgetMin && request.budgetMax 
    ? `PKR ${request.budgetMin.toLocaleString()} - ${request.budgetMax.toLocaleString()}`
    : request.budgetMin 
    ? `From PKR ${request.budgetMin.toLocaleString()}`
    : 'Budget negotiable'

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
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-2 h-2 rounded-full", status.color)} />
                <span className="text-xs text-muted-foreground">{status.label}</span>
                <Badge className={cn("text-xs", urgency.color)} variant="secondary">
                  <UrgencyIcon className="h-3 w-3 mr-1" />
                  {urgency.label}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{request.title}</CardTitle>
              <CardDescription className="text-sm mt-1">
                {request.skillLevel} level • {request.preferredDurationWeeks} weeks
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-primary">{budgetDisplay}</div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {request.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {request.technologiesWanted.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {request.technologiesWanted.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{request.technologiesWanted.length - 5} more
              </Badge>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Interest Level</span>
              <span className="font-medium">{request.tutorResponsesCount} responses</span>
            </div>
            <Progress 
              value={Math.min((request.tutorResponsesCount / 10) * 100, 100)} 
              className="h-2"
            />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-sm font-medium">{request.tutorResponsesCount}</div>
              <div className="text-xs text-muted-foreground">Responses</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-sm font-medium">{request.preferredDurationWeeks}w</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-sm font-medium capitalize">{request.skillLevel}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {request.urgency === 'urgent' && (
                  <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                    <AlertCircle className="h-3 w-3" />
                    Urgent request
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onView?.(request)}
                  className="h-8"
                >
                  View Details
                </Button>
                {request.status === 'open' && (
                  <Button 
                    size="sm"
                    onClick={() => onRespond?.(request)}
                    className="h-8"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Respond
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
})

LearningRequestCard.displayName = 'LearningRequestCard'