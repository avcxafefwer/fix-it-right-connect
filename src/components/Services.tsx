import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Hammer, 
  Paintbrush, 
  Zap, 
  Droplets, 
  Square, 
  Clock,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { PHONE } from "@/config/site";

const Services = () => {
  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "General Repairs",
  description: "Quick fixes and maintenance for your home",
  rate: "$65-95/hr",
      features: ["Door & window repairs", "Cabinet adjustments", "Hardware installation", "General maintenance"],
      popular: false
    },
    {
      icon: <Square className="w-8 h-8" />,
      title: "Furniture Assembly",
  description: "Professional assembly of most furniture types (price varies by complexity)",
  rate: "$100-200 (flat)",
      features: ["IKEA furniture", "Office furniture", "Outdoor furniture", "TV stands & entertainment centers"],
      popular: true
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Light Electrical",
  description: "Safe electrical work for your home",
  rate: "$70-130/hr",
      features: ["Light fixture installation", "Outlet installation", "Switch replacements", "Ceiling fan installation"],
      popular: false
    },
    {
      icon: <Paintbrush className="w-8 h-8" />,
      title: "Painting",
  description: "Interior and exterior painting services",
  rate: "$250-600/room",
      features: ["Interior painting", "Exterior touch-ups", "Trim painting", "Color consultation"],
      popular: false
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Plumbing Repairs",
  description: "Faucets, toilets, and minor plumbing fixes",
  rate: "$90-200",
      features: ["Faucet replacement", "Toilet installation", "Leak repairs", "Pipe maintenance"],
      popular: false
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Drywall & Patching",
  description: "Professional drywall repair and finishing",
  rate: "$120-350",
      features: ["Hole patching", "Crack repair", "Texture matching", "Paint touch-ups"],
      popular: false
    }
  ];

  return (
    <section id="services" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-2">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From quick fixes to complete renovations, our skilled handymen handle it all with precision and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="card-elevated group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Starting at</span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-lg font-bold text-success">{service.rate}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full mt-6 group/btn" 
                  variant="outline"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing disclaimer */}
        <div className="mb-8 text-sm text-muted-foreground max-w-3xl mx-auto text-center">
          <p>
            Rates shown are estimates for jobs in Northern New Jersey and intended as general guidance. Final price may vary based on scope, labor, travel, and permit requirements. Cost of materials is not included and will be quoted separately when applicable. Flat rates apply to straightforward jobs; complex or time-consuming work will be quoted after an on-site assessment.
          </p>
          <p className="mt-2">Prices effective Sep 9, 2025. Taxes and permit fees not included.</p>
        </div>

        {/* Emergency Service CTA */}
        <div className="bg-gradient-to-r from-primary to-primary-variant rounded-2xl p-8 md:p-12 text-center text-white shadow-material-lg">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold">Need Emergency Service?</h3>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            We're available 24/7 for urgent repairs. Don't let a small problem become a big headache.
          </p>
          <Button 
            size="lg" 
            className="btn-secondary shadow-material-md hover:shadow-material-lg"
            onClick={() => window.open(`tel:${PHONE.tel}`)}
          >
            Call Emergency Line: {PHONE.display}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;