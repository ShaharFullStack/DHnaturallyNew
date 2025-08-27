import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Small delay to allow DOM to update
    const scrollTimeout = setTimeout(() => {
      // Check if this is a footer category navigation to store page
      const isFooterCategoryNavigation = 
        location === '/store' && 
        window.location.search.includes('category=') && 
        window.location.hash === '#products-grid';

      if (isFooterCategoryNavigation) {
        // For footer category navigation, scroll to products grid with offset for navigation
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
          const rect = productsGrid.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          // Offset by navigation height (approximately 80px) plus some padding
          const offsetTop = absoluteTop - 100;
          window.scrollTo({ top: offsetTop, left: 0, behavior: 'smooth' });
        }
      } else {
        // For all other navigation, instantly jump to top (no smooth scrolling)
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }, 50); // Reduced delay for faster response

    return () => clearTimeout(scrollTimeout);
  }, [location]);

  // Also listen for URL parameter changes even when staying on same route
  useEffect(() => {
    const handleStorePageUpdate = () => {
      if (location === '/store' && window.location.hash === '#products-grid') {
        setTimeout(() => {
          const productsGrid = document.getElementById('products-grid');
          if (productsGrid) {
            const rect = productsGrid.getBoundingClientRect();
            const absoluteTop = rect.top + window.pageYOffset;
            // Offset by navigation height plus padding
            const offsetTop = absoluteTop - 100;
            window.scrollTo({ top: offsetTop, left: 0, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('storePageUpdate', handleStorePageUpdate);
    return () => window.removeEventListener('storePageUpdate', handleStorePageUpdate);
  }, [location]);

  return null;
}
