'use client';

/**
 * CareerPathVisualizer Component
 * Visual representation of career paths with progress tracking
 */

import { useCareerPath, useCareerPathProgress } from '@/hooks/useOutlines';
import { CareerPath, CareerPathProgress, CareerPathStepProgress } from '@/types/outlines';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Target,
  CheckCircle,
  Loader2,
  BookOpen,
  Trophy,
} from 'lucide-react';

interface CareerPathVisualizerProps {
  careerPathId: string;
  onSelectOutline?: (outlineId: string) => void;
}

export function CareerPathVisualizer({ careerPathId, onSelectOutline }: CareerPathVisualizerProps) {
  const { careerPath, loading: pathLoading, error: pathError } = useCareerPath(careerPathId);
  const { progress, loading: progressLoading } = useCareerPathProgress(careerPathId);

  if (pathLoading || progressLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (pathError || !careerPath) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        {pathError || 'Career path not found'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {careerPath.title}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {careerPath.description}
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {careerPath.target_job_role.title}
            </Badge>
          </div>
        </CardHeader>
        {progress && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">{progress.overall_percentage}%</span>
              </div>
              <Progress value={progress.overall_percentage} className="h-3" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{progress.completed_steps} of {progress.total_steps} steps completed</span>
                {progress.overall_percentage === 100 && (
                  <span className="flex items-center gap-1 text-green-600">
                    <Trophy className="h-4 w-4" />
                    Completed!
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Path Steps */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {careerPath.steps.map((step, index) => {
            const stepProgress = progress?.steps.find(s => s.order === step.order);
            return (
              <PathStep
                key={step.id}
                step={step}
                stepProgress={stepProgress}
                isLast={index === careerPath.steps.length - 1}
                onClick={() => onSelectOutline?.(step.outline.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Target Job Role */}
      <Card className="border-primary">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">{careerPath.target_job_role.title}</h4>
              <p className="text-sm text-muted-foreground">
                {careerPath.target_job_role.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface PathStepProps {
  step: CareerPath['steps'][0];
  stepProgress?: CareerPathStepProgress;
  isLast?: boolean;
  onClick?: () => void;
}

function PathStep({ step, stepProgress, onClick }: PathStepProps) {
  const isCompleted = stepProgress?.completed ?? false;
  const progressPercent = stepProgress?.progress_percentage ?? 0;

  return (
    <div className="relative flex items-start gap-4 pl-3">
      {/* Step Indicator */}
      <div
        className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          isCompleted
            ? 'border-green-500 bg-green-500 text-white'
            : progressPercent > 0
            ? 'border-primary bg-primary/10'
            : 'border-border bg-background'
        }`}
      >
        {isCompleted ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <span className="text-xs font-medium">{step.order + 1}</span>
        )}
      </div>

      {/* Step Content */}
      <Card
        className={`flex-1 cursor-pointer transition-shadow hover:shadow-md ${
          isCompleted ? 'border-green-200' : ''
        }`}
        onClick={onClick}
      >
        <CardContent className="py-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{step.outline.title}</h4>
                {!step.is_required && (
                  <Badge variant="secondary" className="text-xs">
                    Optional
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                {step.outline.description}
              </p>
              {progressPercent > 0 && !isCompleted && (
                <div className="mt-2">
                  <Progress value={progressPercent} className="h-1.5" />
                  <span className="text-xs text-muted-foreground">
                    {progressPercent}% complete
                  </span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">
              <BookOpen className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Compact version for listing multiple career paths
interface CareerPathCardProps {
  careerPath: CareerPath;
  progress?: CareerPathProgress;
  onClick?: () => void;
}

export function CareerPathCard({ careerPath, progress, onClick }: CareerPathCardProps) {
  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-lg" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{careerPath.title}</CardTitle>
          <Badge variant="outline">{careerPath.steps.length} steps</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {careerPath.description}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <Target className="h-4 w-4 text-primary" />
          <span>{careerPath.target_job_role.title}</span>
        </div>
        {progress && (
          <div className="mt-3">
            <Progress value={progress.overall_percentage} className="h-2" />
            <span className="text-xs text-muted-foreground">
              {progress.overall_percentage}% complete
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
