"use client";

import React, {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

/* ─── Types ───────────────────────────────────────────────────────── */
type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  chips: string[];
  accent?: string;
  iconPath?: string;
};

/* ─── Data ────────────────────────────────────────────────────────── */
const DEFAULT_SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Design-engineered sites and web apps built for speed, clarity, and long-term maintainability — no template feel, no brittle hacks.",
    bullets: [
      "Next.js & React builds",
      "Performance budgets",
      "Design fidelity in code",
    ],
    chips: ["Web apps", "Landing pages", "CMS builds"],
    accent: "var(--color-primary)",
    iconPath:
      "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description:
      "Purpose-built internal tools and product features that reduce manual work, unify data, and scale with your process — not against it.",
    bullets: [
      "Workflow tools",
      "Dashboards & portals",
      "Third-party integrations",
    ],
    chips: ["B2B", "Automation", "Systems"],
    accent: "var(--color-secondary)",
    iconPath:
      "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    description:
      "Conversion-first storefronts and product flows: clean UX, fast pages, and the operational edges covered.",
    bullets: [
      "Storefront UX",
      "Checkout optimization",
      "Analytics that make sense",
    ],
    chips: ["Shopify", "Headless", "CRO"],
    accent: "var(--color-tertiary)",
    iconPath:
      "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  },
  {
    id: "seo-content",
    title: "SEO & Content Strategy",
    description:
      "Technical SEO and content architecture that makes your product discoverable — structured pages, intentional linking, measurable wins.",
    bullets: [
      "Technical audits",
      "Content systems",
      "Information architecture",
    ],
    chips: ["SEO", "Content", "IA"],
    accent: "var(--color-primary)",
    iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Campaigns built like products: clear positioning, disciplined creative, and tracking you can actually trust.",
    bullets: [
      "Campaign strategy",
      "Creative direction",
      "Measurement setup",
    ],
    chips: ["Paid social", "Search", "Analytics"],
    accent: "var(--color-secondary)",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "social",
    title: "Social Media Management",
    description:
      "A consistent system for your presence: cadence, creative templates, and content that compounds — not random posts.",
    bullets: [
      "Content cadence",
      "Creative systems",
      "Brand consistency",
    ],
    chips: ["Brand voice", "Content", "Community"],
    accent: "var(--color-tertiary)",
    iconPath:
      "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
];

/* ─── Utils ───────────────────────────────────────────────────────── */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/* ─── ServiceCard ─────────────────────────────────────────────────── */
function ServiceCard({
  svc,
  index,
  isActive,
  prefersReducedMotion,
  isMobile = false,
}: {
    svc: Service;
  index: number;
    isActive: boolean;
    prefersReducedMotion: boolean | null;
    isMobile?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${-(py - 0.5) * 5}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    [prefersReducedMotion]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "40%");
  }, []);

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-active={isActive ? "true" : "false"}
      className={[
        "holo-card group relative shrink-0 snap-center",
        isMobile
          ? "w-[85vw]"
          : "w-[80vw] sm:w-[65vw] md:w-[480px] lg:w-[560px] xl:w-[600px]",
      ].join(" ")}
    >
      <div className="holo-tilt relative h-full rounded-[22px] overflow-hidden">
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl" />

        {/* Content */}
        <div className="relative z-10 h-full p-7 md:p-9 flex flex-col">
          {/* Large index watermark */}
          <span
            className="absolute -top-2 -right-1 select-none pointer-events-none font-heading text-[120px] md:text-[150px] leading-none"
            style={{
              color: isActive
                ? "rgba(122, 28, 172, 0.07)"
                : "rgba(0,0,0,0.03)",
              fontFeatureSettings: '"tnum"',
              transition: "color 0.4s ease",
            }}
          >
            {pad2(index + 1)}
          </span>

          {/* Title */}
          <h3 className="font-heading text-[26px] md:text-[32px] leading-[1.08] tracking-tight">
            {svc.title}
          </h3>
          <p className="mt-3 text-[14.5px] md:text-[15px] leading-relaxed text-foreground/60 max-w-md">
            {svc.description}
          </p>

          {/* Chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {svc.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full px-3 py-1 text-[11.5px] font-medium tracking-wide"
                style={{
                  background: isActive
                    ? "rgba(122, 28, 172, 0.06)"
                    : "rgba(0,0,0,0.04)",
                  color: isActive
                    ? "rgba(122, 28, 172, 0.75)"
                    : "rgba(0,0,0,0.45)",
                  border: "1px solid",
                  borderColor: isActive
                    ? "rgba(122, 28, 172, 0.12)"
                    : "rgba(0,0,0,0.06)",
                  transition: "all 0.35s ease",
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Bullets */}
          <ul className="mt-6 space-y-2.5">
            {svc.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[13px] text-foreground/60"
              >
                <span
                  className="mt-[6px] h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    background: isActive
                      ? "rgba(122, 28, 172, 0.5)"
                      : "rgba(0,0,0,0.2)",
                    transition: "background 0.35s ease",
                  }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-auto pt-6 flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: "rgba(122, 28, 172, 0.85)" }}
            >
              Start a project
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="text-[13px] font-medium text-foreground/45 hover:text-foreground/70 transition-colors"
            >
              View work →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Main Section ────────────────────────────────────────────────── */
