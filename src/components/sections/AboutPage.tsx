"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { Github, Linkedin, Globe2, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const teamMembers = [
  {
    name: "Saurav Karki",
    role: "AI/ML Engineer, Backend Developer",
    bio: "Builds reliable backends and AI-powered systems that turn complex data into practical, production-grade products.",
    image: "/teams/saurav.jpg",
    discipline: "AI, Data & Systems",
    year: "2019",
    github: "https://github.com/itsmesauravk",
    linkedin: "https://www.linkedin.com/in/saurav-karki-46713526b/",
    portfolio: "https://saurav-karki.com.np/",
  },
  {
    name: "Balbir Singh Thapa",
    role: "Product Manager, QA Specialist, Backend Engineer",
    bio: "Owns the bridge between product, quality, and engineering so every release is stable, thoughtful, and ship-ready.",
    image: "/teams/balbir.jpg",
    discipline: "Product, Quality & Delivery",
    year: "2020",
    github: "https://github.com/Kzsanjeet",
    linkedin: "https://www.linkedin.com/in/sanjeet-kazi-thapa-22a895263/",
    portfolio: "https://balbirsinghthapa.vercel.app/",
  },
  {
    name: "Nischal Neupane",
    role: "Software Engineer, Web Designer, DevOps Engineer",
    bio: "Software engineer and DevOps engineer focused on fast, clean, conversion-ready interfaces that feel effortless to use.",
    image: "/teams/nischal.jpg",
    discipline: "Engineering & Design",
    year: "2019",
    github: "https://github.com/Nischal1111",
    linkedin: "https://www.linkedin.com/in/nischal-neupane-bb951b238/",
    portfolio: "https://www.nischal-neupane.com.np/",
  },
];

const coreValues = [
  {
    number: "01",
    keyword: "PRECISION",
    title: "Craft over shortcuts",
    description:
      "We don't ship 80%. Every detail — button states, hover effects, server response times, edge cases — is deliberate. Our floor is most agencies' ceiling.",
  },
  {
    number: "02",
    keyword: "CANDOR",
    title: "Radical transparency",
    description:
      "We'll tell you hard truths early. Surprises belong on birthdays, not on launch day. Uncomfortable conversations now beat expensive problems later.",
  },
  {
    number: "03",
    keyword: "OWNERSHIP",
    title: "Full commitment",
    description:
      "When we take something on, it's ours to make right. We don't point fingers or make excuses. We stay invested long after launch — whatever it takes.",
  },
  {
    number: "04",
    keyword: "IMPACT",
    title: "Results that last",
    description:
      "Beautiful products that perform. We obsess over conversions, load times, and real retention — not just how something looks in a Figma mockup.",
  },
];

