import { type User, type InsertUser, type Product, type InsertProduct, type Article, type InsertArticle, type ContactSubmission, type InsertContactSubmission, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Article methods
  getAllArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;

  // Cart methods
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private articles: Map<string, Article>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.articles = new Map();
    this.contactSubmissions = new Map();
    this.cartItems = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Comprehensive Product Catalog based on 35 homeopathic articles
    const sampleProducts: Product[] = [
      // Stress Management & Mental Health Products
      {
        id: randomUUID(),
        name_he: "אנקרדיום אוריינטלה",
        name_en: "Anacardium Orientale",
        description_he: "תרופה הומיאופתית מעורפת המכינה מעץ האגוז המסמן, המיועדת לתמיכה במערכת העצבים והנפש. מסייעת במצבי בלבול נפשי, חרדה ותחושת פיצול אישיות. תומכת בחיזוק הביטחון העצמי ומפחיתה רגשות של חולשה נפשית.",
        description_en: "A homeopathic remedy prepared from the marking nut tree, designed to support the nervous system and mind. Helps with mental confusion, anxiety, and feelings of split personality. Supports confidence building and reduces feelings of mental weakness. Traditional use for emotional conflicts and brain fog.",
        price: "150.00",
        image_url: "/assets/product2.png",
        category: "stress",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "איגנטיה אמרה",
        name_en: "Ignatia Amara",
        description_he: "תרופה הומיאופתית העשויה משעועית סנט איגנטיוס, המתמחה בטיפול במצבים רגשיים, במיוחד אבל, אכזבה ותנודות מצב רוח. מסייעת להתמודדות עם זעזועים רגשיים והיסטריה. תומכת בהתמודדות עם רגישות רגשית יתר.",
        description_en: "A homeopathic remedy made from St. Ignatius bean, specializing in emotional states, particularly grief, disappointment, and mood swings. Helps cope with emotional shocks and hysteria. Supports dealing with excessive emotional sensitivity and paradoxical symptoms.",
        price: "150.00",
        image_url: "/assets/product2.png",
        category: "stress",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "קופיאה קרודה",
        name_en: "Coffea Cruda",
        description_he: "תרופה הומיאופתית המוכנה משעועיות קפה לא קלויות, המתמחה במערכת העצבים. מסייעת בטיפול בנדודי שינה, עירנות יתר ורגישות מוגברת. תומכת בהרגעת מערכת העצבים המגורה יתר על המידה ומפחיתה חרדה.",
        description_en: "A homeopathic remedy prepared from unroasted coffee beans, specializing in nervous system support. Helps with insomnia, over-stimulation, and heightened sensitivity. Supports calming an over-excited nervous system and reduces anxiety from mental overactivity.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "sleep",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "נקס וומיקה",
        name_en: "Nux Vomica",
        description_he: "תרופה הומיאופתית המתמחה בטיפול ברגיזות, חוסר סבלנות וחרדה. מסייעת לאנשים שאפתניים, פרפקציוניסטים ועובדים קשה המתמודדים עם לחץ. תומכת בהתמודדות עם רגישות לגירויים ובעיות שינה.",
        description_en: "A homeopathic remedy specializing in irritability, impatience, and anxiety. Helps ambitious, perfectionist, hard-working individuals dealing with stress. Supports managing sensitivity to stimuli and sleep disturbances from overwork and pressure.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "stress",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Digestive Health Products
      {
        id: randomUUID(),
        name_he: "אנטימוניום קרודום",
        name_en: "Antimonium Crudum",
        description_he: "תרופה הומיאופתית העשויה מאנטימון טריסולפיד, המתמחה במערכת העיכול והעור. מסייעת בבעיות עיכול הנובעות מאכילת יתר או מזון שמנוני. תומכת בטיפול בלשון מצופה לבן ובעיות עור עקשניות.",
        description_en: "A homeopathic remedy made from antimony trisulfide, specializing in digestive and skin issues. Helps with digestive problems from overeating or fatty foods. Supports treatment of thick white-coated tongue and stubborn skin conditions.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "digestion",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "ברכניה אלבה",
        name_en: "Bryonia Alba",
        description_he: "תרופה הומיאופתית המופקת מצמח הכשות הבר, המתמחה במחלות דלקתיות חדות. מסייעת במצבים המחמירים מתנועה קלה והמשתפרים ממנוחה. תומכת בטיפול בדלקת ריאות, ברונכיטיס ובעיות נשימה.",
        description_en: "A homeopathic remedy derived from wild hop plant, specializing in acute inflammatory conditions. Helps with conditions that worsen from slight movement and improve with rest. Supports treatment of pneumonia, bronchitis, and respiratory issues with dry symptoms.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "respiratory",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "קרבו וגטביליס",
        name_en: "Carbo Vegetabilis",
        description_he: "תרופה הומיאופתית המופקת מפחם צמחי, המתמחה במערכת העיכול והמחזור. מסייעת במצבי התמוטטות, גזים וקור. תומכת בחידוש כוח החיים ומסייעת בעיכול איטי וגזים עודפים.",
        description_en: "A homeopathic remedy derived from vegetable charcoal, specializing in digestive and circulatory systems. Helps with states of collapse, gas, and coldness. Supports vital force restoration and assists with sluggish digestion and excessive gas.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "digestion",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "ליקופודיום קלווטום",
        name_en: "Lycopodium Clavatum",
        description_he: "תרופה הומיאופתית מנבגי האזוב, המתמחה במערכת העיכול, הכבד ודרכי השתן. מסייעת לאנשים עם חוסר ביטחון עצמי ובעיות עיכול. תומכת בחיזוק הביטחון ובטיפול בגזים ונפיחות.",
        description_en: "A homeopathic remedy from club moss spores, specializing in digestive system, liver, and urinary tract. Helps people with lack of self-confidence and digestive issues. Supports confidence building and treats gas and bloating problems.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "digestion",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },

      // Liver Support & Detox Products
      {
        id: randomUUID(),
        name_he: "פל טאורי",
        name_en: "Fel Tauri",
        description_he: "תרופה הומיאופתית המוכנה ממרת שור, המתמחה בתמיכת הכבד וכיס המרה. מסייעת בויסות זרימת המרה ובטיפול באבני מרה. תומכת בעיכול שומנים ובהורדת כולסטרול.",
        description_en: "A homeopathic remedy prepared from ox bile, specializing in liver and gallbladder support. Helps regulate bile flow and treat gallstones. Supports fat digestion and cholesterol management through traditional homeopathic principles.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "detox",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "סיליבום מריאנום",
        name_en: "Silybum Marianum",
        description_he: "תרופה הומיאופתית מזרעי הקוץ השדה, המכונה גם קרדוס מריאנוס. מתמחה בתמיכת הכבד וכיס המרה. מסייעת בגודש כבד, דלקת כבד וצהבת. תומכת בזרימת המרה ובהתחדשות תאי הכבד.",
        description_en: "A homeopathic remedy from milk thistle seeds, also known as Carduus Marianus. Specializes in liver and gallbladder support. Helps with liver congestion, hepatitis, and jaundice. Supports bile flow and liver cell regeneration.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "detox",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "נתרום סולפוריקום",
        name_en: "Natrum Sulphuricum",
        description_he: "תרופה הומיאופתית ממלח גלובר, המתמחה בכבד, מערכת העיכול ומערכת הנשימה. מסייעת במצבים המחמירים מלחות ורטיבות. תומכת בטיפול בדלקת כבד ובעיות מרה.",
        description_en: "A homeopathic remedy from Glauber's salt, specializing in liver, digestive, and respiratory systems. Helps with conditions aggravated by dampness and humidity. Supports treatment of liver inflammation and bile issues.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "detox",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Natural Diabetes & Metabolic Support
      {
        id: randomUUID(),
        name_he: "ברברים וולגריס",
        name_en: "Berberis Vulgaris",
        description_he: "תמצית טבעית מהבַרברי, עשירה בברברין. מסייעת בתמיכת רמות סכר תקינות ובחילוף החומרים. תומכת בבקרה גליקמית ובהפחתת עמידות לאינסולין. מכילה אלקלואידים טבעיים התומכים בבריאות מטבולית.",
        description_en: "Natural extract from barberry, rich in berberine. Helps support healthy blood sugar levels and metabolism. Supports glycemic control and reducing insulin resistance. Contains natural alkaloids that support metabolic health and traditional wellness.",
        price: "150.00",
        image_url: "/assets/HeroImage.png",
        category: "hormonal",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "מומורדיקה כרנטיה",
        name_en: "Momordica Charantia",
        description_he: "תמצית טבעית מהדלעת המרה, המכונה גם ביטר מלון. מסייעת בתמיכת רמות סכר בריאות ובחילוף החומרים. תומכת בפעילות הלבלב ובייצור אינסולין טבעי. עשירה בחומרים פעילים התומכים בבריאות מטבולית.",
        description_en: "Natural extract from bitter melon, also known as bitter gourd. Helps support healthy blood sugar levels and metabolism. Supports pancreatic function and natural insulin production. Rich in active compounds that support metabolic health.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "hormonal",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "גימנמה סילבסטר",
        name_en: "Gymnema Sylvestre",
        description_he: "צמח מסורתי המכונה 'הורס הסכר', מסייע בתמיכת רמות סכר תקינות. תומך בפעילות הלבלב ובהפחתת תשוקה למתוקים. עשיר בחומרים פעילים התומכים בחילוף חומרים בריא ובקרת גלוקוז טבעית.",
        description_en: "Traditional herb known as 'sugar destroyer', helps support healthy blood sugar levels. Supports pancreatic function and reduces sugar cravings. Rich in active compounds that support healthy metabolism and natural glucose control.",
        price: "150.00",
        image_url: "/assets/HeroImage.png",
        category: "hormonal",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "אורניום ניטריקום",
        name_en: "Uranium Nitricum",
        description_he: "תרופה הומיאופתית המתמחה בתמיכת חילוף החומרים ומערכת השתן. מסייעת במצבים של רעב מופרז עם ירידה במשקל. תומכת בתפקוד מטבולי תקין ובאיזון רמות הסכר.",
        description_en: "A homeopathic remedy specializing in metabolic and urinary system support. Helps with conditions of excessive appetite with weight loss. Supports healthy metabolic function and blood sugar balance through traditional homeopathic principles.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "hormonal",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "וונדיום",
        name_en: "Vanadium",
        description_he: "מינרל קורט הפועל כמדמה אינסולין טבעי. מסייע בשיפור רגישות לאינסולין ובבקרת רמות הסכר. תומך בחילוף חומרים בריא ובתפקוד מטבולי מיטבי. מכיל תכונות ייחודיות התומכות במערכת מטבולית.",
        description_en: "A trace mineral that acts as a natural insulin mimetic. Helps improve insulin sensitivity and blood sugar control. Supports healthy metabolism and optimal metabolic function. Contains unique properties that support the metabolic system.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "hormonal",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Immune Support & Anti-inflammatory
      {
        id: randomUUID(),
        name_he: "אפיס מליפיקה",
        name_en: "Apis Mellifica",
        description_he: "תרופה הומיאופתית מרעל דבורים, המתמחה בנפיחויות ודלקות. מסייעת בנפיחויות פתאומיות, כאבי עוקצים וגרגורים. תומכת בהפחתת דלקת ונפיחות, במיוחד סביב העיניים והפנים.",
        description_en: "A homeopathic remedy from bee venom, specializing in swelling and inflammation. Helps with sudden swelling, stinging pains, and hives. Supports reducing inflammation and puffiness, especially around eyes and face.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "immunity",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "ארסניקום אלבום",
        name_en: "Arsenicum Album",
        description_he: "תרופה הומיאופתית עמוקת הפעולה המתמחה בחרדה, כאבים צורבים וחולשה. מסייעת במצבי חרדה עזה, אי שקט ופחדים. תומכת בהתמודדות עם כאבים צורבים ומצבי תשישות.",
        description_en: "A deep-acting homeopathic remedy specializing in anxiety, burning pains, and weakness. Helps with intense anxiety, restlessness, and fears. Supports dealing with burning pains and states of prostration.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "immunity",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "תה ירוק",
        name_en: "Green Tea",
        description_he: "תמצית טבעית עשירה באנטיאוקסידנטים ופוליפנולים. מסייעת בהגנה מפני רדיקלים חופשיים ובתמיכת הבריאות הכללית. תומכת בחילוף חומרים בריא, בריכוז ובאנרגיה טבעית.",
        description_en: "Natural extract rich in antioxidants and polyphenols. Helps protect against free radicals and supports overall health. Supports healthy metabolism, concentration, and natural energy levels through traditional wellness benefits.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "energy",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "פוניקה גרנטום",
        name_en: "Punica Granatum",
        description_he: "תמצית טבעית מהרימון, עשירה באנטיאוקסידנטים ותרכובות פוליפנוליות. מסייעת בתמיכת הבריאות הכללית ובהגנה תאית. תומכת בבריאות המערכת העיכולית ובפעילות אנטי-דלקתית טבעית.",
        description_en: "Natural pomegranate extract, rich in antioxidants and polyphenolic compounds. Helps support overall health and cellular protection. Supports digestive system health and natural anti-inflammatory activity through traditional wellness.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "immunity",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Pain Relief & Injury Recovery
      {
        id: randomUUID(),
        name_he: "ארניקה מונטנה",
        name_en: "Arnica Montana",
        description_he: "התרופה ההומיאופתית המפורסמת ביותר לטראומה ופציעות. מסייעת בחבלות, נפיחויות ותחושת כאב. תומכת בהחלמה מפציעות ספורט, נפילות ובניתוחים. מפחיתה נפיחות וכאב.",
        description_en: "The most famous homeopathic remedy for trauma and injuries. Helps with bruises, swelling, and pain sensation. Supports recovery from sports injuries, falls, and surgeries. Reduces swelling and pain from physical trauma.",
        price: "150.00",
        image_url: "/assets/HeroImage.png",
        category: "pain",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "היפריקום פרפורטום",
        name_en: "Hypericum Perforatum",
        description_he: "תרופה הומיאופתית המכונה 'ארניקה של העצבים'. מתמחה בכאבי עצבים ופציעות עצבים. מסייעת בפציעות אצבעות, חוט שדרה וכאבים חדים יורים. תומכת בריפוי עצבי.",
        description_en: "A homeopathic remedy known as 'Arnica of the nerves'. Specializes in nerve pain and nerve injuries. Helps with finger injuries, spinal issues, and sharp shooting pains. Supports nerve healing and recovery.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "pain",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "לדום פלוסטר",
        name_en: "Ledum Palustre",
        description_he: "תרופה הומיאופתית מצמח הרוזמרין הבר, המתמחה בפצעי דקירה ועקיצות חרקים. מסייעת בפצעים קרים ונפיחויות. תומכת בריפוי פצעי דקירה ובהפחתת נפיחות.",
        description_en: "A homeopathic remedy from wild rosemary plant, specializing in puncture wounds and insect bites. Helps with cold wounds and swelling. Supports healing of puncture wounds and reduces swelling from bites.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "pain",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "קלנדולה אופיצינליס",
        name_en: "Calendula Officinalis",
        description_he: "תרופה הומיאופתית מהקלנדולה המצויה, המתמחה בריפוי פצעים וזיהומים. מסייעת בפצעים פתוחים, חתכים וזיהומי עור. תומכת בגרנולציה בריאה ומונעת צלקות.",
        description_en: "A homeopathic remedy from common marigold, specializing in wound healing and infections. Helps with open wounds, cuts, and skin infections. Supports healthy granulation and prevents scarring.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "pain",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Joint & Rheumatic Support
      {
        id: randomUUID(),
        name_he: "קולכיקום אוטומנלה",
        name_en: "Colchicum Autumnale",
        description_he: "תרופה הומיאופתית מהסחלב הסתוי, המתמחה בכאבי פרקים וגאוט. מסייעת בכאבים עזים המחמירים ממגע קל. תומכת בטיפול בדלקות פרקים ובכאבים ראומטיים.",
        description_en: "A homeopathic remedy from autumn crocus, specializing in joint pain and gout. Helps with severe pain that worsens from light touch. Supports treatment of joint inflammation and rheumatic pains.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "pain",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Circulation & Cognitive Support
      {
        id: randomUUID(),
        name_he: "גינקו בילובה",
        name_en: "Ginkgo Biloba",
        description_he: "תמצית טבעית מהגינקו העתיק, המתמחה בזרימת דם מוחית והקרנית. מסייעה בשיפור זיכרון, ריכוז ותפקוד קוגניטיבי. תומכת בזרימת דם בריאה למוח ולגפיים.",
        description_en: "Natural extract from the ancient Ginkgo tree, specializing in cerebral and peripheral circulation. Helps improve memory, concentration, and cognitive function. Supports healthy blood flow to brain and extremities.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "mental",
        in_stock: true,
        featured: true,
        created_at: new Date(),
      },

      // Constitutional & Detox Support
      {
        id: randomUUID(),
        name_he: "ברטה קרבוניקה",
        name_en: "Baryta Carbonica",
        description_he: "תרופה הומיאופתית מקרבונט בריום, המתמחה בעיכוב התפתחותי פיזי ונפשי. מסייעת בביישנות, חוסר ביטחון ופחדים. תומכת בחיזוק הביטחון העצמי ובהתפתחות בריאה.",
        description_en: "A homeopathic remedy from barium carbonate, specializing in physical and mental developmental delays. Helps with shyness, lack of confidence, and fears. Supports confidence building and healthy development.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "children",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "קלקריאה קרבוניקה",
        name_en: "Calcarea Carbonica",
        description_he: "תרופה הומיאופתית מקונכיות צדפים, המתמחה בחילוף חומרים איטי וחולשה כללית. מסייעת בבעיות משקל, עצמות חלשות ועייפות. תומכת בחיזוק המטבוליזם ובעצמות בריאות.",
        description_en: "A homeopathic remedy from oyster shells, specializing in slow metabolism and general weakness. Helps with weight issues, weak bones, and fatigue. Supports strengthening metabolism and healthy bones.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "seniors",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "גרפיטס",
        name_en: "Graphites",
        description_he: "תרופה הומיאופתית מגרפיט, המתמחה בבעיות עור ועיכול. מסייעה בפריקות נוזל דביקות מהעור, עצירות וחוסר ביטחון. תומכת בריפוי עור ובשיפור העיכול.",
        description_en: "A homeopathic remedy from graphite, specializing in skin and digestive issues. Helps with sticky skin discharges, constipation, and lack of confidence. Supports skin healing and digestive improvement.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "digestion",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "נתרום מוריאטיקום",
        name_en: "Natrum Muriaticum",
        description_he: "תרופה הומיאופתית ממלח שולחן, המתמחה ברגשות אבל ורגישות רגשית. מסייעת בהתמודדות עם אכזבות, סגרנות ורגישות יתר. תומכת באיזון רגשי ובהתמודדות עם קשיים רגשיים.",
        description_en: "A homeopathic remedy from table salt, specializing in grief and emotional sensitivity. Helps cope with disappointments, introversion, and oversensitivity. Supports emotional balance and coping with emotional difficulties.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "stress",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "פסורינום",
        name_en: "Psorinum",
        description_he: "תרופה הומיאופתית נוזודה עמוקת הפעולה, המתמחה במצבים כרוניים ומתמשכים. מסייעת במצבי ייאוש, רגישות לקור וגירוד. תומכת בחידוש כוח החיים ובטיפול במצבים עקשניים.",
        description_en: "A deep-acting homeopathic nosode, specializing in chronic and persistent conditions. Helps with states of despair, cold sensitivity, and itching. Supports vital force renewal and treatment of stubborn conditions.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "detox",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Women's Health
      {
        id: randomUUID(),
        name_he: "קולופילום תליקטרויד",
        name_en: "Caulophyllum Thalictroides",
        description_he: "תרופה הומיאופתית המכונה כהה כחול, המתמחה במערכת הרבייה הנשית. מסייעת בלידה, צירי לידה לא יעילים ובעיות הורמונליות. תומכת בבריאות נשים ובמחזור חיים נשי.",
        description_en: "A homeopathic remedy known as blue cohosh, specializing in female reproductive system. Helps with childbirth, ineffective labor pains, and hormonal issues. Supports women's health and female life cycles.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "womens",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "איריס ורסיקולור",
        name_en: "Iris Versicolor",
        description_he: "תרופה הומיאופתית מהדגל הכחול, המתמחה במערכת העיכול והכבד. מסייעת בכאבי ראש עם בחילה, צרבת ובעיות מרה. תומכת בתפקוד הכבד והלבלב.",
        description_en: "A homeopathic remedy from blue flag plant, specializing in digestive system and liver. Helps with headaches with nausea, heartburn, and bile issues. Supports liver and pancreatic function.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "digestion",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        name_he: "פיטולקה דקנדרה",
        name_en: "Phytolacca Decandra",
        description_he: "תרופה הומיאופתית מהפוקוויד, המתמחה במערכת הבלוטות והחזה. מסייעת בדלקת שד, כאבי גרון ונפיחות בלוטות. תומכת בבריאות הבלוטות ובהנקה.",
        description_en: "A homeopathic remedy from pokeweed, specializing in glandular system and breast health. Helps with mastitis, sore throat, and glandular swelling. Supports glandular health and breastfeeding.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "womens",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      },

      // Growth & Development
      {
        id: randomUUID(),
        name_he: "הורמון גדילה אנושי",
        name_en: "Human Growth Hormone",
        description_he: "תכשיר הומיאופתי המתמחה בגדילה והתפתחות. מסייע בעיכוב גדילה, מטבוליזם איטי ועייפות. תומך בגדילה בריאה, חידוש תאים ובחילוף חומרים מיטבי.",
        description_en: "A homeopathic preparation specializing in growth and development. Helps with growth delays, sluggish metabolism, and fatigue. Supports healthy growth, cell renewal, and optimal metabolism.",
        price: "150.00",
        image_url: "/assets/product.png",
        category: "children",
        in_stock: true,
        featured: false,
        created_at: new Date(),
      }
    ];

    // Sample articles
    const sampleArticles: Article[] = [
      {
        id: randomUUID(),
        title_he: "כיצד לחזק את מערכת החיסון באופן טבעי",
        title_en: "How to Naturally Strengthen Your Immune System",
        excerpt_he: "מדריך מקיף לחיזוק מערכת החיסון באמצעות תזונה נכונה, תוספי מזון טבעיים ותרופות הומיאופתיות מוכחות",
        excerpt_en: "Comprehensive guide to strengthening your immune system through proper nutrition, natural supplements and proven homeopathic remedies",
        content_he: "מערכת החיסון שלנו היא המגן הטבעי של הגוף מפני מחלות ודלקות. חיזוקה באופן טבעי הוא מפתח לבריאות טובה ואיכות חיים גבוהה...",
        content_en: "Our immune system is the body's natural defense against diseases and inflammation. Strengthening it naturally is key to good health and high quality of life...",
        image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        category: "immunity",
        read_time: 7,
        featured: true,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        title_he: "5 טיפים לשיפור בריאות העיכול",
        title_en: "5 Tips for Improving Digestive Health",
        excerpt_he: "גלו איך לשפר את בריאות מערכת העיכול שלכם באמצעים טבעיים ובטוחים",
        excerpt_en: "Discover how to improve your digestive system health through natural and safe methods",
        content_he: "מערכת העיכול הבריאה היא הבסיס לבריאות כללית טובה. כאן חמישה טיפים חשובים לשיפור בריאות העיכול...",
        content_en: "A healthy digestive system is the foundation for good overall health. Here are five important tips for improving digestive health...",
        image_url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "digestion",
        read_time: 5,
        featured: false,
        created_at: new Date(),
      },
      {
        id: randomUUID(),
        title_he: "הומיאופתיה להפגת מתח וחרדה",
        title_en: "Homeopathy for Stress and Anxiety Relief",
        excerpt_he: "מדוע הומיאופתיה יכולה להיות פתרון יעיל ובטוח לטיפול במתח יומיומי",
        excerpt_en: "Why homeopathy can be an effective and safe solution for treating daily stress",
        content_he: "מתח וחרדה הם חלק מהחיים המודרניים, אך ניתן להתמודד איתם באופן טבעי וללא תופעות לוואי...",
        content_en: "Stress and anxiety are part of modern life, but they can be addressed naturally without side effects...",
        image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "stress",
        read_time: 6,
        featured: false,
        created_at: new Date(),
      },
    ];

    sampleProducts.forEach(product => this.products.set(product.id, product));
    sampleArticles.forEach(article => this.articles.set(article.id, article));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.featured
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      in_stock: insertProduct.in_stock ?? null,
      featured: insertProduct.featured ?? null,
      created_at: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      article => article.category === category
    );
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      article => article.featured
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      featured: insertArticle.featured ?? null,
      created_at: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  // Contact methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      phone: insertSubmission.phone ?? null,
      created_at: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.session_id === sessionId
    );
    
    return items.map(item => {
      const product = this.products.get(item.product_id!);
      if (!product) {
        throw new Error(`Product not found: ${item.product_id}`);
      }
      return { ...item, product };
    });
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.session_id === insertCartItem.session_id && 
               item.product_id === insertCartItem.product_id
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertCartItem.quantity ?? 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Create new item
      const id = randomUUID();
      const cartItem: CartItem = {
        ...insertCartItem,
        id,
        product_id: insertCartItem.product_id ?? null,
        quantity: insertCartItem.quantity ?? 1,
        created_at: new Date(),
      };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.session_id === sessionId
    );
    
    items.forEach(item => {
      this.cartItems.delete(item.id);
    });
    
    return true;
  }
}

export const storage = new MemStorage();
