import type { Metadata } from "next";
import Script from "next/script";
import { Navbar, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ui";
import { projects } from "@/data/portfolio";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { Suspense } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flamixtechnologies.com";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: `${project.description} Explore this ${project.category.toLowerCase()} project by Flamix Technologies. ${project.hook}`,
    keywords: [
      ...project.tags,
      project.category,
      "software development",
      "portfolio",
      "web development",
      "case study",
      "Flamix Technologies portfolio",
      project.title,
    ],
    openGraph: {
      title: `${project.title} | Flamix Technologies Portfolio`,
      description: `${project.description} ${project.hook}`,
      url: `${baseUrl}/portfolio/${project.id}`,
      type: "website",
      siteName: "Flamix Technologies",
      images: [
        {
          url: `${baseUrl}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.imageAlt || project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Flamix Technologies Portfolio`,
      description: project.description,
      images: [`${baseUrl}${project.image}`],
    },
    alternates: {
      canonical: `${baseUrl}/portfolio/${project.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/portfolio/${project.id}`,
    name: project.title,
    description: project.description,
    image: `${baseUrl}${project.image}`,
    url: project.liveUrl,
    creator: {
      "@type": "Organization",
      name: "Flamix Technologies",
      url: baseUrl,
    },
    keywords: project.tags.join(", "),
    genre: project.category,
    datePublished: "2024",
    inLanguage: "en-US",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${baseUrl}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${baseUrl}/portfolio/${project.id}`,
      },
    ],
  };

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <main className="relative">
        <Script
          id="project-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
        <Script
          id="portfolio-breadcrumb-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Navbar />
        <ProjectDetailClient project={project} allProjects={projects} />
        <Footer />
        <ScrollToTop />
      </main>
    </Suspense>
  );
}
