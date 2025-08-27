import { Link } from 'wouter';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';
import logoImage from '@assets/logo3d.png';

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: t('nav.home', language) },
    { path: '/store', label: t('nav.store', language) },
    { path: '/articles', label: t('nav.articles', language) },
    { path: '/about', label: t('nav.about', language) },
    { path: '/contact', label: t('nav.contact', language) },
  ];

  const categories = [
    { value: 'immunity', label: t('store.filter.immunity', language) },
    { value: 'digestion', label: t('store.filter.digestion', language) },
    { value: 'stress', label: t('store.filter.stress', language) },
    { value: 'sleep', label: t('store.filter.sleep', language) },
    { value: 'detox', label: t('store.filter.detox', language) },
  ];

  return (
    <footer className="bg-dh-navy text-white pt-16 pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div data-testid="footer-company-info">
            <Link href="/">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className="w-20 h-20 bg-dh-pale rounded-full flex items-center justify-center overflow-hidden">
                  <img src={logoImage} alt="DHnaturally Logo" className="w-16 h-16 object-contain" />
                </div>
                <span className="text-xl font-bold">DHnaturally</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {language === 'he' 
                ? 'תכשירים הומיאופתיים איכותיים לבריאות טבעית ואיכות חיים משופרת'
                : 'Quality homeopathic remedies for natural health and improved quality of life'
              }
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-gray-300 hover:text-dh-light transition-colors"
                data-testid="footer-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-dh-light transition-colors"
                data-testid="footer-instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/0586572451"
                className="text-gray-300 hover:text-dh-light transition-colors"
                data-testid="footer-whatsapp"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks', language)}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-dh-light transition-colors"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div data-testid="footer-categories">
            <h3 className="text-lg font-semibold mb-6">{t('footer.categories', language)}</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`/store?category=${category.value}#products-grid`}
                    className="text-gray-300 hover:text-dh-light transition-colors"
                    data-testid={`footer-category-${index}`}
                    onClick={() => {
                      // Trigger custom event to notify store page of navigation
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('storePageUpdate'));
                      }, 100);
                    }}
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-testid="footer-contact">
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact', language)}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-dh-light">✉</div>
                <span className="text-gray-300" data-testid="footer-email">
                  dhnaturally@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MessageCircle className="h-4 w-4 text-dh-light" />
                <span className="text-gray-300" data-testid="footer-phone">
                  058-657-2451
                </span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="text-dh-light mt-1">🕐</div>
                <div className="text-gray-300 text-sm" data-testid="footer-hours">
                  <div>{t('contact.hours.weekdays', language)}: 09:00 - 18:00</div>
                  <div>{t('contact.hours.friday', language)}: 09:00 - 14:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0" data-testid="footer-copyright">
             {year} {t('footer.rights', language)} 
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-dh-light transition-colors"
                data-testid="footer-privacy"
              >
                {t('footer.privacy', language)}
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-dh-light transition-colors"
                data-testid="footer-terms"
              >
                {t('footer.terms', language)}
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-dh-light transition-colors"
                data-testid="footer-shipping"
              >
                {t('footer.shipping', language)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
