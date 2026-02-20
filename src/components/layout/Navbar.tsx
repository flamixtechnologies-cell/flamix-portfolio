"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
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
  hasAnyActive,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: {
  item: NavItem;
  isActive: boolean;
  hasAnyActive: boolean;
  isDimmed?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const { sx, sy, onMove, onLeave } = useMagnet(0.22);

  const base =
    "relative rounded-full px-3 md:px-4 py-2 text-xs md:text-sm uppercase whitespace-nowrap " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]";

  // If active: opacity 1, if another is active: opacity 0.5, otherwise opacity 1
  const itemOpacity = isActive ? 1 : hasAnyActive ? 0.5 : 1;

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
      style={{ x: sx, y: sy, opacity: itemOpacity }}
    >
      <Link
        href={item.href}
        className={base}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    return pathname === href;
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
              "mx-auto mt-2 md:mt-4",
              "w-[min(980px,calc(100%-16px))] md:w-[min(980px,calc(100%-24px))]",
              "rounded-lg",
              "border",
              "bg-white/55 backdrop-blur-2xl",
              "shadow-[0_18px_55px_rgba(46,7,63,0.12)]",
              "relative overflow-hidden",
              "px-2 md:px-3 py-1",
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

            <div className="relative flex items-center justify-between gap-2 md:gap-3">
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-1.5 md:gap-2 rounded-xl px-1.5 md:px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]"
                aria-label="Home"
              >
                <span
                  className="inline-flex size-10 items-center justify-center rounded-xl border bg-white/55"
                  style={{ borderColor: "rgba(122,28,172,0.16)" }}
                >
                  <img
                    src="/logo/logo_icon.png"
                    alt="Flamix"
                    className="size-6 object-contain"
                  />
                </span>

                <span className="hidden sm:block font-heading text-sm md:text-base tracking-tight">
                  <span style={{ color: "rgba(26,26,29,0.88)" }}>Flamix</span>
                  <span style={{ color: "rgba(122,28,172,0.70)" }}> Technologies</span>
                </span>
              </Link>

              {/* Links - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-2">
                {NAV.map((item) => {
                  const isItemActive = isActive(item.href);
                  const hasAnyActive = NAV.some(navItem => isActive(navItem.href));

                  return (
                    <NavItemComponent
                      key={item.href}
                      item={item}
                      isActive={isItemActive}
                      hasAnyActive={hasAnyActive}
                      isDimmed={hoveredHref !== null && hoveredHref !== item.href}
                      onHoverStart={() => setHoveredHref(item.href)}
                      onHoverEnd={() => setHoveredHref(null)}
                    />
                  );
                })}
              </div>

              {/* CTA - Hidden on mobile */}
              <Link
                href="/contact"
                className={[
                  "hidden md:inline-flex",
                  "items-center justify-center",
                  "rounded-xl px-4 md:px-5 py-1.5 md:py-2",
                  "text-xs md:text-sm tracking-tight",
                  "border bg-white/55 hover:bg-primary hover:text-white transition-colors duration-300 border-primary",
                  "transition-transform hover:scale-[0.97] active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]",
                ].join(" ")}
              >
                Start a project
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg border bg-white/55 hover:bg-white/75 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]"
                style={{ borderColor: "rgba(122,28,172,0.16)" }}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4 md:h-5 md:w-5" style={{ color: "rgba(26,26,29,0.88)" }} />
                ) : (
                    <Menu className="h-4 w-4 md:h-5 md:w-5" style={{ color: "rgba(26,26,29,0.88)" }} />
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-white/95 backdrop-blur-2xl z-[70] md:hidden shadow-2xl"
              style={{
                borderLeft: "1px solid rgba(122,28,172,0.14)",
              }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(122,28,172,0.14)" }}>
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2"
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
                    <span className="font-heading text-base tracking-tight">
                      <span style={{ color: "rgba(26,26,29,0.88)" }}>Flamix</span>
                      <span style={{ color: "rgba(122,28,172,0.70)" }}> Technologies</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border bg-white/55 hover:bg-white/75 transition-colors"
                    style={{ borderColor: "rgba(122,28,172,0.16)" }}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" style={{ color: "rgba(26,26,29,0.88)" }} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-2">
                    {NAV.map((item, index) => {
                      const isItemActive = isActive(item.href);

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={[
                              "block w-full rounded-xl px-4 py-3 text-base font-medium transition-colors",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]",
                              isItemActive
                                ? "bg-[rgba(46,7,63,0.92)] text-white"
                                : "text-[rgba(26,26,29,0.68)] hover:bg-[rgba(122,28,172,0.08)]",
                            ].join(" ")}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t" style={{ borderColor: "rgba(122,28,172,0.14)" }}>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={[
                      "block w-full text-center",
                      "rounded-2xl px-6 py-4",
                      "font-medium tracking-tight",
                      "border bg-white/55 hover:bg-primary hover:text-white transition-colors duration-300 border-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]",
                    ].join(" ")}
                  >
                    Start a project
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
