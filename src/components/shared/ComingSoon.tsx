"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Rocket, Construction, Sparkles, Check } from "lucide-react";
import { useState } from "react";

interface ComingSoonProps {
    title?: string;
    description?: string;
    featureName?: string;
    eta?: string;
}

export function ComingSoon({
    title = "Building Something Amazing",
    description = "We are currently crafting this experience. Stay tuned for updates!",
    featureName,
    eta,
}: ComingSoonProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleNotify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-muted/10 rounded-xl border border-dashed border-border/60">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg space-y-6"
            >
                <div className="relative inline-block">
                    <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
                    <div className="relative h-20 w-20 mx-auto bg-card rounded-2xl border shadow-lg flex items-center justify-center">
                        <Construction className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <Badge className="absolute -top-2 -right-6 animate-bounce" variant="secondary">
                        <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                        Coming Soon
                    </Badge>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {description}
                    </p>
                    {featureName && (
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                            <Badge variant="outline" className="font-mono">
                                {featureName}
                            </Badge>
                            {eta && <span>• ETA: {eta}</span>}
                        </div>
                    )}
                </div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-4 text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                        <Check className="w-8 h-8 mb-2" />
                        <p className="font-semibold">You're on the list!</p>
                        <p className="text-sm">We'll notify {email} when it's ready.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleNotify} className="flex gap-2 max-w-sm mx-auto pt-4">
                        <div className="relative flex-1">
                            <Bell className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-9 bg-background/50 backdrop-blur-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="gap-2">
                            {loading ? (
                                "..."
                            ) : (
                                <>
                                    Notify Me <Rocket className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
