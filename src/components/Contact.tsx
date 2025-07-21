import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      primary: "(555) 123-4567",
      secondary: "Emergency: (555) 999-0000",
      description: "Call us anytime for immediate assistance"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      primary: "info@fixitright.com",
      secondary: "quotes@fixitright.com",
      description: "Send us your project details"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Service Area",
      primary: "Greater Metro Area",
      secondary: "Within 50 miles",
      description: "We come to you!"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hours",
      primary: "Mon-Sat: 9AM-5PM",
      secondary: "Emergency: 24/7",
      description: "Flexible scheduling available"
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
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contact us today for a free estimate. We're here to help with all your home repair and improvement needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-primary" />
                  Request a Quote
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed estimate.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input placeholder="John" className="transition-all duration-200 focus:shadow-material-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input placeholder="Doe" className="transition-all duration-200 focus:shadow-material-md" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input type="email" placeholder="john@example.com" className="transition-all duration-200 focus:shadow-material-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input type="tel" placeholder="(555) 123-4567" className="transition-all duration-200 focus:shadow-material-md" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Service Needed</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground transition-all duration-200 focus:shadow-material-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Select a service...</option>
                    <option>General Repairs</option>
                    <option>Furniture Assembly</option>
                    <option>TV Mounting</option>
                    <option>Drywall Patching</option>
                    <option>Painting</option>
                    <option>Plumbing Repairs</option>
                    <option>Light Electrical</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Description</label>
                  <Textarea 
                    placeholder="Please describe your project in detail..." 
                    rows={4}
                    className="transition-all duration-200 focus:shadow-material-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Preferred Timeline</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground transition-all duration-200 focus:shadow-material-md focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Select timeline...</option>
                    <option>ASAP (Emergency)</option>
                    <option>Within a week</option>
                    <option>Within a month</option>
                    <option>Flexible</option>
                  </select>
                </div>

                <Button className="btn-primary w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote Request
                </Button>
              </CardContent>
            </Card>
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
                      <p className="text-sm text-muted-foreground">{info.secondary}</p>
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