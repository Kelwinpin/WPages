import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

interface LandingPageLayoutProps {
  children: ReactNode;
  navigation?: {
    title: string;
    links: { href: string; label: string }[];
  };
  footer?: {
    links: { href: string; label: string }[];
    socialLinks?: { href: string; icon: ReactNode }[];
  };
}

export function LandingPageLayout({
  children,
  navigation,
  footer,
}: LandingPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="text-xl font-bold">
                {navigation?.title || 'Landing Page'}
              </a>
              <div className="hidden md:flex items-center gap-4">
                {navigation?.links.map((link) => (
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

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <footer className="border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footer.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {footer.socialLinks && (
              <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                {footer.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}