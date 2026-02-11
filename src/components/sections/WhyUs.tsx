"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const differences = [
    {
        others: "Generic templates and one-size-fits-all solutions",
        us: "Bespoke solutions tailored to your unique business needs",
        keyword: "Custom",
    },
    {
        others: "Slow response times and delayed project delivery",
        us: "Lightning-fast turnaround with agile development",
        keyword: "Speed",
    },
    {
        others: "Vague metrics and unclear ROI tracking",
        us: "Data-driven strategies with transparent results",
        keyword: "Results",
    },
    {
        others: "Distant teams with limited communication",
        us: "Dedicated partners as an extension of your team",
        keyword: "Partnership",
    },
    {
        others: "Limited experience across industries",
        us: "Proven track record from startups to enterprise",
        keyword: "Experience",
    },
    {
        others: "Fragmented services requiring multiple vendors",
        us: "End-to-end solutions from concept to deployment",
        keyword: "Complete",
    },
];

function DifferenceListItem({
    item,
    index,
    isDark,
}: {
    item: (typeof differences)[0];
    index: number;
    isDark: boolean;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, margin: "-30px" });
    const number = String(index + 1).padStart(2, "0");

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative"
        >
            <div
                className="flex items-start gap-4 py-5 border-b last:border-b-0"
                style={{
                    borderColor: isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.08)",
                    transition: "border-color 0.8s ease-in-out",
                }}
            >
                {/* Faded Number */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{
                        duration: 0.4,
                        delay: index * 0.08 + 0.15,
                    }}
                    className="relative shrink-0"
                >
                    <span
                        className="text-4xl md:text-5xl font-bold leading-none select-none font-heading"
                        style={{
                            color: isDark
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(0, 0, 0, 0.05)",
                            transition: "color 0.8s ease-in-out",
                            fontFeatureSettings: '"tnum"',
                        }}
                    >
                        {number}
                    </span>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Keyword label */}
                    <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block"
                        style={{
                            color: isDark
                                ? "#AD49E1"
                                : "var(--color-primary)",
                            transition: "color 0.8s ease-in-out",
                        }}
                    >
                        {item.keyword}
                    </motion.span>

                    {/* Others vs Us - inline comparison */}
                    <div className="space-y-1.5">
                        <p
                            className="text-sm leading-relaxed line-through decoration-1"
                            style={{
                                color: isDark
                                    ? "rgba(255, 255, 255, 0.35)"
                                    : "rgba(0, 0, 0, 0.4)",
                                textDecorationColor: isDark
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : "rgba(0, 0, 0, 0.2)",
                                transition: "color 0.8s ease-in-out, text-decoration-color 0.8s ease-in-out",
                            }}
                        >
                            {item.others}
                        </p>
                        <p
                            className="text-[15px] leading-relaxed font-medium"
                            style={{
                                color: isDark ? "#ffffff" : "var(--color-neutral-900, #171717)",
                                transition: "color 0.8s ease-in-out",
                            }}
                        >
                            {item.us}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function WhyUs() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const [isDark, setIsDark] = useState(false);

    // Use rAF-based scroll listener for instant response with throttling
    useEffect(() => {
        let rafId: number | null = null;
        let lastValue = 0;

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (rafId) return; // Throttle updates

            rafId = requestAnimationFrame(() => {
                if (Math.abs(latest - lastValue) > 0.05) { // Only update if significant change
                    setIsDark(latest > 0.2);
                    lastValue = latest;
                }
                rafId = null;
            });
        });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            unsubscribe();
        };
    }, [scrollYProgress]);

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

    // Split differences into two columns of 3
    const leftColumn = differences.slice(0, 3);
    const rightColumn = differences.slice(3, 6);

    return (
        <section
            ref={sectionRef}
            id="why-us"
            className="relative min-h-screen flex flex-col overflow-hidden rounded-3xl"
            style={{
                backgroundColor: isDark
                    ? "var(--color-tertiary, #2E073F)"
                    : "#ffffff",
                transition: "background-color 1s ease-in-out",
            }}
        >
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{
                        y: y1,
                        backgroundColor: isDark
                            ? "rgba(173, 73, 225, 0.08)"
                            : "rgba(122, 28, 172, 0.06)",
                        transition: "background-color 1s ease-in-out",
                    }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[100px]"
                />
                <motion.div
                    style={{
                        y: y2,
                        backgroundColor: isDark
                            ? "rgba(122, 28, 172, 0.06)"
                            : "rgba(173, 73, 225, 0.04)",
                        transition: "background-color 1s ease-in-out",
                    }}
                    className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px]"
                />

                <div
                    className="absolute inset-0"
                    style={{
                        opacity: isDark ? 0.02 : 0.03,
                        backgroundImage: `linear-gradient(${isDark ? "white" : "black"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "white" : "black"} 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                        transition: "opacity 1s ease-in-out",
                    }}
                />
            </div>

            <div className="relative max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 flex-1 flex flex-col justify-center py-24 md:py-32">
                {/* Header */}
                <SectionHeading
                    title="Why Choose Us"
                    description="See what sets us apart from traditional agencies. We build partnerships that drive real results."
                    number="02"
                    darkMode={isDark}
                />

                {/* Differences - 2 column grid (3 items each) on desktop, single column on mobile */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16">
                    {/* Left Column */}
                    <div>
                        {leftColumn.map((item, index) => (
                            <DifferenceListItem
                                key={index}
                                item={item}
                                index={index}
                                isDark={isDark}
                            />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div>
                        {rightColumn.map((item, index) => (
                            <DifferenceListItem
                                key={index + 3}
                                item={item}
                                index={index + 3}
                                isDark={isDark}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}