import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, Phone } from "lucide-react";
import heroImage from "@/assets/hero-handyman.jpg";
import { PHONE } from "@/config/site";
import { useI18n } from '@/i18n';

const Hero = () => {
  const { t } = useI18n();
  return (
  <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional handyman at work"
          className="w-full h-full object-cover object-center md:object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <Badge className="mb-6 bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium">
            <Star className="w-4 h-4 mr-2 fill-current" />
            {t('badge_trust')}
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('hero_main')}
            <span className="block text-secondary">{t('hero_right')}</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-white/90 mt-4">
              {t('hero_tag')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            {t('hero_desc')}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-white/90">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <span className="font-medium">Same-day service</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <span className="font-medium">Free estimates</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <span className="font-medium">Satisfaction guaranteed</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="btn-secondary text-lg px-8 py-4 shadow-material-lg hover:shadow-material-xl"
              onClick={() => window.location.href = '/signin?redirect=quote'}
            >
              {t('cta_book')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white bg-transparent hover:bg-white hover:text-primary text-lg px-8 py-4"
              onClick={() => window.open(`tel:${PHONE.tel}`)}
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('cta_call')} {PHONE.display}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-secondary">500+</div>
              <div className="text-white/80">Jobs Completed</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-secondary">5.0</div>
              <div className="text-white/80">Star Rating</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-secondary">24/7</div>
              <div className="text-white/80">Emergency Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Floating call button for mobile */}
      <div className="md:hidden fixed bottom-6 right-4 z-50">
        <Button size="sm" className="rounded-full p-4 shadow-lg" onClick={() => window.open(`tel:${PHONE.tel}`)}>
          <Phone className="w-5 h-5 text-white" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;