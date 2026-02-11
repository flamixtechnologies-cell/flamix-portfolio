import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { projects } from "@/data/portfolio";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flamixtechnologies.com";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    keywords: [...project.tags, project.category, "software development", "portfolio"],
    openGraph: {
      title: `${project.title} | Flamix Technologies Portfolio`,
      description: project.description,
      url: `${baseUrl}/portfolio/${project.id}`,
      type: "website",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/portfolio/${project.id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/#portfolio">
            <Button
              variant="light"
              className="mb-8 text-foreground/70"
              startContent={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Portfolio
            </Button>
          </Link>

          {/* Project Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Tag className="w-4 h-4" />
              {project.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              {project.title}
            </h1>
            
            <p className="text-xl text-foreground/60 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Image */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-12 border border-primary/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4 font-heading">Project Overview</h2>
                <p className="text-foreground/60 leading-relaxed mb-6">
                  {project.description} This project showcases our expertise in building scalable, 
                  high-performance solutions that drive business growth. We leveraged cutting-edge 
                  technologies and best practices to deliver exceptional results.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 font-heading mt-8">Key Features</h2>
                <ul className="space-y-3 text-foreground/60">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Scalable architecture designed for growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Modern tech stack for optimal performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Comprehensive testing and quality assurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>User-centric design and seamless experience</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 font-heading mt-8">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Project Info Card */}
                <div className="p-6 rounded-2xl bg-muted/40 border border-primary/10">
                  <h3 className="font-bold text-lg mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/50">Category</p>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/50">Completed</p>
                        <p className="font-medium">2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/50">Team Size</p>
                        <p className="font-medium">5-8 Members</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link href={project.liveUrl || "#"} className="block" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="w-full bg-linear-to-r from-primary to-secondary text-white rounded-full"
                      endContent={<ExternalLink className="w-4 h-4" />}
                    >
                      View Live Project
                    </Button>
                  </Link>
                  <Button
                    variant="bordered"
                    className="w-full border-primary/30 text-foreground rounded-full"
                    startContent={<Github className="w-4 h-4" />}
                  >
                    View Code
                  </Button>
                </div>

                {/* Related Projects */}
                <div className="p-6 rounded-2xl bg-muted/40 border border-primary/10">
                  <h3 className="font-bold text-lg mb-4">Related Projects</h3>
                  <div className="space-y-3">
                    {projects
                      .filter((p) => p.id !== project.id && p.category === project.category)
                      .slice(0, 2)
                      .map((relatedProject) => (
                        <Link
                          key={relatedProject.id}
                          href={`/portfolio/${relatedProject.id}`}
                          className="block p-3 rounded-xl bg-background border border-primary/10 transition-colors"
                        >
                          <p className="font-medium text-sm">{relatedProject.title}</p>
                          <p className="text-xs text-foreground/50 mt-1 line-clamp-1">
                            {relatedProject.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
