import { Github, Twitter } from 'lucide-react';
import { LandingPageLayout } from '@/components/landing-page-layout';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <LandingPageLayout
      navigation={{
        title: 'Landing Page Generator',
        links: [
          { href: '#features', label: 'Features' },
          { href: '#pricing', label: 'Pricing' },
          { href: '#about', label: 'About' },
          { href: '#contact', label: 'Contact' },
        ],
      }}
      footer={{
        links: [
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/terms', label: 'Terms of Service' },
          { href: '/contact', label: 'Contact Us' },
          { href: '/about', label: 'About Us' },
          { href: '/blog', label: 'Blog' },
          { href: '/careers', label: 'Careers' },
          { href: '/support', label: 'Support' },
          { href: '/sitemap', label: 'Sitemap' },
        ]
      }}
    >
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Crie Páginas de Alta Conversão em Minutos
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Com nosso gerador de landing pages, você cria páginas profissionais e otimizadas para conversão — sem precisar escrever uma linha de código.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg">Começar Agora</Button>
            <Button size="lg" variant="outline">Saiba Mais</Button>
          </div>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Construtor in time view',
                description: 'Monte suas páginas com facilidade usando nossa interface intuitiva.',
              },
              {
                title: 'Design Responsivo',
                description: 'Todas as páginas se adaptam perfeitamente a qualquer tela, de forma automática.',
              },
              {
                title: 'Temas Personalizados',
                description: 'Escolha entre diversos temas prontos ou crie um visual totalmente personalizado.',
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de negócios que já estão transformando seus resultados com nossas landing pages.
          </p>
          <Button size="lg">Crie Sua Página Agora</Button>
        </div>
      </section>

    </LandingPageLayout>
  );
}