import React, { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'es' | 'pt' | 'pl';

const STORAGE_KEY = 'fixit_locale';

const translations: Record<Locale, Record<string, string>> = {
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_about: 'About',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contact',
    badge_trust: 'Licensed & Insured • 5-Star Rated',
    hero_main: 'We Fix It',
    hero_right: 'Right',
    hero_tag: 'Every Time',
    hero_desc: "Professional handyman services for your home and business. From minor repairs to major renovations, we've got you covered.",
    cta_book: 'Book Now',
    cta_call: 'Call',
    stats_jobs: 'Jobs Completed',
    stats_rating: 'Star Rating',
    stats_emergency: 'Emergency Service',
  services_header: 'Everything You Need',
  services_sub: 'From quick fixes to complete renovations, our skilled handymen handle it all with precision and care.',
  free_estimates: 'Free estimates',
  /* Individual services */
  'services.general_repairs.title': 'General Repairs',
  'services.general_repairs.description': 'Quick fixes and maintenance for your home',
  'services.general_repairs.rate': '$65-95/hr',
  'services.general_repairs.features.0': 'Door & window repairs',
  'services.general_repairs.features.1': 'Cabinet adjustments',
  'services.general_repairs.features.2': 'Hardware installation',
  'services.general_repairs.features.3': 'General maintenance',

  'services.furniture_assembly.title': 'Furniture Assembly',
  'services.furniture_assembly.description': 'Professional assembly of most furniture types (price varies by complexity)',
  'services.furniture_assembly.rate': '$100-200 (flat)',
  'services.furniture_assembly.features.0': 'IKEA furniture',
  'services.furniture_assembly.features.1': 'Office furniture',
  'services.furniture_assembly.features.2': 'Outdoor furniture',
  'services.furniture_assembly.features.3': 'TV stands & entertainment centers',

  'services.light_electrical.title': 'Light Electrical',
  'services.light_electrical.description': 'Safe electrical work for your home',
  'services.light_electrical.rate': '$70-130/hr',
  'services.light_electrical.features.0': 'Light fixture installation',
  'services.light_electrical.features.1': 'Outlet installation',
  'services.light_electrical.features.2': 'Switch replacements',
  'services.light_electrical.features.3': 'Ceiling fan installation',

  'services.painting.title': 'Painting',
  'services.painting.description': 'Interior and exterior painting services',
  'services.painting.rate': '$250-600/room',
  'services.painting.features.0': 'Interior painting',
  'services.painting.features.1': 'Exterior touch-ups',
  'services.painting.features.2': 'Trim painting',
  'services.painting.features.3': 'Color consultation',

  'services.plumbing.title': 'Plumbing Repairs',
  'services.plumbing.description': 'Faucets, toilets, and minor plumbing fixes',
  'services.plumbing.rate': '$90-200',
  'services.plumbing.features.0': 'Faucet replacement',
  'services.plumbing.features.1': 'Toilet installation',
  'services.plumbing.features.2': 'Leak repairs',
  'services.plumbing.features.3': 'Pipe maintenance',

  'services.drywall.title': 'Drywall & Patching',
  'services.drywall.description': 'Professional drywall repair and finishing',
  'services.drywall.rate': '$120-350',
  'services.drywall.features.0': 'Hole patching',
  'services.drywall.features.1': 'Crack repair',
  'services.drywall.features.2': 'Texture matching',
  'services.drywall.features.3': 'Paint touch-ups',

  'services.bathroom.title': 'Full Bathroom Remodel',
  'services.bathroom.description': 'Complete bathroom renovations including fixtures, tile, plumbing, and finishes',
  'services.bathroom.rate': '$8,000 - $25,000+',
  'services.bathroom.features.0': 'Demolition & disposal',
  'services.bathroom.features.1': 'New fixtures & fittings',
  'services.bathroom.features.2': 'Tile & waterproofing',
  'services.bathroom.features.3': 'Vanity & lighting installation',

  'services.kitchen.title': 'Full Kitchen Remodel',
  'services.kitchen.description': 'Full kitchen remodels from cabinetry and countertops to plumbing and electrical',
  'services.kitchen.rate': '$15,000 - $60,000+',
  'services.kitchen.features.0': 'Cabinetry & hardware',
  'services.kitchen.features.1': 'Countertops & backsplash',
  'services.kitchen.features.2': 'Appliance installation',
  'services.kitchen.features.3': 'Plumbing & electrical upgrades',

  /* Contact translations */
  contact_badge: 'Get In Touch',
  contact_heading: 'Ready to Get Started?',
  contact_lead: "Contact us today for a free estimate. We're here to help with all your home repair and improvement needs.",
  contact_phone_title: 'Phone',
  contact_phone_desc: 'Call us anytime for immediate assistance',
  contact_email_title: 'Email',
  contact_email_desc: 'Send us your project details',
  contact_service_area_title: 'Service Area',
  contact_service_area_desc: 'We come to you in these towns and nearby areas',
  contact_hours_title: 'Hours',
  contact_hours_desc: 'Flexible scheduling available',
  contact_emergency_cta: 'Call Emergency Line',
  why_choose_title: 'Why Choose Us?',
  'feature.0': 'Free estimates on all projects',
  'feature.1': 'Same-day service available',
  'feature.2': 'Licensed and insured',
  'feature.3': 'Satisfaction guaranteed',
  'feature.4': 'Flexible payment options',
  'feature.5': 'Emergency repairs 24/7',

  /* Footer translations */
  footer_services_title: 'Our Services',
  footer_quick_links: 'Quick Links',
  footer_contact_title: 'Contact Us',
  footer_rights: 'All rights reserved.',
  footer_licensed: 'Licensed • Insured • Bonded'
  },
  es: {
    nav_home: 'Inicio',
    nav_services: 'Servicios',
    nav_about: 'Acerca',
    nav_portfolio: 'Portafolio',
    nav_contact: 'Contacto',
    badge_trust: 'Licenciado y asegurado • Calificación 5 estrellas',
    hero_main: 'Lo Arreglamos',
    hero_right: 'Bien',
    hero_tag: 'Cada vez',
    hero_desc: 'Servicios profesionales de mantenimiento para su hogar y negocio. Desde reparaciones menores hasta renovaciones importantes.',
    cta_book: 'Reservar',
    cta_call: 'Llamar',
    stats_jobs: 'Trabajos Completados',
    stats_rating: 'Calificación',
    stats_emergency: 'Servicio de Emergencia',
  services_header: 'Todo lo que necesita',
  services_sub: 'Desde arreglos rápidos hasta renovaciones completas, nuestros expertos se encargan con precisión y cuidado.',
  free_estimates: 'Presupuestos gratis',

  'services.general_repairs.title': 'Reparaciones Generales',
  'services.general_repairs.description': 'Soluciones rápidas y mantenimiento para su hogar',
  'services.general_repairs.rate': '$65-95/hora',
  'services.general_repairs.features.0': 'Reparación de puertas y ventanas',
  'services.general_repairs.features.1': 'Ajuste de gabinetes',
  'services.general_repairs.features.2': 'Instalación de herrajes',
  'services.general_repairs.features.3': 'Mantenimiento general',

  'services.furniture_assembly.title': 'Ensamblaje de Muebles',
  'services.furniture_assembly.description': 'Ensamblaje profesional de la mayoría de los tipos de muebles (el precio varía según la complejidad)',
  'services.furniture_assembly.rate': '$100-200 (tarifa fija)',
  'services.furniture_assembly.features.0': 'Muebles IKEA',
  'services.furniture_assembly.features.1': 'Muebles de oficina',
  'services.furniture_assembly.features.2': 'Muebles de exterior',
  'services.furniture_assembly.features.3': 'Soportes de TV y centros de entretenimiento',

  'services.light_electrical.title': 'Electricidad Ligera',
  'services.light_electrical.description': 'Trabajo eléctrico seguro para su hogar',
  'services.light_electrical.rate': '$70-130/hora',
  'services.light_electrical.features.0': 'Instalación de luminarias',
  'services.light_electrical.features.1': 'Instalación de enchufes',
  'services.light_electrical.features.2': 'Reemplazo de interruptores',
  'services.light_electrical.features.3': 'Instalación de ventiladores de techo',

  'services.painting.title': 'Pintura',
  'services.painting.description': 'Servicios de pintura interior y exterior',
  'services.painting.rate': '$250-600/habitación',
  'services.painting.features.0': 'Pintura interior',
  'services.painting.features.1': 'Retoques exteriores',
  'services.painting.features.2': 'Pintura de molduras',
  'services.painting.features.3': 'Consulta de color',

  'services.plumbing.title': 'Reparaciones de Plomería',
  'services.plumbing.description': 'Grifos, inodoros y arreglos menores de plomería',
  'services.plumbing.rate': '$90-200',
  'services.plumbing.features.0': 'Reemplazo de grifos',
  'services.plumbing.features.1': 'Instalación de inodoros',
  'services.plumbing.features.2': 'Reparación de fugas',
  'services.plumbing.features.3': 'Mantenimiento de tuberías',

  'services.drywall.title': 'Tablaroca y Parcheo',
  'services.drywall.description': 'Reparación y acabado profesional de tablaroca',
  'services.drywall.rate': '$120-350',
  'services.drywall.features.0': 'Parcheo de agujeros',
  'services.drywall.features.1': 'Reparación de grietas',
  'services.drywall.features.2': 'Igualar textura',
  'services.drywall.features.3': 'Retoques de pintura',

  'services.bathroom.title': 'Remodelación Completa de Baño',
  'services.bathroom.description': 'Renovaciones completas de baño que incluyen accesorios, azulejos, plomería y acabados',
  'services.bathroom.rate': '$8,000 - $25,000+',
  'services.bathroom.features.0': 'Demolición y eliminación',
  'services.bathroom.features.1': 'Nuevos accesorios y herrajes',
  'services.bathroom.features.2': 'Azulejos e impermeabilización',
  'services.bathroom.features.3': 'Instalación de tocador e iluminación',

  'services.kitchen.title': 'Remodelación Completa de Cocina',
  'services.kitchen.description': 'Remodelaciones completas de cocina desde gabinetes y encimeras hasta plomería y electricidad',
  'services.kitchen.rate': '$15,000 - $60,000+',
  'services.kitchen.features.0': 'Gabinetes y herrajes',
  'services.kitchen.features.1': 'Encimeras y salpicaderas',
  'services.kitchen.features.2': 'Instalación de electrodomésticos',
  'services.kitchen.features.3': 'Mejoras de plomería y electricidad',

  /* Contact translations */
  contact_badge: 'Ponte en contacto',
  contact_heading: '¿Listo para comenzar?',
  contact_lead: 'Contáctenos hoy para un presupuesto gratuito. Estamos aquí para ayudar con todas sus reparaciones y mejoras del hogar.',
  contact_phone_title: 'Teléfono',
  contact_phone_desc: 'Llámenos en cualquier momento para asistencia inmediata',
  contact_email_title: 'Correo',
  contact_email_desc: 'Envíenos los detalles de su proyecto',
  contact_service_area_title: 'Área de Servicio',
  contact_service_area_desc: 'Nos desplazamos a estos pueblos y áreas cercanas',
  contact_hours_title: 'Horario',
  contact_hours_desc: 'Programación flexible disponible',
  contact_emergency_cta: 'Llamar línea de emergencia',
  why_choose_title: '¿Por qué elegirnos?',
  'feature.0': 'Presupuestos gratis en todos los proyectos',
  'feature.1': 'Servicio disponible el mismo día',
  'feature.2': 'Licenciado y asegurado',
  'feature.3': 'Satisfacción garantizada',
  'feature.4': 'Opciones de pago flexibles',
  'feature.5': 'Reparaciones de emergencia 24/7',

  /* Footer translations */
  footer_services_title: 'Nuestros Servicios',
  footer_quick_links: 'Enlaces rápidos',
  footer_contact_title: 'Contáctanos',
  footer_rights: 'Todos los derechos reservados.',
  footer_licensed: 'Licenciado • Asegurado • Garantizado'
  },
  pt: {
    nav_home: 'Início',
    nav_services: 'Serviços',
    nav_about: 'Sobre',
    nav_portfolio: 'Portfólio',
    nav_contact: 'Contato',
    badge_trust: 'Licenciado & Segurado • Avaliação 5 estrelas',
    hero_main: 'Nós consertamos',
    hero_right: 'Certo',
    hero_tag: 'Sempre',
    hero_desc: 'Serviços profissionais de faz-tudo para sua casa e comércio. De pequenos reparos a grandes reformas.',
    cta_book: 'Reservar',
    cta_call: 'Ligar',
    stats_jobs: 'Trabalhos Concluídos',
    stats_rating: 'Avaliação',
    stats_emergency: 'Serviço de Emergência',
    services_header: 'Tudo que você precisa',
    services_sub: 'De reparos rápidos a reformas completas, nossa equipe cuida com precisão e atenção.',
    free_estimates: 'Orçamentos grátis'
  },
  pl: {
    nav_home: 'Start',
    nav_services: 'Usługi',
    nav_about: 'O nas',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Kontakt',
    badge_trust: 'Licencjonowani i ubezpieczeni • 5 gwiazdek',
    hero_main: 'Naprawiamy',
    hero_right: 'Dobrze',
    hero_tag: 'Za każdym razem',
    hero_desc: 'Profesjonalne usługi majsterkowicza dla domu i firmy. Od drobnych napraw po duże remonty.',
    cta_book: 'Zarezerwuj',
    cta_call: 'Zadzwoń',
    stats_jobs: 'Zleceń zakończonych',
    stats_rating: 'Ocena',
    stats_emergency: 'Serwis awaryjny',
    services_header: 'Wszystko, czego potrzebujesz',
    services_sub: 'Od szybkich napraw po kompleksowe remonty, nasi specjaliści wykonują pracę z precyzją i dbałością.',
    free_estimates: 'Bezpłatne wyceny'
  }
};

const I18nContext = createContext<any>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return (saved as Locale) || 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const t = (key: string) => translations[locale][key] || translations['en'][key] || key;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx as { locale: Locale; setLocale: (l: Locale) => void; t: (k: string) => string };
};

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'pt', 'pl'];
