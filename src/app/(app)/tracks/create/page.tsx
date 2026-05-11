"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TechnologySelect } from "@/components/features/tracks";
import { tracksApi } from "@/lib/tracks-api";
import { useRole } from "@/hooks/useRole";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  Compass,
  GripVertical,
} from "lucide-react";
import Link from "next/link";

interface ModuleInput {
  title: string;
  description: string;
  module_type: "learning" | "project" | "assessment" | "resource" | "milestone";
  estimated_duration_minutes: number;
  learning_objectives: string[];
}

export default function CreateTrackPage() {
  const router = useRouter();
  const { isTutor, isCompany } = useRole();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [primaryTechnology, setPrimaryTechnology] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [trackType, setTrackType] = useState(isCompany ? "official" : "tutor");
  const [organizationName, setOrganizationName] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [durationHours, setDurationHours] = useState(40);
  const [isOpenPath, setIsOpenPath] = useState(true);
  const [modules, setModules] = useState<ModuleInput[]>([]);
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const addModule = () => {
    setModules([
      ...modules,
      {
        title: "",
        description: "",
        module_type: "learning",
        estimated_duration_minutes: 30,
        learning_objectives: [],
      },
    ]);
  };

  const updateModule = (
    index: number,
    field: keyof ModuleInput,
    value: any,
  ) => {
    const updated = [...modules];
    updated[index] = { ...updated[index], [field]: value };
    setModules(updated);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag && !skillTags.includes(newTag)) {
      setSkillTags([...skillTags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !primaryTechnology ||
      primaryTechnology === "all"
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const track = await tracksApi.create({
        title,
        description,
        short_description: shortDescription,
        primary_technology: primaryTechnology,
        skill_tags: skillTags,
        track_type: trackType as any,
        difficulty_level: difficulty as any,
        organization_name: organizationName,
        estimated_duration_hours: durationHours,
        estimated_duration_weeks: durationWeeks,
        is_open_path: isOpenPath,
        modules: modules.map((m, i) => ({
          ...m,
          order: i,
          content: (m as any).content ?? {},
          external_links: (m as any).external_links ?? [],
          is_optional: (m as any).is_optional ?? false,
        })),
      });
      router.push(`/tracks/${track.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create track");
    } finally {
      setLoading(false);
    }
  };

  if (!isTutor && !isCompany) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Compass className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Become a Contributor</h2>
        <p className="text-muted-foreground mb-4">
          Only tutors and companies can create tracks.
        </p>
        <Button asChild>
          <Link href="/tutor/apply">Apply as Tutor</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/tracks">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tracks
        </Link>
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Create Learning Track</h1>
        <p className="text-muted-foreground">
          Share your learning path with the community
        </p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Describe your learning track</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Track Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Complete React Developer Path"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDesc">Short Description</Label>
              <Input
                id="shortDesc"
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
                placeholder="Brief one-liner about this track"
                maxLength={300}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Detailed description of what learners will achieve..."
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Technology & Classification */}
        <Card>
          <CardHeader>
            <CardTitle>Classification</CardTitle>
            <CardDescription>Help learners find your track</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary Technology *</Label>
                <TechnologySelect
                  value={primaryTechnology}
                  onValueChange={setPrimaryTechnology}
                  placeholder="Select main technology"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="all">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Track Type</Label>
                <Select value={trackType} onValueChange={setTrackType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {isCompany && (
                      <SelectItem value="official">
                        Official (Company)
                      </SelectItem>
                    )}
                    {isTutor && (
                      <SelectItem value="tutor">Tutor Created</SelectItem>
                    )}
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {trackType === "official" && (
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input
                    value={organizationName}
                    onChange={e => setOrganizationName(e.target.value)}
                    placeholder="Your company/organization name"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Skill Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  placeholder="Add skill tag"
                  onKeyDown={e =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>
              {skillTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillTags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() =>
                        setSkillTags(skillTags.filter(t => t !== tag))
                      }
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Duration & Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Duration & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Estimated Duration (weeks)</Label>
                <Input
                  type="number"
                  min={1}
                  value={durationWeeks}
                  onChange={e =>
                    setDurationWeeks(parseInt(e.target.value) || 1)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Total Hours</Label>
                <Input
                  type="number"
                  min={1}
                  value={durationHours}
                  onChange={e =>
                    setDurationHours(parseInt(e.target.value) || 1)
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Open Path</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anyone to view without following
                </p>
              </div>
              <Switch checked={isOpenPath} onCheckedChange={setIsOpenPath} />
            </div>
          </CardContent>
        </Card>

        {/* Modules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Modules</CardTitle>
                <CardDescription>
                  Break down your track into learning modules
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addModule}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <p>No modules yet. Add your first module to get started.</p>
              </div>
            ) : (
              modules.map((module, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Module {index + 1}
                    </span>
                    <div className="flex-1" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeModule(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      placeholder="Module title"
                      value={module.title}
                      onChange={e =>
                        updateModule(index, "title", e.target.value)
                      }
                    />
                    <Select
                      value={module.module_type}
                      onValueChange={v => updateModule(index, "module_type", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="learning">
                          Learning Content
                        </SelectItem>
                        <SelectItem value="project">
                          Hands-on Project
                        </SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="resource">
                          External Resource
                        </SelectItem>
                        <SelectItem value="milestone">Milestone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Module description"
                    value={module.description}
                    onChange={e =>
                      updateModule(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Duration (min):</Label>
                    <Input
                      type="number"
                      className="w-24"
                      min={5}
                      value={module.estimated_duration_minutes}
                      onChange={e =>
                        updateModule(
                          index,
                          "estimated_duration_minutes",
                          parseInt(e.target.value) || 30,
                        )
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" asChild>
            <Link href="/tracks">Cancel</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Track
          </Button>
        </div>
      </form>
    </div>
  );
}
