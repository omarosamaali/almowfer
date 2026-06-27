import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

// ==================== DATA ====================

const blogCategories = [
    { name: 'الإلكترونيات', icon: '📟' },
    { name: 'سياحة وسفر',   icon: '✈️' },
    { name: 'الأزياء',      icon: '👗' },
    { name: 'طعام',         icon: '🍽️' },
    { name: 'رياضة',        icon: '🏋️' },
    { name: 'الأطفال',      icon: '🐻' },
    { name: 'المنزل',       icon: '🏠' },
    { name: 'صحة ولياقة',   icon: '💊' },
];

const allBlogCategories = [
    'رياضة', 'الأطفال', 'المنزل', 'الإلكترونيات', 'صحة ولياقة', 'الجمال والعناية',
    'الخدمات', 'هدايا', 'تعليم', 'مستلزمات السيارات', 'ألعاب جيمينج', 'أنتي فايروس',
    'لينك كارد', 'فعاليات', 'إلكترونيات', 'مقاضي',
];


const popularArticles = [
    {
        slug: 'amazon-white-friday-deals',
        tag: 'الإلكترونيات', tagEn: 'ELECTRONICS',
        title: 'تخفيضات الجمعة البيضاء في السعودية من أمازون – خصم حتى 70%',
        img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80&fit=crop&auto=format',
        label: 'عروض الجمعة البيضاء',
    },
    {
        slug: 'monthly-groceries-cheapest',
        tag: 'مقاضي', tagEn: 'GROCERIES',
        title: 'كيف تشتري كل شيء في قائمة مقاضي البيت الشهرية بأرخص الأسعار؟',
        img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&fit=crop&auto=format',
        label: 'قائمة مقاضي البيت الشهرية',
    },
];

const featuredArticles = [
    {
        slug: 'weekly-shopping-list-2026',
        tag: 'طعام', tagEn: 'FOOD',
        title: 'قائمة مشتريات المنزل الأسبوعية 2026 بأرخص سعر مع المسوق',
        img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&fit=crop&auto=format',
    },
    {
        slug: 'mens-brands-guide',
        tag: 'الأزياء', tagEn: 'FASHION',
        title: 'أشهر ماركات الملابس الرجالية – 11 علامة تجارية عليك تجربتها',
        img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop&auto=format',
    },
];

const latestArticles = [
    {
        slug: 'cashback-sites-saudi',
        tag: 'خدمات', tagEn: 'SERVICES',
        title: 'كوبونات كاش باك موثوقة في السعودية – دليلك لتوفر أكثر',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=80&fit=crop&auto=format',
    },
    {
        slug: 'amazon-discount-sites-comparison',
        tag: 'خدمات', tagEn: 'SERVICES',
        title: 'مقارنة مواقع أكواد خصم أمازون السعودية – أيها يستحق وقتك؟',
        img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=200&q=80&fit=crop&auto=format',
    },
    {
        slug: 'noon-discount-guide',
        tag: 'خدمات', tagEn: 'SERVICES',
        title: 'أفضل موقع اكواد خصم نون – دليل التوفير في 2026',
        img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80&fit=crop&auto=format',
    },
];

