"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Section({ id, children, className = "", fullWidth = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={`py-20 md:py-32 ${className}`}
    >
      <div
        className={
          fullWidth
            ? "px-4 md:px-8 lg:px-20"
            : "max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20"
        }
      >
        {children}
      </div>
    </motion.section>
  );
}
