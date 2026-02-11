"use client";

import { Section } from "@/components/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";

export function Portfolio() {
  return (
    <Section
      id="portfolio"
      className="relative overflow-hidden bg-linear-to-b from-background via-background/95 to-background"
    >

      {/* Header */}
      <SectionHeading
        title="Delivering Excellence"
        description="A curated look at digital experiences we've crafted for travel, e-commerce, and impact-driven brands."
        number="05"
      />

      {/* ===== Premium Grid Layout ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-[300px] max-md:mt-20 mt-10">

        {projects.map((project, i) => {
          // Layout Composition Control
          // Big row / small row pattern:
          // - Each "row" has 2 items on md+ (grid-cols-2)
          // - For every even row (0, 2, 4...), make the first item tall (row-span-2)
          const col = i % 2; // 0 = left, 1 = right
          const row = Math.floor(i / 2);
          const isBigRow = row % 2 === 0;

          // Additionally, ensure the 3rd card (index 2) is always tall
          const isThirdCard = i === 2;

          const span =
            isBigRow && col === 0
              ? "md:row-span-2"
              : isThirdCard
                ? "md:row-span-2"
                : "";

          return (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className={`group relative overflow-hidden rounded-2xl  ${span}`}
            >

              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="
                    object-cover
                    transition-transform duration-900 ease-out
                    group-hover:scale-[1.04]
                  "
                />
              </div>

              {/* Gradient Depth */}
              <div className="
                absolute inset-0 
                bg-black/50
              " />


              {/* Content */}
              <div className="absolute bottom-0 p-6 md:p-8 text-foreground">

                {/* Category */}
                <div className="
                  text-[11px]
                  tracking-wider
                  uppercase
                  mb-3
                  text-white
                ">
                  {project.category}
                </div>

                {/* Title */}
                <h3 className="
                  text-xl md:text-2xl font-semibold
                  leading-tight
                  mb-2
                  text-white
                  transition-transform duration-500
                  group-hover:-translate-y-[2px]
                ">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="
                  text-white
                  text-sm md:text-[15px]
                  leading-relaxed
                  line-clamp-2
                ">
                  {project.description}
                </p>

              </div>
            </Link>
          );
        })}

      </div>

    </Section>
  );
}
