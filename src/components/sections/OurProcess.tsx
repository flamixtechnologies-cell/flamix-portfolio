"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Lightbulb,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We dive deep into understanding your business goals, target audience, and technical requirements through comprehensive research and stakeholder interviews.",
    icon: Search,
    step: "01",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    bullets: [
      "Comprehensive market research and competitive analysis to identify opportunities",
      "In-depth stakeholder interviews to understand business objectives and pain points",
      "User persona development and journey mapping for target audiences",
      "Technical audit and infrastructure assessment for existing systems",
      "Risk analysis and feasibility studies for proposed solutions",
      "Clear project scope definition and success metrics establishment",
    ],
  },
  {
    id: 2,
    title: "Strategy & Design",
    description:
      "Our team crafts a tailored strategy and designs innovative solutions that align with your vision, ensuring scalability and user-centric experiences.",
    icon: Lightbulb,
    step: "02",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    bullets: [
      "Custom strategy development aligned with your business goals and market position",
      "User experience (UX) design focused on intuitive interactions and conversions",
      "Scalable technical architecture planning for future growth",
      "Visual design systems and brand identity integration",
      "Interactive prototypes and wireframes for stakeholder approval",
      "Performance optimization strategy and accessibility compliance planning",
    ],
  },
  {
    id: 3,
    title: "Development & Launch",
    description:
      "We bring your vision to life with cutting-edge development practices, rigorous testing, and seamless deployment to ensure optimal performance.",
    icon: Rocket,
    step: "03",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    bullets: [
      "Agile development methodology with iterative sprints and regular updates",
      "Code quality assurance through peer reviews and automated testing",
      "Comprehensive QA testing including functionality, performance, and security",
      "Responsive design implementation across all devices and browsers",
      "Seamless deployment with zero-downtime strategies and rollback plans",
      "Post-launch monitoring, optimization, and continuous improvement support",
    ],
  },
];

function ProcessCard({
  step,
  index,
  isActive,
  onIntersect,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isActive: boolean;
  onIntersect: (index: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = step.icon;

  useEffect(() => {
    const currentCard = cardRef.current;
    if (!currentCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Use requestAnimationFrame to batch updates
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            // Change image when section is well into viewport
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              onIntersect(index);
            }
          });
        });
      },
      {
        threshold: [0.4], // Single threshold for better performance
        rootMargin: "0% 0px -20% 0px", // Trigger when section is 20% from bottom
      }
    );

    observer.observe(currentCard);

    return () => {
      observer.unobserve(currentCard);
    };
  }, [index, onIntersect]);

  return (
    <div ref={cardRef} className={`min-h-screen max-md:min-h-auto flex items-center py-24 ${index === 2 ? 'min-h-[120vh] max-md:min-h-auto' : ''}`}>
      <div className="relative w-full max-md:w-full">
        {/* Step number */}
        <div className="mb-4">
          <span className="text-foreground/40 font-bold text-xs font-heading tracking-[0.2em] uppercase">
            Step {step.step}
          </span>
        </div>

        {/* Icon */}
        <div className="mb-5">
          <motion.div
            className="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center"
            animate={isActive ? { scale: 1.05, borderColor: "rgba(0,0,0,0.25)", backgroundColor: "rgba(122, 28, 172, 0.1)" } : { scale: 1, borderColor: "rgba(0,0,0,0.1)", backgroundColor: "rgba(0,0,0,0.02)" }}
            transition={{ duration: 0.3 }}
          >
            <Icon
              className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/50"
                }`}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div>
          <h3
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 font-heading transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/70"
              }`}
          >
            {step.title}
          </h3>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-md mb-6">
            {step.description}
          </p>

          {/* Bullet Points */}
          <div className="space-y-3 max-w-md">
            {step.bullets?.map((bullet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.6, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className={`mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-primary" : "bg-foreground/30"}`} />
                <p className={`text-sm md:text-base font-medium leading-relaxed transition-colors duration-300 ${isActive ? "text-foreground/90" : "text-foreground/50"}`}>
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile image - only visible on small screens */}
        <div className="mt-6 lg:hidden">
          <div className="relative w-full h-[240px] overflow-hidden rounded-lg">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyImage({
  currentImage,
  currentIndex,
}: {
  currentImage: string;
  currentIndex: number;
}) {
  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${currentIndex}-${currentImage}`}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={`Process step ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Step indicator dots */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          {processSteps.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-foreground"
              animate={{
                width: i === currentIndex ? 24 : 8,
                opacity: i === currentIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function OurProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleStepIntersect = useCallback((index: number) => {
    setActiveIndex((prevIndex) => {
      if (prevIndex !== index) {
        return index;
      }
      return prevIndex;
    });
  }, []);

  const currentImage =
    processSteps[activeIndex]?.image || processSteps[0].image;

  return (
    <section
      ref={containerRef}
      className="relative pt-12 max-sm:pt-12 bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Light Theme Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 z-10">
        {/* Header - Using Reusable Component */}
        <SectionHeading
          title="How We Work"
          description="A streamlined approach to delivering exceptional results through collaboration, innovation, and execution."
          number="04"
        />

        {/* Main Content: Left scrolling content + Right centered sticky image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16 xl:gap-24">
          {/* Left: Scrolling Process Steps */}
          <div>
            {processSteps.map((step, index) => (
              <ProcessCard
                key={step.id}
                step={step}
                index={index}
                isActive={activeIndex === index}
                onIntersect={handleStepIntersect}
              />
            ))}
          </div>

          {/* Right: Sticky Centered Image */}
          <div className="hidden lg:block relative">
            <StickyImage
              currentImage={currentImage}
              currentIndex={activeIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}