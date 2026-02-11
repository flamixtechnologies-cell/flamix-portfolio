"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { number: "100+", label: "Projects" },
  { number: "50+", label: "Clients" },
  { number: "5+", label: "Years" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32"
      style={{
        backgroundColor: "var(--color-background)",
      }}
    >
      <div className="relative max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20">
        {/* Header */}
        <SectionHeading
          title="About Flamix Technologies"
          description="We're a team of passionate technologists dedicated to building digital solutions that drive real business results."
          number="03"
        />

        {/* Main Content */}
        <div ref={contentRef} className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Story Text - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <p className="text-lg md:text-xl leading-relaxed text-foreground/70">
                Founded with a vision to bridge the gap between innovative technology and business success, Flamix Technologies has been at the forefront of digital transformation for businesses of all sizes.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70">
                We combine deep technical expertise with strategic thinking to deliver solutions that don't just work—they transform how you do business. From startups looking to make their mark to enterprises seeking to modernize their operations, we've helped countless companies achieve their digital goals.
              </p>
            </motion.div>

            {/* Stats - Takes 1 column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="border-l-2 pl-6"
                  style={{ borderColor: "var(--color-primary)" }}
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold mb-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-foreground/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: "rgba(122, 28, 172, 0.85)" }}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              View Our Work →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
