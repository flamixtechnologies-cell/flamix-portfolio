export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  link: string;
  liveUrl: string;
  hook: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "going-nepal-adventure",
    title: "Going Nepal Adventure",
    description:
      "Adventure-focused travel brand offering trekking, tours, and outdoor experiences across Nepal, Bhutan, and Tibet with a modern, story-driven web experience.",
    image: "/projects/gna.png",
    imageAlt: "Trekkers walking along a mountain ridge in the Himalayas at sunrise",
    tags: ["Travel Website", "Next.js", "Tailwind CSS", "Conversion-Focused UI"],
    link: "https://goingnepaladventure.com/",
    liveUrl: "https://goingnepaladventure.com/",
    hook: "Adventure travel, made simple.",
    category: "Travel & Adventure",
  },
  {
    id: 2,
    slug: "nepal-luxury-escapes",
    title: "Nepal Luxury Escapes",
    description:
      "High-end luxury travel platform curating bespoke journeys across Nepal, Bhutan, and Tibet, with an emphasis on premium design and clear trip planning flows.",
    image: "/projects/lux.png",
    imageAlt: "Luxury infinity pool overlooking misty Himalayan hills at golden hour",
    tags: ["Luxury Brand", "Next.js", "Tailwind CSS", "UX Strategy"],
    link: "https://nepalluxuryescapes.com/",
    liveUrl: "https://nepalluxuryescapes.com/",
    hook: "Bespoke luxury journeys across the Himalayas.",
    category: "Luxury Travel",
  },
  {
    id: 3,
    slug: "casemandu",
    title: "Casemandu",
    description:
      "E‑commerce experience for lifestyle and tech accessories, designed for fast product discovery, clean presentation, and smooth checkout journeys.",
    image: "/projects/casemandu.png",
    imageAlt: "Minimal product layout with colorful phone cases on a clean background",
    tags: ["E‑commerce", "Modern UI", "Responsive Design", "Performance"],
    link: "https://www.casemandu.com.np/",
    liveUrl: "https://www.casemandu.com.np/",
    hook: "Modern commerce for everyday carry essentials.",
    category: "E‑commerce",
  },
  {
    id: 4,
    slug: "khandbari-rudraksha",
    title: "Khandbari Rudraksha & Suppliers",
    description:
      "Spiritual commerce platform for authentic Rudraksha beads and malas, combining trust-building content, storytelling, and a clean product browsing experience.",
    image: "/projects/khandbari.png",
    imageAlt: "Close-up of Rudraksha beads and a mala resting on a wooden surface",
    tags: ["E‑commerce", "Brand Storytelling", "Conversion Design", "SEO"],
    link: "https://www.khandbarirudraksha.com/",
    liveUrl: "https://www.khandbarirudraksha.com/",
    hook: "Authentic Rudraksha, presented with trust and clarity.",
    category: "Spiritual & Retail",
  },
  {
    id: 5,
    slug: "vajra-foundation-nepal",
    title: "Vajra Foundation Nepal",
    description:
      "Impact‑driven NGO website focused on education, health, and environment initiatives, designed to highlight stories, transparency, and donation journeys.",
    image: "/projects/vajra.png",
    imageAlt: "Children in a classroom in rural Nepal raising their hands and smiling",
    tags: ["NGO Website", "Storytelling", "Donor Experience", "Accessibility"],
    link: "https://vajrafoundationnepal.org/",
    liveUrl: "https://vajrafoundationnepal.org/",
    hook: "Design that puts impact, stories, and trust first.",
    category: "Non‑profit",
  },
];

export const services = [
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure design, migration, and optimization for enterprise workloads.",
    icon: "Cloud",
  },
  {
    title: "Custom Development",
    description: "Bespoke software solutions tailored to your business needs with modern tech stacks.",
    icon: "Code",
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent automation and data-driven insights powered by cutting-edge ML models.",
    icon: "Brain",
  },
  {
    title: "DevOps & CI/CD",
    description: "Streamlined deployment pipelines and infrastructure automation for faster delivery.",
    icon: "GitBranch",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security audits, penetration testing, and compliance implementation.",
    icon: "Shield",
  },
  {
    title: "Technical Consulting",
    description: "Strategic technology guidance and architecture reviews from industry experts.",
    icon: "Lightbulb",
  },
];

export const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime Guaranteed" },
  { value: "24/7", label: "Support Available" },
];

export const technologies = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
  "AWS", "GCP", "Azure", "Kubernetes", "Docker", "Terraform",
  "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST", "gRPC",
];
