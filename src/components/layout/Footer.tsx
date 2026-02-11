"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Case Studies", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  company: [
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  // Only make footer sticky on home page
  const isSticky = pathname === "/";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic viewport height for cross-browser compatibility
  useEffect(() => {
    const setDynamicVh = () => {
      // Get the actual viewport height
      const vh = window.innerHeight * 0.01;
      // Set CSS custom property for dynamic viewport height
      document.documentElement.style.setProperty("--dvh", `${vh}px`);
    };

    // Set initial value
    setDynamicVh();

    // Update on resize, orientation change, and scroll (for mobile browsers)
    window.addEventListener("resize", setDynamicVh);
    window.addEventListener("orientationchange", setDynamicVh);
    window.addEventListener("scroll", setDynamicVh, { passive: true });

    return () => {
      window.removeEventListener("resize", setDynamicVh);
      window.removeEventListener("orientationchange", setDynamicVh);
      window.removeEventListener("scroll", setDynamicVh);
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative bg-tertiary text-white w-full"
      style={{
        // Sticky footer reveal effect - only on home page
        position: isSticky ? "sticky" : "relative",
        bottom: isSticky ? 0 : "auto",
        zIndex: isSticky ? 0 : 1,
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16">
        {/* Links Grid */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={isMobile || isInView ? { opacity: 1, y: 0 } : {}}
          transition={isMobile ? {} : { duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/10"
        >
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 sm:mb-8 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <img
                src="/logo/logo_icon.png"
                alt="Flamix"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl"
              />
              <span className="font-bold text-lg sm:text-xl">Flamix</span>
            </Link>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              We build digital products that help businesses grow and succeed in the modern world.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>+977 9800000000</span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="mb-6 sm:mb-0">
              <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-white/40 mb-3 sm:mb-4">
                {category}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={isMobile ? false : { opacity: 0 }}
          animate={isMobile || isInView ? { opacity: 1 } : {}}
          transition={isMobile ? {} : { duration: 0.6, delay: 0.2 }}
          className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6"
        >
          {/* Copyright */}
          <p className="text-white/40 text-xs sm:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Flamix Technologies. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Large Brand Text */}
      <div className="overflow-hidden border-t border-white/5">
        <motion.div
          initial={isMobile ? false : { opacity: 0 }}
          animate={isMobile || isInView ? { opacity: 1 } : {}}
          transition={isMobile ? {} : { duration: 0.8, delay: 0.3 }}
          className="py-6 sm:py-8 md:py-12 pb-8 sm:pb-12 md:pb-16"
        >
          <div className="flex items-center justify-center">
            <span className="text-[12vw] sm:text-[15vw] md:text-[12vw] font-bold text-white/3 leading-none font-heading select-none">
              FLAMIX
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
