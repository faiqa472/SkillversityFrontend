'use client';

/**
 * ChangeRequestList Component
 * Display list of change requests with status badges
 */

import { useChangeRequests } from '@/hooks/useOutlines';
import { ChangeRequest, ChangeRequestStatus } from '@/types/outlines';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GitPullRequest,
  GitMerge,
  XCircle,
  Clock,
  CheckCircle,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChangeRequestListProps {
  outlineId?: string;
  onSelectChangeRequest?: (id: string) => void;
}

const statusConfig: Record<ChangeRequestStatus, { label: string; color: string; icon: React.ReactNode }> = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-800', icon: <GitPullRequest className="h-4 w-4" /> },
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4" /> },
  changes_requested: { label: 'Changes Requested', color: 'bg-orange-100 text-orange-800', icon: <MessageSquare className="h-4 w-4" /> },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
  merged: { label: 'Merged', color: 'bg-purple-100 text-purple-800', icon: <GitMerge className="h-4 w-4" /> },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: <XCircle className="h-4 w-4" /> },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: <XCircle className="h-4 w-4" /> },
};

export function ChangeRequestList({ outlineId, onSelectChangeRequest }: ChangeRequestListProps) {
  const { changeRequests, loading, error } = useChangeRequests({ outline: outlineId });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    );
  }

  if (changeRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <GitPullRequest className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No change requests</h3>
        <p className="text-muted-foreground">
          Be the first to suggest improvements!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {changeRequests.map((cr) => (
        <ChangeRequestCard
          key={cr.id}
          changeRequest={cr}
          onClick={() => onSelectChangeRequest?.(cr.id)}
        />
      ))}
    </div>
  );
}

interface ChangeRequestCardProps {
  changeRequest: ChangeRequest;
  onClick?: () => void;
}

function ChangeRequestCard({ changeRequest, onClick }: ChangeRequestCardProps) {
  const status = statusConfig[changeRequest.status];

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {status.icon}
            <CardTitle className="text-base">{changeRequest.title}</CardTitle>
          </div>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {changeRequest.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            by {changeRequest.contributor?.name || changeRequest.contributor?.email}
          </span>
          <span>
            {formatDistanceToNow(new Date(changeRequest.created_at), { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {changeRequest.reviews?.filter(r => r.status === 'approved').length || 0} approvals
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {changeRequest.comments?.length || 0} comments
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
