'use client';

/**
 * VersionHistory Component
 * Display version history with diff comparison
 */

import { useState } from 'react';
import { useVersionHistory, useVersionDiff } from '@/hooks/useOutlines';
import { OutlineVersion } from '@/types/outlines';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  History,
  GitCompare,
  RotateCcw,
  Loader2,
  Plus,
  Minus,
  Edit,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { versionsApi } from '@/lib/outlines-api';

interface VersionHistoryProps {
  outlineId: string;
  onRevert?: (versionId: string) => void;
}

export function VersionHistory({ outlineId, onRevert }: VersionHistoryProps) {
  const { versions, loading, error, refetch } = useVersionHistory(outlineId);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      }
      if (prev.length >= 2) {
        return [prev[1], versionId];
      }
      return [...prev, versionId];
    });
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      setComparing(true);
    }
  };

  const handleRevert = async (versionId: string) => {
    try {
      await versionsApi.revert(outlineId, versionId);
      refetch();
      onRevert?.(versionId);
    } catch (error) {
      console.error('Failed to revert:', error);
    }
  };

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <History className="h-5 w-5" />
          Version History
        </h3>
        {selectedVersions.length === 2 && (
          <Button onClick={handleCompare} variant="outline" size="sm">
            <GitCompare className="h-4 w-4 mr-2" />
            Compare Selected
          </Button>
        )}
      </div>

      {comparing && selectedVersions.length === 2 && (
        <VersionDiffView
          outlineId={outlineId}
          versionAId={selectedVersions[0]}
          versionBId={selectedVersions[1]}
          onClose={() => setComparing(false)}
        />
      )}

      <div className="space-y-2">
        {versions.map((version) => (
          <VersionCard
            key={version.id}
            version={version}
            isSelected={selectedVersions.includes(version.id)}
            onSelect={() => handleVersionSelect(version.id)}
            onRevert={() => handleRevert(version.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface VersionCardProps {
  version: OutlineVersion;
  isSelected: boolean;
  onSelect: () => void;
  onRevert: () => void;
}

function VersionCard({ version, isSelected, onSelect, onRevert }: VersionCardProps) {
  return (
    <Card className={`transition-colors ${isSelected ? 'border-primary' : ''}`}>
      <CardContent className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">v{version.version_number}</Badge>
                <span className="font-medium">{version.change_description}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                by {version.author?.name || version.author?.email} •{' '}
                {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onRevert}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Revert
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface VersionDiffViewProps {
  outlineId: string;
  versionAId: string;
  versionBId: string;
  onClose: () => void;
}

function VersionDiffView({ outlineId, versionAId, versionBId, onClose }: VersionDiffViewProps) {
  const { diff, loading, error } = useVersionDiff(outlineId, versionAId, versionBId);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error || !diff) {
    return (
      <Card>
        <CardContent className="py-4 text-destructive">
          Failed to load diff
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Version Comparison</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {diff.additions.length > 0 && (
          <div>
            <h4 className="font-medium text-green-600 flex items-center gap-1 mb-2">
              <Plus className="h-4 w-4" />
              Additions ({diff.additions.length})
            </h4>
            <div className="space-y-1">
              {diff.additions.map((item, i) => (
                <div key={i} className="bg-green-50 p-2 rounded text-sm">
                  {item.type}: {JSON.stringify(item.data)}
                </div>
              ))}
            </div>
          </div>
        )}

        {diff.deletions.length > 0 && (
          <div>
            <h4 className="font-medium text-red-600 flex items-center gap-1 mb-2">
              <Minus className="h-4 w-4" />
              Deletions ({diff.deletions.length})
            </h4>
            <div className="space-y-1">
              {diff.deletions.map((item, i) => (
                <div key={i} className="bg-red-50 p-2 rounded text-sm">
                  {item.type}: {JSON.stringify(item.data)}
                </div>
              ))}
            </div>
          </div>
        )}

        {diff.modifications.length > 0 && (
          <div>
            <h4 className="font-medium text-yellow-600 flex items-center gap-1 mb-2">
              <Edit className="h-4 w-4" />
              Modifications ({diff.modifications.length})
            </h4>
            <div className="space-y-2">
              {diff.modifications.map((mod, i) => (
                <div key={i} className="bg-yellow-50 p-2 rounded text-sm">
                  <div className="font-medium">{mod.field || mod.type}</div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="bg-red-100 p-1 rounded">
                      <span className="text-xs text-red-600">Old:</span>
                      <div>{JSON.stringify(mod.old)}</div>
                    </div>
                    <div className="bg-green-100 p-1 rounded">
                      <span className="text-xs text-green-600">New:</span>
                      <div>{JSON.stringify(mod.new)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {diff.additions.length === 0 && diff.deletions.length === 0 && diff.modifications.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No differences found between these versions
          </p>
        )}
      </CardContent>
    </Card>
  );
}
