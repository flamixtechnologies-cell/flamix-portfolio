import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { Contact } from "@/components/sections";
import { ScrollToTop } from "@/components/ui";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flamixtechnologies.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Flamix Technologies. We'd love to hear about your project and help bring your vision to life. Contact us for a free consultation on software development, cloud solutions, AI, and more.",
  keywords: [
    "contact Flamix Technologies",
    "software development consultation",
    "custom software quote",
    "web development services",
    "app development contact",
    "technology consulting",
    "software development company contact",
    "free consultation",
  ],
  openGraph: {
    title: "Contact Us | Flamix Technologies",
    description: "Get in touch with Flamix Technologies. We'd love to hear about your project and help bring your vision to life. Contact us for a free consultation.",
    url: `${baseUrl}/contact`,
    type: "website",
    siteName: "Flamix Technologies",
    images: [
      {
        url: `${baseUrl}/logo/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Flamix Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Flamix Technologies",
    description: "Get in touch with Flamix Technologies. We'd love to hear about your project and help bring your vision to life.",
    images: [`${baseUrl}/logo/logo.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <div className="relative z-10">
        <Contact />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
