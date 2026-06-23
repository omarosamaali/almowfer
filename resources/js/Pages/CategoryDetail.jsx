import { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';

// ==================== DATA ====================

const category = {
    name: 'العاب الفيديو',
    nameEn: 'Gaming',
    parent: 'إلكترونيات',
    parentSlug: 'electronics',
    slug: 'gaming',
    icon: '🎮',
    color: '#6C3FC5',
    couponCount: 47,
    storeCount: 18,
    lastUpdate: '01/04/2026',
};

const subCategories = [
    { name: 'كل العاب الفيديو', slug: 'gaming',         icon: '🎮', active: true  },
    { name: 'بلايستيشن',        slug: 'playstation',     icon: '🎯', active: false },
    { name: 'Xbox',              slug: 'xbox',            icon: '🕹️', active: false },
    { name: 'ألعاب PC',          slug: 'pc-games',        icon: '💻', active: false },
    { name: 'نينتندو',           slug: 'nintendo',        icon: '🧩', active: false },
    { name: 'إكسسوارات',         slug: 'gaming-accessories', icon: '🎧', active: false },
];

const coupons = [
    { store: 'noon',         domain: 'noon.com',         discount: 'خصم حتى 60% على العاب الفيديو',       desc: 'كود خصم نون 10% إضافي على العاب الفيديو والأجهزة',             btn: 'انسخ الكود', badge: 'جديد',    logo: '🌙', slug: 'noon-egypt',  code: 'ALM1'    },
    { store: 'Amazon',       domain: 'amazon.com',       discount: 'خصم حتى 50% على الألعاب والأجهزة',    desc: 'عروض أمازون المميزة على العاب الفيديو وإكسسوارات الجيمينج',    btn: 'احصل',       badge: 'جديد',    logo: '🛒', slug: 'amazon',      code: null      },
    { store: 'Virgin',       domain: 'virginmegastore.com', discount: 'خصم 20% على الألعاب المختارة',     desc: 'كود خصم فيرجن ميجاستور 20% على ألعاب PS5 وXbox وNintendo',     btn: 'انسخ الكود', badge: 'لا يفوت', logo: '🎵', slug: 'virgin',      code: 'VRG20'   },
    { store: 'Noon',         domain: 'noon.com',         discount: 'الأكثر مبيعاً: خصم 80% + 10% إضافي', desc: 'أقوى عروض نون على ألعاب الفيديو والأجهزة + كود خصم إضافي',    btn: 'انسخ الكود', badge: 'الأكثر مبيعاً', logo: '🌙', slug: 'noon-egypt', code: 'ALM1'  },
    { store: 'DHgate',       domain: 'dhgate.com',       discount: 'خصم حتى 70% على إكسسوارات الجيمينج', desc: 'عروض DHgate على ذراع التحكم والسماعات وإكسسوارات الجيمينج',   btn: 'احصل',       badge: 'جديد',    logo: '🏪', slug: 'dhgate',      code: null      },
    { store: 'AliExpress',   domain: 'aliexpress.com',   discount: 'خصم 15% على أجهزة الجيمينج',         desc: 'كود خصم علي اكسبريس 15% على ألعاب الفيديو والإكسسوارات',      btn: 'انسخ الكود', badge: 'جديد',    logo: '🛍️', slug: 'aliexpress',  code: 'ALI15'   },
    { store: 'Jarir',        domain: 'jarir.com',        discount: 'خصم 5% على كل الألعاب',               desc: 'كود خصم جرير بقيمة 5% على ألعاب PS5 وXbox والمزيد',            btn: 'احصل',       badge: 'جديد',    logo: '📚', slug: 'jarir',       code: 'JRR5'    },
    { store: 'RayaShop',     domain: 'rayashop.com',     discount: 'خصم 10% إضافي على الأجهزة',           desc: 'كود خصم رايا شوب 10% على أجهزة الجيمينج والألعاب الإلكترونية', btn: 'انسخ الكود', badge: 'يوصى به', logo: '🖥️', slug: 'rayashop',    code: 'RAYA10'  },
];

const sideStores = [
    { name: 'Almatar',    domain: 'almatar.com',    color: '#E53935', slug: 'almatar'    },
    { name: 'Amazon',     domain: 'amazon.sa',       color: '#FF9900', slug: 'amazon'     },
    { name: 'Noon',       domain: 'noon.com',        color: '#FEEE00', slug: 'noon-egypt' },
    { name: 'AliExpress', domain: 'aliexpress.com',  color: '#FF4747', slug: 'aliexpress' },
    { name: 'Waffarha',   domain: 'waffarha.com',    color: '#FF6B35', slug: 'waffarha'   },
    { name: 'DeFacto',    domain: 'defacto.com',     color: '#1A1A2E', slug: 'defacto'    },
    { name: 'Farfetch',   domain: 'farfetch.com',    color: '#111111', slug: 'farfetch'   },
    { name: 'iHerb',      domain: 'iherb.com',       color: '#3D8B37', slug: 'iherb'      },
    { name: 'Max',        domain: 'maxfashion.com',  color: '#D32F2F', slug: 'max-fashion' },
];

const sideArticles = [
    { cat: 'GAMING – العاب الفيديو',   title: 'أفضل ألعاب PS5 في 2026 – قائمة كاملة بالأسعار',              img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=120&q=80&fit=crop' },
    { cat: 'GAMING – العاب الفيديو',   title: 'مقارنة بين PS5 وXbox Series X – أيهما أفضل لعام 2026؟',     img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&q=80&fit=crop' },
    { cat: 'ELECTRONICS – إلكترونيات', title: 'أفضل سماعات الجيمينج في 2026 – اختيارات الخبراء',           img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=120&q=80&fit=crop' },
    { cat: 'GAMING – العاب الفيديو',   title: 'كيف توفر المال عند شراء ألعاب الفيديو من الإنترنت',         img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=120&q=80&fit=crop' },
];

const catStores = [
    { name: 'نون',            slug: 'noon-egypt',  domain: 'noon.com'             },
    { name: 'أمازون',         slug: 'amazon',      domain: 'amazon.com'           },
    { name: 'فيرجن ميجاستور', slug: 'virgin',      domain: 'virginmegastore.com'  },
    { name: 'جرير',           slug: 'jarir',       domain: 'jarir.com'            },
    { name: 'رايا شوب',       slug: 'rayashop',    domain: 'rayashop.com'         },
    { name: 'DHgate',         slug: 'dhgate',      domain: 'dhgate.com'           },
    { name: 'علي اكسبريس',    slug: 'aliexpress',  domain: 'aliexpress.com'       },
    { name: 'سوني',           slug: 'sony',        domain: 'sony.com'             },
];

const faqs = [
    { q: 'ما هي المتاجر العالمية للحصول على كوبونات العاب الفيديو؟',       a: 'المتاجر العالمية للحصول على عروض وكوبونات العاب الفيديو هي نون ومصر، أمازون، فيرجن ميجاستور، جرير، ورايا شوب. يمكنك إيجاد أحدث الكوبونات لهذه المتاجر على موقع المسوق.' },
    { q: 'كيف احصل على خصم على العاب PS5؟',                             a: 'استخدم كود خصم نون مصر (ALM1) للحصول على خصم 10% إضافي على ألعاب PS5 من متجر نون، أو تصفح عروض فيرجن ميجاستور وأمازون للحصول على أفضل الأسعار.' },
    { q: 'هل يمكنني الحصول على كوبون خصم على Xbox Game Pass؟',          a: 'نعم، يمكنك الحصول على عروض Xbox Game Pass عبر منصة مايكروسوفت الرسمية، كما تجد أفضل العروض المجمعة على الأجهزة والاشتراكات في متاجر نون وجرير.' },
    { q: 'ما هو كود خصم نون للعاب الفيديو؟',                            a: 'كود خصم نون الأفضل للعاب الفيديو هو (ALM1) ويمنحك خصم 10% إضافي على كل مشتريات الألعاب والأجهزة من موقع Noon مصر.' },
    { q: 'هل تتوفر عروض موسمية على العاب الفيديو؟',                     a: 'نعم، تتوفر عروض موسمية كبيرة على ألعاب الفيديو في موسم الصيف، وعروض بلاك فرايداي، وعروض اليوم الوطني. تابع موقع المسوق لأحدث العروض.' },
];

const reviews = [
    { name: 'أحمد السيد',    initials: 'أ', bg: '#6C3FC5', date: '15-03-2026', stars: 5, text: 'وفرت كتير على ألعاب PS5 باستخدام الكوبونات من هنا، ممتاز!' },
    { name: 'محمد علي',      initials: 'م', bg: '#00BFA5', date: '20-03-2026', stars: 5, text: 'أحسن موقع للكوبونات، وفرت أكثر من 200 جنيه على اللعبة الجديدة' },
    { name: 'خالد يوسف',    initials: 'خ', bg: '#FF6B35', date: '25-03-2026', stars: 4, text: 'الكوبونات شغالة 100% وموثوقة، أنصح بالاستخدام' },
    { name: 'عمر الفاروق',  initials: 'ع', bg: '#3F51B5', date: '28-03-2026', stars: 5, text: 'تجربة رائعة، وجدت كوبون Xbox ووفرت مبلغ كبير' },
];

const stats = [
    { icon: '🎮', value: '47',    label: 'كوبون وعرض للعاب الفيديو' },
    { icon: '🏪', value: '18',    label: 'متجر يقدم عروض على الألعاب' },
    { icon: '💰', value: '12.5%', label: 'متوسط نسبة الخصم على الألعاب' },
    { icon: '👥', value: '3,240', label: 'متسوق وفّر عبر المسوق هذا الشهر' },
];

// ==================== COMPONENTS ====================

function SideStoreLogo({ s }) {
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${s.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${s.domain}&size=256`,
    ];
    const failed = idx >= sources.length;
    return failed ? (
        <span className="text-[10px] font-black leading-tight text-center" style={{ color: s.color }}>{s.name}</span>
    ) : (
        <img key={idx} src={sources[idx]} alt={s.name} className="w-8 h-8 object-contain" onError={() => setIdx(p => p + 1)} />
    );
}

function CouponStoreLogo({ domain, fallback }) {
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`,
    ];
    if (idx >= sources.length) return <span className="text-3xl">{fallback}</span>;
    return <img key={idx} src={sources[idx]} alt={domain} className="h-10 max-w-[100px] object-contain" onError={() => setIdx(p => p + 1)} />;
}

function CouponModal({ coupon, onClose }) {
    const [copied, setCopied] = useState(false);
    if (!coupon) return null;

    const copy = () => {
        if (coupon.code) {
            navigator.clipboard.writeText(coupon.code).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-300 flex items-center justify-center p-4" dir="rtl">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>

                <div className="flex justify-end gap-2 pt-1">
                    <span className="text-xs font-bold text-[#FF4081] flex items-center gap-1">🔥 جديد</span>
                    <span className="text-xs font-bold text-orange-500 flex items-center gap-1">🔥 لا تفوت</span>
                </div>

                <div className="flex justify-center">
                    <CouponStoreLogo domain={coupon.domain} fallback={coupon.logo} />
                </div>

                <p className="font-black text-gray-900 text-base text-center leading-snug">{coupon.discount}</p>

                <div className="flex justify-center">
                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <span>✓</span> كوبون فعال وموثوق
                    </span>
                </div>

                {coupon.code ? (
                    <button
                        onClick={copy}
                        className="flex items-center border-2 border-dashed border-gray-300 rounded-2xl px-4 py-3 gap-3 hover:border-[#6C3FC5] transition-colors w-full"
                    >
                        <div className="text-gray-400 shrink-0">
                            {copied
                                ? <span className="text-green-500 text-lg">✓</span>
                                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            }
                        </div>
                        <span className="flex-1 text-center font-black text-xl text-gray-900 tracking-widest">
                            {copied ? 'تم النسخ!' : coupon.code}
                        </span>
                    </button>
                ) : (
                    <div className="flex items-center border-2 border-dashed border-gray-200 rounded-2xl px-4 py-3 justify-center">
                        <span className="text-sm text-gray-500 font-bold">عرض بدون كود</span>
                    </div>
                )}

                <button
                    onClick={coupon.code ? copy : onClose}
                    className="w-full bg-[#6C3FC5] hover:bg-purple-700 active:scale-95 text-white font-black py-3.5 rounded-2xl text-base transition-all"
                >
                    {copied ? '✓ تم النسخ — تسوق الآن!' : coupon.code ? 'انسخ الكود وتسوق' : 'تسوق الآن'}
                </button>
            </div>
        </div>
    );
}

function CouponCard({ coupon, onOpen }) {
    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* Top: store logo + badges */}
            <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex flex-col items-start gap-1">
                    {coupon.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            coupon.badge === 'جديد' ? 'bg-[#FF4081] text-white' :
                            coupon.badge === 'لا يفوت' ? 'bg-orange-500 text-white' :
                            coupon.badge === 'الأكثر مبيعاً' ? 'bg-amber-400 text-black' :
                            'bg-blue-500 text-white'
                        }`}>{coupon.badge}</span>
                    )}
                    <button onClick={() => setInfoOpen(o => !o)} className="text-gray-400 hover:text-gray-600 text-sm mt-0.5">ℹ️</button>
                </div>
                <div className="flex items-center justify-end h-12">
                    <CouponStoreLogo domain={coupon.domain} fallback={coupon.logo} />
                </div>
            </div>

            {infoOpen && (
                <div className="mx-4 mb-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-gray-600 text-right leading-relaxed">
                    هذا الكوبون تم التحقق منه وهو فعال وموثوق. يمكنك استخدامه مباشرة في ملخص الطلب.
                </div>
            )}

            {/* Content */}
            <div className="px-4 pb-3 flex-1 text-right">
                <p className="font-black text-gray-800 text-sm leading-snug mb-1">{coupon.discount}</p>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{coupon.desc}</p>
            </div>

            {/* CTA */}
            <div className="px-4 pb-4">
                <button
                    onClick={() => onOpen(coupon)}
                    className="w-full bg-gray-900 hover:bg-black active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
                >
                    {coupon.btn}
                </button>
            </div>
        </div>
    );
}

function Stars({ n }) {
    return (
        <span className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
                <span key={i} className={`text-sm ${i <= n ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
        </span>
    );
}

function Sidebar() {
    return (
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-5">

            {/* Newsletter */}
            <NewsletterBox />

            {/* Best stores */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h3 className="font-black text-gray-900 text-sm mb-3 text-right">أفضل متاجر العاب الفيديو</h3>
                <div className="grid grid-cols-3 gap-2">
                    {sideStores.map((s, i) => (
                        <a key={i} href={`/store/${s.slug}`} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                                <SideStoreLogo s={s} />
                            </div>
                            <span className="text-[10px] text-gray-600 text-center truncate w-full">{s.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* App promo */}
            <div className="bg-linear-to-br from-[#6C3FC5] to-[#00BFA5] rounded-2xl p-5 text-white text-right">
                <p className="font-black text-base mb-1">📱 حمّل تطبيق المسوق</p>
                <p className="text-xs opacity-90 mb-3 leading-relaxed">احصل على إشعارات فورية بأحدث عروض الألعاب!</p>
                <div className="flex gap-2">
                    <button className="flex-1 bg-black/30 hover:bg-black/40 text-white text-xs font-bold py-2 rounded-xl transition-colors">App Store</button>
                    <button className="flex-1 bg-black/30 hover:bg-black/40 text-white text-xs font-bold py-2 rounded-xl transition-colors">Google Play</button>
                </div>
            </div>

            {/* GiftHunter */}
            <GiftHunter />

            {/* Chrome extension */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                    <p className="font-black text-gray-900 text-sm">إضافة كروم</p>
                    <span className="text-2xl">🧩</span>
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">وفّر تلقائياً عند التسوق من أي متجر ألعاب!</p>
                <button className="w-full bg-[#6C3FC5] hover:bg-purple-700 text-white font-bold py-2 rounded-xl text-xs transition-colors">
                    أضف إلى Chrome مجاناً
                </button>
            </div>

            {/* Side articles */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h3 className="font-black text-gray-900 text-sm mb-3 text-right">مقالات الجيمينج</h3>
                <div className="flex flex-col gap-3">
                    {sideArticles.map((a, i) => (
                        <a key={i} href="/blog/article" className="flex gap-3 group hover:bg-gray-50 rounded-xl p-1.5 transition-colors">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-1 text-right flex-1 min-w-0">
                                <span className="text-[10px] text-[#00BFA5] font-bold">{a.cat}</span>
                                <span className="text-xs text-gray-700 font-bold leading-snug line-clamp-3 group-hover:text-[#6C3FC5] transition-colors">{a.title}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    );
}

// ==================== MAIN PAGE ====================

export default function CategoryDetail() {
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    return (
        <MainLayout>
            <div dir="rtl" className="min-h-screen bg-gray-50">

                {/* Hero banner */}
                <div className="bg-linear-to-br from-[#6C3FC5] to-[#4A2C9A] text-white py-10 px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="text-xs text-white/70 mb-4 flex items-center gap-1.5 flex-wrap">
                            <a href="/" className="hover:text-white transition-colors">الصفحة الرئيسية</a>
                            <span>\</span>
                            <a href="/categories" className="hover:text-white transition-colors">جميع الفئات</a>
                            <span>\</span>
                            <a href={`/category/${category.parentSlug}`} className="hover:text-white transition-colors">{category.parent}</a>
                            <span>\</span>
                            <span className="text-white">{category.name}</span>
                        </nav>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-5xl">{category.icon}</span>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black leading-snug">
                                    كوبونات وعروض خصم 2026 على {category.name}
                                </h1>
                                <p className="text-white/80 text-sm mt-1">
                                    {category.couponCount} كوبون و عرض من {category.storeCount} متجر — آخر تحديث {category.lastUpdate}
                                </p>
                            </div>
                        </div>

                        {/* Sub-category pills */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 flex-wrap">
                            {subCategories.map((sc, i) => (
                                <a
                                    key={i}
                                    href={`/category/${sc.slug}`}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                        sc.active
                                            ? 'bg-white text-[#6C3FC5]'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    <span>{sc.icon}</span>
                                    <span>{sc.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left: main */}
                        <main className="flex-1 min-w-0 flex flex-col gap-8">

                            {/* Coupon grid */}
                            <section>
                                <h2 className="font-black text-gray-900 text-lg mb-4 text-right">
                                    أفضل كوبونات وعروض {category.name} 2026
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {coupons.map((c, i) => (
                                        <CouponCard key={i} coupon={c} onOpen={setSelectedCoupon} />
                                    ))}
                                </div>
                            </section>

                            {/* SEO article */}
                            <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-right prose-custom">

                                <h2 className="font-black text-gray-900 text-xl mb-4">
                                    دليل المسوق الشامل لكوبونات وعروض {category.name} 2026
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    يُقدّم موقع المسوق™ أحدث وأفضل كوبونات وأكواد خصم العاب الفيديو من أشهر المتاجر الإلكترونية في مصر والوطن العربي. إذا كنت من عشاق الجيمينج وتبحث عن طرق لتوفير المال عند شراء الألعاب والأجهزة والإكسسوارات، فأنت في المكان الصحيح.
                                </p>

                                <h2 className="font-black text-gray-900 text-lg mb-3">
                                    أفضل متاجر العاب الفيديو في 2026
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                    هذه أبرز المتاجر التي تقدم أفضل العروض على العاب الفيديو والأجهزة والإكسسوارات:
                                </p>
                                <ul className="text-sm text-gray-600 leading-relaxed mb-4 flex flex-col gap-1 pr-4">
                                    {catStores.map((s, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="text-[#6C3FC5]">•</span>
                                            <a href={`/store/${s.slug}`} className="text-[#00BFA5] hover:underline font-bold">{s.name}</a>
                                            <span>— أحدث الكوبونات والعروض الحصرية</span>
                                        </li>
                                    ))}
                                </ul>

                                <h2 className="font-black text-gray-900 text-lg mb-3">
                                    كيف تحصل على أفضل الأسعار على ألعاب الفيديو؟
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                    إليك أهم النصائح للحصول على أفضل خصومات ألعاب الفيديو:
                                </p>
                                <ul className="text-sm text-gray-600 leading-relaxed mb-4 flex flex-col gap-2 pr-4">
                                    <li className="flex gap-2"><span className="text-[#6C3FC5] shrink-0">1.</span><span>استخدم كوبون نون مصر (ALM1) للحصول على خصم 10% إضافي على كل الألعاب والأجهزة</span></li>
                                    <li className="flex gap-2"><span className="text-[#6C3FC5] shrink-0">2.</span><span>تابع عروض الفلاش والصفقات اليومية في نون وأمازون لأقل الأسعار</span></li>
                                    <li className="flex gap-2"><span className="text-[#6C3FC5] shrink-0">3.</span><span>قارن الأسعار بين المتاجر المختلفة قبل الشراء للتأكد من أفضل صفقة</span></li>
                                    <li className="flex gap-2"><span className="text-[#6C3FC5] shrink-0">4.</span><span>اشترك في النشرة البريدية للموفر لتلقي إشعارات فورية بأحدث العروض</span></li>
                                    <li className="flex gap-2"><span className="text-[#6C3FC5] shrink-0">5.</span><span>استخدم إضافة المسوق لمتصفح كروم للحصول على الكوبونات تلقائياً عند الدفع</span></li>
                                </ul>

                                <h2 className="font-black text-gray-900 text-lg mb-3">
                                    أنواع عروض وكوبونات العاب الفيديو
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                                    {[
                                        { title: 'كوبونات خصم على الألعاب',        desc: 'كوبونات تقدم خصماً مباشراً على أسعار العاب PS5 وXbox ونينتندو عند الشراء من المتاجر المشاركة.' },
                                        { title: 'عروض الحزمة (Bundle)',            desc: 'احصل على جهاز جيمينج مع مجموعة ألعاب بسعر أقل مما لو اشتريتهم منفصلين.' },
                                        { title: 'عروض الاشتراكات',                 desc: 'خصومات على اشتراكات PlayStation Plus وXbox Game Pass وNintendo Switch Online.' },
                                        { title: 'عروض الإكسسوارات',               desc: 'كوبونات على ذراع التحكم والسماعات والشاشات وكافة إكسسوارات الجيمينج.' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                                            <h3 className="font-black text-[#6C3FC5] text-sm mb-1">{item.title}</h3>
                                            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>

                            {/* FAQ */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="font-black text-gray-900 text-lg mb-5 text-right">
                                    أسئلة شائعة عن كوبونات {category.name}
                                </h2>
                                <div className="flex flex-col gap-4">
                                    {faqs.map((faq, i) => (
                                        <FaqItem key={i} faq={faq} />
                                    ))}
                                </div>
                            </section>

                            {/* Stores list */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="font-black text-gray-900 text-lg mb-4 text-right">
                                    متاجر {category.name} — اعثر على كوبونك
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {catStores.map((s, i) => (
                                        <a
                                            key={i}
                                            href={`/store/${s.slug}`}
                                            className="flex items-center justify-between bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-[#6C3FC5] rounded-xl p-3 transition-all group"
                                        >
                                            <span className="text-xs font-bold text-[#6C3FC5] opacity-0 group-hover:opacity-100 transition-opacity">عرض الكوبونات ←</span>
                                            <span className="font-bold text-gray-800 text-sm">{s.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </section>

                            {/* Reviews */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="font-black text-gray-900 text-lg mb-5 text-right">
                                    آراء المتسوقين في كوبونات {category.name}
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {reviews.map((r, i) => (
                                        <div key={i} className="bg-gray-50 rounded-2xl p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 mb-2">
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                                                    <p className="text-[10px] text-gray-400">{r.date}</p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0" style={{ background: r.bg }}>
                                                    {r.initials}
                                                </div>
                                            </div>
                                            <Stars n={r.stars} />
                                            <p className="text-xs text-gray-600 mt-2 leading-relaxed">{r.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Stats */}
                            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center flex flex-col gap-1 items-center">
                                        <span className="text-2xl">{s.icon}</span>
                                        <p className="font-black text-gray-900 text-lg">{s.value}</p>
                                        <p className="text-[10px] text-gray-500 leading-snug">{s.label}</p>
                                    </div>
                                ))}
                            </section>
                        </main>

                        {/* Right: sidebar */}
                        <Sidebar />
                    </div>
                </div>
            </div>

            {selectedCoupon && (
                <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
            )}
        </MainLayout>
    );
}

function FaqItem({ faq }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-4 text-right bg-gray-50 hover:bg-purple-50 transition-colors"
            >
                <span className={`text-lg font-black transition-transform ${open ? 'rotate-180' : ''}`}>⌃</span>
                <span className="font-bold text-gray-900 text-sm flex-1 text-right pr-2">س: {faq.q}</span>
            </button>
            {open && (
                <div className="p-4 bg-white text-right">
                    <p className="text-sm text-gray-600 leading-relaxed">ج: {faq.a}</p>
                </div>
            )}
        </div>
    );
}
