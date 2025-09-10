import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuoteRequestForm from "./QuoteRequestForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from "lucide-react";
import EmailLink from "@/components/ui/email-link";
import { PHONE, EMAIL, SERVICE_AREA } from "@/config/site";
import { useI18n } from '@/i18n';

const Contact = () => {
  const { t } = useI18n();

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
  title: t('contact_phone_title'),
  primary: PHONE.display,
  secondary: `Emergency: ${PHONE.display}`,
    description: t('contact_phone_desc')
    },
    {
      icon: <Mail className="w-6 h-6" />,
    title: t('contact_email_title'),
  primary: <EmailLink user={EMAIL.user} domain={EMAIL.domain} className="text-primary font-medium" />,
    description: t('contact_email_desc')
    },
    {
      icon: <MapPin className="w-6 h-6" />,
    title: t('contact_service_area_title'),
    primary: "Northern New Jersey (within ~25 miles of 07075)",
    secondary: SERVICE_AREA.join(', '),
    description: t('contact_service_area_desc')
    },
    {
      icon: <Clock className="w-6 h-6" />,
    title: t('contact_hours_title'),
    primary: "Mon-Sat: 9AM-5PM",
    secondary: "Emergency: 24/7",
    description: t('contact_hours_desc')
    }
  ];

  const serviceFeatures = [
    "Free estimates on all projects",
    "Same-day service available",
    "Licensed and insured",
    "Satisfaction guaranteed",
    "Flexible payment options",
    "Emergency repairs 24/7"
  ];

  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-2">
            {t('contact_badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('contact_heading')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact_lead')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <QuoteRequestForm />
          </div>

          {/* Contact Info & Features */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{info.title}</h4>
                      <p className="text-sm font-medium text-primary">{info.primary}</p>
                      {info.secondary && (
                        <p className="text-sm text-muted-foreground">{info.secondary}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service Features */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {serviceFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Emergency CTA */}
            <Card className="card-elevated bg-gradient-to-br from-primary to-primary-variant text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Emergency Service</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Need immediate assistance? We're available 24/7 for emergency repairs.
                </p>
                <Button variant="secondary" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;