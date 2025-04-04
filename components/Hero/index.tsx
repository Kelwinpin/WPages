import { ArrowRight, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LucideIcon, { IconName } from "../Icon";

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttons?: {
    label: string;
    href: string;
    icon: IconName;
  }[];
  menuWithIcons?: {
    label: string;
    icon: IconName;
  }[];
}
export default function Hero({ title, subtitle, buttons, menuWithIcons }: HeroProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {title || 'Transforme Visitantes em Clientes'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {
              subtitle ||
              'Nossa plataforma oferece tudo que você precisa para aumentar suas conversões e impulsionar seus resultados de negócio.'
            }
          </p>
          {
            buttons &&
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-lg"
                >
                  <Link href={button.href}>
                    {button.label} <LucideIcon name={button.icon} className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          }
          {
            menuWithIcons &&
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              {menuWithIcons.map((menu, index) => (
                  <>
                    <LucideIcon name={menu.icon} className="h-5 w-5 text-primary" />
                    <span className="text-sm">{menu.label}</span>
                    {index < menuWithIcons.length - 1 && <span className="mx-2">•</span>}
                  </>
              ))}
            </div>
          }
        </div>
      </section>
  );
}