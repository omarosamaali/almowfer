import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import NewsletterBox from '../Components/NewsletterBox';

// ==================== DATA ====================

const categories = [
    {
        id: 1, name: 'فنادق', icon: '🏨',
        bg: 'linear-gradient(135deg, #2C1810 0%, #6B3A2A 50%, #8B5E3C 100%)',
        light: false,
        stores: [
            { name: 'IHG', domain: 'ihg.com', discount: 'خصم حتى %25', color: '#003580' },
            { name: 'almatar', domain: 'almatar.com', discount: 'حجوزات الفنادق: خص...', color: '#E31837' },
            { name: 'Eurowings', domain: 'eurowings.com', discount: 'خصم %20 على...', color: '#8B1A7C' },
        ]
    },
    {
        id: 2, name: 'عطور', icon: '🌺',
        bg: 'linear-gradient(135deg, #F9E0E8 0%, #F5B8CC 50%, #EFA8BE 100%)',
        light: true,
        stores: [
            { name: 'Generic Perfumes', domain: 'genericperfumes.com', discount: 'خصم حتى %20', color: '#9E8FA0' },
            { name: 'ANI Yuzuk', domain: 'aniyuzuk.com', discount: 'خصم حتى %50', color: '#333333' },
            { name: 'Ubuy', domain: 'ubuy.com.eg', discount: 'خصم %5', color: '#F7A800' },
        ]
    },
    {
        id: 3, name: 'ألعاب الفيديو', icon: '🎮',
        bg: 'linear-gradient(135deg, #0D0D2B 0%, #1A1A4A 50%, #252560 100%)',
        light: false,
        stores: [
            { name: 'Virgin Megastore', domain: 'virginmegastore.ae', discount: 'خصم حتى %50', color: '#E2001A' },
            { name: 'Ubuy', domain: 'ubuy.com.eg', discount: 'حصرياً! خصم حتى %80', color: '#F7A800' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
        ]
    },
    {
        id: 4, name: 'أزياء', icon: '👗',
        bg: 'linear-gradient(135deg, #3D2B1F 0%, #6B4C38 50%, #8B6B55 100%)',
        light: false,
        stores: [
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'FARFETCH', domain: 'farfetch.com', discount: 'أفضل الستايلات...', color: '#000000' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
        ]
    },
    {
        id: 5, name: 'إلكترونيات', icon: '💻',
        bg: 'linear-gradient(135deg, #E8C000 0%, #F5D000 50%, #FFE033 100%)',
        light: true,
        stores: [
            { name: 'Ubuy', domain: 'ubuy.com.eg', discount: 'حصرياً! خصم حتى %80', color: '#F7A800' },
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
        ]
    },
    {
        id: 6, name: 'الجمال والعناية', icon: '💄',
        bg: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 50%, #F48FB1 100%)',
        light: true,
        stores: [
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'iHerb', domain: 'iherb.com', discount: 'خصم حتى %65+...', color: '#8CC63F' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
        ]
    },
    {
        id: 7, name: 'الطفل', icon: '🧸',
        bg: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 50%, #4FC3F7 100%)',
        light: true,
        stores: [
            { name: 'ChildrenSalon', domain: 'childrensalon.com', discount: 'خصم حتى %60', color: '#8B2252' },
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
        ]
    },
    {
        id: 8, name: 'رحلات', icon: '✈️',
        bg: 'linear-gradient(135deg, #006064 0%, #00838F 50%, #00ACC1 100%)',
        light: false,
        stores: [
            { name: 'Airalo', domain: 'airalo.com', discount: 'خصم %10 على جميع...', color: '#4A90D9' },
            { name: 'almatar', domain: 'almatar.com', discount: 'حجوزات الطيران: خص...', color: '#E31837' },
            { name: 'Trip.com', domain: 'trip.com', discount: 'الجولات والأنشطة...', color: '#0079C1' },
        ]
    },
    {
        id: 9, name: 'مستلزمات السيارات', icon: '🚗',
        bg: `repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)`,
        light: false,
        stores: [
            { name: 'Ubuy', domain: 'ubuy.com.eg', discount: 'حصرياً! خصم حتى %80', color: '#F7A800' },
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
        ]
    },
    {
        id: 10, name: 'خدمات', icon: '🌐',
        bg: `repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)`,
        light: false,
        stores: [
            { name: 'شاهد', domain: 'shahid.net', discount: 'وفّر حتى %50 على...', color: '#E6002D' },
            { name: 'Airalo', domain: 'airalo.com', discount: 'خصم %10 على جميع...', color: '#4A90D9' },
            { name: 'Trip.com', domain: 'trip.com', discount: 'الجولات والأنشطة...', color: '#0079C1' },
        ]
    },
    {
        id: 11, name: 'هواتف ذكية', icon: '📱',
        bg: 'linear-gradient(135deg, #BBDEFB 0%, #90CAF9 50%, #64B5F6 100%)',
        light: true,
        stores: [
            { name: 'Huawei', domain: 'huawei.com', discount: 'خصم %5 إضافي على...', color: '#CF0A2C' },
            { name: 'Airalo', domain: 'airalo.com', discount: 'خصم %10 على جميع...', color: '#4A90D9' },
            { name: 'Noon', domain: 'noon.com', discount: 'الموبايلات: خصم %60...', color: '#FEEE00' },
        ]
    },
    {
        id: 12, name: 'المنزل', icon: '🏠',
        bg: 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 50%, #9C27B0 100%)',
        light: false,
        stores: [
            { name: 'Ubuy', domain: 'ubuy.com.eg', discount: 'حصرياً! خصم حتى %80', color: '#F7A800' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض: خصم حتى...', color: '#FEEE00' },
            { name: 'Amazon', domain: 'amazon.eg', discount: 'خصم حتى %40...', color: '#FF9900' },
        ]
    },
    {
        id: 13, name: 'اكسسوارات', icon: '💎',
        bg: `repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)`,
        light: false,
        stores: [
            { name: 'DHgate', domain: 'dhgate.com', discount: 'خصم حتى %70', color: '#E8451A' },
            { name: 'H&M', domain: 'hm.com', discount: 'خصم حتى %75 على...', color: '#E50010' },
            { name: 'Sun & Sand', domain: 'sssports.com', discount: 'تخفيضات منتصف...', color: '#F7A800' },
        ]
    },
    {
        id: 14, name: 'أزياء الأولاد', icon: '👦',
        bg: `repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)`,
        light: false,
        stores: [
            { name: 'VOGACLOSET', domain: 'vogacloset.com', discount: 'أفضل الستايلات...', color: '#333333' },
            { name: 'DeFacto', domain: 'defacto.com.tr', discount: 'خصم %10 إضافي على...', color: '#E40046' },
            { name: 'H&M', domain: 'hm.com', discount: 'خصم حتى %75...', color: '#E50010' },
        ]
    },
    {
        id: 15, name: 'أزياء نسائية', icon: '👒',
        bg: `repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)`,
        light: false,
        stores: [
            { name: 'FARFETCH', domain: 'farfetch.com', discount: 'أفضل الستايلات...', color: '#000000' },
            { name: 'Namshi', domain: 'namshi.com', discount: 'خصم حتى %60...', color: '#FF6B35' },
            { name: 'H&M', domain: 'hm.com', discount: 'خصم حتى %75...', color: '#E50010' },
        ]
    },
    {
        id: 16, name: 'رياضة', icon: '⚽',
        bg: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
        light: false,
        stores: [
            { name: 'Sun & Sand', domain: 'sssports.com', discount: 'خصم حتى %50...', color: '#F7A800' },
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض...', color: '#FEEE00' },
        ]
    },
    {
        id: 17, name: 'طعام', icon: '🍕',
        bg: 'linear-gradient(135deg, #BF360C 0%, #D84315 50%, #E64A19 100%)',
        light: false,
        stores: [
            { name: 'Talabat', domain: 'talabat.com', discount: 'خصم حتى %30...', color: '#FF6600' },
            { name: 'Careem', domain: 'careem.com', discount: 'توصيل مجاني...', color: '#1DBF73' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض...', color: '#FEEE00' },
        ]
    },
    {
        id: 18, name: 'صحة ولياقة', icon: '💊',
        bg: 'linear-gradient(135deg, #004D40 0%, #00695C 50%, #00796B 100%)',
        light: false,
        stores: [
            { name: 'iHerb', domain: 'iherb.com', discount: 'خصم حتى %65+...', color: '#8CC63F' },
            { name: 'Amazon', domain: 'amazon.eg', discount: 'أفضل المنتجات...', color: '#FF9900' },
            { name: 'Noon', domain: 'noon.com', discount: 'أقوى العروض...', color: '#FEEE00' },
        ]
    },
];

const allSubCategories = [
    ['طعام', 'صحة ولياقة', 'ألعاب', 'ثقافة'],
    ['مطاعم', 'هدايا', 'منتجات وخدمات التنظيف', 'برامج مشاهدة أونلاين'],
    ['تيرمو', 'حلويات', 'حدائق', 'جهانيز وأدواته'],
    ['خدمات الاستضافة', 'تلفزيونات', 'ديكورات', 'شموع وعطريات'],
    ['الملابس الرياضية', 'الطبخ', 'العناية بالشعر', 'طيران'],
    ['رياضة', 'العناية بالأظافر', 'مجوهرات', 'هاتف محمول'],
    ['مينيماليات', 'كنب', 'لابتوب', 'ساعات'],
    ['مستحضرات التجميل', 'كاميرات', 'أرياف سلاقة', 'معدات رياضية'],
    ['مكملات غذائية', 'أجهزة المنزل', 'أجهزة إلكترونية', 'أجهزة علاقه'],
    ['أزياء رجالية', 'أثاث المنزل', 'صناعة الصين', 'إضاءة'],
];

const topStores = [
    { name: 'almatar', domain: 'almatar.com',    color: '#E31837', slug: 'almatar'     },
    { name: 'Amazon',  domain: 'amazon.eg',       color: '#FF9900', slug: 'amazon'      },
    { name: 'Noon',    domain: 'noon.com',        color: '#FEEE00', slug: 'noon-egypt'  },
    { name: 'AliExpress', domain: 'aliexpress.com', color: '#FF6A00', slug: 'aliexpress' },
    { name: 'Waffarha',   domain: 'waffarha.com',   color: '#FF6B35', slug: 'waffarha'  },
    { name: 'DeFacto', domain: 'defacto.com.tr',  color: '#E40046', slug: 'defacto'     },
    { name: 'FARFETCH', domain: 'farfetch.com',   color: '#000000', slug: 'farfetch'    },
    { name: 'iHerb',   domain: 'iherb.com',       color: '#8CC63F', slug: 'iherb'       },
    { name: 'max',     domain: 'maxfashion.com',  color: '#E31837', slug: 'max-fashion' },
];

const articles = [
    { tag: 'الجمال والعناية', title: 'تخفيضات سيفورا القادمة في 2025 – خصومات حتى 80% هذا العام', img: null },
    { tag: 'سياحة وسفر', title: 'أكثر 10 دول سياحة في العالم أشهر 5 دول يارخص سعر زيارتها مع كوبونات المسوق', img: null },
    { tag: 'الأزياء', title: 'نجامة تيرمال رجالي شبك وأشهر أماكن البيع بسعر خيالي', img: null },
];

// ==================== MINI STORE LOGO ====================

function MiniStoreLogo({ store }) {
    const [srcIdx, setSrcIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${store.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${store.domain}&size=128`,
    ];
    const failed = srcIdx >= sources.length;
    return failed ? (
        <span className="font-bold text-xs text-center leading-tight" style={{ color: store.color || '#374151' }}>
            {store.name}
        </span>
    ) : (
        <img
            key={srcIdx}
            src={sources[srcIdx]}
            alt={store.name}
            onError={() => setSrcIdx(i => i + 1)}
            referrerPolicy="no-referrer"
            className="max-h-8 max-w-full object-contain"
        />
    );
}

// ==================== SIDEBAR STORE LOGO ====================

function SideStoreLogo({ store }) {
    const [srcIdx, setSrcIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${store.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${store.domain}&size=128`,
    ];
    const failed = srcIdx >= sources.length;
    return failed ? (
        <span className="font-bold text-xs text-center leading-tight" style={{ color: store.color || '#374151' }}>
            {store.name}
        </span>
    ) : (
        <img
            key={srcIdx}
            src={sources[srcIdx]}
            alt={store.name}
            onError={() => setSrcIdx(i => i + 1)}
            referrerPolicy="no-referrer"
            className="max-h-7 max-w-full object-contain"
        />
    );
}

// ==================== CATEGORY CARD ====================

function CategoryCard({ category }) {
    return (
        <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: category.bg, minHeight: 220 }}
        >
            {/* Title + Icon top-right */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <span className={`text-xl font-black ${category.light ? 'text-gray-800' : 'text-white'}`}>
                    {category.name}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-lg shadow">
                    {category.icon}
                </div>
            </div>

            {/* Store mini-cards */}
            <div className="absolute bottom-0 right-0 flex gap-2 p-4 pt-16">
                {category.stores.map((store, i) => (
                    <div key={i} className="bg-white rounded-xl p-2 flex flex-col items-center gap-1 w-[88px] shadow-sm">
                        <div className="h-8 flex items-center justify-center w-full">
                            <MiniStoreLogo store={store} />
                        </div>
                        <p className="text-xs text-gray-600 text-center leading-tight line-clamp-2">{store.discount}</p>
                    </div>
                ))}
            </div>

            {/* "عرض الكل" button bottom-left */}
            <div className="absolute bottom-4 left-4">
                <a
                    href="#"
                    className="bg-white/90 hover:bg-white text-gray-800 text-xs font-bold px-4 py-1.5 rounded-full shadow transition-colors"
                >
                    عرض الكل
                </a>
            </div>
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function Categories() {
    const page = usePage().props;
    const categories = page.categories ?? [];
    const topStores = page.topStores ?? [];
    const stats = page.stats ?? [];
    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <a href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</a>
                        <span>\</span>
                        <span className="text-gray-700 font-medium">جميع الفئات</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6">جميع الفئات</h1>

                    {/* Two column layout */}
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* ===== SIDEBAR (left in RTL = end) ===== */}
                        <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-5 order-2 lg:order-1">

                            {/* Newsletter */}
                            <NewsletterBox />

                            {/* Best Stores */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <a href="/stores" className="text-xs text-[#00BFA5] hover:underline">كل المتاجر</a>
                                    <h3 className="font-black text-gray-800">المتاجر العالمية</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {topStores.map((store, i) => (
                                        <a key={i} href={`/store/${store.slug}`} className="border border-gray-100 rounded-xl p-2 flex items-center justify-center h-14 hover:shadow-md transition-shadow bg-white">
                                            <SideStoreLogo store={store} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* App Promo */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <div className="flex items-start gap-3">
                                    <div className="text-4xl">📱</div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-gray-800 mb-1">تسوق كالمحترفين</h3>
                                        <p className="font-bold text-gray-800 text-sm mb-1">احصل على تطبيق المسوق!</p>
                                        <p className="text-xs text-gray-500 mb-3">تقدم في المراحل واكسب وحدات المسوق - استبدل وحدات المسوق بقسائم شرائية مميزة!</p>
                                        <div className="flex flex-col gap-1.5">
                                            <a href="#" className="bg-black text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-2 justify-center">
                                                🍎 App Store
                                            </a>
                                            <a href="#" className="bg-black text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-2 justify-center">
                                                ▶ Google Play
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chrome Extension */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <h3 className="font-black text-gray-800 mb-1">وفّر بسهولة</h3>
                                <p className="text-sm text-gray-500 mb-3">لا تفوت الخصومات مرة أخرى! ميزة المسوق على كروم تعثر على الخصومات وتطبقها تلقائياً.</p>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="bg-[#00BFA5] hover:bg-[#009e87] text-white text-sm font-bold py-2 px-4 rounded-xl transition-colors">
                                        + أضف إلى كروم
                                    </a>
                                    <div className="text-4xl">🌐</div>
                                </div>
                            </div>

                            {/* Latest Article */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <div className="flex items-center justify-between mb-3">
                                    <a href="/blog" className="text-xs text-[#00BFA5] hover:underline">المزيد من المقالات</a>
                                    <h3 className="font-black text-gray-800">مقال جديد</h3>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {articles.map((a, i) => (
                                        <a key={i} href="/blog/article" className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors">
                                            <div className="w-16 h-12 bg-gradient-to-br from-[#00BFA5] to-[#4CAF50] rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs text-center px-1">
                                                {a.tag}
                                            </div>
                                            <div className="flex-1 text-right">
                                                <span className="text-xs text-[#00BFA5] font-bold">{a.tag}</span>
                                                <p className="text-xs text-gray-700 mt-0.5 line-clamp-2 leading-relaxed">{a.title}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Service */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <h3 className="font-black text-gray-800 mb-2">خدمة عملاء المسوق</h3>
                                <p className="text-sm text-gray-500 mb-4">إذا وجدت كود لا يعمل، أو ترغب في مشاركة ملاحظاتك، لا تتردد في التواصل معنا عبر البريد الإلكتروني أو الانضمام إلى مجموعة محبي المسوق!</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { icon: '✉️', label: 'البريد الإلكتروني' },
                                        { icon: '📸', label: 'إنستاغرام' },
                                        { icon: '📘', label: 'فيسبوك' },
                                        { icon: '✈️', label: 'تيليغرام' },
                                    ].map((item, i) => (
                                        <a key={i} href="#" className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-xs text-gray-600 text-center leading-tight">{item.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <h3 className="font-black text-gray-800 mb-3">وفّر المال من خلال موقع المسوق™ مصر.</h3>
                                {[
                                    { icon: '🏷️', num: '854', label: 'كوبونات الخصم وعروض التخفيضات المتاحة على موقع المسوق™.' },
                                    { icon: '🛍️', num: '1,255', label: 'المتاجر التي تقدم كوبونات وعروض على موقع المسوق™.' },
                                    { icon: '👥', num: '9,312', label: 'عدد المسوقين الشهري عبر موقع المسوق™.' },
                                    { icon: '💸', num: '15.32%', label: 'قيمة الخصومات المتوسطة التي يحصل عليها مستخدمو موقع المسوق™.' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-start gap-3 mb-3">
                                        <span className="text-xl shrink-0">{s.icon}</span>
                                        <div>
                                            <div className="font-black text-gray-800 text-base">{s.num}</div>
                                            <p className="text-xs text-gray-500 leading-relaxed">{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {/* ===== MAIN CONTENT ===== */}
                        <main className="flex-1 min-w-0 order-1 lg:order-2">
                            <div className="grid grid-cols-1 gap-4">
                                {categories.map(cat => (
                                    <CategoryCard key={cat.id} category={cat} />
                                ))}
                            </div>
                        </main>
                    </div>

                    {/* Sub-categories links grid */}
                    <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2 text-right">
                            {allSubCategories.flat().map((cat, i) => (
                                <a key={i} href="#" className="text-sm text-[#00BFA5] hover:underline py-0.5">
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