/* ─────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────── */
export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.5]);
  const heroY = useTransform(scrollYProgress, [0, 0.65], [0, 90]);

  return (
    <div className="relative font-heading">
      {/* ══════════════════════════════════════════════════
          HERO — About introduction
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col overflow-hidden bg-background"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex-1 flex flex-col max-w-[1920px] mx-auto w-full px-6 md:px-12 lg:px-20 pt-12 pb-16"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex items-center gap-3 mb-6 md:mb-10"
          >
            <div
              className="h-px w-6"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
            <span
              className="text-base uppercase tracking-[0.35em] font-heading"
              style={{ color: "var(--color-primary)" }}
            >
              About Flamix Technologies
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl">
            <div className="overflow-hidden mb-5">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                className="font-heading font-medium leading-[0.92] tracking-tight text-foreground"
                style={{ fontSize: "clamp(42px, 7vw, 56px)" }}
              >
                Building the Future,
                <br />
                One Line at a Time
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg leading-relaxed font-heading mt-6 max-w-2xl"
              style={{ color: "rgba(26,26,29,0.55)" }}
            >
              We&apos;re a team of passionate technologists dedicated to crafting
              exceptional digital experiences that transform businesses and delight users.
              Since 2019, we&apos;ve been pushing boundaries, combining cutting-edge
              technology with thoughtful design.
            </motion.p>
          </div>

          {/* Identity metrics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 md:mt-16 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
            style={{ borderTop: "1px solid rgba(26,26,29,0.08)" }}
          >
            {[
              { label: "Founded", value: "2019" },
              { label: "Location", value: "Nepal" },
              { label: "Reach", value: "Global" },
              { label: "Team", value: "3 Core" },
            ].map((item, i) => (
              <div key={item.label}>
                <div
                  className="text-[10px] uppercase tracking-[0.3em] font-heading mb-1.5"
                  style={{ color: "rgba(26,26,29,0.4)" }}
                >
                  {item.label}
                </div>
                <div className="text-lg md:text-xl font-heading font-semibold text-foreground">
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          NUMBERS — Dark stats section
      ══════════════════════════════════════════════════ */}
      <NumbersSection />

      {/* ══════════════════════════════════════════════════
          STORY — The origin
      ══════════════════════════════════════════════════ */}
      <Section id="story" className="relative">
        <SectionHeading
          title="The Story Behind the Code"
          description="Every great company starts with a vision. Ours began with a simple question: What if technology could be both powerful and beautiful?"
          number="01"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-foreground/70 font-heading"
          >
            Founded in 2019, Flamix Technologies emerged from a shared frustration. Too many
            digital products were beautifully designed but poorly built — or technically sound
            but user-hostile. We refused to accept that tradeoff.
          </motion.p>
          <div className="flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg leading-relaxed text-foreground/60 font-heading"
            >
              Today, we partner with ambitious startups and growth-stage companies building
              things that matter. Our core philosophy remains unchanged: every project is an
              opportunity to prove that exceptional is not a bonus — it&apos;s the baseline.
            </motion.p>

          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          VALUES — What drives us
      ══════════════════════════════════════════════════ */}
      <ValuesSection />

      {/* ══════════════════════════════════════════════════
          TEAM — The people
      ══════════════════════════════════════════════════ */}
      <TeamSection />

      <CTA />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NUMBERS SECTION
