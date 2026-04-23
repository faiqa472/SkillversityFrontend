"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonMedia from "@/components/ui/skeleton-media";
import { useTrack, useTrackProviders, useTrackEndorsements } from "@/hooks/useTracks";
import {
  ArrowLeft, Bookmark, BookmarkCheck, Clock, Users, Star, BookOpen,
  CheckCircle, Building2, GraduationCap, Globe, ExternalLink, Play,
  FileText, Code, Link as LinkIcon, ThumbsUp, Share2,
  ChevronRight, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  expert: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  all: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

const resourceTypeIcons: Record<string, React.ReactNode> = {
  documentation: <FileText className="h-4 w-4" />,
  tutorial: <Play className="h-4 w-4" />,
  video: <Play className="h-4 w-4" />,
  article: <FileText className="h-4 w-4" />,
  github: <Code className="h-4 w-4" />,
  tool: <Code className="h-4 w-4" />,
};

function TrackDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex gap-4">
                <SkeletonMedia variant="image" className="h-16 w-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Skeleton className="h-8 w-8 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card><CardContent className="p-4 space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}


export default function TrackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("modules");

  const { track, loading, error, followTrack, completeModule } = useTrack(slug);
  const { providers } = useTrackProviders(slug);
  const { endorsements } = useTrackEndorsements(slug);

  if (loading) return <TrackDetailSkeleton />;

  if (error || !track) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Track Not Found</h2>
        <p className="text-muted-foreground mb-4">{error || "This track doesn't exist."}</p>
        <Button asChild><Link href="/tracks">Browse Tracks</Link></Button>
      </div>
    );
  }

  const progress = track.user_progress?.progress_percentage || 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />Back to Tracks
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                  {track.primary_technology?.icon_url ? (
                    <img src={track.primary_technology.icon_url} alt="" className="h-10 w-10" />
                  ) : (
                    <BookOpen className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h1 className="text-2xl font-bold">{track.title}</h1>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        {track.track_type === 'official' && <Building2 className="h-4 w-4" />}
                        {track.track_type === 'tutor' && <GraduationCap className="h-4 w-4" />}
                        {track.track_type === 'community' && <Globe className="h-4 w-4" />}
                        <span className="capitalize">{track.track_type}</span>
                        {track.is_verified_source && (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" onClick={followTrack}>
                      {track.is_following ? (
                        <BookmarkCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className={difficultyColors[track.difficulty_level]}>
                      {track.difficulty_level}
                    </Badge>
                    {track.primary_technology && (
                      <Badge variant="outline">{track.primary_technology.name}</Badge>
                    )}
                    {track.is_open_path && <Badge variant="secondary">Open Path</Badge>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{track.description}</p>
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t text-sm">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{track.estimated_duration_weeks}w / {track.estimated_duration_hours}h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{track.followers_count.toLocaleString()} following</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{track.modules_count} modules</span>
                </div>
                {track.rating > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{Number(track.rating).toFixed(1)} ({track.rating_count})</span>
                  </div>
                )}
              </div>
              {/* Progress */}
              {track.is_following && progress > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Your Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>


          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="providers">Services ({providers.length})</TabsTrigger>
              <TabsTrigger value="endorsements">Reviews ({endorsements.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="mt-4 space-y-3">
              {track.modules?.map((module, idx) => (
                <Card key={module.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                        track.user_progress?.completed_modules.includes(module.id)
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                          : "bg-muted"
                      )}>
                        {track.user_progress?.completed_modules.includes(module.id) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{module.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {module.estimated_duration_minutes}min
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {module.description}
                        </p>
                        {module.learning_objectives.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {module.learning_objectives.slice(0, 3).map((obj, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{obj}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => completeModule(module.id)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>


            <TabsContent value="resources" className="mt-4 space-y-3">
              {track.resources?.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        {resourceTypeIcons[resource.resource_type] || <LinkIcon className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{resource.title}</h3>
                          <Badge variant={resource.authenticity === 'official' ? 'default' : 'outline'} className="text-xs">
                            {resource.authenticity}
                          </Badge>
                          {resource.is_free && <Badge variant="secondary" className="text-xs">Free</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{resource.provider_name}</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />{resource.upvotes}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(!track.resources || track.resources.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">No resources added yet.</div>
              )}
            </TabsContent>

            <TabsContent value="providers" className="mt-4 space-y-3">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {provider.provider.first_name?.[0]}{provider.provider.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{provider.title}</h3>
                          <Badge variant="outline" className="text-xs capitalize">{provider.service_type}</Badge>
                          {provider.is_verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{provider.provider.first_name} {provider.provider.last_name}</p>
                        <p className="text-sm mt-1">{provider.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          {provider.price_min && (
                            <span className="font-medium">
                              {provider.currency} {provider.price_min} - {provider.price_max}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {Number(provider.rating).toFixed(1)}
                          </div>
                          <span className="text-muted-foreground">{provider.students_count} students</span>
                        </div>
                      </div>
                      <Button size="sm">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {providers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No service providers yet.</div>
              )}
            </TabsContent>


            <TabsContent value="endorsements" className="mt-4 space-y-3">
              {endorsements.map((endorsement) => (
                <Card key={endorsement.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {endorsement.endorser.first_name?.[0]}{endorsement.endorser.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {endorsement.endorser.first_name} {endorsement.endorser.last_name}
                          </span>
                          <Badge variant="outline" className="text-xs capitalize">{endorsement.endorser_type}</Badge>
                          {endorsement.is_verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={cn("h-4 w-4", star <= endorsement.rating ? "fill-yellow-400 text-yellow-400" : "text-muted")} />
                          ))}
                        </div>
                        {endorsement.title && <h4 className="font-medium mt-2">{endorsement.title}</h4>}
                        <p className="text-sm mt-1">{endorsement.content}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />{endorsement.helpful_count} helpful
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {endorsements.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No reviews yet. Be the first!</div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button className="w-full" size="lg" onClick={followTrack}>
                {track.is_following ? (
                  <><BookmarkCheck className="h-4 w-4 mr-2" />Following</>
                ) : (
                  <><Bookmark className="h-4 w-4 mr-2" />Follow Track</>
                )}
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />Share
              </Button>
            </CardContent>
          </Card>

          {/* Author */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Created by</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{track.author.first_name?.[0]}{track.author.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{track.organization_name || `${track.author.first_name} ${track.author.last_name}`}</p>
                  <p className="text-xs text-muted-foreground capitalize">{track.track_type} contributor</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          {track.technologies && track.technologies.length > 0 && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Technologies</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {track.technologies.map((tech) => (
                    <Badge key={tech.id} variant="outline">{tech.name}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Stats */}
          {(track.tutors_offering_count > 0 || track.companies_hiring_count > 0) && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Market Demand</CardTitle></CardHeader>
              <CardContent className="pt-0 space-y-2">
                {track.tutors_offering_count > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4" />Tutors offering</span>
                    <span className="font-medium">{track.tutors_offering_count}</span>
                  </div>
                )}
                {track.companies_hiring_count > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><Building2 className="h-4 w-4" />Companies hiring</span>
                    <span className="font-medium">{track.companies_hiring_count}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
