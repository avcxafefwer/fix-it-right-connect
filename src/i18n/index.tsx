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
    free_estimates: 'Free estimates'
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
    free_estimates: 'Presupuestos gratis'
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
