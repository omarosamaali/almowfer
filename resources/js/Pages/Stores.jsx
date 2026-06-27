import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';

function storeSlug(store) {
    return store.slug || store.domain
        .replace(/^www\./, '')
        .replace(/\.(com\.tr|co\.uk|co\.nz|com\.au|com\.eg|com\.sa|net|org|me|zone|co|com).*$/, '')
        .replace(/\./g, '-')
        .toLowerCase();
}

function StoreCard({ store }) {
    const [srcIndex, setSrcIndex] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${store.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${store.domain}&size=256`,
    ];
    const failed = srcIndex >= sources.length;
    return (
        <a href={`/store/${storeSlug(store)}`} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow group cursor-pointer">
            {/* Coupon count badge - top right in RTL */}
            <div className="self-end flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]"></div>
                <span className="text-xs font-bold text-[#00BFA5]">{store.coupons}</span>
            </div>
            {/* Logo */}
            <div className="h-14 flex items-center justify-center w-full px-2">
                {!failed ? (
                    <img
                        key={srcIndex}
                        src={sources[srcIndex]}
                        alt={store.name}
                        onError={() => setSrcIndex(i => i + 1)}
                        referrerPolicy="no-referrer"
                        className="max-h-14 max-w-full object-contain"
                    />
                ) : (
                    <span
                        className="font-black text-base text-center leading-tight"
                        style={{ color: store.color || '#374151' }}
                    >
                        {store.name}
                    </span>
                )}
            </div>
            {/* Description */}
            <p className="text-xs text-gray-500 text-center line-clamp-2 leading-relaxed">{store.desc}</p>
        </a>
    );
}

// ==================== MAIN PAGE ====================

export default function Stores({
    allStores = [],
    storeCategories = ['جميع الفئات'],
    reviews = [],
    stats = [],
}) {
    const [activeCategory, setActiveCategory] = useState('جميع الفئات');
    const [showCount, setShowCount] = useState(25);
    const [showGH, setShowGH] = useState(false);

    const filteredStores = activeCategory === 'جميع الفئات'
        ? allStores
        : allStores.filter(s => s.category === activeCategory);

    const visibleStores = filteredStores.slice(0, showCount);
    const hasMore = showCount < filteredStores.length;

    return (
        <MainLayout>
            <Head title="جميع المتاجر - المسوق" />
            <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                    <a href="/" className="hover:text-[#00BFA5] transition-colors">الصفحة الرئيسية</a>
                    <span className="text-gray-300">›</span>
                    <span className="text-gray-700 font-medium">
                        <Link href="/stores">جميع المتاجر</Link>
                    </span>
                </nav>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

                    {/* MAIN CONTENT — order-1 on mobile, order-2 on lg (right side in RTL) */}
                    <div className="flex-1 min-w-0 order-1 lg:order-2">

                        {/* Title row */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors shrink-0 mt-1" aria-label="ترتيب">
                                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="21" y1="10" x2="7" y2="10"/>
                                    <line x1="21" y1="6" x2="3" y2="6"/>
                                    <line x1="21" y1="14" x2="3" y2="14"/>
                                    <line x1="21" y1="18" x2="7" y2="18"/>
                                </svg>
                            </button>
                            <div className="text-right">
                                <h1 className="text-xl sm:text-2xl font-black text-gray-900">اختر المتجر المفضل لديك!</h1>
                                <p className="text-sm text-gray-500 mt-0.5">افضل كوبونات خصم وعروض المتاجر 2026</p>
                            </div>
                        </div>

                        {/* Categories horizontal scroll */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
                            {storeCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setShowCount(25); }}
                                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                                        activeCategory === cat
                                            ? 'bg-[#00BFA5] text-white'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:border-[#00BFA5] hover:text-[#00BFA5]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Store grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {visibleStores.map((store, i) => (
                                <StoreCard key={i} store={store} />
                            ))}
                        </div>

                        {/* Show more button */}
                        {hasMore && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setShowCount(prev => prev + 25)}
                                    className="bg-[#00BFA5] hover:bg-[#00A896] text-white font-bold px-8 py-2.5 rounded-full text-sm transition-colors"
                                >
                                    عرض المزيد
                                </button>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR — order-2 on mobile, order-1 on lg (left side in RTL) */}
                    <aside className="w-full lg:w-72 lg:shrink-0 order-2 lg:order-1">

                        {/* Email Subscribe */}
                        <div className="mb-4">
                            <NewsletterBox />
                        </div>

                        {/* App Download */}
                        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="text-4xl shrink-0">📱</div>
                                <div className="text-right flex-1">
                                    <h3 className="font-extrabold text-gray-800">تسوق كالمحترفين</h3>
                                    <p className="text-sm font-bold text-gray-700 mt-1">احصل على تطبيق المسوق!</p>
                                    <p className="text-xs text-gray-500 mt-1">تقدم في المراحل واكسب الوحدات - استبدل وحدات المسوق بقسائم شرائية مميزة!</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href="#" className="flex-1 bg-black text-white text-xs font-bold py-2 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800">🍎 App Store</a>
                                <a href="#" className="flex-1 bg-black text-white text-xs font-bold py-2 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800">▶ Google Play</a>
                            </div>
                        </div>

                        {/* AI Gift Finder */}
                        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm text-right">
                            <div className="flex justify-center mb-2">
                                <img src="/assets/helpdesk.gif" alt="صياد الهدايا" className="w-20 h-20 object-contain" />
                            </div>
                            <h3 className="font-extrabold text-gray-800 text-center">مرحبا بك انا نوره</h3>
                            <p className="text-xs text-gray-500 mt-2 mb-3">مساعدتك الذكية لإيجاد أفضل العروض والكوبونات</p>
                            <button onClick={() => setShowGH(true)} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl text-sm transition-colors">
                                هيا نبدأ
                            </button>
                        </div>

                        {/* Latest Articles */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <Link href="/blog" className="text-xs text-[#00BFA5] hover:underline">المزيد من المقالات</Link>
                                <h3 className="font-extrabold text-gray-800">مقال جديد</h3>
                            </div>
                            {[
                                { cat: 'BEAUTY – الجمال والعناية', title: 'تخفيضات سيفورا القادمة في 2025 – خصومات حتى 80%', img: '🛍️' },
                                { cat: 'TRAVEL – سياحة وسفر',      title: 'أفضل الدول سياحةً في العالم لهذا العام',             img: '✈️' },
                            ].map((article, i) => (
                                <a key={i} href="/blog/article" className="flex items-center gap-3 mb-3 hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">{article.img}</div>
                                    <div className="text-right flex-1 min-w-0">
                                        <div className="text-xs text-[#00BFA5] font-medium">{article.cat}</div>
                                        <div className="text-xs text-gray-700 font-medium mt-1 leading-snug line-clamp-2">{article.title}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </aside>
                </div>

                {/* ===== REVIEWS ===== */}
                <section className="mt-10 sm:mt-12">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-5 sm:mb-6 text-center">
                        تقييمات حقيقية من مستخدمي تطبيق المسوق للكوبونات
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {reviews.map((review, i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: review.color }}>
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-gray-800">{review.name}</div>
                                        <div className="text-xs text-gray-500">{review.date}</div>
                                    </div>
                                </div>
                                <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
                                <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== STATS ===== */}
                <section className="mt-8 bg-white rounded-2xl p-4 sm:p-6 shadow-sm text-right">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">وفر المال من خلال موقع المسوق™</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-start gap-2 sm:gap-3">
                                <span className="text-xl sm:text-2xl text-[#00BFA5] shrink-0">{stat.icon}</span>
                                <div>
                                    <div className="text-xl sm:text-2xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-xs text-gray-500 mt-1 leading-relaxed">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <GiftHunter open={showGH} onClose={() => setShowGH(false)} />
        </MainLayout>
    );
}
