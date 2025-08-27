import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Award, Shield, Users, Star, CheckCircle, TrendingUp, Clock } from 'lucide-react';

export function TrustSignalsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const trustSignals = [
    {
      icon: Users,
      metric: '15,000+',
      label: language === 'he' ? 'מטופלים מרוצים' : 'Satisfied Patients',
      color: 'text-green-600 bg-green-50',
      description: language === 'he' ? 'חוו שיפור משמעותי בבריאותם' : 'Experienced significant health improvement'
    },
    {
      icon: Award,
      metric: '95%',
      label: language === 'he' ? 'שיעור הצלחה' : 'Success Rate',
      color: 'text-amber-600 bg-amber-50',
      description: language === 'he' ? 'מטופלים מדווחים על שיפור' : 'Patients report improvement'
    },
    {
      icon: Shield,
      metric: '25+',
      label: language === 'he' ? 'שנות ניסיון' : 'Years Experience',
      color: 'text-blue-600 bg-blue-50',
      description: language === 'he' ? 'ברפואה טבעית ונטורופתיה' : 'In natural medicine & naturopathy'
    },
    {
      icon: CheckCircle,
      metric: '1,200+',
      label: language === 'he' ? 'תכשירים מפותחים' : 'Remedies Developed',
      color: 'text-purple-600 bg-purple-50',
      description: language === 'he' ? 'נוסחאות ייחודיות ומוכחות' : 'Unique & proven formulations'
    },
    {
      icon: TrendingUp,
      metric: '88%',
      label: language === 'he' ? 'מטופלים חוזרים' : 'Returning Patients',
      color: 'text-emerald-600 bg-emerald-50',
      description: language === 'he' ? 'ממליצים למשפחה וחברים' : 'Recommend to family & friends'
    },
    {
      icon: Clock,
      metric: '7-14',
      label: language === 'he' ? 'ימים לשיפור' : 'Days to Improvement',
      color: 'text-rose-600 bg-rose-50',
      description: language === 'he' ? 'זמן ממוצע לתוצאות ראשוניות' : 'Average time to initial results'
    },
    {
      icon: Star,
      metric: '4.9/5',
      label: language === 'he' ? 'דירוג ממוצע' : 'Average Rating',
      color: 'text-yellow-600 bg-yellow-50',
      description: language === 'he' ? 'מעל 3,000 חוות דעת' : 'Over 3,000 reviews'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trustSignals.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [trustSignals.length]);

  const currentSignal = trustSignals[currentIndex];
  const IconComponent = currentSignal.icon;

  return (
    <div className="trust-signals-carousel">
      {/* Main Display */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 min-h-[160px] flex items-center justify-center overflow-hidden">
        <div className="text-center transform transition-all duration-700 ease-out">
          <div className={`w-20 h-20 rounded-full ${currentSignal.color} flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 hover:scale-110`}>
            <IconComponent className="h-10 w-10 transition-transform duration-300" />
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-dh-navy transition-all duration-500">
              {currentSignal.metric}
            </div>
            <div className="text-xl font-semibold text-dh-ocean transition-all duration-500">
              {currentSignal.label}
            </div>
            <div className="text-sm text-gray-600 transition-all duration-500 max-w-xs mx-auto">
              {currentSignal.description}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {trustSignals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              h-2 rounded-full transition-all duration-400 ease-out hover:scale-125
              ${index === currentIndex 
                ? 'w-10 bg-dh-ocean shadow-md' 
                : 'w-2 bg-gray-300 hover:bg-gray-400'
              }
            `}
            aria-label={`Show trust signal ${index + 1}`}
          />
        ))}
      </div>

      {/* Quick Stats Grid (Mobile Alternative) */}
      <div className="hidden sm:block mt-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          {trustSignals.slice(0, 3).map((signal, index) => {
            const Icon = signal.icon;
            return (
              <div
                key={index}
                className={`
                  p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105
                  ${index === currentIndex 
                    ? 'border-dh-ocean bg-dh-ocean/5 shadow-md' 
                    : 'border-gray-200 hover:border-dh-ocean/50 hover:shadow-sm'
                  }
                `}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon className={`h-5 w-5 transition-colors duration-300 ${
                    index === currentIndex ? 'text-dh-ocean' : 'text-gray-500'
                  }`} />
                  <span className="font-bold text-dh-navy text-sm">{signal.metric}</span>
                </div>
                <div className="text-xs text-gray-600">{signal.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Trust Badge */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-sm">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md transform transition-transform duration-300 hover:scale-110">
              ✓
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md transform transition-transform duration-300 hover:scale-110">
              ★
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md transform transition-transform duration-300 hover:scale-110">
              ♥
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-green-800 mb-1">
              {language === 'he' ? 'בטוח ומוכח קלינית' : 'Safe & Clinically Proven'}
            </div>
            <div className="text-green-600">
              {language === 'he' ? 'מבוסס מחקר מדעי' : 'Science-based research'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}