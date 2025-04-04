import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import LucideIcon, { IconName } from "../Icon";

interface IFeatures {
  title?: string;
  description?: string;
  cards?: {
    title: string;
    description: string;
    icon: IconName;
  }[];
}


export default function Features({ title, description, cards }: IFeatures) {
  return (
    <section id="features" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {
            cards &&
            cards.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                    <LucideIcon name={feature.icon} className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))
        }
      </div>
    </div>
  </section>
  );
}