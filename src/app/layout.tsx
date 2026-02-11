import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: true,
});

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/clash-display/ClashDisplay-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/clash-display/ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/clash-display/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/clash-display/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/clash-display/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/clash-display/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flamixtechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Flamix Technologies | Building Digital Excellence",
    template: "%s | Flamix Technologies",
  },
  description: "We craft innovative software solutions that drive business growth. From cloud infrastructure to AI-powered applications, we turn your vision into reality. Expert software development, cloud solutions, AI & ML services.",
  keywords: [
    "software development",
    "cloud solutions",
    "AI",
    "machine learning",
    "web development",
    "mobile apps",
    "custom software",
    "DevOps",
    "enterprise solutions",
    "digital transformation",
    "Flamix Technologies",
  ],
  authors: [{ name: "Flamix Technologies" }],
  creator: "Flamix Technologies",
  publisher: "Flamix Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Flamix Technologies",
    title: "Flamix Technologies | Building Digital Excellence",
    description: "We craft innovative software solutions that drive business growth. From cloud infrastructure to AI-powered applications, we turn your vision into reality.",
    images: [
      {
        url: "/logo/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Flamix Technologies - Building Digital Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flamix Technologies | Building Digital Excellence",
    description: "We craft innovative software solutions that drive business growth.",
    images: ["/logo/logo.jpg"],
    creator: "@flamixtech",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Technology",
  classification: "Software Development Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flamix Technologies",
    url: baseUrl,
    logo: `${baseUrl}/logo/logo.jpg`,
    description: "We craft innovative software solutions that drive business growth. From cloud infrastructure to AI-powered applications, we turn your vision into reality.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [
      // Add your social media URLs here
      // "https://www.linkedin.com/company/flamix-technologies",
      // "https://twitter.com/flamixtech",
      // "https://github.com/flamixtech",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@flamixtechnologies.com",
      availableLanguage: ["English"],
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Software Development",
      "Cloud Solutions",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Mobile App Development",
      "DevOps",
      "Digital Transformation",
    ],
    foundingDate: "2019",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "50-100",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flamix Technologies",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`antialiased min-h-screen w-full bg-background text-foreground font-sans ${interTight.variable} ${clashDisplay.variable}`}>
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