export function Services({
  services = DEFAULT_SERVICES,
  sectionNumber = "01",
  title = "Services, staged—not listed.",
  description = "A scroll-driven overview of what we build, how we build it, and where it moves the needle.",
}: {
  services?: Service[];
  sectionNumber?: string;
  title?: string;
  description?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollRange, setScrollRange] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Reset to first service when section mounts
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position for mobile carousel to update activeIndex
  useEffect(() => {
    if (!isMobile || !trackRef.current) return;

    const track = trackRef.current;

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = (window.innerWidth * 85) / 100; // 85vw
      const gap = 20; // gap-5 = 20px
      const padding = 20; // p-5 = 20px
      const cardWidthWithGap = cardWidth + gap;

      // Account for padding: scrollLeft starts after padding
      // Calculate which card is primarily visible
      const adjustedScroll = scrollLeft + padding;
      const newIndex = Math.round(adjustedScroll / cardWidthWithGap);
      const clampedIndex = clamp(newIndex, 0, services.length - 1);

      if (clampedIndex !== activeIndex) {
        setActiveIndex(clampedIndex);
      }
    };

    // Initial check
    handleScroll();

    track.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, services.length]);

  // Get stable viewport height for mobile compatibility
  useEffect(() => {
    const getStableViewportHeight = () => {
      // Get actual viewport height (accounts for mobile address bar)
      const vh = window.innerHeight * 0.01;

      // Ensure --dvh CSS variable is set (may already be set by Footer)
      document.documentElement.style.setProperty("--dvh", `${vh}px`);

      // Store the full viewport height for JavaScript calculations
      setViewportHeight(window.innerHeight);
    };

    getStableViewportHeight();

    // Update on resize, orientation change, and scroll (for mobile browsers)
    window.addEventListener("resize", getStableViewportHeight);
    window.addEventListener("orientationchange", getStableViewportHeight);
    window.addEventListener("scroll", getStableViewportHeight, { passive: true });

    return () => {
      window.removeEventListener("resize", getStableViewportHeight);
      window.removeEventListener("orientationchange", getStableViewportHeight);
      window.removeEventListener("scroll", getStableViewportHeight);
    };
  }, []);

  /* ── Measure horizontal overflow → compute vertical runway ───── */
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const vw = viewport.getBoundingClientRect().width;
      const tw = track.scrollWidth;

      // Calculate overflow - how much we need to scroll horizontally
      // This is the distance from the first card's left edge to the last card's right edge
      const overflow = Math.max(0, tw - vw);

      // To ensure the last card is fully visible when we reach the end:
      // We need to scroll enough so the last card is completely within the viewport
      // Add extra scroll distance to account for padding and ensure full visibility
      const trackPadding = 32; // Padding on track (p-8 = 32px)
      const extraScroll = trackPadding; // Extra scroll to ensure last card is fully visible
      const scrollRange = overflow + extraScroll;

      setScrollRange(scrollRange);

      /*
       * Section height needs to be tall enough to allow scrolling through all services
       * Formula: viewport height + horizontal overflow distance + extra buffer
       * The extra buffer ensures the last card can fully scroll into view
       * 
       * The key is: when scroll progress = 1, we should have scrolled enough
       * that the last card is fully visible in the viewport
       */
      // Calculate the actual distance needed to show the last card fully
      // We need to scroll from first card to last card's right edge being visible
      // Add extra buffer (viewport width) to ensure smooth scrolling and full visibility
      const extraBuffer = vw; // Full viewport width as buffer to ensure last card is fully visible

      // Use stable viewport height (from state) or fallback to window.innerHeight
      const stableVh = viewportHeight ?? window.innerHeight;
      const totalHeight = stableVh + overflow + extraBuffer;

      setSectionHeight(totalHeight);
    };

    measure();
    // Re-measure after fonts load / paint settles
    const raf = requestAnimationFrame(() => {
      measure();
    });

    // Also re-measure after fonts are fully loaded
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(measure);
    }

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (viewportRef.current) ro.observe(viewportRef.current);
      if (trackRef.current) ro.observe(trackRef.current);
    }
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [prefersReducedMotion, services.length, viewportHeight]);

  /* ── Scroll → horizontal x ──────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to horizontal movement
  // Start from 0 (first card) when section enters viewport
  // End at last card when section exits viewport
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange],
    {
      clamp: true,
    }
  );

  // Reset active index when section first comes into view
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const checkScrollPosition = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;

      // If section is at the top of viewport or just entering, reset to first service
      if (sectionTop <= 100 && sectionTop >= -100) {
        // Section is near the top of viewport
        try {
          const scrollProgress = scrollYProgress.get();
          if (scrollProgress < 0.1) {
            setActiveIndex(0);
          }
        } catch (e) {
          // scrollYProgress might not be ready yet
          setActiveIndex(0);
        }
      }
    };

    // Check immediately
    checkScrollPosition();

    // Also check on scroll
    window.addEventListener("scroll", checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [prefersReducedMotion, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReducedMotion || isMobile) return;

    // Clamp the value between 0 and 1
    const clamped = Math.max(0, Math.min(1, v));

    // If progress is 0 or very close to 0, always show first service
    if (clamped <= 0.01) {
      setActiveIndex(0);
      return;
    }

    // Calculate which service should be active based on scroll progress
    // When progress is 0, we should be at service 0 (first service)
    // When progress is 1, we should be at the last service
    // Map 0-1 progress to 0 to (services.length - 1) index
    const rawIdx = clamped * (services.length - 1);
    let idx = Math.round(rawIdx);

    // Ensure we start at 0 for very small progress values
    if (clamped < 0.05) {
      idx = 0;
    }
    // Ensure we end at last service for values very close to 1
    else if (clamped > 0.95) {
      idx = services.length - 1;
    }

    idx = clamp(idx, 0, services.length - 1);

    // Only update if index actually changed
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
  });

  /* ── Click-to-scroll ────────────────────────────────────────── */
  const scrollToIndex = useCallback(
    (idx: number) => {
      const clamped = clamp(idx, 0, services.length - 1);
      setActiveIndex(clamped);

      // On mobile, scroll the track to the correct position
      if (isMobile && trackRef.current) {
        const track = trackRef.current;
        const cardWidth = (window.innerWidth * 85) / 100; // 85vw
        const gap = 20; // gap-5 = 20px
        const cardWidthWithGap = cardWidth + gap;
        const scrollPosition = clamped * cardWidthWithGap;

        track.scrollTo({
          left: scrollPosition,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const stableVh = viewportHeight ?? window.innerHeight;
      const scrollable = section.offsetHeight - stableVh;
      if (scrollable <= 0) return;

      const progress =
        services.length === 1 ? 0 : clamped / (services.length - 1);
      window.scrollTo({
        top: sectionTop + progress * scrollable,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [services.length, prefersReducedMotion, viewportHeight, isMobile]
  );

  /* ── Keyboard nav ────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const max = services.length - 1;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = clamp(activeIndex + 1, 0, max);
        scrollToIndex(next);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = clamp(activeIndex - 1, 0, max);
        scrollToIndex(prev);
      }
      if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(max);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, services.length, scrollToIndex]);

  const useStickyScroll = !prefersReducedMotion && !isMobile;
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
        ...(useStickyScroll && sectionHeight ? { height: sectionHeight } : {}),
        overflow: "clip",
        overscrollBehavior: "contain",
      }}
    >
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-44 -left-44 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: "rgba(122,28,172,0.06)" }}
        />
        <div
          className="absolute top-1/3 -right-60 h-[600px] w-[600px] rounded-full blur-[140px]"
          style={{ background: "rgba(99,102,241,0.04)" }}
        />
        <div
          className="absolute -bottom-52 left-1/3 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(173,73,225,0.05)" }}
        />
      </div>

      {/* Sticky wrapper — everything inside stays pinned while section scrolls */}
      <div
        className={useStickyScroll ? "sticky top-0" : ""}
        style={{
          minHeight: "calc(var(--dvh) * 100)",
          overscrollBehavior: "contain",
        }}
      >
        <div
          className="relative max-w-[1920px] mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-16 pt-16 md:pt-24 flex flex-col justify-center"
          style={{
            minHeight: "calc(var(--dvh) * 100)",
          }}
        >
          {/* ── Header ── */}
          <div className="shrink-0">
            <SectionHeading
              title={title}
              description={description}
              number={sectionNumber}
            />
          </div>

          {/* ── Centered Service Cards ── */}
          <div className={`relative flex-1 flex flex-col justify-center ${isMobile ? "overflow-x-visible" : ""}`}>
            <div
              ref={viewportRef}
              className={`relative rounded-[22px] border border-[rgba(122,28,172,0.08)] mx-auto ${isMobile ? "w-[calc(100%-2rem)] overflow-x-visible" : "w-full overflow-hidden"
                }`}
              style={{
                overscrollBehavior: "contain",
              }}
            >
              <motion.div
                ref={trackRef}
                className={[
                  "flex gap-5 md:gap-6 lg:gap-8 p-5 md:p-6 lg:p-8 ",
                  isMobile
                    ? "overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                    : !useStickyScroll
                    ? "overflow-x-auto snap-x snap-mandatory scrollbar-thin"
                    : "",
                ].join(" ")}
                style={{
                  x: isMobile ? 0 : useStickyScroll ? x : 0,
                  willChange: useStickyScroll ? "transform" : "auto",
                  WebkitOverflowScrolling: isMobile ? "touch" : "auto",
                }}
              >
                {services.map((svc, idx) => (
                  <ServiceCard
                    key={svc.id}
                    svc={svc}
                    index={idx}
                    isActive={idx === activeIndex}
                    prefersReducedMotion={prefersReducedMotion}
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress indicator - centered below cards */}
            <div className="mt-10 md:mt-12 flex flex-col items-center gap-4">


              {/* Navigation dots */}
              <div className="flex items-center gap-2">
                {services.map((_, idx) => (
                  <MagneticButton
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.55)] rounded-full transition-all bg-transparent p-1"
                    aria-label={`Go to service ${idx + 1}`}
                    ripple={false}
                    glow={false}
                    variant="ghost"
                    size="sm"
                    unstyled
                  >
                    <div
                      className={`h-2 rounded-full transition-all ${idx === activeIndex ? "w-8" : "w-2"
                        }`}
                      style={{
                        background:
                          idx === activeIndex
                            ? "rgba(122, 28, 172, 0.6)"
                            : "rgba(0,0,0,0.15)",
                      }}
                    />
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Keyboard hint - centered */}

          </div>
        </div>
      </div>
    </section>
  );
}