"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TextRevealChars } from "@/components/ui/TextReveal";

interface SectionHeadingProps {
  title: string;
  description?: string;
  number?: string;
  className?: string;
  darkMode?: boolean;
}

export function SectionHeading({
  title,
  description,
  number,
  className = "",
  darkMode = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-start lg:items-start justify-between gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-10 ${className}`}
    >
      {/* Left Side - Heading */}
      <div className="flex-1 lg:max-w-[55%]">
        {/* Title with Number */}
        <div className="relative">
          {number && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`absolute left-0 -top-6 md:-top-8 text-[80px] md:text-[120px] font-bold leading-none select-none font-heading ${darkMode ? "text-white/5" : "text-foreground/5"
                }`}
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {number}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`relative text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium font-heading leading-[1.1] tracking-tight no-underline ${darkMode ? "text-white" : "text-foreground"
              }`}
            style={{ textDecoration: "none", borderBottom: "none" }}
          >
              <TextRevealChars delay={0.3} className="no-underline">
                {title}
              </TextRevealChars>
          </motion.h2>
        </div>
      </div>

      {/* Right Side - Description */}
      {description && (
        <div className="flex-1 lg:max-w-[40%] flex flex-col gap-6 lg:pt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-xs md:text-sm leading-relaxed font-light max-w-md uppercase tracking-wider ${darkMode ? "text-white/60" : "text-[#6B6B6B]"
              }`}
          >
            {description}
          </motion.p>
        </div>
      )}
    </div>
  );
}
