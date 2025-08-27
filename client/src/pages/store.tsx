import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';
import { type Product } from '@shared/schema';
import { Search, Filter, Star, Award, ShieldCheck, Clock, Users, BookOpen, MessageCircle, CheckCircle2, Heart, Zap, Leaf } from 'lucide-react';

export function Store() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [productsToShow, setProductsToShow] = useState<number>(12);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: selectedCategory === 'all' ? ['/api/products'] : ['/api/products', { category: selectedCategory }],
  });

  const categories = [
    { value: 'all', label: t('store.filter.all', language), icon: Leaf, description: language === 'he' ? 'כל התכשירים הטבעיים שלנו' : 'All our natural remedies' },
    { value: 'immunity', label: t('store.filter.immunity', language), icon: ShieldCheck, description: language === 'he' ? 'חיזוק טבעי למערכת החיסון' : 'Natural immune system support' },
    { value: 'digestion', label: t('store.filter.digestion', language), icon: Heart, description: language === 'he' ? 'בריאות מערכת העיכול' : 'Digestive health support' },
    { value: 'stress', label: t('store.filter.stress', language), icon: Zap, description: language === 'he' ? 'הרגעה ושיווי משקל' : 'Calming and balance' },
    { value: 'sleep', label: t('store.filter.sleep', language), icon: Clock, description: language === 'he' ? 'שינה טבעית ואיכותית' : 'Natural quality sleep' },
    { value: 'hormonal', label: t('store.filter.hormonal', language), icon: Heart, description: language === 'he' ? 'איזון הורמונלי טבעי' : 'Natural hormonal balance' },
    { value: 'respiratory', label: t('store.filter.respiratory', language), icon: ShieldCheck, description: language === 'he' ? 'בריאות מערכת הנשימה' : 'Respiratory health' },
    { value: 'pain', label: t('store.filter.pain', language), icon: Heart, description: language === 'he' ? 'הקלה טבעית על כאבים' : 'Natural pain relief' },
    { value: 'detox', label: t('store.filter.detox', language), icon: Leaf, description: language === 'he' ? 'ניקוי הגוף באופן טבעי' : 'Natural body cleansing' },
    { value: 'energy', label: t('store.filter.energy', language), icon: Zap, description: language === 'he' ? 'חיזוק אנרגיה וחיוניות' : 'Energy and vitality boost' },
    { value: 'mental', label: t('store.filter.mental', language), icon: Zap, description: language === 'he' ? 'בריאות נפשית ומוח' : 'Mental health and brain support' },
    { value: 'womens', label: t('store.filter.womens', language), icon: Heart, description: language === 'he' ? 'בריאות נשים מיוחדת' : 'Women\'s specialized health' },
    { value: 'mens', label: t('store.filter.mens', language), icon: ShieldCheck, description: language === 'he' ? 'בריאות גברים מותאמת' : 'Men\'s tailored health' },
    { value: 'children', label: t('store.filter.children', language), icon: Heart, description: language === 'he' ? 'תכשירים עדינים לילדים' : 'Gentle remedies for children' },
    { value: 'seniors', label: t('store.filter.seniors', language), icon: ShieldCheck, description: language === 'he' ? 'פתרונות לגיל המבוגר' : 'Solutions for seniors' },
  ];

  const sortOptions = [
    { value: 'price-asc', label: t('store.sort.price.asc', language), icon: null },
    { value: 'price-desc', label: t('store.sort.price.desc', language), icon: null },
    { value: 'name', label: language === 'he' ? 'שם המוצר' : 'Product Name', icon: null },
  ];

  // Filter and search products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => {
        const nameHe = (product.name_he || '').toLowerCase();
        const nameEn = (product.name_en || '').toLowerCase();
        const descHe = (product.description_he || '').toLowerCase();
        const descEn = (product.description_en || '').toLowerCase();
        return nameHe.includes(query) || nameEn.includes(query) || 
               descHe.includes(query) || descEn.includes(query);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'name':
          const nameA = language === 'he' ? a.name_he : a.name_en;
          const nameB = language === 'he' ? b.name_he : b.name_en;
          return nameA.localeCompare(nameB);
        default:
          // Default: featured items first, then by name
          if (a.featured !== b.featured) {
            return b.featured ? 1 : -1;
          }
          const defaultNameA = language === 'he' ? a.name_he : a.name_en;
          const defaultNameB = language === 'he' ? b.name_he : b.name_en;
          return defaultNameA.localeCompare(defaultNameB);
      }
    });

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, productsToShow);

  const trustSignals = [
    { 
      icon: Award, 
      label: language === 'he' ? 'מפותח על ידי מומחים' : 'Expert Formulated',
      description: language === 'he' ? 'תכשירים מקצועיים' : 'Professional formulations'
    },
    { 
      icon: ShieldCheck, 
      label: language === 'he' ? 'נבדק במעבדה' : 'Lab Tested',
      description: language === 'he' ? 'איכות מובטחת' : 'Quality assured'
    },
    { 
      icon: Users, 
      label: language === 'he' ? 'אלפי לקוחות מרוצים' : 'Thousands Satisfied',
      description: language === 'he' ? 'תוצאות מוכחות' : 'Proven results'
    },
    { 
      icon: CheckCircle2, 
      label: language === 'he' ? 'אחריות שביעות רצון' : 'Satisfaction Guarantee',
      description: language === 'he' ? '30 יום החזר כספי' : '30-day money back'
    },
  ];

  return (
    <div data-testid="store-page">
      {/* Hero Section with Trust Signals */}
      <section className="bg-gradient-to-br from-dh-light via-white to-dh-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-testid="store-header">
            <h1 className="text-4xl lg:text-6xl font-bold text-dh-navy mb-6 leading-tight" data-testid="store-title">
              {t('store.title', language)}
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed" data-testid="store-description">
              {t('store.description', language)}
            </p>
            
            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {trustSignals.map((signal, index) => {
                const IconComponent = signal.icon;
                return (
                  <div key={index} className="flex flex-col items-center p-4 bg-white/70 rounded-xl backdrop-blur-sm border border-dh-ocean/10">
                    <IconComponent className="w-8 h-8 text-dh-ocean mb-3" />
                    <h4 className="font-semibold text-dh-navy text-sm mb-1">{signal.label}</h4>
                    <p className="text-xs text-gray-600 text-center">{signal.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Professional Consultation CTA */}
            <div className="mt-12 p-6 bg-dh-ocean/5 border border-dh-ocean/20 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-dh-navy mb-2">
                    {language === 'he' ? 'זקוקים לייעוץ מקצועי?' : 'Need Professional Guidance?'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'he' ? 'צוות המומחים שלנו כאן לעזור לכם לבחור את התכשיר המתאים' : 'Our expert team is here to help you choose the right remedy'}
                  </p>
                </div>
                <Button className="bg-dh-ocean text-white px-6 py-3 rounded-full hover:bg-dh-navy transition-colors whitespace-nowrap">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('cta.getConsultation', language)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter and Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={language === 'he' ? 'חפשו תכשירים טבעיים, הומיאופתיה, תסמינים...' : 'Search natural remedies, homeopathy, symptoms...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-dh-ocean focus:ring-0 transition-colors"
                data-testid="search-input"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 mb-8" data-testid="filter-bar">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-dh-ocean" />
                  <label className="text-gray-700 font-semibold" data-testid="category-filter-label">
                    {t('store.filter.category', language)}
                  </label>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[280px] h-12 border-2 border-gray-200 rounded-xl" data-testid="category-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <SelectItem key={category.value} value={category.value} className="p-3">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-4 h-4 text-dh-ocean" />
                            <div>
                              <div className="font-medium">{category.label}</div>
                              <div className="text-xs text-gray-500">{category.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-semibold" data-testid="sort-filter-label">
                  {t('store.sort', language)}
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[220px] h-12 border-2 border-gray-200 rounded-xl" data-testid="sort-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option: any) => {
                      const IconComponent = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value} className="p-3">
                          <div className="flex items-center gap-2">
                            {IconComponent && <IconComponent className="w-4 h-4 text-dh-ocean" />}
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {searchQuery && (
            <div className="mb-6 p-4 bg-dh-ocean/5 rounded-xl border border-dh-ocean/20">
              <p className="text-dh-navy font-medium">
                {language === 'he' 
                  ? `נמצאו ${filteredAndSortedProducts.length} תכשירים טבעיים עבור "${searchQuery}"`
                  : `Found ${filteredAndSortedProducts.length} natural remedies for "${searchQuery}"`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Educational Content Banner */}
          <div className="bg-gradient-to-r from-dh-navy to-dh-ocean p-8 rounded-2xl mb-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3">
                  {language === 'he' ? 'למדו על הרפואה הטבעית' : 'Learn About Natural Medicine'}
                </h3>
                <p className="text-white/90 mb-4">
                  {language === 'he' 
                    ? 'מאמרים מקצועיים, מדריכים מעמיקים ומידע מבוסס מחקר על תכשירים הומיאופתיים'
                    : 'Professional articles, in-depth guides and research-based information on homeopathic remedies'
                  }
                </p>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white text-dh-navy px-6 py-3 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {language === 'he' ? 'קראו מאמרים' : 'Read Articles'}
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-dh-ocean border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg text-gray-600" data-testid="products-loading">{t('common.loading', language)}</p>
              </div>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {language === 'he' ? 'לא נמצאו תכשירים' : 'No Remedies Found'}
                </h3>
                <p className="text-gray-500 mb-6" data-testid="no-products">
                  {searchQuery 
                    ? (language === 'he' ? 'נסו חיפוש אחר או צרו קשר לייעוץ מקצועי' : 'Try a different search or contact us for professional guidance')
                    : (language === 'he' ? 'לא נמצאו מוצרים בקטגוריה זו' : 'No products found in this category')
                  }
                </p>
                <Button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('all');}} 
                  className="bg-dh-ocean text-white px-6 py-3 rounded-full hover:bg-dh-navy transition-colors"
                >
                  {language === 'he' ? 'ניקוי חיפוש' : 'Clear Search'}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12" data-testid="products-grid">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Load More Button */}
              {productsToShow < filteredAndSortedProducts.length && (
                <div className="text-center">
                  <Button 
                    onClick={() => setProductsToShow(prev => prev + 12)}
                    className="bg-dh-ocean text-white px-8 py-4 rounded-full font-medium hover:bg-dh-navy transition-colors text-lg"
                    data-testid="load-more-button"
                  >
                    {t('store.loadMore', language)} ({filteredAndSortedProducts.length - productsToShow} {language === 'he' ? 'נוספים' : 'more'})
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Professional Guarantee Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dh-navy mb-6">
                {language === 'he' ? 'מחוייבות לבריאות' : 'Committed to Your Health'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {language === 'he' ? 'יעילות מוכחת קלינית' : 'Clinically Proven Efficacy'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'he' 
                        ? 'כל התכשירים שלנו מבוססים על מחקרים מדעיים ושנים של ניסיון קליני'
                        : 'All our remedies are based on scientific research and years of clinical experience'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {language === 'he' ? 'ללא תופעות לוואי' : 'No Side Effects'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'he' 
                        ? 'הטיפול ההומיאופתי עובד בהרמוניה עם הגוף ללא תופעות לוואי'
                        : 'Homeopathic treatment works in harmony with the body without side effects'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {language === 'he' ? 'ליווי מקצועי אישי' : 'Personal Professional Support'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'he' 
                        ? 'צוות המומחים שלנו זמין לייעוץ ותמיכה לאורך כל הדרך'
                        : 'Our expert team is available for consultation and support throughout your journey'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-dh-light to-white p-8 rounded-2xl border border-dh-ocean/20">
              <div className="text-center">
                <Award className="w-16 h-16 text-dh-ocean mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-dh-navy mb-4">
                  {t('marketing.guarantee', language)}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'he' 
                    ? 'אם לא תהיו מרוצים מלא מהתוצאות תוך 30 יום - נחזיר לכם את הכסף במלואו'
                    : 'If you\'re not completely satisfied with the results within 30 days - we\'ll refund your money in full'
                  }
                </p>
                <Button className="bg-dh-ocean text-white px-8 py-3 rounded-full hover:bg-dh-navy transition-colors">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {language === 'he' ? 'דברו עם מומחה' : 'Speak with an Expert'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
