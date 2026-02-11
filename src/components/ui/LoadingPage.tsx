"use client";

import { useEffect, useState } from "react";

export function LoadingPage() {
    const [progress, setProgress] = useState(0);
    const [currentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Simulate loading progress - guaranteed to reach 100%
        const duration = 4000; // 4 seconds total
        const steps = 100;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="fixed inset-0 overflow-hidden select-none">
            {/* Simple background */}
            <div className="absolute inset-0 bg-background" />
            {/* Subtle gradient only on the right side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-primary/8 via-primary/3 to-transparent" />

            {/* Company name in background - big and low opacity */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-[clamp(8rem,25vw,20rem)] font-heading font-bold text-primary/5 select-none pointer-events-none tracking-tight leading-none">
                    FLAMIX
                </h1>
            </div>

            {/* Main vertical loading bar - thin line, 80vh height, loads top to bottom */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80vh] w-px">
                {/* Background track */}
                <div className="absolute inset-0 bg-foreground/10" />
                {/* Progress bar - loads from top to bottom */}
                <div
                    className="absolute top-0 left-0 right-0 bg-primary transition-all duration-300 ease-out"
                    style={{ height: `${progress}%` }}
                />
            </div>

            {/* Logo - positioned on the left side with proper background blending */}
            <div className="absolute left-8 top-8 md:left-12 md:top-12 flex items-center justify-center z-10">
                <div className="relative">
                    <img
                        src="/logo/logo_icon.png"
                        alt="Flamix Technologies"
                        className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-80 mix-blend-soft-light"
                    />
                    {/* Subtle backdrop blur for seamless blending */}
                    <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] rounded-lg -z-10" />
                </div>
            </div>

            {/* Progress percentage - centered with theme color */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-lg md:text-xl tracking-wider font-light z-10">
                <span className="text-primary drop-shadow-[0_0_15px_rgba(122,28,172,0.8)]">
                    {Math.round(progress)}%
                </span>
            </div>



            {/* Bottom right: Copyright */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-foreground/70 font-mono text-[10px] md:text-xs tracking-[0.15em] font-light">
                © {currentYear}
            </div>




        </div>
    );
}
