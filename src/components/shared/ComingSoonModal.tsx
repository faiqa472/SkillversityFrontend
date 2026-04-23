"use client";

import React from "react";
import { X, Rocket, Bell } from "lucide-react";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    featureName?: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
    isOpen,
    onClose,
    featureName = "This feature",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-md p-6 overflow-hidden bg-card border border-border rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    <div className="p-4 bg-primary/10 rounded-full ring-4 ring-primary/5">
                        <Rocket className="w-8 h-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight">Coming Soon!</h3>
                        <p className="text-muted-foreground">
                            <span className="font-semibold text-foreground">{featureName}</span> is currently under development. We're working hard to bring you this amazing learning experience.
                        </p>
                    </div>

                    <div className="w-full pt-4">
                        <button
                            onClick={onClose}
                            className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            <Bell className="w-4 h-4 group-hover:animate-bounce" />
                            Notify me when available
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonModal;
