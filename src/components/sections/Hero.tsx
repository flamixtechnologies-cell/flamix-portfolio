"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextRevealChars } from "@/components/ui/TextReveal";

const services = [
  "WEB DEVELOPMENT",
  "DIGITAL MARKETING",
  "SOCIAL MEDIA MANAGEMENT",
  "SEO & CONTENT STRATEGY",
  "E-COMMERCE SOLUTIONS",
  "CUSTOM SOFTWARE DEVELOPMENT",
];

function HeroComponent() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden -mt-[84px] md:-mt-[90px]">
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col lg:flex-row items-start lg:items-start justify-between px-6 md:px-12 lg:px-16 xl:px-24 pt-24 lg:pt-32 pb-8 gap-12 lg:gap-8 max-w-[1920px] mx-auto">
        {/* Left Side - Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl flex flex-col items-start justify-start xl:text-7xl font-medium tracking-tight text-foreground leading-[1.1]"
          >
            <div className="flex flex-col lg:flex-row">
              <TextRevealChars className="mr-2" delay={0.1} highlightChars={["D"]}>
                DESIGN.
              </TextRevealChars>
              <TextRevealChars delay={0.4} highlightChars={["D"]}>
                DEVELOP.
              </TextRevealChars>
            </div>
            <TextRevealChars delay={0.7} highlightChars={["D"]}>
              DOMINATE.
            </TextRevealChars>
        </motion.h1>

        {/* Right Side - Description and CTA */}
        <div className="flex-1 lg:max-w-[40%] flex flex-col gap-6 lg:pt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xs md:text-sm text-[#6B6B6B] uppercase tracking-wider leading-relaxed font-light max-w-md"
          >
            We partner with businesses ready to move fast and build smarter. Through sharp design, scalable engineering, and data-driven marketing, we create digital foundations that don't just launch — they accelerate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-xs md:text-sm text-[#6B6B6B] hover:text-[#1A1A1D] transition-colors"
            >
              <span className="text-primary">View Our Work</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Services Scrolling Text - Optimized with CSS animation */}
      <div className="relative w-full border-t border-[#D0D0D0] py-4 md:py-6 overflow-hidden bg-[#F5F5F5]">
        <div className="flex items-center whitespace-nowrap">
          <div className="flex items-center gap-3 md:gap-6 animate-scroll">
            {/* Render multiple cycles for seamless loop */}
            {[...Array(4)].map((_, cycle) => (
              <React.Fragment key={cycle}>
                {services.map((service, index) => (
                  <React.Fragment key={`${cycle}-${index}`}>
                    <span className="text-xs md:text-sm text-[#6B6B6B] uppercase tracking-wider font-light">
                      {service}
                    </span>
                    <span className="text-[#6B6B6B] text-xs md:text-sm">*</span>
                    <span className="text-[#6B6B6B] text-xs md:text-sm">→</span>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image Section - Not Full Width */}
      <div className="relative w-full flex justify-center px-6 md:px-12 lg:px-16 xl:px-24 pb-8">
        <div className="relative w-full max-w-screen-2xl aspect-video bg-[#E8E8E8] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">

          {/* Hero Video */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              src="/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />
          </motion.div>


        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
