import { Menu, Globe } from 'lucide-react';
import { SUPPORTED_LOCALES, useI18n } from '@/i18n';

const labels: Record<string, string> = { en: 'EN', es: 'ES', pt: 'PT', pl: 'PL' };

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center space-x-2">
      <div className="hidden sm:flex items-center text-sm text-muted-foreground">{labels[locale]}</div>
      <div className="flex items-center space-x-2">
        {SUPPORTED_LOCALES.map((l) => (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={`text-xs px-2 py-1 rounded ${locale === l ? 'bg-primary text-white' : 'bg-transparent text-muted-foreground'}`}
            aria-label={`Switch language to ${l}`}
          >
            {labels[l]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
