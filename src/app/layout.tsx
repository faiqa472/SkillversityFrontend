import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillVersity - Unlock Pakistan's Youth Potential",
  description:
    "An AI-powered platform connecting Pakistani professionals with industry-vetted tutors and companies, offering personalized learning pathways and trusted skill verification.",
  keywords: [
    "education",
    "learning",
    "skills",
    "Pakistan",
    "tech",
    "AI",
    "career",
    "portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
