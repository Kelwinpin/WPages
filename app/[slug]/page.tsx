"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useFetchDocData from "@/hooks/useFetchDocData";

interface PageProps {
    params: {
      slug: string;
    };
}

export default function Page({ params }: PageProps) {
    const { data } = useFetchDocData(params.slug);
    console.log("🚀 ~ Page ~ data:", data)

    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <a href={`/${params.slug}`} className="text-xl font-bold">
                  {data?.title || 'Landing Page'}
                </a>
                <div className="hidden md:flex items-center gap-4">
                  {data?.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <Button>Get Started</Button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    );
  }