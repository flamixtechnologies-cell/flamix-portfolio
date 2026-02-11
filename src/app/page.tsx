"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/sections";
import { LoadingPage, ScrollToTop, SplashCursor } from "@/components/ui";

// Lazy load heavy components
const Services = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.Services })), {
  loading: () => <div className="min-h-screen" />,
});
const OurProcess = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.OurProcess })), {
  loading: () => <div className="min-h-screen" />,
});
const Portfolio = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.Portfolio })), {
  loading: () => <div className="min-h-screen" />,
});
const WhyUs = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.WhyUs })), {
  loading: () => <div className="min-h-screen" />,
});
const About = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.About })), {
  loading: () => <div className="min-h-screen" />,
});
const CTA = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.CTA })), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Ghost / fluid cursor background */}
      <SplashCursor />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
            {/* Main content that scrolls over the footer */}
            <main className="relative z-10 bg-background">
              <Navbar />

              {/* Hero section - no stacking effect */}
              <Hero />

              {/* Sections with lazy loading */}
              <div className="relative">
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Services />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <WhyUs />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <About />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <OurProcess />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Portfolio />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <CTA />
                </Suspense>
              </div>
            </main>

            {/* Sticky footer that gets revealed as content scrolls up */}
            <Footer />

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </>
      )}
    </>
  );
}