───────────────────────────────────────────────────────────── */
function NumbersSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ backgroundColor: "var(--color-foreground)" }}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16 md:mb-20"
        >
          <div
            className="w-5 h-px"
            style={{ backgroundColor: "rgba(122,28,172,0.6)" }}
          />
          <span
            className="text-lg uppercase tracking-[0.5em] font-heading"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Our Vision
          </span>
        </motion.div>

        {/* Blockquote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.2 }}
        >
          <p
            className="font-heading font-medium text-white leading-[1.2] mb-6"
            style={{ fontSize: "clamp(32px, 4.5vw, 40px)" }}
          >
            &ldquo;To build digital products that don&apos;t just meet expectations
            <br />
            but redefine what&apos;s possible.&rdquo;
          </p>
          <p
            className="text-sm font-heading leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Our goal is to create technology that empowers businesses to achieve
            extraordinary outcomes. We envision a future where every digital interaction
            is seamless, every system is reliable, and every solution is built with
            uncompromising quality.
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   VALUES SECTION
───────────────────────────────────────────────────────────── */
function ValuesSection() {
  return (
    <section className="relative" style={{ backgroundColor: "#F8F8F8" }}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28">
        <SectionHeading
          title="What Drives Us"
          description="Four principles we've actually lived by since 2019 — not aspirational fluff, not borrowed mission statements."
          number="02"
        />

        {/* Values list */}
        <div style={{ borderTop: "1px solid rgba(26,26,29,0.08)" }}>
          {coreValues.map((value, i) => (
            <ValueRow key={value.number} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Single value row ─── */
function ValueRow({
  value,
  index,
}: {
  value: (typeof coreValues)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09 }}
      className="group relative flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-16 py-10 md:py-12 px-4"
      style={{ borderBottom: "1px solid rgba(26,26,29,0.07)" }}
    >
      {/* Hover accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      {/* Number + keyword */}
      <div className="shrink-0 flex items-baseline gap-4">
        <span
          className="font-heading font-bold leading-none select-none"
          style={{
            fontSize: "clamp(40px, 4.5vw, 64px)",
            color: "rgba(26,26,29,0.05)",
          }}
        >
          {value.number}
        </span>

      </div>

      {/* Title + description */}
      <div className="flex-1 flex flex-col md:flex-row md:items-start md:gap-12 lg:gap-20">
        <h3
          className="font-heading font-medium text-foreground shrink-0 leading-tight md:w-[200px] lg:w-[240px]"
          style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
        >
          {value.title}
        </h3>
        <p
          className="text-[15px] leading-[1.75] font-heading flex-1"
          style={{ color: "rgba(26,26,29,0.55)" }}
        >
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TEAM SECTION
───────────────────────────────────────────────────────────── */
function TeamSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="team" className="relative overflow-hidden bg-background">
      {/* ── Header ── */}
      <div
        ref={headerRef}
        className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-10 md:pb-14"
      >
        <SectionHeading
          title="Meet the Team"
          description="Three obsessive craftspeople who treat every build like their own product."
          number="02"
        />

        {/* Large editorial wordmark */}
        <div className="mt-10 md:mt-12 overflow-hidden">
          <motion.div
            initial={{ y: "105%" }}
            animate={isHeaderInView ? { y: "0%" } : {}}
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="flex items-baseline gap-4 md:gap-7"
          >
            <span className="font-heading font-semibold leading-none shrink-0 text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/40 pb-2">
              The
            </span>
            <span
              className="font-heading font-bold leading-[0.82] tracking-tight text-foreground"
              style={{
                fontSize: "clamp(72px, 13vw, 110px)",
              }}
            >
              TEAM
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Portrait grid ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ borderTop: "1px solid rgba(26,26,29,0.08)" }}
      >
        {teamMembers.map((member, index) => (
          <PortraitCard key={index} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PORTRAIT CARD
───────────────────────────────────────────────────────────── */
function PortraitCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        borderRight: index < 2 ? "1px solid rgba(26,26,29,0.07)" : "none",
        paddingTop: index === 1 ? "clamp(24px, 4vw, 52px)" : "0",
      }}
    >
      {/* Portrait — full-column, wipe reveal */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
          animate={
            isInView
              ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
              : {}
          }
          transition={{
            duration: 1.1,
            delay: index * 0.12 + 0.12,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover grayscale brightness-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.04] group-hover:brightness-100"
          />

          {/* Purple duotone — dissolves on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(46,7,63,0.22) 0%, rgba(122,28,172,0.12) 100%)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(26,26,29,0.92) 0%, rgba(26,26,29,0.3) 38%, transparent 65%)",
            }}
          />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: index * 0.12 + 0.5,
              }}
            >
              <div
                className="text-[7px] uppercase tracking-[0.42em] font-heading mb-4 transition-transform duration-500 group-hover:-translate-y-0.5"
                style={{ color: "rgba(235,211,248,0.48)" }}
              >
                {String(index + 1).padStart(2, "0")} / {member.discipline}
              </div>

              <h3
                className="font-heading font-bold leading-[0.86] tracking-tight text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
                style={{ fontSize: "clamp(26px, 2.7vw, 46px)" }}
              >
                {member.name}
              </h3>

              <div
                className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.32em] font-heading transition-transform duration-500 ease-out"
                style={{
                  color: "rgba(235,211,248,0.7)",
                  transitionDelay: "30ms",
                }}
              >
                {member.role}
              </div>

              {/* Social links */}
              <div className="mt-5 flex items-center gap-3.5">
                {member.github && (
                  <Link
                    href={member.github}
                    aria-label={`${member.name} on GitHub`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Github className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                  </Link>
                )}
                {member.portfolio && member.portfolio !== "#" && (
                  <Link
                    href={member.portfolio}
                    aria-label={`${member.name} portfolio`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Globe2 className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bio below portrait */}
      <div
        className="px-7 md:px-8 lg:px-10 py-8 md:py-9"
        style={{ borderTop: "1px solid rgba(26,26,29,0.07)" }}
      >
        <p
          className="text-sm leading-relaxed font-heading"
          style={{ color: "rgba(26,26,29,0.5)" }}
        >
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}
