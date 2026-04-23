"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const roles = [
    { value: "frontend-dev", label: "Frontend Developer" },
    { value: "backend-dev", label: "Backend Developer" },
    { value: "fullstack-dev", label: "Full Stack Developer" },
    { value: "devops-engineer", label: "DevOps Engineer" },
    { value: "data-scientist", label: "Data Scientist" },
    { value: "ai-engineer", label: "AI Engineer" },
    { value: "mobile-dev", label: "Mobile Developer" },
    { value: "product-manager", label: "Product Manager" },
    { value: "ui-ux-designer", label: "UI/UX Designer" },
    { value: "qa-engineer", label: "QA Engineer" },
];

interface JobRoleSelectProps {
    value?: string;
    onValueChange: (value: string) => void;
}

export function JobRoleSelect({ value, onValueChange }: JobRoleSelectProps) {
    return (
        <Select value={value} onValueChange={(val) => onValueChange(val === "all" ? "" : val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Job Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                        {role.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
