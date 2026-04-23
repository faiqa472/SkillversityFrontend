"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const skills = [
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "django", label: "Django" },
    { value: "node", label: "Node.js" },
    { value: "rust", label: "Rust" },
    { value: "go", label: "Go" },
    { value: "aws", label: "AWS" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "data-science", label: "Data Science" },
    { value: "ui-ux", label: "UI/UX Design" },
    { value: "devops", label: "DevOps" },
];

interface SkillSelectProps {
    value?: string;
    onValueChange: (value: string) => void;
}

export function SkillSelect({ value, onValueChange }: SkillSelectProps) {
    return (
        <div className="flex items-center gap-2">
            <Select value={value} onValueChange={(val) => onValueChange(val === "all" ? "" : val)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Technology" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Technologies</SelectItem>
                    {skills.map((skill) => (
                        <SelectItem key={skill.value} value={skill.value}>
                            {skill.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
