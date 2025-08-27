import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';
import { type Product } from '@shared/schema';
import { 
  Leaf, 
  UserCheck, 
  Truck, 
  Shield, 
  Award, 
  BookOpen, 
  Users, 
  Clock,
  CheckCircle,
  Star,
  Heart,
  Globe
} from 'lucide-react';

export function Home() {
  const { language } = useLanguage();

  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products?featured=true'],
  });

  const expertiseFeatures = [
    {
      icon: Award,
      title: language === 'he' ? 'מומחיות מוכחת בנטורופתיה' : 'Proven Naturopathy Expertise',
      description: language === 'he' 
        ? 'למעלה מ-15 שנות ניסיון ברפואה טבעית ופיתוח תכשירים הומיאופתיים מתקדמים'
        : 'Over 15 years of experience in natural medicine and advanced homeopathic remedy development',
    },
    {
      icon: BookOpen,
      title: language === 'he' ? 'מבוסס מחקר מדעי' : 'Science-Based Research',
      description: language === 'he'
        ? 'כל תכשיר מפותח על בסיס מחקרים קליניים ועקרונות הרפואה ההומיאופתית המודרנית'
        : 'Every remedy developed based on clinical research and modern homeopathic medicine principles',
    },
    {
      icon: Users,
      title: language === 'he' ? 'אלפי מטופלים מרוצים' : 'Thousands of Satisfied Patients',
      description: language === 'he'
        ? 'רשת של מטפלים מקצועיים ואלפי מטופלים שחוו שיפור משמעותי בבריאותם'
        : 'Network of professional practitioners and thousands of patients who experienced significant health improvements',
    },
    {
      icon: Globe,
      title: language === 'he' ? 'תקנים בינלאומיים' : 'International Standards',
      description: language === 'he'
        ? 'תכשירים עומדים בתקני איכות בינלאומיים ומיוצרים במעבדות מוסמכות'
        : 'Remedies meet international quality standards and are manufactured in certified laboratories',
    },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: language === 'he' ? 'בטיחות מוכחת' : 'Proven Safety',
      description: language === 'he'
        ? 'תכשירים טבעיים ללא תופעות לוואי, בדוקים קלינית ובטוחים לשימוש יומיומי'
        : 'Natural remedies without side effects, clinically tested and safe for daily use',
    },
    {
      icon: Clock,
      title: language === 'he' ? 'תוצאות מהירות' : 'Fast Results',
      description: language === 'he'
        ? 'רוב המטופלים מדווחים על שיפור ראשוני תוך 7-14 ימים מתחילת הטיפול'
        : 'Most patients report initial improvement within 7-14 days of starting treatment',
    },
    {
      icon: Heart,
      title: language === 'he' ? 'טיפול הוליסטי' : 'Holistic Treatment',
      description: language === 'he'
        ? 'גישה מקיפה לבריאות הגוף והנפש, לא רק טיפול בתסמינים אלא באסיבת השורש'
        : 'Comprehensive approach to body and mind health, treating root causes not just symptoms',
    },
  ];


  return (
    <div data-testid="home-page">
      {/* Enhanced Hero Section */}
      <section className="hero-bg py-44" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold text-dh-navy mb-6 leading-tight" data-testid="hero-title">
                <span className="block">{t('home.hero.title', language)}</span>
                <span className="block text-dh-light text-3xl lg:text-4xl">
                  {t('home.hero.subtitle', language)}
                </span>
              </h1>
              <p className="text-xl text-dh-pale text-right mb-6 leading-relaxed" data-testid="hero-description">
                {t('home.hero.description', language)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Link href="/store">
                  <Button 
                    className="bg-dh-ocean text-white px-8 py-4 rounded-full font-semibold hover:bg-dh-navy transition-colors shadow-lg"
                    data-testid="hero-cta-products"
                  >
                    {t('home.hero.cta.products', language)}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline"
                    className="border-2 bg-dh-navy border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-dh-ocean transition-colors"
                    data-testid="hero-cta-consultation"
                  >
                    {language === 'he' ? 'ייעוץ מקצועי חינם' : 'Free Professional Consultation'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Authority Section */}
      <section className="py-20 bg-white" data-testid="expertise-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6">
              {language === 'he' ? 'למה DHnaturally נחשב לרשות המובילה בטיפול טבעי?' : 'Why DHnaturally is Considered the Leading Authority in Natural Treatment?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {language === 'he' 
                ? 'עשרות שנות מחקר, פיתוח ולמידה בתחום הנטורופתיה וההומיאופתיה הביאו אותנו למעמד של מומחים מובילים בישראל ובעולם'
                : 'Decades of research, development and learning in naturopathy and homeopathy have brought us to the status of leading experts in Israel and worldwide'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 rounded-xl dh-gradient-bg shadow-lg hover:shadow-xl transition-shadow"
                  data-testid={`expertise-${index}`}
                >
                  <div className="w-16 h-16 bg-dh-ocean text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-dh-navy mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-gray-50" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6">
              {language === 'he' ? 'בטיחות ויעילות - המחויבות שלנו אליכם' : 'Safety & Efficacy - Our Commitment to You'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {language === 'he'
                ? 'אנו מבינים שבריאותכם היא הדבר הכי חשוב. לכן, כל תכשיר עובר בקרת איכות מחמירה ונבחן קלינית לבטיחות ויעילות'
                : 'We understand your health is the most important thing. Therefore, every remedy undergoes strict quality control and is clinically tested for safety and efficacy'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-dh-pale"
                  data-testid={`trust-${index}`}
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-dh-navy mb-4">{indicator.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{indicator.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products with Enhanced Messaging */}
      {/* <section className="py-20 bg-white" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6" data-testid="featured-title">
              {t('home.featured.title', language)}
            </h2>
            <p className="text-xl text-gray-600 mb-4" data-testid="featured-description">
              {t('home.featured.description', language)}
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {language === 'he' ? 'מבוסס מחקר קליני' : 'Clinically Researched'}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {language === 'he' ? 'ללא תופעות לוואי' : 'No Side Effects'}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {language === 'he' ? 'איכות מעבדתית' : 'Laboratory Quality'}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p data-testid="featured-loading">{t('common.loading', language)}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/store">
              <Button 
                className="bg-dh-ocean text-white px-10 py-4 rounded-full font-semibold hover:bg-dh-navy transition-colors shadow-lg"
                data-testid="featured-cta"
              >
                {t('home.featured.cta', language)}
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              {language === 'he' ? '✨ משלוח חינם מעל ₪600 | אחריות החזר כספי לשביעות רצון מלאה' : '✨ Free shipping over ₪150 | Money-back satisfaction guarantee'}
            </p>
          </div>
        </div>
      </section> */}

      {/* Professional Consultation Section */}
      <section className="py-20 bg-dh-pale" data-testid="consultation-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6">
              {language === 'he' ? 'ייעוץ מקצועי בנטורופתיה' : 'Professional Naturopathy Consultation'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'he' 
                ? 'קבלו ייעוץ אישי מרופא נטורופת מוסמך ומצאו את התכשירים הטבעיים המתאימים ביותר עבורכם'
                : 'Get personalized consultation from a certified naturopath and find the most suitable natural remedies for you'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dh-navy">
                {language === 'he' ? 'מה כולל הייעוץ?' : 'What Does the Consultation Include?'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-dh-ocean flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-dh-navy">
                      {language === 'he' ? 'הערכה מקיפה' : 'Comprehensive Assessment'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'he' 
                        ? 'בחינה מפורטת של המצב הבריאותי והתסמינים'
                        : 'Detailed examination of health condition and symptoms'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-dh-ocean flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-dh-navy">
                      {language === 'he' ? 'המלצות מותאמות אישית' : 'Personalized Recommendations'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'he' 
                        ? 'תכשירים טבעיים מותאמים לצרכים האישיים שלכם'
                        : 'Natural remedies tailored to your individual needs'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-dh-ocean flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-dh-navy">
                      {language === 'he' ? 'מעקב ותמיכה' : 'Follow-up & Support'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'he' 
                        ? 'ליווי מקצועי לאורך תהליך הטיפול'
                        : 'Professional guidance throughout the treatment process'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-dh-navy mb-4">
                  {language === 'he' ? 'היעצו עכשיו' : 'Consult Now'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'he' 
                    ? 'ייעוץ ראשוני ללא עלות - בדקו אם הנטורופתיה מתאימה לכם'
                    : 'Initial consultation at no cost - see if naturopathy is right for you'
                  }
                </p>
                <Link href="/contact">
                  <Button 
                    className="w-full bg-dh-ocean text-white px-8 py-4 rounded-full font-semibold hover:bg-dh-navy transition-colors shadow-lg"
                    data-testid="consultation-cta"
                  >
                    {language === 'he' ? 'התחל בייעוץ חינם' : 'Start Free Consultation'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action in testimonials */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-dh-navy mb-4">
              {language === 'he' ? 'מוכנים להתחיל במסע לבריאות טבעית?' : 'Ready to Start Your Natural Health Journey?'}
            </h3>
            <Link href="/contact">
              <Button 
                className="bg-dh-ocean text-white px-10 py-4 rounded-full font-semibold hover:bg-dh-navy transition-colors shadow-lg mr-4"
                data-testid="testimonials-consultation-cta"
              >
                {language === 'he' ? 'קבלו ייעוץ מקצועי חינם' : 'Get Free Professional Consultation'}
              </Button>
            </Link>
            <Link href="/store">
              <Button 
                variant="outline"
                className="border-2 border-dh-ocean text-dh-ocean px-10 py-4 rounded-full font-semibold hover:bg-dh-ocean hover:text-white transition-colors"
                data-testid="testimonials-shop-cta"
              >
                {language === 'he' ? 'התחילו את המסע לבריאות' : 'Start Your Health Journey'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 dh-hero-gradient text-white" data-testid="final-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {language === 'he' 
              ? 'התחילו את המסע שלכם לבריאות טבעית היום'
              : 'Start Your Natural Health Journey Today'
            }
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'he'
              ? 'ייעוץ מקצועי חינם, משלוח מהיר וללא עלות, ואחריות מלאה לשביעות רצון'
              : 'Free professional consultation, fast free shipping, and complete satisfaction guarantee'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-white text-dh-ocean px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                {language === 'he' ? '📞 התקשרו עכשיו לייעוץ' : '📞 Call Now for Consultation'}
              </Button>
            </Link>
            <Link href="/store">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-dh-ocean transition-colors"
              >
                {language === 'he' ? '🛒 קנו תכשירים טבעיים' : '🛒 Shop Natural Remedies'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
