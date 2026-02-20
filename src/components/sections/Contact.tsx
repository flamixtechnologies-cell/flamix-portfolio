"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextRevealChars } from "@/components/ui/TextReveal";

/* ─────────────────────────────────────────────────────────────
   CONFIG — fill these in .env.local
   NEXT_PUBLIC_EMAILJS_SERVICE_ID
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
───────────────────────────────────────────────────────────── */
const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const SERVICE_OPTIONS = [
    "Web Development",
    "AI & ML Solutions",
    "Custom Software (B2B & SaaS)",
    "E-Commerce Solutions",
    "Digital Marketing",
    "Web Design",
];

const CONTACT_DETAILS = [
    {
        label: "Email",
        value: "flamixtechnologies@gmail.com",
        href: "mailto:flamixtechnologies@gmail.com",
    },
    {
        label: "Phone",
        value: "+977 9843928450",
        href: "tel:+977984392845",
    },
    {
        label: "Location",
        value: "Kathmandu, Nepal",
        href: "https://maps.app.goo.gl/BDF7o4yNrnuXKhoT9",
    },
];

const NEXT_STEPS = [
    {
        number: "01",
        title: "We read everything",
        body: "Every message lands with a real person — no bots, no auto-replies, no black holes.",
    },
    {
        number: "02",
        title: "We respond fast",
        body: "Expect a considered reply within 24 hours. Usually a lot sooner.",
    },
    {
        number: "03",
        title: "We build together",
        body: "If it's a fit, we move without bureaucracy. Straight to scoping, straight to work.",
    },
];

