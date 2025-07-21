import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Clock, 
  Award,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "500+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "10+", label: "Years Experience", icon: <Award className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> },
    { number: "100%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind. We protect both your property and our workers."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Quality Guaranteed",
      description: "We stand behind our work with a satisfaction guarantee. If you're not happy, we'll make it right."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Reliable Service",
      description: "We show up on time and complete projects when promised. Your time is valuable, and we respect that."
    }
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary px-4 py-2">
            About Fix it Right
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Trusted Home
            <span className="block text-primary">Repair Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over a decade, we've been helping homeowners and businesses maintain and improve their properties with professional, reliable handyman services.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Our Story
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Founded in 2014, Fix it Right started as a small family business with a simple mission: provide honest, reliable handyman services that homeowners can trust.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we've grown to become the area's most trusted handyman service, completing over 500 successful projects while maintaining our commitment to quality and customer satisfaction.
              </p>
              <p className="text-lg leading-relaxed">
                Our team of skilled professionals brings years of experience and a passion for helping people make their homes better, safer, and more comfortable.
              </p>
            </div>
            <Button className="btn-primary">
              Read Our Reviews
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-elevated text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Fix it Right?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-elevated text-center group hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team CTA */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 text-center border border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Meet Our Expert Team
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our certified handymen bring decades of combined experience and a commitment to excellence on every job.
          </p>
          <Button variant="outline" size="lg">
            Learn About Our Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;