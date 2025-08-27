import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
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
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [productsToShow, setProductsToShow] = useState<number>(12);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
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
    { value: 'featured', label: t('store.sort.recommended', language), icon: Star },
    { value: 'popular', label: t('store.sort.popular', language), icon: Users },
    { value: 'newest', label: t('store.sort.newest', language), icon: Clock },
    { value: 'price-asc', label: t('store.sort.price.asc', language), icon: null },
    { value: 'price-desc', label: t('store.sort.price.desc', language), icon: null },
    { value: 'name', label: language === 'he' ? 'שם המוצר א-ת' : 'Name A-Z', icon: null },
  ];

  useEffect(() => {
    // Function to read URL parameters and update state
    const updateFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get('category');
      if (category && categories.some(c => c.value === category)) {
        setSelectedCategory(category);
        setProductsToShow(12); // Reset products count when changing category
      } else if (!category) {
        // If no category parameter, reset to 'all'
        setSelectedCategory('all');
      }
    };

    // Initial load
    updateFromURL();

    // Listen for popstate events (back/forward buttons)
    const handlePopState = () => {
      updateFromURL();
    };

    // Listen for hashchange events  
    const handleHashChange = () => {
      updateFromURL();
    };

    // Custom event for manual navigation updates
    const handleCustomNavigation = () => {
      updateFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('storePageUpdate', handleCustomNavigation);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('storePageUpdate', handleCustomNavigation);
    };
  }, [location]); // Keep location dependency to also trigger on route changes

  // Also reset products count when category changes manually
  useEffect(() => {
    setProductsToShow(12);
  }, [selectedCategory]);

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
        case 'featured':
          // Featured items first, then in-stock items, then by creation date (newest first)
          if (a.featured !== b.featured) {
            return b.featured ? 1 : -1;
          }
          if (a.in_stock !== b.in_stock) {
            return b.in_stock ? 1 : -1;
          }
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
          
        case 'popular':
          // Simulate popularity: featured items + in-stock items + newer items
          // In a real app, this would use actual sales/view data
          const popularityScoreA = (a.featured ? 100 : 0) + (a.in_stock ? 50 : 0) + 
            (new Date(a.created_at || 0).getTime() / 1000000);
          const popularityScoreB = (b.featured ? 100 : 0) + (b.in_stock ? 50 : 0) + 
            (new Date(b.created_at || 0).getTime() / 1000000);
          return popularityScoreB - popularityScoreA;
          
        case 'newest':
          // Sort by creation date (newest first), then by stock status
          const dateComparison = new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
          if (dateComparison !== 0) return dateComparison;
          return b.in_stock ? 1 : -1;
          
        case 'price-asc':
          // In-stock items first, then by price ascending
          if (a.in_stock !== b.in_stock) {
            return b.in_stock ? 1 : -1;
          }
          return parseFloat(a.price) - parseFloat(b.price);
          
        case 'price-desc':
          // In-stock items first, then by price descending
          if (a.in_stock !== b.in_stock) {
            return b.in_stock ? 1 : -1;
          }
          return parseFloat(b.price) - parseFloat(a.price);
          
        case 'name':
          // In-stock items first, then alphabetically
          if (a.in_stock !== b.in_stock) {
            return b.in_stock ? 1 : -1;
          }
          const nameA = language === 'he' ? a.name_he : a.name_en;
          const nameB = language === 'he' ? b.name_he : b.name_en;
          return nameA.localeCompare(nameB, language === 'he' ? 'he' : 'en', { 
            sensitivity: 'base',
            numeric: true 
          });
          
        default:
          // Fallback to featured sorting
          if (a.featured !== b.featured) {
            return b.featured ? 1 : -1;
          }
          if (a.in_stock !== b.in_stock) {
            return b.in_stock ? 1 : -1;
          }
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
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
      {/* Hero Section for New Visitors */}
      <section className="bg-dh-light-green py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* CTA for New Visitors */}
          <Card className="bg-gradient-to-r from-dh-pale to-dh-light max-w-2xl mx-auto shadow-lg border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-dh-ocean mb-4">
                <BookOpen className="w-8 h-8" />
                <p className="text-xl font-semibold">
                  {language === 'he' ? 'פעם ראשונה אצלנו?' : 'New here?'}
                </p>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {language === 'he' 
                  ? 'אל תוותרו על שיחת ייעוץ חינם עם נטורופתית מוסמכת להתאמה מושלמת מתוך מגוון המוצרים שלנו.'
                  : 'Don’t miss out on a free consultation with a certified naturopath to find the perfect match from our product range.'
                }
              </p>
                            <Button onClick={() => window.open('https://wa.me/972586572451?text=' + encodeURIComponent('שלום, אשמח לקבוע פגישת ייעוץ'), '_blank')}
                className="bg-dh-ocean text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-dh-navy transition-colors"
                data-testid="cta-button"
              >
                {language === 'he' ? 'קבלו ייעוץ חינם' : 'Get Free Consultation'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={language === 'he' ? 'חפשו תכשירים, צמחים או סימפטומים...' : 'Search for remedies, herbs, or symptoms...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 border-gray-300 rounded-lg focus:border-dh-ocean focus:ring-dh-ocean/50"
                data-testid="search-input"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              if (value === 'all') {
                window.history.pushState({}, '', '/store');
              } else {
                window.history.pushState({}, '', `/store?category=${value}`);
              }
            }}>
              <SelectTrigger className="w-[240px]" data-testid="category-filter">
                <SelectValue placeholder={language === 'he' ? 'כל הקטגוריות' : 'All Categories'} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]" data-testid="sort-filter">
                <SelectValue placeholder={language === 'he' ? 'סידור לפי' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon && <option.icon className="w-4 h-4 text-gray-500" />}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Summary */}
        {selectedCategory !== 'all' && (
          <div className="mb-6 p-3 bg-dh-ocean/10 rounded-lg border border-dh-ocean/20">
            <div className="flex items-center justify-between">
              <p className="text-dh-navy text-sm font-medium">
                {language === 'he' 
                  ? `מציג תכשירים מקטגוריה: ${categories.find(c => c.value === selectedCategory)?.label}`
                  : `Showing remedies from category: ${categories.find(c => c.value === selectedCategory)?.label}`
                }
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="text-dh-ocean hover:text-dh-navy"
              >
                {language === 'he' ? 'הצג הכל' : 'Show All'}
              </Button>
            </div>
          </div>
        )}
        {searchQuery && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              {language === 'he' 
                ? `${filteredAndSortedProducts.length} תוצאות עבור "${searchQuery}"`
                : `${filteredAndSortedProducts.length} results for "${searchQuery}"`
              }
            </p>
          </div>
        )}

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 mb-12" data-testid="products-grid">
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
    </div>
  );
}