import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { t } from '@/lib/i18n';
import { type Article } from '@shared/schema';
import { Calendar, Clock } from 'lucide-react';

export function Articles() {
  const { language } = useLanguage();

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  const { data: featuredArticles = [] } = useQuery<Article[]>({
    queryKey: ['/api/articles?featured=true'],
  });

  const featuredArticle = featuredArticles[0];

  const getCategoryBadge = (category: string) => {
    const categoryMap: Record<string, { he: string; en: string; color: string }> = {
      immunity: { he: 'חסינות', en: 'Immunity', color: 'bg-green-100 text-green-800' },
      digestion: { he: 'עיכול', en: 'Digestion', color: 'bg-blue-100 text-blue-800' },
      stress: { he: 'מתח', en: 'Stress', color: 'bg-purple-100 text-purple-800' },
      sleep: { he: 'שינה', en: 'Sleep', color: 'bg-indigo-100 text-indigo-800' },
      detox: { he: 'ניקוי רעלים', en: 'Detox', color: 'bg-green-100 text-green-800' },
      nutrition: { he: 'תזונה', en: 'Nutrition', color: 'bg-orange-100 text-orange-800' },
      homeopathy: { he: 'הומיאופתיה', en: 'Homeopathy', color: 'bg-blue-100 text-blue-800' },
    };

    const categoryInfo = categoryMap[category] || { he: category, en: category, color: 'bg-gray-100 text-gray-800' };
    return {
      label: language === 'he' ? categoryInfo.he : categoryInfo.en,
      className: categoryInfo.color,
    };
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return language === 'he' 
      ? date.toLocaleDateString('he-IL')
      : date.toLocaleDateString('en-US');
  };

  return (
    <div data-testid="articles-page">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16" data-testid="articles-header">
            <h1 className="text-4xl lg:text-5xl font-bold text-dh-navy mb-6" data-testid="articles-title">
              {t('articles.title', language)}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="articles-description">
              {t('articles.description', language)}
            </p>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="dh-gradient-bg rounded-2xl p-8 mb-16" data-testid="featured-article">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-dh-ocean text-white mb-4" data-testid="featured-badge">
                    {t('articles.featured', language)}
                  </Badge>
                  <h2 className="text-3xl font-bold text-dh-navy mb-4" data-testid="featured-article-title">
                    {language === 'he' ? featuredArticle.title_he : featuredArticle.title_en}
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg" data-testid="featured-article-excerpt">
                    {language === 'he' ? featuredArticle.excerpt_he : featuredArticle.excerpt_en}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span data-testid="featured-article-date">
                      {formatDate(featuredArticle.created_at!)}
                    </span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span data-testid="featured-article-read-time">
                      {featuredArticle.read_time} {t('articles.readTime', language)}
                    </span>
                  </div>
                  <Button 
                    className="bg-dh-ocean text-white px-6 py-3 rounded-full font-medium hover:bg-dh-navy transition-colors"
                    data-testid="featured-article-read-more"
                  >
                    {t('articles.readMore', language)}
                  </Button>
                </div>
                <div className="text-center">
                  <img
                    src={featuredArticle.image_url}
                    alt={language === 'he' ? featuredArticle.title_he : featuredArticle.title_en}
                    className="rounded-xl shadow-lg w-full"
                    data-testid="featured-article-image"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p data-testid="articles-loading">{t('common.loading', language)}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="articles-grid">
              {articles.filter(article => !article.featured).map((article) => {
                const categoryBadge = getCategoryBadge(article.category);
                
                return (
                  <article 
                    key={article.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    data-testid={`article-${article.id}`}
                  >
                    <img
                      src={article.image_url}
                      alt={language === 'he' ? article.title_he : article.title_en}
                      className="w-full h-48 object-cover"
                      data-testid={`article-image-${article.id}`}
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Badge 
                          className={`text-xs px-2 py-1 rounded-full ${categoryBadge.className}`}
                          data-testid={`article-category-${article.id}`}
                        >
                          {categoryBadge.label}
                        </Badge>
                        <span className="text-gray-500 text-sm ml-3" data-testid={`article-date-${article.id}`}>
                          {formatDate(article.created_at!)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-dh-navy mb-3" data-testid={`article-title-${article.id}`}>
                        {language === 'he' ? article.title_he : article.title_en}
                      </h3>
                      <p className="text-gray-600 mb-4" data-testid={`article-excerpt-${article.id}`}>
                        {language === 'he' ? article.excerpt_he : article.excerpt_en}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500" data-testid={`article-read-time-${article.id}`}>
                          {article.read_time} {t('articles.readTime', language)}
                        </span>
                        <Button 
                          variant="ghost"
                          className="text-dh-ocean font-medium hover:text-dh-navy transition-colors p-0"
                          data-testid={`article-read-more-${article.id}`}
                        >
                          {t('articles.readMore', language)} →
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="dh-hero-gradient rounded-2xl p-8 mt-16 text-center text-white" data-testid="newsletter-section">
            <h3 className="text-2xl font-bold mb-4" data-testid="newsletter-title">
              {t('articles.newsletter.title', language)}
            </h3>
            <p className="mb-6" data-testid="newsletter-description">
              {t('articles.newsletter.description', language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('articles.newsletter.placeholder', language)}
                className="flex-1 text-gray-800"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="bg-white text-dh-ocean px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                data-testid="newsletter-subscribe-button"
              >
                {t('articles.newsletter.subscribe', language)}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
