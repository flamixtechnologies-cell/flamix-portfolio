"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

interface Props {
  project: Project;
  allProjects: Project[];
}

export function ProjectDetailClient({ project, allProjects }: Props) {
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
      <ProjectHero project={project} index={currentIndex} total={allProjects.length} />
      <CreditsStrip project={project} index={currentIndex} total={allProjects.length} />
      <ProjectContent project={project} />
      <NextProjectBanner project={nextProject} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — Simple static hero (no parallax)
───────────────────────────────────────────────────────────── */
function ProjectHero({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
  }) {
  return (
    <section className="relative w-full bg-tertiary px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20">
      <div className="max-w-[1920px] mx-auto grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
        {/* Text content */}
        <div className="space-y-5 sm:space-y-6">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-sans text-white/60">
            Case Study • {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </p>

          <h1
            className="font-heading font-semibold text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(28px, 3.2rem, 56px)" }}
          >
            {project.title}
          </h1>

        </div>

        {/* Image */}
        <div className="relative w-full max-w-xl lg:max-w-none lg:justify-self-end aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/5">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CREDITS STRIP — Film-style metadata bar
───────────────────────────────────────────────────────────── */
function CreditsStrip({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const items = [
    {
      label: "Project",
      value: `${String(index + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}`,
    },
    { label: "Category", value: project.category },
    { label: "Year", value: "2024" },
    { label: "Type", value: "Client Work" },
    { label: "Status", value: "Live", live: true },
  ];

  return (
    <div
      style={{
        borderTop: "1px solid rgba(26,26,29,0.07)",
        borderBottom: "1px solid rgba(26,26,29,0.07)",
      }}
    >
      <div
        ref={ref}
        className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 flex items-stretch overflow-x-auto hide-scrollbar"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col justify-center py-4 sm:py-5 shrink-0"
            style={
              i < items.length - 1
                ? {
                  paddingRight: "clamp(1rem, 4vw, 2rem)",
                  marginRight: "clamp(1rem, 4vw, 2rem)",
                  borderRight: "1px solid rgba(26,26,29,0.07)",
                }
                : {}
            }
          >
            <span
              className="uppercase font-sans mb-1 sm:mb-1.5 block text-xs sm:text-sm"
              style={{ color: "rgba(26,26,29,0.3)" }}
            >
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              {item.live && (
                <div className="relative flex h-1.5 w-1.5 shrink-0">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                </div>
              )}
              <span
                className="font-sans text-sm sm:text-base"
                style={{ color: item.live ? "#22c55e" : "rgb(26,26,29)" }}
              >
                {item.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTENT — Editorial layout
───────────────────────────────────────────────────────────── */
function ProjectContent({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-background">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-24 lg:py-32">

        {/* ── Editorial opener: full-width description + CTA ── */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 sm:gap-8 md:gap-10 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-7"
            >
              <div className="w-4 sm:w-5 h-px" style={{ backgroundColor: "var(--color-primary)" }} />
              <span
                className="text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] font-sans"
                style={{ color: "rgba(26,26,29,0.45)" }}
              >
                Overview
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading leading-[1.3] sm:leading-tight md:leading-[1.18] tracking-tight"
              style={{
                fontSize: "clamp(18px, 4vw, 22px)",
                color: "rgb(26,26,29)",
              }}
            >
              {project.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="w-full lg:w-auto"
          >
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg whitespace-nowrap w-full lg:w-auto"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
              }}
            >
              View Live
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 sm:gap-12 md:gap-16 xl:gap-20">

          {/* LEFT column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 md:mb-7"
            >
              <div className="w-4 sm:w-5 h-px" style={{ backgroundColor: "var(--color-primary)" }} />
              <span
                className="text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] font-sans"
                style={{ color: "rgba(26,26,29,0.45)" }}
              >
                Stack &amp; Methods
              </span>
            </motion.div>

            {/* Tags — flat with accent left border */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {project.tags.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans cursor-default transition-all duration-300 hover:bg-accent/30"
                  style={{
                    border: "1px solid rgba(26,26,29,0.08)",
                    borderLeft: "3px solid var(--color-primary)",
                    borderRadius: "6px",
                    color: "rgb(26,26,29)",
                  }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Sticky sidebar */}

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   NEXT PROJECT — Dark cinematic teaser
───────────────────────────────────────────────────────────── */
function NextProjectBanner({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ backgroundColor: "var(--color-foreground)" }}>
      <Link href={`/portfolio/${project.id}`} className="group block">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-14 md:pb-16 lg:pb-20">

          {/* Label row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 sm:w-4 h-px bg-white" />
              <span
                className="text-base uppercase tracking-[0.5em] font-sans text-white"
              >
                Up Next
              </span>
            </div>

            <div
              className="w-8 h-8 sm:w-10 bg-white sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300"

            >
              <ArrowRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all text-black duration-300"
              />
            </div>
          </motion.div>

          {/* Title */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14">
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "106%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-medium text-white leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(24px, 6vw, 44px)" }}
              >
                {project.title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-3 sm:mt-4 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl text-white"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Image teaser */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl"
            style={{ aspectRatio: "16/7" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              quality={80}
              sizes="(max-width: 768px) 100vw, 1400px"
            />
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