/* ─────────────────────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────────────────────── */
export function Contact() {
    const formRef = useRef<HTMLFormElement>(null);

    const [mode, setMode] = useState<"message" | "call">("message");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [charCount, setCharCount] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        // Validate EmailJS configuration
        if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) {
            setSubmitError("Email service is not configured. Please contact the administrator.");
            setIsSubmitting(false);
            return;
        }

        try {
            await emailjs.send(
                EJS_SERVICE,
                EJS_TEMPLATE,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    company: formData.company || "—",
                    services: selectedServices.join(", ") || "—",
                    message: formData.message,
                },
                EJS_KEY
            );

            setIsSuccess(true);
            setFormData({ name: "", email: "", company: "", message: "" });
            setSelectedServices([]);
            setCharCount(0);
            setTimeout(() => setIsSuccess(false), 6000);
        } catch (error) {
            console.error("EmailJS error:", error);
            setSubmitError(
                error instanceof Error && error.message
                    ? `Failed to send message: ${error.message}`
                    : "Something went wrong. Please try again or email us directly."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "message") setCharCount(value.length);
    };

    const toggleService = (svc: string) => {
        setSelectedServices((prev) =>
            prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
        );
    };

    return (
        <section
            id="contact"
            className="relative"
            style={{ backgroundColor: "var(--color-background)" }}
        >
            {/* ══════════════════════════════════════════
                HERO HEADER
            ══════════════════════════════════════════ */}
            <ContactHeader />

            {/* ══════════════════════════════════════════
                MODE TOGGLE
            ══════════════════════════════════════════ */}
            <div
                className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mt-8 md:mt-12"
                style={{ borderTop: "1px solid rgba(26,26,29,0.08)" }}
            >
                <div className="flex">
                    {(["message", "call"] as const).map((m, idx) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className="relative flex-1 text-left py-7 cursor-pointer"
                            style={{
                                borderRight: idx === 0 ? "1px solid rgba(26,26,29,0.07)" : "none",
                                paddingRight: idx === 0 ? "clamp(16px, 3vw, 40px)" : "0",
                                paddingLeft: idx === 1 ? "clamp(16px, 3vw, 40px)" : "0",
                            }}
                        >
                            <span
                                className="text-sm uppercase tracking-[0.44em] font-sans block mb-1.5 transition-colors duration-300"
                                style={{
                                    color: mode === m ? "var(--color-primary)" : "rgba(26,26,29,0.4)",
                                }}
                            >
                                Option {idx === 0 ? "01" : "02"}
                            </span>
                            <span
                                className="font-heading font-bold transition-colors duration-300"
                                style={{
                                    fontSize: "clamp(20px, 2.8vw, 42px)",
                                    color: mode === m ? "#1A1A1D" : "rgba(26,26,29,0.4)",
                                }}
                            >
                                {m === "message" ? "Write to us" : "Book a call"}
                            </span>

                            {/* Sliding underline */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-[2px]"
                                style={{ backgroundColor: "var(--color-primary)" }}
                                initial={false}
                                animate={{ scaleX: mode === m ? 1 : 0, originX: 0 }}
                                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════
                CONTENT — always rendered, toggled by display
                (keeps Cal.com embed alive in DOM)
            ══════════════════════════════════════════ */}
            {/* ── Form panel ── */}
            <div
                className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12"
                style={{
                    borderTop: "1px solid rgba(26,26,29,0.08)",
                    display: mode === "message" ? undefined : "none",
                }}
            >
                {/* Form column */}
                <div
                    className="lg:col-span-8 px-6 md:px-12 lg:px-20 py-14 md:py-20"
                    style={{ borderRight: "1px solid rgba(26,26,29,0.07)" }}
                >
                    {/* Success */}
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-12 py-5 pl-5 border-l-2"
                                style={{ borderColor: "var(--color-primary)" }}
                            >
                                <p
                                    className="font-heading font-semibold"
                                    style={{ fontSize: "clamp(16px, 1.5vw, 22px)", color: "#1A1A1D" }}
                                >
                                    Message received.
                                </p>
                                <p className="text-sm mt-1 font-sans" style={{ color: "#1A1A1D" }}>
                                    We&apos;ll be in touch within 24 hours.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error */}
                    <AnimatePresence>
                        {submitError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-10 py-4 pl-5 border-l-2"
                                style={{ borderColor: "rgba(220,38,38,0.6)" }}
                            >
                                <p className="text-sm font-sans" style={{ color: "rgba(220,38,38,0.8)" }}>
                                    {submitError}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form ref={formRef} onSubmit={handleSubmit}>
                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <ContactField
                                label="Full Name"
                                name="name"
                                type="text"
                                placeholder="Alex Mercer"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <ContactField
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="alex@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Row 2: Company */}
                        <ContactField
                            label="Company"
                            name="company"
                            type="text"
                            placeholder="Your Company (optional)"
                            value={formData.company}
                            onChange={handleChange}
                        />

                        {/* Services */}
                        <div className="pt-8 pb-9" style={{ borderTop: "1px solid rgba(26,26,29,0.07)" }}>
                            <label
                                className="block text-base uppercase tracking-[0.44em] font-sans mb-5"
                                style={{ color: "#1A1A1D" }}
                            >
                                What do you need?
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {SERVICE_OPTIONS.map((svc) => {
                                    const active = selectedServices.includes(svc);
                                    return (
                                        <button
                                            key={svc}
                                            type="button"
                                            onClick={() => toggleService(svc)}
                                            className="px-4 py-2 text-[10px] cursor-pointer font-sans uppercase tracking-[0.22em] transition-all duration-200"
                                            style={{
                                                border: `1px solid ${active ? "var(--color-primary)" : "#1A1A1D"}`,
                                                color: active ? "var(--color-primary)" : "#1A1A1D",
                                                backgroundColor: active ? "rgba(122,28,172,0.1)" : "transparent",
                                            }}
                                        >
                                            {svc}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Message */}
                        <div style={{ borderTop: "1px solid rgba(26,26,29,0.07)" }}>
                            <div className="pt-8 pb-9">
                                <div className="flex items-center justify-between mb-4">
                                    <label
                                        className="block text-base uppercase tracking-[0.44em] font-sans"
                                        style={{ color: "#1A1A1D" }}
                                    >
                                        Project details
                                        <span className="ml-0.5" style={{ color: "var(--color-primary)" }}>*</span>
                                    </label>

                                </div>
                                <textarea
                                    name="message"
                                    placeholder="Tell us what you're building, your goals, timeline, and any technical constraints — the more detail, the better our reply."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={7}
                                    className="w-full bg-transparent font-sans text-base outline-none pb-3 resize-none transition-colors duration-300"
                                    style={{ color: "#1A1A1D", borderBottom: "1px solid rgba(26,26,29,0.12)" }}
                                    onFocus={(e) => { e.currentTarget.style.borderBottomColor = "var(--color-primary)"; }}
                                    onBlur={(e) => { e.currentTarget.style.borderBottomColor = "rgba(26,26,29,0.12)"; }}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <MagneticButton
                            disabled={isSubmitting}
                            variant="outline"
                            size="lg"
                            unstyled
                            className="w-fit bg-foreground text-white border-2 border-foreground hover:bg-[#2A2A2D] hover:border-[#2A2A2D] px-8 py-4 rounded-xl font-heading font-bold text-lg md:text-xl lg:text-2xl"
                            onClick={() => {
                                if (formRef.current) {
                                    formRef.current.requestSubmit();
                                }
                            }}
                        >
                            {isSubmitting ? "Sending…" : "Send Message"}
                        </MagneticButton>
                    </form>
                </div>

                {/* Form sidebar */}
                <FormSidebar />
            </div>

            {/* ── Cal.com panel ── */}
            <div
                className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12"
                style={{
                    borderTop: "1px solid rgba(26,26,29,0.08)",
                    display: mode === "call" ? undefined : "none",
                }}
            >
                <div
                    className="lg:col-span-8 px-6 md:px-12 lg:px-20 py-14 md:py-20"
                    style={{ borderRight: "1px solid rgba(26,26,29,0.07)" }}
                >
                    <CalInlineEmbed />
                </div>

                <CalSidebar />
            </div>

            {/* ══════════════════════════════════════════
                WHAT HAPPENS NEXT
            ══════════════════════════════════════════ */}
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
                <SectionHeading
                    title="What Happens Next"
                    description="Our process is straightforward. No fluff, no unnecessary steps — just clear communication and fast execution."
                    number="00"
                />
            </div>
            <WhatHappensNext />
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT HEADER
   Custom header with unique layout and design - inspired by SectionHeading
   but with distinct vertical stacking and typography treatment
───────────────────────────────────────────────────────────── */
function ContactHeader() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div
            ref={ref}
            className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-6 md:pb-8"
        >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
                <div className="flex flex-col flex-1">
                    {/* Main Title - Large, Bold, Split */}
                    <div className="relative mb-6 md:mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="overflow-hidden"
                        >
                            <h1
                                className="font-heading font-bold leading-[0.85] tracking-[-0.02em]"
                                style={{
                                    fontSize: "clamp(56px, 12vw, 80px)",
                                    color: "#1A1A1D",
                                }}
                            >
                                <TextRevealChars delay={0.2} stagger={0.035}>
                                    Let&apos;s
                                </TextRevealChars>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                            className="overflow-hidden -mt-2 md:-mt-4"
                        >
                            <h1
                                className="font-heading font-bold leading-[0.85] tracking-[-0.02em] relative"
                                style={{
                                    fontSize: "clamp(56px, 12vw, 120px)",
                                    WebkitTextStroke: "2.5px #1A1A1D",
                                    color: "transparent",
                                }}
                            >
                                <TextRevealChars delay={0.55} stagger={0.035}>
                                    Talk.
                                </TextRevealChars>
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Description Paragraph */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex-1 lg:max-w-[40%] flex flex-col gap-6 lg:pt-4"
                >
                    <p
                        className="text-xs md:text-sm leading-relaxed font-light font-sans max-w-md uppercase tracking-wider"
                        style={{ color: "#6B6B6B" }}
                    >
                        Whether you&apos;re launching a new product, scaling your platform, or building something entirely new — we&apos;re here to turn your vision into reality.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   CAL.COM INLINE EMBED
   Uses the official embed snippet from Cal.com
───────────────────────────────────────────────────────────── */
function CalInlineEmbed() {
    useEffect(() => {
        if (document.getElementById("cal-flamix-init")) return;

        const script = document.createElement("script");
        script.id = "cal-flamix-init";
        script.type = "text/javascript";
        // Minified version of the official Cal.com embed snippet
        script.text = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});
Cal.ns["30min"]("inline", {
  elementOrSelector:"#my-cal-inline-30min",
  config: {"layout":"month_view","useSlotsViewOnMobile":"true","theme":"dark"},
  calLink: "flamix-technologies-9ds0lc/30min"
});
Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view","theme":"dark"});`;

        document.body.appendChild(script);
    }, []);

    return (
        <div
            id="my-cal-inline-30min"
            style={{ width: "100%", height: "min(720px, 82vh)", overflow: "scroll" }}
        />
    );
}

/* ─────────────────────────────────────────────────────────────
   SIDEBARS
───────────────────────────────────────────────────────────── */
function FormSidebar() {
    return (
        <div className="lg:col-span-4 px-6 md:px-12 lg:px-14 py-14 md:py-20">
            <p className="text-sm leading-relaxed font-sans mb-14" style={{ color: "#1A1A1D" }}>
                We don&apos;t do discovery calls for the sake of it. Tell us
                what you&apos;re building — we&apos;ll respond with exactly
                how we&apos;d approach it.
            </p>
            <ContactDetailList />
        </div>
    );
}

function CalSidebar() {
    return (
        <div className="lg:col-span-4 px-6 md:px-12 lg:px-14 py-14 md:py-20">
            <p className="text-sm leading-relaxed font-sans mb-14" style={{ color: "#1A1A1D" }}>
                Book a 30-minute intro call. Come with your idea — we&apos;ll
                show up with questions and a rough plan of attack.
            </p>
            <ContactDetailList />
        </div>
    );
}

function ContactDetailList() {
    return (
        <div>
            {CONTACT_DETAILS.map((detail) => (
                <a
                    key={detail.label}
                    href={detail.href}
                    className="group block py-5"
                    style={{ borderBottom: "1px solid rgba(26,26,29,0.07)" }}
                >
                    <div className="text-base uppercase tracking-[0.44em] font-sans mb-1.5" style={{ color: "#1A1A1D" }}>
                        {detail.label}
                    </div>
                    <div
                        className="font-heading font-semibold leading-tight transition-transform duration-300 ease-out group-hover:translate-x-1"
                        style={{ fontSize: "clamp(13px, 1.1vw, 18px)", color: "#1A1A1D" }}
                    >
                        {detail.value}
                    </div>
                </a>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   WHAT HAPPENS NEXT
───────────────────────────────────────────────────────────── */
function WhatHappensNext() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div
            ref={ref}
            className="max-w-[1920px] mx-auto pb-12 md:pb-20"
            style={{ borderTop: "1px solid rgba(26,26,29,0.08)" }}
        >
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 px-6 md:px-12 lg:px-20" style={{ borderTop: "1px solid rgba(26,26,29,0.06)" }}>
                {NEXT_STEPS.map((step, i) => (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                        className="py-12 md:py-14"
                        style={{
                            paddingLeft: i === 0 ? "clamp(24px, 5vw, 80px)" : "clamp(24px, 3vw, 48px)",
                            paddingRight: "clamp(24px, 3vw, 48px)",
                            borderRight: i < 2 ? "1px solid rgba(26,26,29,0.07)" : "none",
                            borderTop: i > 0 ? "1px solid rgba(26,26,29,0.07)" : "none",
                        }}
                    >
                        {/* Ghost number */}
                        <span
                            className="font-heading font-bold block mb-6 leading-none select-none"
                            style={{ fontSize: "clamp(56px, 6vw, 100px)", color: "rgba(26,26,29,0.05)" }}
                        >
                            {step.number}
                        </span>
                        <h3
                            className="font-heading font-semibold mb-3"
                            style={{ fontSize: "clamp(16px, 1.3vw, 21px)", color: "#1A1A1D" }}
                        >
                            {step.title}
                        </h3>
                        <p className="text-sm font-sans leading-relaxed" style={{ color: "#1A1A1D" }}>
                            {step.body}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FIELD
───────────────────────────────────────────────────────────── */
function ContactField({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    required,
    hasBorderLeft,
}: {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    hasBorderLeft?: boolean;
}) {
    return (
        <div
            className="pt-7 pb-8"
            style={{
                borderLeft: hasBorderLeft ? "1px solid rgba(26,26,29,0.07)" : "none",
                paddingLeft: hasBorderLeft ? "clamp(16px, 3vw, 40px)" : "0",
                paddingRight: hasBorderLeft ? "0" : "clamp(16px, 3vw, 40px)",
            }}
        >
            <label
                className="block text-base uppercase tracking-[0.44em] font-sans mb-4"
                style={{ color: "#1A1A1D" }}
            >
                {label}
                {required && (
                    <span className="ml-0.5" style={{ color: "var(--color-primary)" }}>*</span>
                )}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-transparent font-sans text-base outline-none pb-3 placeholder:opacity-90 transition-colors duration-300"
                style={{ color: "#1A1A1D", borderBottom: "1px solid rgba(26,26,29,0.12)" }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "var(--color-primary)"; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "rgba(26,26,29,0.12)"; }}
            />
        </div>
    );
}
