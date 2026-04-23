"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Code, Layers, Database, Wrench, Cloud, BookOpen } from "lucide-react";
import { useCategories, useTechnologies } from "@/hooks/useTracks";
import { cn } from "@/lib/utils";

interface TechnologySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const techTypeIcons: Record<string, React.ReactNode> = {
  language: <Code className="h-3.5 w-3.5" />,
  framework: <Layers className="h-3.5 w-3.5" />,
  library: <BookOpen className="h-3.5 w-3.5" />,
  database: <Database className="h-3.5 w-3.5" />,
  tool: <Wrench className="h-3.5 w-3.5" />,
  platform: <Cloud className="h-3.5 w-3.5" />,
};

export function TechnologySelect({
  value,
  onValueChange,
  placeholder = "Select technology...",
  className,
}: TechnologySelectProps) {
  const [search, setSearch] = useState("");
  const { categories, loading: categoriesLoading } = useCategories();
  const { technologies, loading: techLoading } = useTechnologies({ search });

  const loading = categoriesLoading || techLoading;

  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    const categoryName = tech.category?.name || "Other";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-[200px]", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {/* Search Input */}
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* All option */}
            <SelectItem value="all">All Technologies</SelectItem>

            {/* Trending */}
            {technologies.some((t) => t.is_trending) && (
              <SelectGroup>
                <SelectLabel className="flex items-center gap-1.5">
                  <Badge variant="secondary" className="text-xs">Trending</Badge>
                </SelectLabel>
                {technologies
                  .filter((t) => t.is_trending)
                  .slice(0, 5)
                  .map((tech) => (
                    <SelectItem key={tech.id} value={tech.slug}>
                      <div className="flex items-center gap-2">
                        {techTypeIcons[tech.tech_type] || <Code className="h-3.5 w-3.5" />}
                        <span>{tech.name}</span>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {tech.tracks_count}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
              </SelectGroup>
            )}

            {/* Grouped by Category */}
            {Object.entries(groupedTechnologies).map(([category, techs]) => (
              <SelectGroup key={category}>
                <SelectLabel>{category}</SelectLabel>
                {techs.slice(0, 10).map((tech) => (
                  <SelectItem key={tech.id} value={tech.slug}>
                    <div className="flex items-center gap-2">
                      {techTypeIcons[tech.tech_type] || <Code className="h-3.5 w-3.5" />}
                      <span>{tech.name}</span>
                      {tech.tracks_count > 0 && (
                        <Badge variant="outline" className="text-xs ml-auto">
                          {tech.tracks_count}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
}
