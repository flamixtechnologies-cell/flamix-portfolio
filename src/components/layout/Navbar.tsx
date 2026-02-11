"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;      // "/#services" or "/contact"
  sectionId?: string; // "services" for scrollspy
};

const NAV: NavItem[] = [
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Projects", href: "/#portfolio", sectionId: "portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbarHeight = 100; // Approximate navbar height including margin
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

function useScrollSpy(sectionIds: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { threshold: [0.12, 0.2, 0.35, 0.5], rootMargin }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
}

function useMagnet(strength = 0.18) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / r.width;
    const py = (e.clientY - (r.top + r.height / 2)) / r.height;
    x.set(px * 34 * strength);
    y.set(py * 34 * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return { sx, sy, onMove, onLeave };
}

// Separate component for nav items to allow hooks usage
function NavItemComponent({
  item,
  isActive,
  onHashClick,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: {
    item: NavItem;
    isActive: boolean;
    onHashClick?: (sectionId: string) => void;
    isDimmed?: boolean;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}) {
  const { sx, sy, onMove, onLeave } = useMagnet(0.22);
  const isHash = item.href.startsWith("/#");

  const base =
    "relative rounded-full px-4 py-2 text-[12px] font-medium tracking-[0.02em] " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]";

  const content = (
    <>
      {isActive && (
        <motion.span
          layoutId="topnav-active"
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(46,7,63,0.92)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}

      <span
        className="relative z-10"
        style={{
          color: isActive ? "white" : "rgba(26,26,29,0.68)",
        }}
      >
        {item.label}
      </span>
    </>
  );

  if (isHash && item.sectionId && onHashClick) {
    return (
      <motion.button
        type="button"
        onClick={() => onHashClick(item.sectionId!)}
        onMouseMove={(e) => {
          onMove(e);
          onHoverStart?.();
        }}
        onMouseLeave={() => {
          onLeave();
          onHoverEnd?.();
        }}
        style={{ x: sx, y: sy, opacity: isDimmed ? 0.35 : 1 }}
        className={base}
        aria-current={isActive ? "location" : undefined}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      onMouseMove={(e) => {
        onMove(e);
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        onLeave();
        onHoverEnd?.();
      }}
      style={{ x: sx, y: sy, opacity: isDimmed ? 0.35 : 1 }}
    >
      <Link
        href={item.href}
        className={base}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Link>
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const sectionIds = useMemo(
    () => NAV.map((n) => n.sectionId).filter(Boolean) as string[],
    []
  );

  const activeSection = useScrollSpy(sectionIds);
  const activeHref =
    pathname !== "/"
      ? pathname
      : activeSection
        ? `/#${activeSection}`
        : "/#services";

  const barRef = useRef<HTMLElement | null>(null);

  // Scroll direction detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar at the top of the page
          if (currentScrollY < 50) {
            setIsVisible(true);
          } else {
            // Hide when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
              setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
              setIsVisible(true);
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollThreshold]);

  // glossy sheen follows cursor (subtle)
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(35);
  const sx = useSpring(sheenX, { stiffness: 160, damping: 22 });
  const sy = useSpring(sheenY, { stiffness: 160, damping: 22 });

  function onBarMove(e: React.MouseEvent) {
    const el = barRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    sheenX.set(clamp(x, 0, 100));
    sheenY.set(clamp(y, 0, 100));
  }

  function onBarLeave() {
    sheenX.set(50);
    sheenY.set(30);
  }

  const isActive = (href: string) => {
    // Only keep active state for full page links, not section anchors
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.nav
            key="navbar"
            ref={barRef}
            onMouseMove={onBarMove}
            onMouseLeave={onBarLeave}
            initial={{
              clipPath: "inset(0% 50% 0% 50%)",
              opacity: 0,
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
            }}
            exit={{
              clipPath: "inset(0% 50% 0% 50%)",
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={[
              "mx-auto mt-4",
              "w-[min(980px,calc(100%-24px))]",
              "rounded-[18px]",
              "border",
              "bg-white/55 backdrop-blur-2xl",
              "shadow-[0_18px_55px_rgba(46,7,63,0.12)]",
              "relative overflow-hidden",
              "px-3 py-2.5",
            ].join(" ")}
            style={{
              transformOrigin: "center",
              borderColor: "rgba(122,28,172,0.14)",
            }}
            aria-label="Primary"
          >
            {/* glossy sheen */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                // @ts-ignore
                ["--sx" as any]: `${sx.get()}%`,
                // @ts-ignore
                ["--sy" as any]: `${sy.get()}%`,
                background:
                  "radial-gradient(520px circle at var(--sx) var(--sy), rgba(255,255,255,0.75), rgba(255,255,255,0.00) 60%)",
                opacity: 0.55,
              }}
            />

            {/* subtle purple bloom (tiny) */}
            <div
              className="pointer-events-none absolute -top-12 right-10 h-44 w-44 rounded-full blur-[60px]"
              style={{ background: "rgba(122,28,172,0.09)" }}
            />

            <div className="relative flex items-center justify-between gap-3">
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]"
                aria-label="Home"
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-white/55"
                  style={{ borderColor: "rgba(122,28,172,0.16)" }}
            >
              <img
                src="/logo/logo_icon.png"
                    alt="Flamix"
                    className="h-5 w-5 object-contain"
              />
                </span>

                <span className="hidden sm:block font-heading text-[13px] tracking-tight">
                  <span style={{ color: "rgba(26,26,29,0.88)" }}>Flamix</span>
                  <span style={{ color: "rgba(122,28,172,0.70)" }}> Technologies</span>
                </span>
          </Link>

              {/* Links */}
          <div className="flex items-center gap-1">
                {NAV.map((item) => (
                  <NavItemComponent
                    key={item.href}
                    item={item}
                    isActive={isActive(item.href)}
                    isDimmed={hoveredHref !== null && hoveredHref !== item.href}
                    onHoverStart={() => setHoveredHref(item.href)}
                    onHoverEnd={() => setHoveredHref(null)}
                    onHashClick={item.sectionId ? smoothScrollTo : undefined}
                  />
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className={[
                  "hidden md:inline-flex",
                  "items-center justify-center",
                  "rounded-full px-4 py-2",
                  "text-[12px] font-semibold",
                  "border bg-white/55",
                  "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]",
                ].join(" ")}
                style={{
                  borderColor: "rgba(122,28,172,0.16)",
                  color: "rgba(26,26,29,0.82)",
                }}
              >
                Start a project
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
