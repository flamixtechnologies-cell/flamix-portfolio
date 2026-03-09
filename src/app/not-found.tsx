"use client";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="relative pb-20 md:pb-0">
            <Navbar />

            <section className="pt-24 md:pt-32 pb-16 md:pb-24">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center gap-6 md:gap-8">
                        <span className="inline-flex items-center rounded-full border border-border/40 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-foreground/60">
                            404 • Page Not Found
                        </span>

                        <h1 className="font-[var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
                            Lost in the{" "}
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                digital void
                            </span>
                            .
                        </h1>

                        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-foreground/60">
                            The page you&apos;re looking for doesn&apos;t exist, has moved, or is still being
                            crafted. Let&apos;s guide you back to where the magic happens.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            <Link href="/">
                                <Button
                                    variant="solid"
                                    className="rounded-full px-6 md:px-8"
                                >
                                    Back to home
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    variant="bordered"
                                    className="rounded-full px-6 md:px-8"
                                >
                                    Talk to our team
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

