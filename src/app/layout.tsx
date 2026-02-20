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
    "software consulting",
    "full stack development",
    "cloud migration",
    "microservices",
    "API development",
    "software architecture",
    "agile development",
    "scalable software",
    "enterprise software",
  ],
  authors: [{ name: "Flamix Technologies", url: baseUrl }],
  creator: "Flamix Technologies",
  publisher: "Flamix Technologies",
  applicationName: "Flamix Technologies",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
        url: `${baseUrl}/logo/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "Flamix Technologies - Building Digital Excellence",
        type: "image/jpeg",
      },
    ],
    emails: ["contact@flamixtechnologies.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flamix Technologies | Building Digital Excellence",
    description: "We craft innovative software solutions that drive business growth. From cloud infrastructure to AI-powered applications, we turn your vision into reality.",
    images: [`${baseUrl}/logo/logo.jpg`],
    creator: "@flamixtech",
    site: "@flamixtech",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
    },
  },
  category: "Technology",
  classification: "Software Development Company",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Flamix Technologies",
    "mobile-web-app-capable": "yes",
    "theme-color": "#000000",
    "color-scheme": "light",
    // Verification tags - Add your actual verification codes here
    // "google-site-verification": "your-google-verification-code",
    // "msvalidate.01": "your-bing-verification-code",
    // "yandex-verification": "your-yandex-verification-code",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo/logo_icon.png", sizes: "192x192", type: "image/png" },
      { url: "/logo/logo_icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo/logo_icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development Services",
    provider: {
      "@type": "Organization",
      name: "Flamix Technologies",
      url: baseUrl,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Solutions",
            description: "Scalable cloud infrastructure design, migration, and optimization for enterprise workloads.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Development",
            description: "Bespoke software solutions tailored to your business needs with modern tech stacks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI & Machine Learning",
            description: "Intelligent automation and data-driven insights powered by cutting-edge ML models.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DevOps & CI/CD",
            description: "Streamlined deployment pipelines and infrastructure automation for faster delivery.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cybersecurity",
            description: "Comprehensive security audits, penetration testing, and compliance implementation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical Consulting",
            description: "Strategic technology guidance and architecture reviews from industry experts.",
          },
        },
      ],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo/logo_icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Flamix Technologies" />
      </head>
      <body className={`antialiased min-h-screen w-full pt-28 bg-background text-foreground font-sans ${interTight.variable} ${clashDisplay.variable}`}>
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
        <Script
          id="service-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <Script
          id="breadcrumb-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
