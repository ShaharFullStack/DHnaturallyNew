import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Shield, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  FileCheck, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function CertificationShowcase() {
  const { language } = useLanguage();

  // Simplified certification display - use actual assets that exist
  const certifications = [
    {
      icon: GraduationCap,
      title: language === 'he' ? 'הסמכות מקצועיות' : 'Professional Certifications',
      description: language === 'he' 
        ? 'הכשרה מתמשכת ברפואה טבעית ונטורופתיה'
        : 'Ongoing training in natural medicine and naturopathy'
    },
    {
      icon: Shield,
      title: language === 'he' ? 'רישיונות וביטוחים' : 'Licenses & Insurance', 
      description: language === 'he'
        ? 'רישוי רשמי ועמידה בתקנים מקצועיים'
        : 'Official licensing and professional standards compliance'
    },
    {
      icon: Award,
      title: language === 'he' ? 'חברות מקצועיות' : 'Professional Memberships',
      description: language === 'he'
        ? 'חברות באיגודים מקצועיים מוכרים'
        : 'Membership in recognized professional associations'
    }
  ];

  return (
    <div className="certification-showcase bg-white rounded-xl border border-gray-100 p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-dh-navy mb-4">
          {language === 'he' ? 'הסמכות מקצועיות' : 'Professional Credentials'}
        </h3>
        <p className="text-gray-600">
          {language === 'he'
            ? 'הכשרה מקצועית מתמשכת ועמידה בסטנדרטים גבוהים'
            : 'Continuous professional training and high standards compliance'
          }
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const IconComponent = cert.icon;
          return (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-dh-ocean/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="h-8 w-8 text-dh-ocean" />
              </div>
              <h4 className="font-semibold text-dh-navy mb-2">{cert.title}</h4>
              <p className="text-sm text-gray-600">{cert.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}