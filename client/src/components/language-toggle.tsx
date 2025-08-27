import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleHebrewClick = () => {
    console.log('Hebrew button clicked, current language:', language);
    setLanguage('he');
  };

  const handleEnglishClick = () => {
    console.log('English button clicked, current language:', language);
    setLanguage('en');
  };

  return (
    <div className="flex items-center bg-dh-pale rounded-full p-1" data-testid="language-toggle">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleHebrewClick}
        className={`px-3 py-1 rounded-full text-sm font-medium lang-btn ${
          language === 'he' ? 'active' : ''
        }`}
        data-testid="language-button-he"
      >
        {t('nav.language.he', language)}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleEnglishClick}
        className={`px-3 py-1 rounded-full text-sm font-medium lang-btn ${
          language === 'en' ? 'active' : ''
        }`}
        data-testid="language-button-en"
      >
        {t('nav.language.en', language)}
      </Button>
    </div>
  );
}
