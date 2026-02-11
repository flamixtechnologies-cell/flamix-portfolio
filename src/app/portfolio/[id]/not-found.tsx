import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/layout";

export default function NotFound() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-foreground/60 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/#portfolio">
            <Button className="bg-linear-to-r from-primary to-secondary text-white rounded-full">
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
