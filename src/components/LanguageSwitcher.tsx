import { SUPPORTED_LOCALES, useI18n } from '@/i18n';

const labels: Record<string, string> = { en: 'EN', es: 'ES', pt: 'PT', pl: 'PL' };

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center">
      <label htmlFor="locale-select" className="sr-only">Language</label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value as any)}
        className="text-sm bg-transparent border border-transparent hover:border-muted px-2 py-1 rounded"
        aria-label="Select language"
      >
        {SUPPORTED_LOCALES.map((l) => (
          <option key={l} value={l}>{labels[l]}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
