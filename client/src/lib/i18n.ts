interface Translations {
  [key: string]: {
    he: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { he: 'בית', en: 'Home' },
  'nav.store': { he: 'חנות תרופות טבעיות', en: 'Natural Remedies Store' },
  'nav.articles': { he: 'מדריכים ומאמרים', en: 'Guides & Articles' },
  'nav.about': { he: 'אודותינו', en: 'About Us' },
  'nav.contact': { he: 'צור קשר', en: 'Contact' },
  'nav.language.he': { he: 'עברית', en: 'עברית' },
  'nav.language.en': { he: 'English', en: 'English' },

  // Home page
  'home.hero.title': { he: 'DHnaturally', en: 'DHnaturally' },
  'home.hero.subtitle': { he: 'תמצית בריאות מהטבע', en: 'Healing naturally, living fully.' },
  'home.hero.description': { he: 'תכשירים הומיאופתיים איכותיים ופתרונות טבעיים מבוססי מחקר להחזרת הגוף למצב האיזון הטבעי ובריאות מיטבית. התמחות בטיפול הוליסטי ורפואה משלימה', en: 'Research-based quality homeopathic remedies and natural solutions to restore your body\'s natural balance and optimal wellness. Specializing in holistic treatment and integrative medicine' },
  'home.hero.cta.products': { he: 'רכישת תכשירים טבעיים', en: 'Shop Natural Remedies' },
  'home.hero.cta.about': { he: 'למד על טיפול טבעי', en: 'Learn Natural Healing' },

  'home.features.title': { he: 'למה DHnaturally הבחירה המקצועית לטיפול טבעי?', en: 'Why DHnaturally is the Professional Choice for Natural Healing?' },
  'home.features.description': { he: 'מתמחים ברפואה הומיאופתית ופיתוסרפיה מקצועית. תכשירינה מבוססי מחקר ופועלים בעדינות ללא תופעות לוואי', en: 'Specializing in professional homeopathic medicine and phytotherapy. Our research-based formulations work gently without side effects' },

  'home.featured.title': { he: 'התכשירים הטבעיים המובילים שלנו', en: 'Our Leading Natural Remedies' },
  'home.featured.description': { he: 'תכשירים נבחרים בהתבסס על יעילות מוכחת, המלצות מטפלים ושביעות רצון לקוחות גבוהה', en: 'Selected remedies based on proven efficacy, practitioner recommendations and high customer satisfaction' },
  'home.featured.cta': { he: 'צפה בכל התרופות הטבעיות', en: 'View All Natural Medicines' },

  'home.testimonials.title': { he: 'מה אומרים מטופלינו ומטפלים מקצועיים', en: 'What Our Patients and Professional Practitioners Say' },

  // Store page
  'store.title': { he: 'תרופות טבעיות ותכשירים הומיאופתיים', en: 'Natural Medicines & Homeopathic Remedies' },
  'store.description': { he: 'מגוון רחב של תכשירים טבעיים מקצועיים וחדשניים לטיפול הוליסטי. חיזוק החסינות, איזון הורמונלי, בריאות נפשית וטיפול במגוון תסמינים באופן טבעי ויעיל', en: 'Comprehensive range of professional natural and innovative formulations for holistic treatment. Immune support, hormonal balance, mental wellness and treating various symptoms naturally and effectively' },
  'store.filter.category': { he: 'סינון לפי תחום טיפולי:', en: 'Filter by treatment area:' },
  'store.filter.all': { he: 'כל התכשירים הטבעיים', en: 'All Natural Remedies' },
  'store.filter.immunity': { he: 'חיזוק מערכת החיסון', en: 'Immune System Support' },
  'store.filter.digestion': { he: 'בריאות מערכת העיכול', en: 'Digestive Wellness' },
  'store.filter.stress': { he: 'ניהול מתח וחרדה', en: 'Stress & Anxiety Management' },
  'store.filter.sleep': { he: 'שיפור איכות השינה', en: 'Sleep Quality Enhancement' },
  'store.filter.hormonal': { he: 'איזון הורמונלי טבעי', en: 'Natural Hormonal Balance' },
  'store.filter.respiratory': { he: 'בריאות מערכת הנשימה', en: 'Respiratory Health' },
  'store.filter.pain': { he: 'הקלה טבעית על כאבים', en: 'Natural Pain Relief' },
  'store.filter.detox': { he: 'דיטוקס וניקוי הגוף', en: 'Detox & Body Cleansing' },
  'store.filter.energy': { he: 'חיזוק האנרגיה והכוח', en: 'Energy & Vitality Boost' },
  'store.filter.mental': { he: 'בריאות נפשית ומוח', en: 'Mental Health & Brain Support' },
  'store.filter.womens': { he: 'בריאות נשים טבעית', en: 'Women\'s Natural Health' },
  'store.filter.mens': { he: 'בריאות גברים טבעית', en: 'Men\'s Natural Health' },
  'store.filter.children': { he: 'תכשירים טבעיים לילדים', en: 'Natural Remedies for Children' },
  'store.filter.seniors': { he: 'בריאות בגיל המבוגר', en: 'Senior Health Solutions' },
  'store.sort': { he: 'מיון תוצאות:', en: 'Sort results:' },
  'store.sort.popular': { he: 'הכי פופולריים', en: 'Most Popular' },
  'store.sort.recommended': { he: 'מומלץ על ידי מטפלים', en: 'Practitioner Recommended' },
  'store.sort.price.asc': { he: 'מחיר: נמוך לגבוה', en: 'Price: Low to High' },
  'store.sort.price.desc': { he: 'מחיר: גבוה לנמוך', en: 'Price: High to Low' },
  'store.sort.newest': { he: 'החדשים ביותר', en: 'Newest Arrivals' },
  'store.sort.rating': { he: 'דירוג גבוה', en: 'Highest Rated' },
  'store.addToCart': { he: 'הוספה לעגלה', en: 'Add to Cart' },
  'store.loadMore': { he: 'טען עוד תרופות טבעיות', en: 'Load More Natural Remedies' },
  'store.outOfStock': { he: 'אזל מהמלאי', en: 'Out of Stock' },
  'store.inStock': { he: 'במלאי', en: 'In Stock' },
  'store.viewDetails': { he: 'פרטים נוספים', en: 'View Details' },

  // Product Details
  'product.benefits': { he: 'יתרונות טיפוליים', en: 'Therapeutic Benefits' },
  'product.ingredients': { he: 'רכיבים פעילים', en: 'Active Ingredients' },
  'product.dosage': { he: 'מינון מומלץ', en: 'Recommended Dosage' },
  'product.usage': { he: 'הוראות שימוש', en: 'Usage Instructions' },
  'product.contraindications': { he: 'התוויות נגד', en: 'Contraindications' },
  'product.certifications': { he: 'אישורים ותקנים', en: 'Certifications & Standards' },
  'product.origin': { he: 'מקור הרכיבים', en: 'Ingredient Origin' },
  'product.organic': { he: 'אורגני מוסמך', en: 'Certified Organic' },
  'product.vegan': { he: 'מתאים לצמחוניים', en: 'Vegan Friendly' },
  'product.glutenFree': { he: 'ללא גלוטן', en: 'Gluten Free' },
  'product.nonGmo': { he: 'ללא שינוי גנטי', en: 'Non-GMO' },
  'product.clinical': { he: 'מבוסס מחקר קליני', en: 'Clinically Researched' },
  'product.traditional': { he: 'שימוש מסורתי', en: 'Traditional Use' },
  'product.potency': { he: 'עוצמה הומיאופתית', en: 'Homeopathic Potency' },
  'product.reviews': { he: 'חוות דעת מטופלים', en: 'Patient Reviews' },
  'product.professional': { he: 'המלצת מטפלים', en: 'Practitioner Recommended' },

  // Health Benefits & Claims
  'benefits.immune.support': { he: 'תמיכה במערכת החיסון הטבעית', en: 'Natural immune system support' },
  'benefits.digestive.health': { he: 'שיפור בריאות מערכת העיכול', en: 'Digestive health improvement' },
  'benefits.stress.relief': { he: 'הפגת מתח וחרדה טבעית', en: 'Natural stress and anxiety relief' },
  'benefits.sleep.quality': { he: 'שיפור איכות השינה הטבעית', en: 'Natural sleep quality enhancement' },
  'benefits.hormonal.balance': { he: 'איזון הורמונלי טבעי', en: 'Natural hormonal balance' },
  'benefits.energy.vitality': { he: 'הגברת אנרגיה וחיוניות', en: 'Energy and vitality boost' },
  'benefits.mental.clarity': { he: 'שיפור בהירות מחשבתית', en: 'Mental clarity enhancement' },
  'benefits.anti.inflammatory': { he: 'תכונות אנטי דלקתיות טבעיות', en: 'Natural anti-inflammatory properties' },
  'benefits.antioxidant': { he: 'עשיר באנטי חמצון', en: 'Rich in antioxidants' },
  'benefits.detox.support': { he: 'תמיכה בתהליכי ניקוי הגוף', en: 'Body detoxification support' },

  // Professional Terminology
  'terms.homeopathy': { he: 'הומיאופתיה', en: 'Homeopathy' },
  'terms.naturopathy': { he: 'נטורופתיה', en: 'Naturopathy' },
  'terms.phytotherapy': { he: 'פיתותרפיה', en: 'Phytotherapy' },
  'terms.holistic': { he: 'טיפול הוליסטי', en: 'Holistic Treatment' },
  'terms.integrative': { he: 'רפואה משולבת', en: 'Integrative Medicine' },
  'terms.alternative': { he: 'רפואה אלטרנטיבית', en: 'Alternative Medicine' },
  'terms.complementary': { he: 'רפואה משלימה', en: 'Complementary Medicine' },
  'terms.botanical': { he: 'תכשירים צמחיים', en: 'Botanical Medicine' },
  'terms.remedy': { he: 'תרופה טבעית', en: 'Natural Remedy' },
  'terms.tincture': { he: 'תמצית צמחית', en: 'Herbal Tincture' },
  'terms.constitution': { he: 'חוקת גוף', en: 'Constitutional Type' },
  'terms.vital.force': { he: 'כוח חיים', en: 'Vital Force' },

  // Cart
  'cart.title': { he: 'סל תרופות טבעיות', en: 'Natural Remedies Cart' },
  'cart.empty': { he: 'סל הקניות ריק - הוסף תכשירים טבעיים', en: 'Cart is empty - Add natural remedies' },
  'cart.total': { he: 'סך הכל לתשלום:', en: 'Total Amount:' },
  'cart.checkout': { he: ' לתשלום מאובטח', en: 'Proceed to Secure Checkout' },
  'cart.remove': { he: 'הסר מהסל', en: 'Remove from Cart' },
  'cart.quantity': { he: 'כמות', en: 'Quantity' },
  'cart.savings': { he: 'חסכון:', en: 'You Save:' },
  'cart.shipping': { he: 'משלוח', en: 'Shipping' },
  'cart.freeShipping': { he: 'משלוח חינם', en: 'Free Shipping' },
  'cart.continue': { he: 'המשך קנייה', en: 'Continue Shopping' },

  // Articles page
  'articles.title': { he: 'מדריך מקצועי לרפואה טבעית', en: 'Professional Natural Medicine Guide' },
  'articles.description': { he: 'מאמרים מקצועיים, מדריכים מעמיקים וחדשות עדכניות בתחום הנטורופתיה, הומיאופתיה ורפואה משלימה. מידע מבוסס מחקר למטפלים ולמעוניינים בבריאות טבעית', en: 'Professional articles, in-depth guides and latest news in naturopathy, homeopathy and complementary medicine. Research-based information for practitioners and natural health enthusiasts' },
  'articles.featured': { he: 'מאמר מומלץ השבוע', en: 'Featured Article This Week' },
  'articles.readMore': { he: 'קרא מאמר מלא', en: 'Read Full Article' },
  'articles.readTime': { he: 'דקות קריאה', en: 'min read' },
  'articles.category.homeopathy': { he: 'הומיאופתיה', en: 'Homeopathy' },
  'articles.category.naturopathy': { he: 'נטורופתיה', en: 'Naturopathy' },
  'articles.category.herbs': { he: 'רפואת צמחים', en: 'Herbal Medicine' },
  'articles.category.nutrition': { he: 'תזונה טבעית', en: 'Natural Nutrition' },
  'articles.category.wellness': { he: 'אורח חיים בריא', en: 'Healthy Lifestyle' },
  'articles.category.research': { he: 'מחקרים ועדכונים', en: 'Research & Updates' },
  'articles.newsletter.title': { he: 'הישארו מעודכנים בחדשות הבריאות הטבעית', en: 'Stay Updated with Natural Health News' },
  'articles.newsletter.description': { he: 'קבלו מאמרים מקצועיים, טיפים בריאותיים ומידע על מוצרים חדשים ישירות למייל שלכם', en: 'Receive professional articles, health tips and new product updates directly to your email' },
  'articles.newsletter.placeholder': { he: 'הכניסו כתובת מייל לקבלת ייעוץ מקצועי', en: 'Enter email for professional health guidance' },
  'articles.newsletter.subscribe': { he: 'הירשמו לעדכונים מקצועיים', en: 'Subscribe to Professional Updates' },
  'articles.expert.authored': { he: 'נכתב על ידי מומחים', en: 'Expert Authored' },
  'articles.evidence.based': { he: 'מבוסס ראיות', en: 'Evidence Based' },

  // About page
  'about.title': { he: 'DHnaturally - מרכז מומחיות לרפואה טבעית', en: 'DHnaturally - Natural Medicine Expertise Center' },
  'about.subtitle': { he: 'מסע מקצועי בפיתוח תכשירים הומיאופתיים מתקדמים וטיפול הוליסטי מבוסס מחקר לבריאות מיטבית', en: 'Professional journey in developing advanced homeopathic formulations and research-based holistic treatment for optimal health' },
  'about.story.title': { he: 'המומחיות והניסיון שלנו', en: 'Our Expertise & Experience' },
  'about.mission.title': { he: 'המשימה המקצועית שלנו', en: 'Our Professional Mission' },
  'about.mission.subtitle': { he: 'לחבר בין חכמת הרפואה המסורתית למחקר המודרני, ולספק פתרונות טבעיים יעילים ובטוחים המותאמים לצרכים הבריאותיים הייחודיים של כל מטופל', en: 'To bridge traditional medical wisdom with modern research, providing effective and safe natural solutions tailored to each patient\'s unique health needs' },
  'about.values.prevention': { he: 'רפואה מונעת', en: 'Preventive Medicine' },
  'about.values.restoration': { he: 'שיקום ושחזור', en: 'Restoration & Recovery' },
  'about.values.balance': { he: 'איזון ויציבות', en: 'Balance & Stability' },
  'about.values.evidence': { he: 'מבוסס מחקר', en: 'Evidence Based' },
  'about.values.safety': { he: 'בטיחות וטוהר', en: 'Safety & Purity' },
  'about.values.individualized': { he: 'טיפול מותאם אישית', en: 'Individualized Treatment' },
  'about.work.title': { he: 'הגישה הטיפולית המקצועית שלנו', en: 'Our Professional Treatment Approach' },
  'about.work.subtitle': { he: 'התכשירים שלנו מפותחים בקפידה מתוך הבנה מעמיקה של עקרונות הרפואה ההומיאופתית, בשילוב מחקר מודרני ובקרת איכות מחמירה', en: 'Our formulations are carefully developed from deep understanding of homeopathic principles, combined with modern research and strict quality control' },
  'about.certifications.title': { he: 'הסמכות והכשרות מקצועיות', en: 'Professional Certifications & Qualifications' },
  'about.certifications.subtitle': { he: 'הכשרה מקצועית מקיפה ברפואה טבעית והומיאופתיה המבוססת על לימודים אקדמיים ורישיונות מוכרים', en: 'Comprehensive professional training in natural medicine and homeopathy based on academic studies and recognized certifications' },
  'about.certifications.naturopathy.title': { he: 'הסמכה בנטורופתיה מקיפה', en: 'Comprehensive Naturopathy Certification' },
  'about.certifications.naturopathy.description': { he: 'הסמכה מלאה מ"מעינות" ברפואה טבעית כוללת למעלה מ-100 שעות לימוד בתחומי רפואת צמחים, תזונה טבעית, רפלקסולוגיה ועוד', en: 'Complete certification from "Matnot" in natural medicine including over 100 hours of study in herbal medicine, natural nutrition, reflexology and more' },
  'about.certifications.integrative.title': { he: 'רישיון ברפואה משולבת', en: 'Integrative Medicine Authorization' },
  'about.certifications.integrative.description': { he: 'תעודות הסמכה וכשירות ממכון אוניברסיטאי לרפואה משולבת המעידות על מקצועיות והכשרה ברמה אקדמית', en: 'Authorization and competency certificates from Integrative Medicine University Institute demonstrating academic-level professionalism and training' },
  'about.certifications.homeopathy.title': { he: 'הכשרה בהומיאופתיה ואירידולוגיה', en: 'Homeopathy & Iridology Training' },
  'about.certifications.homeopathy.description': { he: 'תעודות BSY בהומיאופתיה ואירידולוגיה המעידות על הכשרה מקצועית בתחומי האבחון והטיפול הטבעיים', en: 'BSY certificates in Homeopathy and Iridology demonstrating professional training in natural diagnosis and treatment methods' },
  'about.team.title': { he: 'הצוות המקצועי', en: 'Professional Team' },

  // Contact page
  'contact.title': { he: 'ייעוץ מקצועי ותמיכה', en: 'Professional Consultation & Support' },
  'contact.description': { he: 'צוות המומחים שלנו זמין לייעוץ מקצועי בתחום הרפואה הטבעית, בחירת תכשירים מתאימים והכוונה טיפולית מותאמת אישית', en: 'Our expert team is available for professional natural medicine consultation, suitable remedy selection and personalized therapeutic guidance' },
  'contact.form.title': { he: 'פנייה לייעוץ מקצועי', en: 'Professional Consultation Request' },
  'contact.form.firstName': { he: 'שם פרטי', en: 'First Name' },
  'contact.form.lastName': { he: 'שם משפחה', en: 'Last Name' },
  'contact.form.email': { he: 'כתובת דוא"ל', en: 'Email Address' },
  'contact.form.phone': { he: 'מספר טלפון', en: 'Phone Number' },
  'contact.form.subject': { he: 'נושא הפנייה', en: 'Inquiry Subject' },
  'contact.form.message': { he: 'תיאור הצרכים הבריאותיים', en: 'Health Needs Description' },
  'contact.form.submit': { he: 'שלח בקשה לייעוץ', en: 'Submit Consultation Request' },
  'contact.form.required': { he: 'שדה חובה', en: 'Required field' },
  'contact.form.healthConcern': { he: 'תחום בריאותי עיקרי', en: 'Primary Health Concern' },
  'contact.form.experience': { he: 'ניסיון קודם ברפואה טבעית', en: 'Previous Natural Medicine Experience' },
  'contact.info.title': { he: 'פרטי קשר מקצועיים', en: 'Professional Contact Details' },
  'contact.info.email': { he: 'דוא"ל מקצועי', en: 'Professional Email' },
  'contact.info.whatsapp': { he: 'ייעוץ מהיר בווטסאפ', en: 'WhatsApp Quick Consultation' },
  'contact.info.whatsapp.note': { he: 'זמין לייעוץ מיידי ושאלות מקצועיות', en: 'Available for immediate consultation and professional questions' },
  'contact.consultation.title': { he: 'שירותי ייעוץ מקצועיים', en: 'Professional Consultation Services' },
  'contact.consultation.individual': { he: 'ייעוץ אישי מותאם', en: 'Personalized Individual Consultation' },
  'contact.consultation.product': { he: 'ייעוץ בחירת מוצרים', en: 'Product Selection Guidance' },
  'contact.consultation.followup': { he: 'מעקב טיפולי', en: 'Treatment Follow-up' },
  'contact.hours.title': { he: 'שעות הייעוץ המקצועי', en: 'Professional Consultation Hours' },
  'contact.hours.weekdays': { he: 'ראשון - חמישי', en: 'Sunday - Thursday' },
  'contact.hours.friday': { he: 'יום שישי', en: 'Friday' },
  'contact.hours.saturday': { he: 'שבת', en: 'Saturday' },
  'contact.hours.closed': { he: 'סגור', en: 'Closed' },
  'contact.hours.emergency': { he: 'ייעוץ דחוף', en: 'Urgent Consultation' },

  // Marketing & Trust Signals
  'marketing.guarantee': { he: 'אחריות שביעות רצון מלאה', en: 'Complete Satisfaction Guarantee' },
  'marketing.freeConsultation': { he: 'ייעוץ מקצועי חינם', en: 'Free Professional Consultation' },
  'marketing.fastShipping': { he: 'משלוח מהיר וחינם', en: 'Fast Free Shipping' },
  'marketing.expertFormulated': { he: 'מפותח על ידי מומחים', en: 'Expert Formulated' },
  'marketing.labTested': { he: 'נבדק במעבדה', en: 'Laboratory Tested' },
  'marketing.naturalSafe': { he: 'טבעי ובטוח', en: 'Natural & Safe' },
  'marketing.testimonials': { he: 'אלפי לקוחות מרוצים', en: 'Thousands of Satisfied Customers' },
  'marketing.professionalGrade': { he: 'איכות מקצועית', en: 'Professional Grade Quality' },
  'marketing.researchBased': { he: 'מבוסס מחקר מדעי', en: 'Scientifically Researched' },
  'marketing.holisticApproach': { he: 'גישה הוליסטית מקיפה', en: 'Comprehensive Holistic Approach' },

  // SEO & Features
  'features.title': { he: 'מה מייחד את DHnaturally?', en: 'What Makes DHnaturally Special?' },
  'features.expertise': { he: 'מומחיות וניסיון', en: 'Expertise & Experience' },
  'features.quality': { he: 'איכות מעולה', en: 'Superior Quality' },
  'features.safety': { he: 'בטיחות מוכחת', en: 'Proven Safety' },
  'features.results': { he: 'תוצאות מוכחות', en: 'Proven Results' },
  'features.support': { he: 'תמיכה מקצועית', en: 'Professional Support' },
  'features.innovation': { he: 'חדשנות בתחום', en: 'Industry Innovation' },

  // Common
  'common.loading': { he: 'טוען מוצרים טבעיים...', en: 'Loading natural products...' },
  'common.error': { he: 'אירעה שגיאה - נסו שוב', en: 'An error occurred - please try again' },
  'common.tryAgain': { he: 'נסו שוב', en: 'Try Again' },
  'common.currency': { he: '₪', en: '₪' },
  'common.and': { he: 'ו', en: 'and' },
  'common.or': { he: 'או', en: 'or' },
  'common.more': { he: 'עוד', en: 'More' },
  'common.less': { he: 'פחות', en: 'Less' },
  'common.showAll': { he: 'הצג הכל', en: 'Show All' },
  'common.hideAll': { he: 'הסתר הכל', en: 'Hide All' },

  // Footer
  'footer.quickLinks': { he: 'ניווט מהיר', en: 'Quick Navigation' },
  'footer.categories': { he: 'תחומי טיפול', en: 'Treatment Areas' },
  'footer.contact': { he: 'ייעוץ וקשר', en: 'Consultation & Contact' },
  'footer.professional': { he: 'שירותים מקצועיים', en: 'Professional Services' },
  'footer.education': { he: 'חינוך ומידע', en: 'Education & Information' },
  'footer.rights': { he: '©DHnaturally | כל הזכויות שמורות | מרכז מומחיות לרפואה טבעית.', en: '©DHnaturally | All rights reserved | Natural Medicine Expertise Center.' },
  'footer.privacy': { he: 'מדיניות פרטיות', en: 'Privacy Policy' },
  'footer.terms': { he: 'תנאי שימוש', en: 'Terms of Service' },
  'footer.shipping': { he: 'מדיניות משלוחים', en: 'Shipping Policy' },
  'footer.returns': { he: 'מדיניות החזרות', en: 'Return Policy' },
  'footer.disclaimer': { he: 'הצהרה רפואית', en: 'Medical Disclaimer' },
  'footer.certifications': { he: 'אישורים', en: 'Certifications' },

  // WhatsApp
  'whatsapp.tooltip': { he: 'ייעוץ מיידי בווטסאפ - זמין עכשיו!', en: 'Instant WhatsApp consultation - available now!' },
  'whatsapp.cta': { he: 'שאלו את המומחים', en: 'Ask the Experts' },

  // Success messages
  'success.contact.submitted': { he: 'תודה על פנייתכם! מומחה יחזור אליכם תוך 24 שעות עם ייעוץ מקצועי.', en: 'Thank you for your inquiry! An expert will contact you within 24 hours with professional guidance.' },
  'success.cart.added': { he: 'התכשיר הטבעי נוסף לסל בהצלחה!', en: 'Natural remedy successfully added to cart!' },
  'success.newsletter.subscribed': { he: 'נרשמתם בהצלחה! תקבלו עדכונים מקצועיים ראשונים על מוצרים חדשים.', en: 'Successfully subscribed! You\'ll receive first access to professional updates and new products.' },
  'success.consultation.booked': { he: 'הייעוץ נקבע בהצלחה! נשלח לכם אישור ופרטים נוספים.', en: 'Consultation successfully booked! We\'ll send you confirmation and additional details.' },

  // Call to Action
  'cta.shopNow': { he: 'קנו עכשיו', en: 'Shop Now' },
  'cta.learnMore': { he: 'למדו עוד', en: 'Learn More' },
  'cta.getConsultation': { he: 'קבלו ייעוץ מקצועי', en: 'Get Professional Consultation' },
  'cta.startHealing': { he: 'התחילו את המסע לבריאות', en: 'Start Your Healing Journey' },
  'cta.discoverNatural': { he: 'גלו רפואה טבעית', en: 'Discover Natural Medicine' },
  'cta.freeShippingOffer': { he: 'משלוח חינם מעל ₪150', en: 'Free shipping over ₪150' },
};

export function t(key: string, lang: 'he' | 'en' = 'he'): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[lang] || translation.he || key;
}
