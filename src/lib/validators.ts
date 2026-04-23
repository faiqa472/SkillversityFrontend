import { z } from "zod";

/**
 * Zod Validation Schemas
 * All form and Server Action inputs must be validated using these schemas.
 */

/**
 * Authentication Schemas
 */
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["general", "learner", "tutor", "company", "sponsor"], {
    required_error: "Please select a role",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/**
 * Course Schemas
 */
export const createCourseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  thumbnail: z.string().url().optional(),
});

export const createModuleSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  videoUrl: z.string().url().optional(),
  documentation: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
});

/**
 * Project Schemas
 */
export const createProjectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  repositoryUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});

/**
 * Article Schemas
 */
export const createArticleSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  coAuthorIds: z.array(z.string()).optional(),
});

/**
 * Job Posting Schemas
 */
export const createJobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.array(z.string()).min(1, "At least one requirement is needed"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["full-time", "part-time", "contract", "internship"]),
  salary: z
    .object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    })
    .optional(),
});

/**
 * Scholarship Schemas
 */
export const createScholarshipSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  currency: z.string().default("PKR"),
  eligibilityCriteria: z.array(z.string()).min(1, "At least one criterion is required"),
  applicationDeadline: z.date(),
});

/**
 * Type exports for form data
 */
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type CreateScholarshipInput = z.infer<typeof createScholarshipSchema>;
