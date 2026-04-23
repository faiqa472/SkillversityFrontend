"use client"

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Building2, 
  Calendar, 
  ExternalLink,
  Linkedin,
  Github,
  Globe,
  Mail,
  Users,
  CheckCircle,
  Shield
} from "lucide-react"
import { User } from '@/lib/store/auth-store'
import { cn } from '@/lib/utils'

interface ProfessionalProfileCardProps {
  user: User & {
    professionalProfile?: {
      summary?: string
      linkedinUrl?: string
      githubUrl?: string
      portfolioUrl?: string
      completenessScore?: number
      isPublic?: boolean
    }
    workExperiences?: Array<{
      id: string
      title: string
      company: string
      startDate: string
      endDate?: string
      isCurrent: boolean
    }>
    userSkills?: Array<{
      id: string
      skill: { name: string; category: string }
      proficiencyLevel: string
      isVerified: boolean
    }>
    projects?: Array<{
      id: string
      name: string
      description: string
      technologies: string[]
    }>
  }
  variant?: 'full' | 'compact' | 'minimal'
  showActions?: boolean
  onConnect?: (user: User) => void
  onMessage?: (user: User) => void
  onViewProfile?: (user: User) => void
  className?: string
}

export const ProfessionalProfileCard = memo<ProfessionalProfileCardProps>(({
  user,
  variant = 'full',
  showActions = true,
  onConnect,
  onMessage,
  onViewProfile,
  className
}) => {
  const [, setIsHovered] = useState(false)

  const completenessScore = user.professionalProfile?.completenessScore || 0
  const currentWork = user.workExperiences?.find(exp => exp.isCurrent)
  const verifiedSkills = user.userSkills?.filter(skill => skill.isVerified) || []
  const totalSkills = user.userSkills?.length || 0

  const socialLinks = [
    {
      icon: Linkedin,
      url: user.professionalProfile?.linkedinUrl,
      label: 'LinkedIn',
      color: 'text-blue-600'
    },
    {
      icon: Github,
      url: user.professionalProfile?.githubUrl,
      label: 'GitHub',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: Globe,
      url: user.professionalProfile?.portfolioUrl,
      label: 'Portfolio',
      color: 'text-green-600'
    }
  ].filter(link => link.url)

  if (variant === 'minimal') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn("group", className)}
      >
        <Card className="border transition-all duration-200 hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`} />
                <AvatarFallback>
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-muted-foreground truncate">{user.headline}</p>
                <div className="flex items-center gap-2 mt-1">
                  {user.isTutor && user.tutorApproved && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Tutor
                    </Badge>
                  )}
                  {user.isVerified && (
                    <Shield className="h-3 w-3 text-blue-500" />
                  )}
                </div>
              </div>
              {showActions && (
                <Button size="sm" variant="outline" onClick={() => onViewProfile?.(user)}>
                  View
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn("group", className)}
      >
        <Card className="border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="text-lg">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{user.firstName} {user.lastName}</CardTitle>
                  {user.isVerified && (
                    <Shield className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <CardDescription className="text-sm">{user.headline}</CardDescription>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  {user.location && (
                    <>
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </>
                  )}
                  {currentWork && (
                    <>
                      <Separator orientation="vertical" className="h-3" />
                      <Building2 className="h-3 w-3" />
                      <span>{currentWork.company}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1">
              {user.userSkills?.slice(0, 4).map((userSkill) => (
                <Badge 
                  key={userSkill.id} 
                  variant={userSkill.isVerified ? "default" : "secondary"}
                  className="text-xs"
                >
                  {userSkill.skill.name}
                  {userSkill.isVerified && <CheckCircle className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
              {(user.userSkills?.length || 0) > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{(user.userSkills?.length || 0) - 4} more
                </Badge>
              )}
            </div>

            {showActions && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onViewProfile?.(user)} className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" onClick={() => onConnect?.(user)} className="flex-1">
                  Connect
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Full variant
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group", className)}
    >
      <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:border-primary/50">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="text-xl">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-xl">{user.firstName} {user.lastName}</CardTitle>
                {user.isVerified && (
                  <Shield className="h-5 w-5 text-blue-500" />
                )}
                {user.isTutor && user.tutorApproved && (
                  <Badge variant="default" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified Tutor
                  </Badge>
                )}
              </div>
              <CardDescription className="text-base mb-3">{user.headline}</CardDescription>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {currentWork && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{currentWork.title} at {currentWork.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Profile Strength</div>
              <div className="flex items-center gap-2">
                <Progress value={completenessScore} className="w-16 h-2" />
                <span className="text-sm font-medium">{completenessScore}%</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {user.professionalProfile?.summary && (
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {user.professionalProfile.summary}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {user.userSkills && user.userSkills.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Skills</h4>
                <div className="text-xs text-muted-foreground">
                  {verifiedSkills.length}/{totalSkills} verified
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.userSkills.slice(0, 8).map((userSkill) => (
                  <Badge 
                    key={userSkill.id}
                    variant={userSkill.isVerified ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {userSkill.skill.name}
                    {userSkill.isVerified && <CheckCircle className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
                {user.userSkills.length > 8 && (
                  <Badge variant="outline" className="text-xs">
                    +{user.userSkills.length - 8} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {user.projects && user.projects.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Recent Projects</h4>
              <div className="space-y-2">
                {user.projects.slice(0, 2).map((project) => (
                  <div key={project.id} className="p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-sm">{project.name}</h5>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
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
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="flex gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-8"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <Icon className={cn("h-3 w-3", link.color)} />
                      </a>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {showActions && (
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => onViewProfile?.(user)}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Profile
              </Button>
              <Button 
                onClick={() => onConnect?.(user)}
                className="flex-1"
              >
                <Users className="h-4 w-4 mr-2" />
                Connect
              </Button>
              <Button 
                variant="outline"
                onClick={() => onMessage?.(user)}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
})

ProfessionalProfileCard.displayName = 'ProfessionalProfileCard'