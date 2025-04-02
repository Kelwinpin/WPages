"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useFetchDocData from "@/hooks/useFetchDocData";
import { LandingPageLayout } from "@/components/landing-page-layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Star, ArrowRight, CheckCheck } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { data, loading } = useFetchDocData(params.slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <LandingPageLayout
      navigation={{
        title: data?.title || 'Landing Page',
        links: data?.links || [],
      }}
      footer={data?.footer}
    >
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Solução Exclusiva
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {data?.title || 'Transforme Visitantes em Clientes'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa plataforma oferece tudo que você precisa para aumentar suas conversões e impulsionar seus resultados de negócio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg">
              Ver Demonstração
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CheckCheck className="h-5 w-5 text-primary" />
            <span className="text-sm">Teste grátis por 14 dias</span>
            <span className="mx-2">•</span>
            <CheckCheck className="h-5 w-5 text-primary" />
            <span className="text-sm">Sem necessidade de cartão de crédito</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para criar experiências de alta conversão
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Otimização Inteligente',
                description: 'Algoritmos avançados que ajustam automaticamente sua página para maximizar conversões.',
                icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
              },
              {
                title: 'Análise em Tempo Real',
                description: 'Acompanhe o desempenho da sua página com métricas detalhadas e insights acionáveis.',
                icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
              },
              {
                title: 'Personalização Avançada',
                description: 'Adapte cada elemento para seu público-alvo e aumente significativamente suas taxas de conversão.',
                icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de sucesso de quem já utiliza nossa solução
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Aumentamos nossas conversões em 137% no primeiro mês de uso. Resultado impressionante!",
                author: "Ana Silva",
                company: "Tech Solutions",
                rating: 5,
              },
              {
                quote: "A facilidade de uso e os resultados obtidos superaram todas as nossas expectativas.",
                author: "Carlos Mendes",
                company: "Growth Marketing",
                rating: 5,
              },
              {
                quote: "Finalmente uma solução que realmente entrega o que promete. Recomendo fortemente.",
                author: "Patrícia Oliveira",
                company: "E-commerce Brasil",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planos Simples e Transparentes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                price: "R$97",
                period: "/mês",
                description: "Ideal para pequenos negócios",
                features: [
                  "1 Landing Page",
                  "Até 10.000 visitantes/mês",
                  "Análises básicas",
                  "Suporte por email",
                ],
                cta: "Começar Grátis",
                popular: false,
              },
              {
                name: "Profissional",
                price: "R$197",
                period: "/mês",
                description: "Para negócios em crescimento",
                features: [
                  "5 Landing Pages",
                  "Até 50.000 visitantes/mês",
                  "Análises avançadas",
                  "Testes A/B",
                  "Suporte prioritário",
                ],
                cta: "Começar Grátis",
                popular: true,
              },
              {
                name: "Empresarial",
                price: "R$497",
                period: "/mês",
                description: "Para grandes empresas",
                features: [
                  "Landing Pages ilimitadas",
                  "Visitantes ilimitados",
                  "Análises premium",
                  "Testes A/B avançados",
                  "API completa",
                  "Suporte 24/7",
                ],
                cta: "Falar com Vendas",
                popular: false,
              },
            ].map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Quanto tempo leva para configurar uma landing page?",
                  answer: "Você pode ter sua landing page pronta em minutos. Nossa plataforma foi projetada para ser intuitiva e fácil de usar, permitindo que você crie páginas de alta conversão rapidamente."
                },
                {
                  question: "Preciso ter conhecimentos técnicos?",
                  answer: "Não, nossa plataforma foi desenvolvida para ser usada por qualquer pessoa, independentemente do nível técnico. Não é necessário saber programação ou design."
                },
                {
                  question: "Posso integrar com outras ferramentas?",
                  answer: "Sim, oferecemos integrações com as principais ferramentas de marketing, CRMs, plataformas de e-mail marketing e sistemas de pagamento."
                },
                {
                  question: "Como funciona o teste gratuito?",
                  answer: "Você tem acesso a todas as funcionalidades do plano Profissional por 14 dias, sem necessidade de cartão de crédito. Ao final do período, você pode escolher o plano que melhor atende às suas necessidades."
                },
                {
                  question: "Posso cancelar a qualquer momento?",
                  answer: "Sim, não há contratos de longo prazo. Você pode cancelar sua assinatura a qualquer momento, sem taxas adicionais."
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-xl text-muted-foreground">
                Estamos aqui para ajudar. Preencha o formulário abaixo e entraremos em contato em até 24 horas.
              </p>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Nome
                      </label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Assunto
                    </label>
                    <Input id="subject" placeholder="Como podemos ajudar?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Mensagem
                    </label>
                    <Textarea id="message" placeholder="Descreva sua necessidade em detalhes..." rows={5} />
                  </div>
                  <Button className="w-full md:w-auto px-8" size="lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Aumentar suas Conversões?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Junte-se a milhares de empresas que já transformaram seus resultados com nossas landing pages de alta conversão.
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
            Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </LandingPageLayout>
  );
}
