import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Product } from '@shared/schema';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/hooks/use-cart';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { t } from '@/lib/i18n';
import { Star, Award, ShieldCheck, Leaf, Heart, CheckCircle2, Eye, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { language } = useLanguage();
  const { addToCart, isAddingToCart } = useCart();
  const { success, buttonPress, lightTap } = useHapticFeedback();

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
    success(); // Haptic feedback for successful action
    addToCart({ productId: product.id });
  };

  const badgeInfo = getBadgeInfo();
  const BadgeIcon = badgeInfo.icon;
  

  return (
    <div 
      className="
        product-card bg-white rounded-xl shadow-sm overflow-hidden 
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out
        border border-gray-100 group cursor-pointer
        h-full flex flex-col
      "
      data-testid={`product-card-${product.id}`}
      data-category={product.category}
      onTouchStart={() => lightTap()}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={productName}
          className="w-full h-48 xl:h-40 object-contain group-hover:scale-102 transition-transform duration-200 bg-gray-50"
          data-testid={`product-image-${product.id}`}
        />
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-500 text-white text-xs px-2 py-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {language === 'he' ? 'מומלץ' : 'Featured'}
            </Badge>
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {language === 'he' ? 'אזל מהמלאי' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 xl:p-5 flex-1 flex flex-col">
        {/* Product Info */}
        <div className="flex-1 mb-4">
          <h3 
            className="text-base xl:text-lg font-semibold text-dh-navy mb-2 line-clamp-2 leading-tight"
            data-testid={`product-name-${product.id}`}
          >
            {productName}
          </h3>
          
          <p 
            className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed"
            data-testid={`product-description-${product.id}`}
          >
            {productDescription}
          </p>
          
          <Badge 
            variant="outline" 
            className={`text-xs px-2 py-1 mb-3 ${badgeInfo.color}`}
          >
            <BadgeIcon className="w-3 h-3 mr-1" />
            {badgeInfo.text}
          </Badge>
        </div>
        
        {/* Price & Action */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-lg xl:text-xl font-bold text-dh-navy"
                data-testid={`product-price-${product.id}`}
              >
                {t('common.currency', language)}{product.price}
              </span>
              {featured && (
                <span className="text-sm text-gray-500 line-through">
                  {t('common.currency', language)}{(parseFloat(product.price) * 1.2).toFixed(0)}
                </span>
              )}
            </div>
            {product.in_stock && (
              <span className="text-xs text-green-600 font-medium">
                {language === 'he' ? 'זמין' : 'In Stock'}
              </span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAddingToCart}
            className="
              w-full bg-dh-ocean text-white 
              hover:bg-dh-navy transition-colors duration-200
              font-medium py-3 xl:py-2.5 disabled:opacity-50 min-h-[48px]
            "
            data-testid={`add-to-cart-${product.id}`}
          >
            {isAddingToCart ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('common.loading', language)}</span>
              </div>
            ) : product.in_stock ? (
              <span>{t('store.addToCart', language)}</span>
            ) : (
              <span>{language === 'he' ? 'אזל מהמלאי' : 'Out of Stock'}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
