"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { outlinesApi } from "@/lib/outlines-api";
import { useRole } from "@/hooks/useRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";

const outlineSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  estimated_duration: z.string().min(1, "Duration is required"),
  skill_tags: z.array(z.string()).min(1, "Add at least one skill tag"),
});

type OutlineFormData = z.infer<typeof outlineSchema>;

export default function CreateOutlinePage() {
  const router = useRouter();
  const { isTutor, isCompany } = useRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<OutlineFormData>({
    resolver: zodResolver(outlineSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty_level: "beginner",
      estimated_duration: "",
      skill_tags: [],
    },
  });

  const skillTags = form.watch("skill_tags");

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !skillTags.includes(tag)) {
      form.setValue("skill_tags", [...skillTags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "skill_tags",
      skillTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data: OutlineFormData) => {
    setIsSubmitting(true);
    try {
      const outline = await outlinesApi.create({
        ...data,
        author_type: isCompany ? "company" : "tutor",
      });
      router.push(`/learning-paths/${outline.id}`);
    } catch (err) {
      console.error("Failed to create outline:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if user can't create outlines
  if (!isTutor && !isCompany) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <h3 className="text-lg font-semibold">Permission Denied</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Only tutors and companies can create learning outlines.
          </p>
          <Button className="mt-4" onClick={() => router.push("/learning-paths")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Paths
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push("/learning-paths")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Outlines
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Learning Outline</CardTitle>
          <CardDescription>
            Define a new curriculum that others can learn from and contribute to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Full-Stack Web Development"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A clear, descriptive title for your learning outline.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what students will achieve..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain the goals, target audience, and what makes this
                      outline valuable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="difficulty_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estimated_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="skill_tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Skill Tags</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button type="button" variant="secondary" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {skillTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skillTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormDescription>
                      Add relevant skills that this outline covers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/learning-paths")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Create Outline
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
