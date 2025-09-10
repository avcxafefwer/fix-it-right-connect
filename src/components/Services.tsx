import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Hammer,
  Paintbrush,
  Zap,
  Droplets,
  DollarSign,
  ArrowRight,
  Clock,
  Sofa,
  Bath,
  Utensils
} from "lucide-react";
import { useI18n } from "@/i18n";
import { PHONE } from "@/config/site";

const Services = () => {
  const { t } = useI18n();

  const serviceDefs = [
    { id: "general_repairs", icon: <Wrench className="w-8 h-8" />, popular: false },
    { id: "furniture_assembly", icon: <Sofa className="w-8 h-8" />, popular: true },
    { id: "light_electrical", icon: <Zap className="w-8 h-8" />, popular: false },
    { id: "painting", icon: <Paintbrush className="w-8 h-8" />, popular: false },
    { id: "plumbing", icon: <Droplets className="w-8 h-8" />, popular: false },
    { id: "drywall", icon: <Hammer className="w-8 h-8" />, popular: false },
    { id: "bathroom", icon: <Bath className="w-8 h-8" />, popular: true },
    { id: "kitchen", icon: <Utensils className="w-8 h-8" />, popular: true }
  ];

  const services = serviceDefs.map((s) => ({
    icon: s.icon,
    title: t(`services.${s.id}.title`),
    description: t(`services.${s.id}.description`),
    rate: t(`services.${s.id}.rate`),
    features: [0, 1, 2, 3].map((i) => t(`services.${s.id}.features.${i}`)),
    popular: s.popular
  }));

  return (
    <section id="services" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4 gap-3">
            <Badge className="bg-primary/10 text-primary px-4 py-2">{t('services.badge')}</Badge>
            <Badge className="bg-secondary/10 text-secondary px-4 py-2">{t('services.free_estimates')}</Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('services_header')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services_sub')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="card-elevated group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  {t('services.most_popular')}
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
                  <span className="text-sm font-medium text-muted-foreground">{t('services.starting_at')}</span>
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
                  {t('services.get_quote')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing disclaimer */}
        <div className="mb-8 text-sm text-muted-foreground max-w-3xl mx-auto text-center">
          <p>
            {t('services.disclaimer_paragraph')}
          </p>
          <p className="mt-2">{t('services.disclaimer_footer')}</p>
        </div>

        {/* Emergency Service CTA */}
        <div className="bg-gradient-to-r from-primary to-primary-variant rounded-2xl p-8 md:p-12 text-center text-white shadow-material-lg">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold">{t('services.emergency_title')}</h3>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            {t('services.emergency_sub')}
          </p>
          <Button
            size="lg"
            className="btn-secondary shadow-material-md hover:shadow-material-lg"
            onClick={() => window.open(`tel:${PHONE.tel}`)}
          >
            {t('services.call_emergency')}: {PHONE.display}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;