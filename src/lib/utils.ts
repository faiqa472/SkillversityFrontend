import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a localized string
 * @param date - Date to format
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale: string = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Format a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'PKR')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = "PKR"): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncate(text: string, length: number): string {
  return text.length > length ? `${text.substring(0, length)}...` : text;
}
