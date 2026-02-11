"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function DoodleArrow(props: React.SVGProps<SVGSVGElement>) {
  // More organic curve, closer to Ottr feel
  return (
    <svg viewBox="0 0 240 140" fill="none" {...props}>
      <path
        d="M12 64c62 44 120 52 182 34"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M178 92c14-1 26-7 38-18"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M205 112c1-14 4-28 11-41"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Grain() {
  // Tiny grain overlay for premium “paper” texture
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

const easeOutExpo: any = [0.16, 1, 0.3, 1];

export default function CTA() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* Warm paper tint + soft ambient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            // warm paper wash (subtle)
            "radial-gradient(900px 520px at 70% 60%, rgba(0,0,0,0.03), transparent 62%)," +
            "radial-gradient(900px 600px at 22% 35%, rgba(0,0,0,0.02), transparent 60%)," +
            // slight warm tint overlay (theme-safe)
            "linear-gradient(180deg, rgba(255,170,120,0.06), rgba(255,170,120,0.00) 55%)",
        }}
      />
      <Grain />

      <div className="relative mx-auto max-w-[1920px] px-4 md:px-8 lg:px-20">

        {/* Main hero area */}
        <div className="pb-16 md:pb-24 pt-14 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-16">
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.05, ease: easeOutExpo }}
            >
              <h1 className="font-heading tracking-tight text-primary text-[46px] leading-[0.98] sm:text-[64px] sm:leading-[0.98] lg:text-[86px] lg:leading-[0.96]">
                Let’s build something
                <br />
                <span className="inline-block">extraordinary.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-foreground/60">
                Strategy, design, and engineering — aligned around a single goal:
                shipping a product that feels premium and performs.
              </p>
            </motion.div>

            {/* Right: CTA panel */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: easeOutExpo }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              {/* Hand-drawn arrow into the panel */}
              <DoodleArrow className="absolute -left-45 top-1/3 hidden -translate-y-1/2 text-foreground/55 lg:block h-28 w-60" />

              <Link href="/contact" className="group relative block w-full max-w-md">
                {/* Glow blobs */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[30px] bg-gradient-to-br from-primary/15 via-transparent to-sky-400/10 blur-2"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-primary/15 blur-3"
                />

                {/* Card */}
                <div
                  className={[
                    "relative overflow-hidden rounded-[26px] border border-foreground/8",
                    "bg-gradient-to-br from-background/90 via-background to-background/90",
                    "backdrop-blur-xl ",
                    "px-6 py-5 sm:px-7 sm:py-6",
                    "transition-all duration-300",
                  ].join(" ")}
                >


                  {/* Main copy */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-foreground/70">
                      From first call to live product in{" "}
                      <span className="font-semibold text-foreground">6–8 weeks.</span>
                    </div>
                    <div className="text-[13px] leading-relaxed text-foreground/55">
                      Strategy, UX, UI, and engineering in one tight unit. You get a small team
                      that ships, not a big agency that drifts.
                    </div>
                  </div>

                  {/* Stats + primary action */}
                  <div className="mt-5 flex flex-col gap-4 border-t border-dashed border-foreground/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-semibold text-foreground">18+</div>
                      <div>Products launched</div>
                    </div>


                    <button
                      type="button"
                      className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      <span className="text-white">Plan a 20‑min call</span>

                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom mini line (keep minimal) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.22, ease: easeOutExpo }}
            className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-5 text-sm text-foreground/55"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary/80" />
              Fast turnaround
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary/80" />
              Premium UI + performance
            </span>


          </motion.div>
        </div>
      </div>
    </main>
  );
}
