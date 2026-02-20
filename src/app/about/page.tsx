import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { AboutPage } from "@/components/sections/AboutPage";
import { ScrollToTop } from "@/components/ui";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flamixtechnologies.com";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Flamix Technologies - a team of passionate technologists, designers, and strategists dedicated to building digital solutions that drive real business results. Discover our mission, values, and expertise in software development.",
  keywords: [
    "about Flamix Technologies",
    "technology company",
    "software development team",
    "digital solutions",
    "web development company",
    "software engineers",
    "tech team",
    "company culture",
    "technology expertise",
  ],
  openGraph: {
    title: "About Us | Flamix Technologies",
    description: "Learn about Flamix Technologies - a team of passionate technologists dedicated to building digital solutions that drive real business results.",
    url: `${baseUrl}/about`,
    type: "website",
    siteName: "Flamix Technologies",
    images: [
      {
        url: `${baseUrl}/logo/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "About Flamix Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Flamix Technologies",
    description: "Learn about Flamix Technologies - a team of passionate technologists dedicated to building digital solutions.",
    images: [`${baseUrl}/logo/logo.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function About() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <AboutPage />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