const categoryArticleSections = [
    {
        name: 'الإلكترونيات', icon: '📟',
        articles: [
            { slug: 'laptop-deals-2026',      title: 'عروض الجمعة السوداء للابتوب الطلاب من نون 2025',                    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80&fit=crop&auto=format' },
            { slug: 'iphone-samsung-deals',   title: 'عروض آيفون 16 وسامسونج جالكسي S25 خلال تخفيضات الجمعة السوداء',    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&fit=crop&auto=format' },
            { slug: 'nvidia-rtx-50-laptops',  title: 'تمتع بأداء أسرع بالذكاء الاصطناعي مع أجهزة اللابتوب NVIDIA RTX 50', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'سياحة وسفر', icon: '✈️',
        articles: [
            { slug: 'top-tourist-destinations-world', title: 'أشهر الأماكن السياحية في العالم 8 أماكن لا تفوت زيارتها',      img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80&fit=crop&auto=format' },
            { slug: 'new-york-tourist-spots',          title: 'اماكن سياحية في نيويورك – أشهر 5 معالم عليك زيارتها',          img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&fit=crop&auto=format' },
            { slug: 'riyadh-family-places',            title: 'أماكن حلوة بالرياض للعوائل مجانا – 10 اماكن ممتعة للعائلات',   img: 'https://images.unsplash.com/photo-1551882547-ff40c599fb6a?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'الأزياء', icon: '👗',
        articles: [
            { slug: 'abayas-black-friday',    title: 'تسوقي عبايات رخيصة خلال الجمعة السوداء مع كوبونات المسوق',    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&fit=crop&auto=format' },
            { slug: 'winter-evening-dresses', title: 'فساتين سهرة شتوية بأرخص الأسعار مع كوبونات المسوق',            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop&auto=format' },
            { slug: 'hijab-fashion-models',   title: 'دريسات فساتين محجبات خروج تفصيل – 8 موديلات فخمة',             img: 'https://images.unsplash.com/photo-1523381210434-271e8be8a52b?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'طعام', icon: '🍽️',
        articles: [
            { slug: 'save-money-groceries-2026', title: 'أفكار عن ادخار المال عند تسوق البقالة في 2026',                  img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80&fit=crop&auto=format' },
            { slug: 'lunch-box-guide',           title: 'تعرف على أفضل 5 أنواع لانش بوكس "lunch box" للأطفال والكبار',   img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&fit=crop&auto=format' },
            { slug: 'ramadan-groceries',         title: 'اغراض رمضان المهمة مشتريات طازجة مع كوبونات المسوق',             img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'رياضة', icon: '🏋️',
        articles: [
            { slug: 'home-gym-equipment',    title: 'أفضل أجهزة الجيم المنزلية بأسعار مناسبة مع المسوق',         img: 'https://images.unsplash.com/photo-1534438327980-b54ba3e57b3e?w=800&q=80&fit=crop&auto=format' },
            { slug: 'sports-brands-coupons', title: 'كوبونات خصم ماركات الملابس الرياضية نايكي وأديداس 2026',       img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'الأطفال', icon: '🐻',
        articles: [
            { slug: 'kids-educational-toys-2026', title: 'أفضل ألعاب الأطفال التعليمية لعام 2026 مع أكواد خصم',          img: 'https://images.unsplash.com/photo-1515488042361-ee00e41feb1b?w=800&q=80&fit=crop&auto=format' },
            { slug: 'newborn-essentials',          title: 'مستلزمات المولود الجديد الضرورية بأرخص الأسعار',               img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80&fit=crop&auto=format' },
            { slug: 'kids-branded-clothes',        title: 'ملابس أطفال ماركة بكوبونات خصم حصرية من المسوق',               img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'المنزل', icon: '🏠',
        articles: [
            { slug: 'home-furniture-deals-2026',       title: 'أفضل عروض أثاث المنزل وديكورات 2026 بأقل الأسعار',            img: 'https://images.unsplash.com/photo-1555041469-db74d4fe0d15?w=800&q=80&fit=crop&auto=format' },
            { slug: 'home-appliances-black-friday', title: 'أجهزة منزلية بخصومات تصل 50% خلال الجمعة السوداء', img: 'https://images.unsplash.com/photo-1555041469-db74d4fe0d15?w=800&q=80&fit=crop&auto=format' },
            { slug: 'home-decoration-tips',            title: 'كيف تزين منزلك باحترافية بميزانية محدودة مع كوبونات المسوق',   img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80&fit=crop&auto=format' },
        ]
    },
    {
        name: 'صحة ولياقة', icon: '💊',
        articles: [
            { slug: 'health-vitamins-online',    title: 'أفضل مواقع شراء الفيتامينات والمكملات الغذائية أونلاين',        img: 'https://images.unsplash.com/photo-1505576399279-6e9a94c2f5e7?w=800&q=80&fit=crop&auto=format' },
            { slug: 'pharmacy-online-coupons',   title: 'كوبونات خصم صيدليات أونلاين موثوقة في السعودية 2026',           img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&fit=crop&auto=format' },
            { slug: 'health-care-products-tips', title: 'نصائح لشراء منتجات العناية الصحية بأقل تكلفة مع المسوق',        img: 'https://images.unsplash.com/photo-1559181567-c3190eba4d98?w=800&q=80&fit=crop&auto=format' },
        ]
    },
];

// ==================== COMPONENTS ====================

function PopularCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col group">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3">
                    <span className="bg-[#00BFA5] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {article.label}
                    </span>
                </div>
            </div>
            <div className="p-4 text-right flex-1 flex flex-col gap-2">
                <span className="text-xs text-gray-400 font-medium">{article.tagEn} – {article.tag}</span>
                <h3 className="text-sm font-bold text-gray-800 leading-relaxed group-hover:text-[#00BFA5] transition-colors">
                    {article.title}
                </h3>
            </div>
        </Link>
    );
}

function FeaturedCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="block rounded-2xl overflow-hidden relative group">
            <div className="aspect-video overflow-hidden">
                <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-5 text-right">
                <div className="text-xs font-bold text-[#00BFA5] mb-1">{article.tagEn} – {article.tag}</div>
                <h3 className="text-base sm:text-lg font-black text-white leading-snug">{article.title}</h3>
            </div>
        </Link>
    );
}

function ArticleCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="group flex flex-col gap-3">
            <div className="aspect-16/10 rounded-2xl overflow-hidden">
                <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <p className="text-sm font-bold text-gray-800 text-right leading-relaxed group-hover:text-[#00BFA5] transition-colors">
                {article.title}
            </p>
        </Link>
    );
}

function CategorySection({ section }) {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <a href="#" className="text-xs text-[#00BFA5] hover:underline font-medium">جميع المقالات »</a>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-gray-800">{section.name}</span>
                    <span className="text-2xl">{section.icon}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {section.articles.map((article, i) => (
                    <ArticleCard key={i} article={article} />
                ))}
            </div>
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function Blog() {
    const page = usePage().props;
    const popularArticles = page.popularArticles ?? [];
    const featuredArticles = page.featuredArticles ?? [];
    const latestArticles = page.latestArticles ?? [];
    const blogCategories = page.blogCategories ?? [];
    const allBlogCategories = page.allBlogCategories ?? [];
    const categoryArticleSections = page.categoryArticleSections ?? [];
    const blogAuthors = page.blogAuthors ?? [];
    const [activeCategory, setActiveCategory] = useState(null);

    const visibleSections = activeCategory
        ? categoryArticleSections.filter((s) => s.name === activeCategory)
        : categoryArticleSections;

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Link href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</Link>
                        <span>\</span>
                        <span className="text-gray-700 font-medium">المدونة</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6 text-right">مدونة المسوق للخصومات</h1>

                    {/* Category filter pills */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 mb-8 flex-row-reverse">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`flex flex-col items-center gap-1.5 shrink-0 px-5 py-3 rounded-2xl border-2 transition-all ${
                                activeCategory === null
                                    ? 'border-[#00BFA5] bg-[#E8F8F5] text-[#00BFA5]'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#00BFA5]'
                            }`}
                        >
                            <span className="text-2xl leading-none">🗂️</span>
                            <span className="text-xs font-bold whitespace-nowrap">الكل</span>
                        </button>
                        {blogCategories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                                className={`flex flex-col items-center gap-1.5 shrink-0 px-5 py-3 rounded-2xl border-2 transition-all ${
                                    activeCategory === cat.name
                                        ? 'border-[#00BFA5] bg-[#E8F8F5] text-[#00BFA5]'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-[#00BFA5]'
                                }`}
                            >
                                <span className="text-2xl leading-none">{cat.icon}</span>
                                <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Most Popular */}
                    {!activeCategory && (
                        <div className="mb-10">
                            <h2 className="text-xl font-black text-gray-800 text-right mb-4">الأكثر رواجاً</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {popularArticles.map((article, i) => (
                                    <PopularCard key={i} article={article} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Featured Articles */}
                    {!activeCategory && (
                        <div className="mb-10">
                            <h2 className="text-xl font-black text-gray-800 text-right mb-4">المقالات المميزة</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {featuredArticles.map((article, i) => (
                                    <FeaturedCard key={i} article={article} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Authors + Latest Articles */}
                    {!activeCategory && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                        {/* Authors */}
                        <div className="bg-[#E0F7FA] rounded-2xl p-5 text-right">
                            <h2 className="text-lg font-black text-gray-800 mb-5">المؤلفون</h2>
                            <div className="flex flex-wrap gap-6 justify-center">
                                {blogAuthors.map((author) => (
                                    <Link key={author.slug} href={`/blog-author/${author.slug}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                                        <img
                                            src={author.avatar}
                                            alt={author.name}
                                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                        />
                                        <span className="text-xs font-bold text-gray-700">{author.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Latest Articles */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 text-right">
                            <h2 className="text-lg font-black text-gray-800 mb-4">أحدث المقالات</h2>
                            <div className="flex flex-col gap-4">
                                {latestArticles.map((article, i) => (
                                    <Link key={i} href={`/blog/${article.slug}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors group">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                                            <img
                                                src={article.img}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex-1 text-right">
                                            <span className="text-xs text-[#00BFA5] font-bold">{article.tagEn} – {article.tag}</span>
                                            <p className="text-sm text-gray-800 font-bold leading-relaxed mt-0.5 line-clamp-2">{article.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>}

                    {/* Category Article Sections */}
                    {visibleSections.length > 0 ? (
                        visibleSections.map((section, i) => (
                            <CategorySection key={i} section={section} />
                        ))
                    ) : (
                        <div className="text-center py-16 text-gray-400">
                            <span className="text-5xl block mb-3">🔍</span>
                            <p className="text-lg font-bold">لا توجد مقالات في هذه الفئة حالياً</p>
                        </div>
                    )}

                    {/* All Categories row */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">
                        <h2 className="text-lg font-black text-gray-800 text-right mb-3">جميع الفئات</h2>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 justify-end">
                            {allBlogCategories.map((cat, i) => (
                                <a key={i} href="#" className="text-sm text-gray-500 hover:text-[#00BFA5] transition-colors">
                                    {cat}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
