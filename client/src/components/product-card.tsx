import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Product } from '@shared/schema';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/hooks/use-cart';
import { t } from '@/lib/i18n';
import { Star, Award, ShieldCheck, Leaf, Heart, CheckCircle2, Eye, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { language } = useLanguage();
  const { addToCart, isAddingToCart } = useCart();

  const productName = language === 'he' ? product.name_he : product.name_en;
  const productDescription = language === 'he' ? product.description_he : product.description_en;

  const getBadgeInfo = () => {
    if (featured) return {
      text: language === 'he' ? 'מומלץ על ידי מטפלים' : 'Practitioner Recommended',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Award
    };
    
    switch (product.category) {
      case 'immunity':
        return {
          text: language === 'he' ? 'חיזוק חסינות' : 'Immune Support',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: ShieldCheck
        };
      case 'digestion':
        return {
          text: language === 'he' ? 'בריאות עיכול' : 'Digestive Health',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Heart
        };
      case 'stress':
        return {
          text: language === 'he' ? 'הרגעה טבעית' : 'Natural Calming',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Heart
        };
      case 'sleep':
        return {
          text: language === 'he' ? 'שינה איכותית' : 'Quality Sleep',
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: Heart
        };
      case 'hormonal':
        return {
          text: language === 'he' ? 'איזון הורמונלי' : 'Hormonal Balance',
          color: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: Heart
        };
      case 'respiratory':
        return {
          text: language === 'he' ? 'בריאות נשימה' : 'Respiratory Health',
          color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
          icon: ShieldCheck
        };
      default:
        return {
          text: language === 'he' ? 'טיפול טבעי' : 'Natural Treatment',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: Leaf
        };
    }
  };

  const handleAddToCart = () => {
    addToCart({ productId: product.id });
  };

  const badgeInfo = getBadgeInfo();
  const BadgeIcon = badgeInfo.icon;
  
  const benefits = [
    language === 'he' ? 'טבעי 100%' : '100% Natural',
    language === 'he' ? 'בטוח לשימוש' : 'Safe to Use',
    language === 'he' ? 'מבוסס מחקר' : 'Research-Based'
  ];

  return (
    <div 
      className="product-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
      data-testid={`product-card-${product.id}`}
      data-category={product.category}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image_url}
          alt={productName}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid={`product-image-${product.id}`}
        />
        <div className="absolute top-4 left-4">
          <Badge 
            className={`${badgeInfo.color} border font-medium text-xs px-3 py-1`}
            data-testid={`product-badge-${product.id}`}
          >
            <BadgeIcon className="w-3 h-3 mr-1" />
            {badgeInfo.text}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-dh-ocean text-white border-dh-ocean font-medium text-xs px-3 py-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {language === 'he' ? 'מומלץ' : 'Featured'}
            </Badge>
          </div>
        )}
        {/* Stock Status */}
        <div className="absolute bottom-4 right-4">
          <Badge className={`text-xs px-2 py-1 ${product.in_stock ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {product.in_stock ? t('store.inStock', language) : t('store.outOfStock', language)}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {/* Product Header */}
        <div className="mb-3">
          <h3 
            className="text-lg font-bold text-dh-navy mb-2 overflow-hidden text-ellipsis group-hover:text-dh-ocean transition-colors"
            data-testid={`product-name-${product.id}`}
          >
            {productName}
          </h3>
          
        </div>
        
        <p 
          className="text-gray-600 text-sm mb-4 overflow-hidden text-ellipsis leading-relaxed h-16"
          data-testid={`product-description-${product.id}`}
        >
          {productDescription}
        </p>
        
        {/* Benefits */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {benefits.slice(0, 2).map((benefit, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs px-2 py-1 bg-dh-light/30 text-dh-navy border-dh-ocean/20"
              >
                <Leaf className="w-3 h-3 mr-1" />
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Price and Actions */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span 
              className="text-2xl font-bold text-dh-ocean"
              data-testid={`product-price-${product.id}`}
            >
              {t('common.currency', language)}{product.price}
            </span>
            {featured && (
              <div className="text-xs text-gray-500 line-through">
                {t('common.currency', language)}{(parseFloat(product.price) * 1.2).toFixed(0)}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-green-600 font-medium mb-1">
              {language === 'he' ? 'משלוח חינם' : 'Free Shipping'}
            </div>
            <div className="text-xs text-gray-500">
              {language === 'he' ? 'מעל ₪150' : 'Over ₪150'}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAddingToCart}
            className="w-full bg-dh-ocean text-white px-4 py-3 rounded-full hover:bg-dh-navy transition-colors font-medium disabled:opacity-50"
            data-testid={`add-to-cart-${product.id}`}
          >
            {isAddingToCart ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {t('common.loading', language)}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                {t('store.addToCart', language)}
              </div>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-dh-navy border-dh-ocean/30 hover:bg-dh-light/20 rounded-full"
            >
              <Eye className="w-4 h-4 mr-1" />
              {t('store.viewDetails', language)}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-dh-navy border-dh-ocean/30 hover:bg-dh-light/20 rounded-full"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {language === 'he' ? 'שאלו' : 'Ask'}
            </Button>
          </div>
        </div>
        
        {/* Professional Note */}
        {featured && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                {language === 'he' 
                  ? 'מומלץ על ידי מטפלים מקצועיים ובעל שיעור הצלחה גבוה במיוחד'
                  : 'Recommended by professional practitioners with exceptionally high success rate'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
