"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface HeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function Heading({ title, subtitle, centered = true, className = "" }: HeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <motion.h2
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading"
      >
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
