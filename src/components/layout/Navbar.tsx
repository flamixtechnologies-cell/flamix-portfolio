"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string; // "/#services" or "/contact"
  sectionId?: string; // "services"
};

const NAV: NavItem[] = [
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Projects", href: "/#portfolio", sectionId: "portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useScrollSpy(sectionIds: string[], rootMargin = "-35% 0px -55% 0px") {
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

/** Smooth scroll to an element id with dynamic navbar offset */
function scrollToId(id: string, offsetPx: number) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = window.scrollY + el.getBoundingClientRect().top - offsetPx;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function Navbar() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        : null;

  // Stronger glass when not at top (classic premium behavior)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Glossy sheen that follows cursor (desktop)
  const sheenX = useMotionValue(55);
  const sheenY = useMotionValue(10);
  const sx = useSpring(sheenX, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(sheenY, { stiffness: 140, damping: 20, mass: 0.6 });

  function onHeaderMove(e: React.MouseEvent) {
    const el = headerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    sheenX.set(clamp(x, 0, 100));
    sheenY.set(clamp(y, 0, 100));
  }
  function onHeaderLeave() {
    sheenX.set(55);
    sheenY.set(10);
  }

  function navOffsetPx() {
    const h = headerRef.current?.getBoundingClientRect().height ?? 72;
    // include the top spacing (we keep it snug, so small buffer)
    return Math.round(h + 14);
  }

  function handleItemClick(item: NavItem) {
    // close modal always
    setOpen(false);

    // Hash sections only on homepage
    const isHash = item.href.startsWith("/#") && item.sectionId;

    if (isHash) {
      // If already on home, smooth scroll
      if (pathname === "/") {
        scrollToId(item.sectionId!, navOffsetPx());
        return;
      }
      // If not on home, allow normal navigation to "/#id"
      return;
    }
  }

  const isDesktopActive = (href: string) => {
    if (href.startsWith("/#")) return activeHref === href;
    return pathname === href;
  };

  const overlayVariants = {
    closed: { scaleY: 0, opacity: 0 },
    open: { scaleY: 1, opacity: 1 },
  };

  const listVariants = {
    closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.06, delayChildren: 0.10 } },
  };

  const itemVariants = {
    closed: { y: -10, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <>
      {/* Top glass navbar */}
      <header className="fixed top-0 inset-x-0 z-50">
        <motion.nav
          ref={headerRef}
          onMouseMove={onHeaderMove}
          onMouseLeave={onHeaderLeave}
          className={[
            "mx-auto mt-3",
            "w-[min(1120px,calc(100%-20px))]",
            "rounded-[18px] border",
            "relative overflow-hidden",
            "px-3.5 sm:px-4 py-3 max-sm:py-2",
          ].join(" ")}
          style={{
            borderColor: scrolled ? "rgba(122,28,172,0.16)" : "rgba(122,28,172,0.10)",
            background: scrolled ? "rgba(255,255,255,0.64)" : "rgba(255,255,255,0.42)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: scrolled
              ? "0 18px 55px rgba(46,7,63,0.14)"
              : "0 10px 34px rgba(46,7,63,0.10)",
          }}
          aria-label="Primary"
        >
          {/* Sheen layer */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              // @ts-ignore
              ["--sx" as any]: `${sx.get()}%`,
              // @ts-ignore
              ["--sy" as any]: `${sy.get()}%`,
              background:
                "radial-gradient(520px circle at var(--sx) var(--sy), rgba(255,255,255,0.78), rgba(255,255,255,0.00) 60%)",
              opacity: scrolled ? 0.55 : 0.45,
            }}
          />

          {/* Subtle bloom */}
          <div
            className="pointer-events-none absolute -top-10 right-8 h-44 w-44 rounded-full blur-[60px]"
            style={{ background: "rgba(122,28,172,0.10)" }}
          />

          <div className="relative flex items-center justify-between gap-3">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]"
              aria-label="Home"
              onClick={() => setOpen(false)}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
                style={{
                  borderColor: "rgba(122,28,172,0.14)",
                  background: "rgba(255,255,255,0.55)",
                }}
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

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const active = isDesktopActive(item.href);
                const isHash = item.href.startsWith("/#") && item.sectionId;

                const common =
                  "relative px-4 py-2 rounded-full text-[12px] font-medium tracking-[0.02em] " +
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
                  "focus-visible:ring-[rgba(122,28,172,0.45)]";

                const content = (
                  <>
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "rgba(46,7,63,0.92)" }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}

                    {/* micro-underline (premium, not “template”) */}
                    <span
                      className="relative z-10"
                      style={{
                        color: active ? "white" : "rgba(26,26,29,0.70)",
                      }}
                    >
                      {item.label}
                      <span
                        className="absolute left-1/2 -bottom-[7px] h-[1px] w-0 -translate-x-1/2 transition-all duration-300"
                        style={{
                          background: "rgba(122,28,172,0.40)",
                        }}
                      />
                    </span>
                  </>
                );

                if (isHash) {
                  return (
                    <button
                      key={item.href}
                      type="button"
                      className={common + " group hover:text-foreground"}
                      onClick={() => {
                        if (pathname === "/") {
                          scrollToId(item.sectionId!, navOffsetPx());
                        }
                      }}
                      aria-current={active ? "location" : undefined}
                      style={{
                        color: active ? "white" : "rgba(26,26,29,0.70)",
                      }}
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 30%, rgba(122,28,172,0.14), transparent 68%)",
                        }}
                      />
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={common + " group"}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 30%, rgba(122,28,172,0.14), transparent 68%)",
                      }}
                    />
                    {content}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className={[
                "hidden lg:inline-flex items-center justify-center",
                "rounded-full px-4 py-2 text-[12px] font-semibold",
                "border",
                "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]",
              ].join(" ")}
              style={{
                borderColor: "rgba(122,28,172,0.16)",
                background: "rgba(255,255,255,0.55)",
                color: "rgba(26,26,29,0.82)",
              }}
              onClick={() => setOpen(false)}
            >
              Start a project
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]"
              style={{
                borderColor: "rgba(122,28,172,0.16)",
                background: "rgba(255,255,255,0.55)",
              }}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} style={{ color: "rgba(26,26,29,0.88)" }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} style={{ color: "rgba(26,26,29,0.88)" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile full-height modal (top → bottom) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Overlay panel */}
            <motion.aside
              className="fixed inset-0 z-[70] origin-top"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background:
                  "radial-gradient(900px circle at 10% -20%, rgba(122,28,172,0.16), transparent 55%)," +
                  "radial-gradient(900px circle at 90% 10%, rgba(173,73,225,0.14), transparent 52%)," +
                  "rgba(255,255,255,0.92)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
            >
              {/* top “status bar” spacing */}
              <div className="pt-5" />

              <div className="mx-auto w-[min(1120px,calc(100%-28px))] h-[calc(100%-20px)]">
                {/* Modal header row */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]"
                  >
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: "rgba(122,28,172,0.14)",
                        background: "rgba(255,255,255,0.70)",
                      }}
                    >
                      <img
                        src="/logo/logo_icon.png"
                        alt="Flamix"
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                    <span className="font-heading text-[16px] tracking-tight">
                      <span style={{ color: "rgba(26,26,29,0.90)" }}>Flamix</span>
                      <span style={{ color: "rgba(122,28,172,0.72)" }}> Technologies</span>
                    </span>
                  </Link>

                  <button
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-12 h-12 rounded-full border
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(122,28,172,0.45)]
                               active:scale-95 transition-transform"
                    style={{
                      borderColor: "rgba(122,28,172,0.14)",
                      background: "rgba(255,255,255,0.70)",
                    }}
                    aria-label="Close menu"
                  >
                    <X size={22} style={{ color: "rgba(26,26,29,0.88)" }} />
                  </button>
                </div>

                {/* Content */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 h-[calc(100%-96px)]">
                  {/* Big nav list */}
                  <motion.nav
                    className="lg:col-span-8 flex flex-col justify-center"
                    aria-label="Mobile navigation"
                    variants={listVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {NAV.map((item, i) => {
                      const isHash = item.href.startsWith("/#") && item.sectionId;
                      const active = isDesktopActive(item.href);

                      const Row = (
                        <motion.div
                          key={item.href}
                          variants={itemVariants}
                          className="group"
                        >
                          <div
                            className={[
                              "relative px-5 sm:px-7 py-5 sm:py-6",
                              "transition-transform duration-300",
                            ].join(" ")}
                          >
                            <div className="relative flex items-center justify-between gap-6">
                              <div className="flex items-center gap-4">
                                {/* Active dot indicator */}
                                {active && (
                                  <span
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                      background: "rgba(122,28,172,0.85)",
                                    }}
                                  />
                                )}
                                {!active && (
                                  <span className="w-2 h-2" />
                                )}

                                <span
                                  className="font-heading text-[26px] sm:text-[34px] leading-none tracking-tight"
                                  style={{
                                    color: "rgba(26,26,29,0.88)",
                                  }}
                                >
                                  {item.label}
                                </span>
                              </div>

                              <span
                                className="text-[12px] sm:text-[13px] font-medium"
                                style={{
                                  color: "rgba(26,26,29,0.45)",
                                }}
                              >
                                Explore →
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );

                      if (isHash) {
                        return (
                          <button
                            key={item.href}
                            type="button"
                            className="text-left"
                            onClick={() => {
                              if (pathname === "/") {
                                scrollToId(item.sectionId!, navOffsetPx());
                              }
                              handleItemClick(item);
                            }}
                          >
                            {Row}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => handleItemClick(item)}
                          className="block"
                        >
                          {Row}
                        </Link>
                      );
                    })}
                  </motion.nav>

                  {/* Right panel (optional info/cta) */}
                  <div className="lg:col-span-4 flex flex-col justify-end mb-8">
                    <div
                      className="rounded-3xl border p-6"
                      style={{
                        borderColor: "rgba(122,28,172,0.12)",
                        background: "rgba(255,255,255,0.62)",
                        boxShadow: "0 16px 44px rgba(46,7,63,0.10)",
                      }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/45">
                        Quick start
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-foreground/70">
                        Want a clean build with premium motion and perfect responsiveness?
                        Let’s scope it properly.
                      </p>

                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="mt-5 inline-flex items-center bg-primary justify-center w-full rounded-2xl px-5 py-4 text-[14px] font-semibold text-white"

                      >
                        Start a project
                      </Link>


                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so content doesn’t hide behind fixed nav */}
      <div className="h-[84px] md:h-[90px]" />
    </>
  );
}
