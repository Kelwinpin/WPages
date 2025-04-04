import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface IFAQ {
  title?: string;
  description?: string;
  accordions?: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ title, description, accordions }: IFAQ) {
  return (
    <section id="faq" className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordions?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
  )
}