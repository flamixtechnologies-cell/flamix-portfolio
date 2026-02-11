"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { easings } from "@/lib/scroll-animations";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

// Split text with blur reveal
export function TextRevealBlur({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.5,
        ease: easings.smooth,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`inline-flex flex-wrap gap-x-2 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface TextRevealCharsProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  stagger?: number;
  highlightChars?: string[];
  highlightClassName?: string;
}

// Character-by-character reveal (letters appear one by one)
export function TextRevealChars({
  children,
  className = "",
  delay = 0,
  once = true,
  stagger = 0.03,
  highlightChars,
  highlightClassName = "text-primary",
}: TextRevealCharsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const chars = Array.from(children);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: easings.smooth,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`inline-flex flex-wrap ${className}`}
    >
      {chars.map((char, index) => {
        // Preserve spaces while still allowing stagger animations
        if (char === " ") {
          return (
            <span key={index} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <motion.span
            key={index}
            variants={charVariants}
            className={`inline-block ${
              highlightChars && highlightChars.includes(char) ? highlightClassName : ""
            }`}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

// Slanted reveal with rotation (like Apple's reveal animations)
export function TextRevealSlant({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateZ: -15,
      rotateX: -60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easings.dramatic,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`inline-flex flex-wrap gap-x-2 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block" style={{ perspective: "1000px" }}>
          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
