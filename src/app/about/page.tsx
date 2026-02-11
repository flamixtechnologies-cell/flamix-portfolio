import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { About } from "@/components/sections";
import { ScrollToTop } from "@/components/ui";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flamixtechnologies.com";

export const metadata: Metadata = {
  title: "About Us | Flamix Technologies",
  description: "Learn about Flamix Technologies - a team of passionate technologists, designers, and strategists dedicated to building digital solutions that drive real business results.",
  keywords: [
    "about Flamix Technologies",
    "technology company",
    "software development team",
    "digital solutions",
    "web development company",
  ],
  openGraph: {
    title: "About Us | Flamix Technologies",
    description: "Learn about Flamix Technologies - a team of passionate technologists dedicated to building digital solutions that drive real business results.",
    url: `${baseUrl}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <About />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
