import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartSidebar({ isOpen, onClose }: ShoppingCartSidebarProps) {
  const { cartItems, totalPrice, totalItems, updateQuantity, removeItem, clearCart, isLoading } = useCart();
  const { language } = useLanguage();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity({ id: itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={language === 'he' ? 'left' : 'right'} className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle data-testid="cart-title">{t('cart.title', language)}</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center h-full">
            <p data-testid="cart-loading">{t('common.loading', language)}</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side={language === 'he' ? 'left' : 'right'} className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle data-testid="cart-title">{t('cart.title', language)}</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500" data-testid="cart-empty">
                {t('cart.empty', language)}
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const productName = language === 'he' ? item.product.name_he : item.product.name_en;
                    
                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center space-x-4 rtl:space-x-reverse p-4 border rounded-lg"
                        data-testid={`cart-item-${item.id}`}
                      >
                        <img
                          src={item.product.image_url}
                          alt={productName}
                          className="w-16 h-16 object-cover rounded-md"
                          data-testid={`cart-item-image-${item.id}`}
                        />
                        
                        <div className="flex-1">
                          <h4 
                            className="font-medium text-sm"
                            data-testid={`cart-item-name-${item.id}`}
                          >
                            {productName}
                          </h4>
                          <p 
                            className="text-dh-ocean font-semibold"
                            data-testid={`cart-item-price-${item.id}`}
                          >
                            {t('common.currency', language)}{item.product.price}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            data-testid={`decrease-quantity-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span 
                            className="w-8 text-center"
                            data-testid={`cart-item-quantity-${item.id}`}
                          >
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            data-testid={`increase-quantity-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span data-testid="cart-total-label">{t('cart.total', language)}</span>
                  <span data-testid="cart-total-price">
                    {t('common.currency', language)}{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-dh-ocean hover:bg-dh-navy"
                    data-testid="checkout-button"
                  >
                    {t('cart.checkout', language)}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => clearCart()}
                    data-testid="clear-cart-button"
                  >
                    {language === 'he' ? 'נקה עגלה' : 'Clear Cart'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ShoppingCartSidebar as ShoppingCart };
