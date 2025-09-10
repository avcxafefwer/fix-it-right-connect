import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LOCALES, useI18n } from '@/i18n';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

const nativeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  pl: 'Polski',
};

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Select language"
          title="Select language"
          className="p-2 rounded hover:bg-accent/60 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Globe className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={6} align="end" className="w-44">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        {SUPPORTED_LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className="flex items-center justify-between"
          >
            <span>{nativeNames[l]}</span>
            {locale === l && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
