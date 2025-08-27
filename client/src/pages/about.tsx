import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';
import { Shield, RotateCcw, Scale, Droplet, Fan, Heart, Lock, Award, GraduationCap, FileText } from 'lucide-react';
import logoImage from '../../assets/logo3d.png';
import cert1 from '../../assets/certifications/IMG_0003.jpg';
import cert2 from '../../assets/certifications/IMG_0004.jpg';
import cert3 from '../../assets/certifications/IMG_0005.jpg';
import cert4 from '../../assets/certifications/IMG_0006.jpg';
import cert5 from '../../assets/certifications/IMG_0007.jpg';
import cert6 from '../../assets/certifications/IMG_0008.jpg';
import pomegranate from '../../assets/pomegranate.png';

export function About() {
  const { language } = useLanguage();

  const missionValues = [
    {
      icon: Shield,
      title: language === 'he' ? 'מניעה' : 'Prevention',
      description: language === 'he'
        ? 'עבודה על מניעת בעיות בריאותיות לפני שהן מתפתחות לבעיות חמורות יותר'
        : 'Working to prevent health problems before they develop into more serious issues',
    },
    {
      icon: RotateCcw,
      title: language === 'he' ? 'שחזור' : 'Restoration',
      description: language === 'he'
        ? 'החזרת הגוף למצב הטבעי שלו של בריאות ותפקוד אופטימלי'
        : 'Restoring the body to its natural state of optimal health and function',
    },
    {
      icon: Scale,
      title: language === 'he' ? 'איזון' : 'Balance',
      description: language === 'he'
        ? 'השגת איזון בין הגוף, הנפש והרוח לחיים מלאים ובריאים'
        : 'Achieving balance between body, mind and spirit for a full and healthy life',
    },
  ];

  const workingPrinciples = [
    {
      icon: Droplet,
      title: language === 'he' ? 'חדירה לזרם הדם' : 'Bloodstream Integration',
      description: language === 'he'
        ? 'התרופות שלנו נכנסות לזרם הדם כדי לתקן, לחדש ולחנך מחדש את הגוף, הנפש ואפילו את בלוטות הטעם'
        : 'Our remedies enter the bloodstream to repair, regenerate and reeducate the body, mind and even taste buds',
    },
    {
      icon: Fan,
      title: language === 'he' ? 'שטיפת רעלים' : 'Toxin Elimination',
      description: language === 'he'
        ? 'הן עוזרות לשטוף רעלים מהגוף ולנקות את המערכות החיוניות שלו'
        : 'They help flush toxins from the body and cleanse its vital systems',
    },
    {
      icon: Heart,
      title: language === 'he' ? 'תמיכה בתיקון עצבים' : 'Nerve Repair Support',
      description: language === 'he'
        ? 'התרופות תומכות בתיקון עצבים ויישור איברים חיוניים'
        : 'The remedies support nerve repair and alignment of vital organs',
    },
    {
      icon: Lock,
      title: language === 'he' ? 'סגירת "דלתות פתוחות"' : 'Closing "Open Doors"',
      description: language === 'he'
        ? 'הן סוגרות את "הדלתות הפתוחות" המאפשרות למזהמים עצמיים להיאחז בגוף'
        : 'They close the "open doors" that allow self-pollutants to take hold in the body',
    },
  ];

  const certifications = [
    {
      icon: GraduationCap,
      title: t('about.certifications.naturopathy.title', language),
      description: t('about.certifications.naturopathy.description', language),
      images: [cert1, cert2],
      category: language === 'he' ? 'נטורופתיה' : 'Naturopathy'
    },
    {
      icon: Award,
      title: t('about.certifications.integrative.title', language),
      description: t('about.certifications.integrative.description', language),
      images: [cert3, cert4],
      category: language === 'he' ? 'רפואה משולבת' : 'Integrative Medicine'
    },
    {
      icon: FileText,
      title: t('about.certifications.homeopathy.title', language),
      description: t('about.certifications.homeopathy.description', language),
      images: [cert5, cert6],
      category: language === 'he' ? 'הומיאופתיה' : 'Homeopathy'
    },
  ];

  return (
    <div data-testid="about-page">
      {/* Hero Section */}
      <div className="dh-hero-gradient text-white py-20" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="about-title">
              {t('about.title', language)}
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90" data-testid="about-subtitle">
              {t('about.subtitle', language)}
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white py-20" data-testid="story-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dh-navy mb-6" data-testid="story-title">
                {t('about.story.title', language)}
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p data-testid="story-paragraph-1">
                  {language === 'he'
                    ? 'DHnaturally נולדה מתוך ניסיון אישי עם החסרונות של המערכת הרפואית המודרנית. לאחר בדיקת דם שגרתית שגילתה רמות גלוקוז גבוהות, הופתעתי כשהרופא שלי לא הציע דבר מעבר למילות זהירות והמלצה מעורפלת "לשנות את אורח החיים".'
                    : 'DHnaturally was born out of personal experience with the shortcomings of the modern medical system. After a routine blood test revealed high glucose levels, I was taken aback when my doctor offered nothing more than words of caution and a vague recommendation to "change my lifestyle."'
                  }
                </p>
                <p data-testid="story-paragraph-2">
                  {language === 'he'
                    ? 'בדיקת המעקב הראתה את אותן התוצאות, הפעם עם רמות כולסטרול LDL גבוהות גם כן. החיים רק נעשו יותר עסוקים, עד שיום אחד מצאתי את עצמי בבית החולים.'
                    : 'A follow-up test showed the same results, this time with elevated LDL cholesterol as well. Life only became busier, until one day I found myself in the hospital.'
                  }
                </p>
                <p data-testid="story-paragraph-3">
                  {language === 'he'
                    ? 'המסע הזה פתח לי את העיניים לדילמה שרבים אנשים מתמודדים איתה: בעוד שתמיד מעודדים שינויי אורח חיים ותזונה, הם רק לעתים רחוקות מספקים את הפתרונות המהירים והמעשיים שאנו משתוקים להם ברגעי דחיפות.'
                    : 'This journey opened my eyes to a dilemma many people face: while lifestyle and dietary changes are always encouraged, they rarely provide the quick and practical solutions we long for in moments of urgency.'
                  }
                </p>
                <p data-testid="story-paragraph-4">
                  {language === 'he'
                    ? 'DHnaturally נוצרה למלא את הפער הזה, מציעה יד תומכת טבעית, שותף מהימן ודרך אלטרנטיבית לרווחה.'
                    : 'DHnaturally was created to fill that gap, offering a natural supportive hand, a trusted partner and an alternative path to well-being.'
                  }
                </p>
              </div>
            </div>
            <div className="text-center">
              <img
                src={logoImage}
                alt="Natural wellness journey"
                className="opacity-50 w-full max-w-lg mx-auto"
                data-testid="story-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-dh-pale py-20" data-testid="mission-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6" data-testid="mission-title">
              {t('about.mission.title', language)}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="mission-subtitle">
              {t('about.mission.subtitle', language)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-white rounded-xl shadow-lg"
                  data-testid={`mission-value-${index}`}
                >
                  <div className="w-20 h-20 bg-dh-ocean text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-dh-navy mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How We Work Section */}
      <div className="bg-white py-20" data-testid="work-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6" data-testid="work-title">
              {t('about.work.title', language)}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="work-subtitle">
              {t('about.work.subtitle', language)}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {workingPrinciples.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 rtl:space-x-reverse"
                    data-testid={`working-principle-${index}`}
                  >
                    <div className="w-12 h-12 bg-dh-light text-dh-navy rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-dh-navy mb-2">{principle.title}</h3>
                      <p className="text-gray-600">{principle.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <img
                src={pomegranate}
                alt="Natural healing process"
                className="rounded-2xl w-full max-w-lg mx-auto"
                data-testid="work-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-dh-pale py-20" data-testid="certifications-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6" data-testid="certifications-title">
              {t('about.certifications.title', language)}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="certifications-subtitle">
              {t('about.certifications.subtitle', language)}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {certifications.map((certification, index) => {
              const IconComponent = certification.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  data-testid={`certification-${index}`}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-dh-ocean text-white rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className={`ml-4 ${language === 'he' ? 'text-right' : 'text-left'}`}>
                        <div className="text-sm text-dh-ocean font-medium mb-1">
                          {certification.category}
                        </div>
                        <h3 className="text-xl font-semibold text-dh-navy">{certification.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {certification.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {certification.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${certification.title} certificate ${imgIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            data-testid={`cert-image-${index}-${imgIndex}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      {/* <div className="dh-gradient-bg py-20" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6" data-testid="values-title">
              {language === 'he' ? 'הערכים שלנו' : 'Our Values'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'he' ? 'DHnaturally - שם שזור בחסד הטבע' : 'DHnaturally - a name woven with nature\'s grace'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <blockquote className="text-2xl text-gray-700 text-center italic leading-relaxed" data-testid="values-quote">
              {language === 'he'
                ? '"המשימה שלנו היא מניעה, שחזור ואיזון: להנחות אתכם חזרה, צעד אחר צעד, לכיוון המצב הטבעי שלכם של בריאות אופטימלית."'
                : '"Our mission is prevention, restoration, and balance: guiding you back, step by step, toward your natural state of optimum health."'
              }
            </blockquote>
            <div className="text-center mt-6">
              <div className="w-16 h-1 bg-dh-ocean mx-auto"></div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
