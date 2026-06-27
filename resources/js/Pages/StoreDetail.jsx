import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';

// ==================== DATA ====================

const DEFAULT_STORE = {
    name: 'Noon',
    nameAr: 'نون',
    domain: 'noon.com',
    slug: 'noon-egypt',
    color: '#F5C518',
    textColor: '#000',
    logo: 'https://logo.clearbit.com/noon.com',
    rating: 4.2,
    reviewCount: 5830,
    couponCount: 7,
    lastUpdate: '30/3/2026',
    code: 'ALM1',
};

const DEFAULT_COUPONS = [
    {
        title: 'أقوى العروض: خصم حتى 80% + 10% إضافي',
        desc: 'أقوى عروض نون الحضرية خصم حتى 80% + كود خصم 10% إضافي',
        discount: 'خصم حتى 80%',
        badges: ['جديد', 'شحن مجاني', 'كوبون موثق'],
        usedToday: 335, lastUsed: '8 ساعات', lastSaving: '12.5 جنيه',
        type: 'تنزيلات',
        code: null,
    },
    {
        title: 'الأفضل مبيعاً: خصم 10% إضافي على كل الموقع',
        desc: 'كود خصم نون 10% إضافي على أفضل المنتجات',
        discount: 'كوبون 10%',
        badges: ['الأكثر مبيعاً', 'كوبون موثق'],
        usedToday: 54, lastUsed: '5 ساعات', lastSaving: '32.3 جنيه',
        type: 'كوبون خصم',
        code: 'ALM1',
    },
    {
        title: 'الأجهزة الكهربائية: خصم 40% + 10% إضافي',
        desc: 'كود خصم نون 40% على الأجهزة الكهربائية + 10% إضافي',
        discount: 'خصم 40%',
        badges: ['كوبون موثق'],
        usedToday: 261, lastUsed: '6 ساعات', lastSaving: '15.7 جنيه',
        type: 'كوبون خصم',
        code: 'ALM1',
    },
    {
        title: 'الأزياء: خصم 70% + 10% إضافي',
        desc: 'خصومات نون بنسبة 70% على الأزياء + 10% إضافي',
        discount: 'خصم 70%',
        badges: ['عروض مميزة'],
        usedToday: 288, lastUsed: '7 ساعات', lastSaving: '31.4 جنيه',
        type: 'تنزيلات',
        code: null,
    },
    {
        title: 'منتجات الجمال: خصم 60% + 10% إضافي',
        desc: 'خصم نون يصل إلى 60% على منتجات الجمال + 10% إضافي',
        discount: 'تخفيض 10%',
        badges: ['الأكثر مبيعاً', 'كوبون موثق'],
        usedToday: 54, lastUsed: '11 ساعة', lastSaving: '4.9 جنيه',
        type: 'كوبون خصم',
        code: 'APP10',
    },
    {
        title: 'الموبايلات: خصم 60% + 10% إضافي',
        desc: 'خصم نون 2026 يصل إلى 60% على الموبايلات + 10% إضافي',
        discount: 'خصم 60%',
        badges: ['عروض مميزة', 'كوبون موثق'],
        usedToday: 294, lastUsed: '10 ساعات', lastSaving: '34.3 جنيه',
        type: 'تنزيلات',
        code: null,
    },
    {
        title: 'خصم 10% إضافي على كل الموقع',
        desc: 'كود خصم نون مصر بقيمة 10% إضافي على كل المنتجات',
        discount: 'خصم 10%',
        badges: ['موصى به', 'كوبون موثق'],
        usedToday: 242, lastUsed: '9 ساعات', lastSaving: '37.2 جنيه',
        type: 'كوبون خصم',
        code: 'ALM1',
    },
];

const DEFAULT_COUPON_TABLE = [
    { discount: 'كوبون 10%',         code: 'ALM1',          desc: 'كود خصم نون 2026: خصم 10% على كل الموقع'              },
    { discount: 'خصم ثابت 10%',      code: 'ALM1',          desc: 'أقوى كود خصم نون يونيو 2026'                          },
    { discount: 'تخفيضات حتى 80%',   code: 'رابط للتفعيل',  desc: 'خصومات نون نهاية الموسم: حتى 80% على الأزياء'         },
    { discount: 'تخفيضات حتى 70%',   code: 'رابط للتفعيل',  desc: 'تخفيضات نون يونيو 2026'                               },
    { discount: 'تخفيض إضافي 10%',   code: 'APP10',         desc: 'كود خصم نون أول طلب: 10% للعملاء الجدد'              },
    { discount: 'خصومات حتى 60%',    code: 'رابط للتفعيل',  desc: 'كود نون: تخفيضات على الأجهزة الكهربائية'             },
    { discount: 'تخفيضات حتى 60%',   code: 'رابط للتفعيل',  desc: 'كود خصم نون على منتجات الجمال والعناية'              },
];

const DEFAULT_SIMILAR_STORES = [
    { name: 'Amazon',     domain: 'amazon.com',      slug: 'amazon',      discount: 'حتى 40%'  },
    { name: 'AliExpress', domain: 'aliexpress.com',  slug: 'aliexpress',  discount: 'حتى 70%'  },
    { name: 'iHerb',      domain: 'iherb.com',       slug: 'iherb',       discount: 'حتى 65%'  },
    { name: 'FARFETCH',   domain: 'farfetch.com',    slug: 'farfetch',    discount: 'حتى 70%'  },
    { name: 'Namshi',     domain: 'namshi.com',      slug: 'namshi',      discount: 'حتى 50%'  },
    { name: 'Waffarha',   domain: 'waffarha.com',    slug: 'waffarha',    discount: 'حتى 65%'  },
];

const DEFAULT_FAQS = [
    { q: 'ما هو افوى كود خصم نون مصر؟',         a: 'أقوى كود نون هو (ALM1) يمنحك خصم 10% إضافي على موقع Noon، يشمل المنتجات المخفضة – ألصق كوبون نون عند الدفع للتحقق.' },
    { q: 'ما هي افوى عروض نون؟',                  a: 'خصومات نون بقيمة حتى 80% على أفضل المنتجات والماركات من شتى الفئات، بالإضافة إلى كوبون نون مصر (ALM1) بقيمة 10% فعال على كل شروه.' },
    { q: 'إزاي تاخد خصم من نون؟',                 a: 'استخدم كود خصم نون مصر (ALM1) في خانة رمز الكوبون في ملخص Noon واخصم 10% من قيمتها الإجمالية.' },
    { q: 'هل متجر نون يقبل الدفع عند الاستلام؟',  a: 'نعم، خدمة الدفع نقداً عند الاستلام متاحة على جميع الطلبيات، في حين أن خدمة إكسبريس تفرض رسوم شحن إضافية وتجدها في ملخص الطلب.' },
    { q: 'هل يمكنني تقسيط المبلغ عند الشراء من نون؟', a: 'نعم، يمكن لعملاء البنوك الشريكة تقسيط المبلغ (لا يقل عن 500 جنيه) لمدة تصل إلى 36 شهراً بأقل نسبة فائدة، أو باستخدام خدمة valu.' },
    { q: 'كيف أحصل على توصيل بنفس اليوم على نون مصر؟', a: 'متجر نون مصر يقدم خدمة التوصيل بنفس اليوم على منتجات نون إكسبريس، عند إنهاء الطلب قبل الساعة 13:00 أو كما هو مذكور في صفحة المنتج.' },
    { q: 'هل منتجات نون مصر مضمونة؟',             a: 'نعم، بكل تأكيد. جميع المنتجات أصيلة ومضمونة 100%، بحيث تتقدم شركة نون ضمانًا لمدة 12 شهراً على جميع منتجاتها المؤهلة، وذلك إلى جانب الضمان الذي يقدمه البائعون الآخرون على المنصة.' },
];

const sideStoresDefault = [
    { name: 'Almatar',    domain: 'almatar.com',    color: '#E53935', slug: 'almatar' },
    { name: 'Amazon',     domain: 'amazon.sa',       color: '#FF9900', slug: 'amazon' },
    { name: 'Noon',       domain: 'noon.com',        color: '#FEEE00', slug: 'noon-egypt' },
    { name: 'AliExpress', domain: 'aliexpress.com',  color: '#FF4747', slug: 'aliexpress' },
    { name: 'Waffarha',   domain: 'waffarha.com',    color: '#FF6B35', slug: 'waffarha' },
    { name: 'DeFacto',    domain: 'defacto.com',     color: '#1A1A2E', slug: 'defacto' },
    { name: 'Farfetch',   domain: 'farfetch.com',    color: '#111111', slug: 'farfetch' },
    { name: 'iHerb',      domain: 'iherb.com',       color: '#3D8B37', slug: 'iherb' },
    { name: 'Max',        domain: 'maxfashion.com',  color: '#D32F2F', slug: 'max-fashion' },
];

const sideArticles = [
    { cat: 'BEAUTY – الجمال والعناية', title: 'تخفيضات سيفورا القادمة في 2025 – خصومات حتى 80%',          img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&q=80&fit=crop' },
    { cat: 'TRAVEL – سياحة وسفر',     title: 'اكثر الدول سياحة في العالم 5 دول عليك زيارتها',            img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=120&q=80&fit=crop' },
    { cat: 'FASHION – الزياء',         title: 'بجامة تيرمال رجالي شيك وأشهر أماكن البيع بسعر خيالي',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80&fit=crop' },
    { cat: 'BEAUTY – الجمال والعناية', title: 'تخفيضات باث أند بودي 2025 – خصم حتى 80% على بعض المنتجات', img: 'https://images.unsplash.com/photo-1512436991641-6745cae21c5b?w=120&q=80&fit=crop' },
];

const DEFAULT_REVIEWS = [
    { name: 'فواز العلوي',   initials: 'ف', bg: '#00BFA5', date: '13-03-2026', stars: 5, text: 'ممتاز ويعطي كوبونات مجاناً!' },
    { name: 'مجدي فرج',      initials: 'م', bg: '#8B5CF6', date: '29-03-2026', stars: 5, text: 'ممتاز جداً كانت تجربة رائعة للغاية المبني من الجميع ز حمل التطبيق والاستمتاع بالخصم الجبار' },
    { name: 'اسامه بن طالب', initials: 'ا', bg: '#00BFA5', date: '07-03-2026', stars: 5, text: 'تجربتي كانت ممتاز جداً!' },
    { name: 'Abrheem Jal',   initials: 'A', bg: '#6B7280', date: '10-03-2026', stars: 5, text: 'تطبيق ممتاز ويرفوم عليك شيء كثير و انصح باستخدامه عند طلب ي شيء.' },
];

const shortLinks = [
    'كود خصم نون مصر 2026 بنسبة 10% إضافي على جميع المنتجات Noon – استخدم الكود: (ALM1)',
    'كيف استخدام كود خصم نون مصر 2026؟',
    'أنواع اكواد خصم نون مصر 2026',
];

const noonTypes = [
    { title: 'كود خصم نون 100 جنيه',           desc: 'كود نون (ALM1) يقدم لك عند تطبيقه في ملخص شروتك القادمة خصم نون مصر بمقدار 10% إضافي على الأقل.' },
    { title: 'كود خصم نون لجميع المتسوقين من موقع Noon مصر', desc: 'يمكّنك من تحقيق خصم بقيمة 10% على جميع المنتجات والماركات التي تواكبها، من شتى أقسام التسوق، وتُطبّق على كل عملية شراء باستخدام برومو كود نون (ALM1).' },
    { title: 'كود خصم نون اول طلب',             desc: 'كوبون نون مصر (ALM1) يمنحك عادةً خصم إضافي بقيمة 10% على اول طلب بأي قيمة كانت من متجر Noon فور لصقه في صفحة السداد.' },
    { title: 'برومو كود نون مصر نسبته 10% ساري على كل شروة من Noon', desc: 'رمز خصم 10% فعال على كافة المنتجات والماركات على موقع Noon، بما في ذلك المخفضة، وقابل للتطبيق عبر التسوق على عربة التسوق في خانة الخصم.' },
    { title: 'كود خصم نون للمشاهير',             desc: 'وهو عبارة عن كوبون خصم نون (ALM1) ساري المفعول في جميع مفضلات واختيارات المشاهير المؤثرين على موقع Noon، تلصقه عند إتمام عملية التسوق.' },
];

const noonFeatures = [
    'خصم نون بنسبة 10% على كل شروة. استخدم كود خصم نون مصر (ALM1) عند السداد لكي تحصل على تخفيض 10% إضافي على أي قيمة كانت.',
    'توفير المال الحقيقي. بالإضافة إلى عروض نون اليومية وصفقات الفلاش، فاحرص على ألا تفوت خصومات نون الكبيرة في أحداث التسوق الخاصة والأعياد والمناسبات والتي تجدها جميعها على المسوق.',
    'منصة شاملة لتسوق كل ما تحتاجه. متجر نون مصر هو المنصة الشاملة لتسوق جميع الفئات الاستهلاكية والترفيهية والعائلية وكافة الماركات.',
    'منتجات أصلية 100% ومضمونة الجودة. نون مصر يلتزم بتوفير أفضل المنتجات للشهر الماركات بضمان جودتها من المصنّع، وكل ذلك بأسعار معقولة وجميع احتياجاتك.',
    'خيارات تسوق رفيعة. نون مصر تقدم خدمات الشحن المجاني والتوصيل السريع على جميع المنتجات والطلبيات المؤهلة، بما في ذلك التوصيل بنفس اليوم، خيارات الدفع المتاحة عند الاستلام والتقسيط، خدمة مركز العملاء، إرجاع مجاني، إجراءات سهلة عند أي استفسار على المنتجات المؤهلة وغيرها الكثير.',
];

// ==================== COMPONENTS ====================

function Stars({ rating }) {
    return (
        <span className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
                <span key={i} className={`text-sm ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
        </span>
    );
}

function StoreLogo({ store = DEFAULT_STORE }) {
    const [err, setErr] = useState(false);
    return err ? (
        <span className="text-3xl font-black text-black">🌙 noon</span>
    ) : (
        <img
            src={store.logo}
            alt={store.name}
            className="h-12 object-contain"
            onError={() => setErr(true)}
        />
    );
}

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

function CouponModal({ coupon, onClose, store = DEFAULT_STORE }) {
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

                {/* Close */}
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>

                {/* Store logo */}
                <div className="flex justify-center pt-2">
                    <StoreLogo store={store} />
                </div>

                {/* Title */}
                <p className="font-black text-gray-900 text-base text-center leading-snug">
                    {coupon.title}
                </p>

                {/* Valid badge */}
                <div className="flex justify-center">
                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <span>✓</span> كوبون فعال وموثوق
                    </span>
                </div>

                {/* Code box */}
                {coupon.code ? (
                    <button
                        onClick={copy}
                        className="flex items-center border-2 border-dashed border-gray-300 rounded-2xl px-4 py-3 gap-3 hover:border-[#F5C518] transition-colors w-full"
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

                {/* CTA */}
                <button
                    onClick={copy}
                    className="w-full bg-[#F5C518] hover:bg-yellow-400 active:scale-95 text-black font-black py-3.5 rounded-2xl text-base transition-all"
                >
                    {copied ? '✓ تم النسخ — تسوق الآن!' : 'انسخ الكود وتسوق'}
                </button>
            </div>
        </div>
    );
}

function SideStoreLogo2({ domain, name, color }) {
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`,
    ];
    return idx >= sources.length
        ? <span className="text-xs font-black" style={{ color }}>{name}</span>
        : <img key={idx} src={sources[idx]} alt={name} className="w-10 h-10 object-contain" onError={() => setIdx(p => p + 1)} />;
}

function CouponCard({ coupon, onOpen, store = DEFAULT_STORE }) {
    const badgeColor = (b) => {
        if (b === 'جديد')          return 'bg-[#FF4081] text-white';
        if (b === 'الأكثر مبيعاً') return 'bg-orange-500 text-white';
        if (b === 'موصى به')        return 'bg-blue-500 text-white';
        if (b === 'شحن مجاني')      return 'bg-green-100 text-green-700';
        if (b === 'كوبون موثق')     return 'bg-emerald-100 text-emerald-700';
        if (b === 'عروض مميزة')     return 'bg-purple-100 text-purple-700';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="border border-gray-200 rounded-2xl bg-white hover:border-[#F5C518] transition-colors overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-100">
                <span className="text-xs font-black text-gray-500">{coupon.type}</span>
                <span className="text-sm font-black text-gray-800">{coupon.discount}</span>
            </div>

            <div className="p-4">
                {/* Badges */}
                <div className="flex gap-1.5 flex-wrap justify-end mb-3">
                    {coupon.badges.map((b, i) => (
                        <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor(b)}`}>{b}</span>
                    ))}
                </div>

                {/* Title & desc */}
                <div className="text-right mb-4">
                    <h3 className="font-black text-gray-800 text-sm sm:text-base leading-snug mb-1">{coupon.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{coupon.desc}</p>
                </div>

                {/* Code + buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    {coupon.code ? (
                        <button
                            onClick={() => onOpen(coupon)}
                            className="flex-1 bg-[#F5C518] hover:bg-yellow-400 text-black font-black py-2.5 rounded-xl text-sm transition-all"
                        >
                            انسخ الكود: {coupon.code}
                        </button>
                    ) : (
                        <button
                            onClick={() => window.open(`https://${store.domain}`, '_blank', 'noopener,noreferrer')}
                            className="flex-1 bg-[#F5C518] hover:bg-yellow-400 text-black font-black py-2.5 rounded-xl text-sm transition-all"
                        >
                            احصل على العرض
                        </button>
                    )}
                    <a
                        href={`https://${store.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-gray-200 text-gray-600 hover:border-[#F5C518] hover:text-gray-800 font-bold py-2.5 rounded-xl text-sm text-center transition-all"
                    >
                        المتابعة إلى موقع {store.nameAr} ←
                    </a>
                </div>

                {/* Usage stats */}
                <div className="flex items-center gap-4 text-[11px] text-gray-400 flex-wrap justify-end">
                    <span>🔥 {coupon.usedToday} استخدام اليوم</span>
                    <span>🕐 آخر استخدام منذ {coupon.lastUsed}</span>
                    <span>💰 آخر توفير {coupon.lastSaving}</span>
                </div>
            </div>
        </div>
    );
}

function FaqItem({ faq }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between py-4 text-right text-sm font-bold text-gray-800 hover:text-[#00BFA5] transition-colors"
            >
                <span className={`text-lg transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
                <span className="flex-1 text-right pr-2">{faq.q}</span>
            </button>
            {open && (
                <p className="pb-4 text-sm text-gray-600 text-right leading-relaxed">{faq.a}</p>
            )}
        </div>
    );
}

function Sidebar({ onGiftHunter, store = DEFAULT_STORE, sideStores = sideStoresDefault }) {
    const [email, setEmail] = useState('');
    return (
        <aside className="flex flex-col gap-5">
            {/* Newsletter */}
            <NewsletterBox />

            {/* Store Stats */}
            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                <h3 className="font-black text-sm text-gray-800 mb-3">احصائيات كوبونات {store.nameAr}</h3>
                <div className="flex flex-col gap-2">
                    {[
                        { label: 'اكواد استخدمت اليوم:', val: '20' },
                        { label: 'كل العروض:',          val: '7'  },
                        { label: 'اكواد كوبونات:',      val: '7'  },
                        { label: 'افضل خصم:',           val: '80%'},
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 text-xs">{s.label}</span>
                            <span className="font-black text-gray-800">{s.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Stores */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <a href="/stores" className="text-xs text-[#00BFA5]">كل المتاجر</a>
                    <h3 className="font-black text-sm text-gray-800">المتاجر العالمية</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {sideStores.map((s, i) => (
                        <a key={i} href={`/store/${s.slug}`} className="border border-gray-100 rounded-xl p-2 flex items-center justify-center h-14 hover:border-[#F5C518] transition-colors">
                            <SideStoreLogo s={s} />
                        </a>
                    ))}
                </div>
            </div>

            {/* App Promo */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-black text-sm text-gray-800 text-right mb-3">تسوق كالمحترفين</h3>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-2 flex-1 text-right">
                        <p className="font-black text-sm text-gray-800 leading-snug">احصل على تطبيق المسوق!</p>
                        <p className="text-xs text-gray-500 leading-relaxed">تقدم في المراحل واكسب الوحدات – استبدل وحدات المسوق بقسائم شرائية مميزة!</p>
                        <div className="flex flex-col gap-1.5 mt-1">
                            <a href="#" className="bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded-lg text-center">🍎 App Store</a>
                            <a href="#" className="bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded-lg text-center">▶ Google Play</a>
                        </div>
                    </div>
                    <div className="w-16 h-24 bg-linear-to-br from-[#00BFA5] to-[#4CAF50] rounded-xl flex items-center justify-center text-3xl shrink-0">📱</div>
                </div>
            </div>

            {/* Chrome Extension */}
            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                <h3 className="font-black text-sm text-gray-800 mb-1">وفّر بسهولة</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">لا تفوت الخصومات مرة أخرى! ميزة المسوق على كروم تعثر على الخصومات وتطبقها تلقائياً.</p>
                <a href="#" className="block bg-[#FF4444] text-white text-xs font-bold py-2 px-4 rounded-xl text-center">+ أضف إلى كروم</a>
            </div>

            {/* Gift Finder */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex-1 text-right">
                        <h3 className="font-black text-sm text-gray-800 mb-1 text-center">مرحبا بك انا نوره</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">مساعدتك الذكية لإيجاد أفضل العروض والكوبونات</p>
                        <button onClick={onGiftHunter} className="bg-[#FF4081] text-white text-xs font-black px-4 py-2 rounded-xl w-full">هيا نبدأ</button>
                    </div>
                    <div className="text-4xl shrink-0">🤖</div>
                </div>
            </div>

            {/* Latest Articles */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <a href="/blog" className="text-xs text-[#00BFA5]">المزيد من المقالات</a>
                    <h3 className="font-black text-sm text-gray-800">مقال جديد</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {sideArticles.map((a, i) => (
                        <a key={i} href="/blog/article" className="flex gap-3 items-start hover:bg-gray-50 rounded-xl p-1 -m-1 transition-colors">
                            <img src={a.img} alt={a.title} className="w-16 h-14 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 text-right">
                                <p className="text-[10px] text-[#00BFA5] font-bold mb-0.5">{a.cat}</p>
                                <p className="text-xs text-gray-700 leading-snug line-clamp-2">{a.title}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    );
}

// ==================== MAIN PAGE ====================

export default function StoreDetail() {
    const page = usePage().props;
    const store = page.store ?? DEFAULT_STORE;
    const coupons = page.coupons?.length ? page.coupons : DEFAULT_COUPONS;
    const couponTable = page.couponTable?.length ? page.couponTable : DEFAULT_COUPON_TABLE;
    const similarStores = page.similarStores?.length ? page.similarStores : DEFAULT_SIMILAR_STORES;
    const reviews = page.reviews?.length ? page.reviews : DEFAULT_REVIEWS;
    const faqs = page.faqItems?.length ? page.faqItems : DEFAULT_FAQS;
    const topStores = page.topStores?.length ? page.topStores : sideStoresDefault;
    const [showGH, setShowGH] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen" dir="rtl">

                {/* Sticky Store Logo Bar */}
                <div className="sticky top-0 z-40 shadow-md" style={{ background: store.color }}>
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
                        <StoreLogo store={store} />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 flex-wrap">
                        <a href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</a>
                        <span>\</span>
                        <a href="/stores" className="text-[#00BFA5] hover:underline">جميع المتاجر</a>
                        <span>\</span>
                        <span className="text-gray-700 font-medium">Noon egypt</span>
                    </div>

                    <div className="flex gap-6 items-start">

                        {/* ===== SIDEBAR ===== */}
                        <div className="hidden lg:block w-72 xl:w-80 shrink-0">
                            <Sidebar onGiftHunter={() => setShowGH(true)} store={store} sideStores={topStores} />
                        </div>

                        {/* ===== MAIN CONTENT ===== */}
                        <div className="flex-1 min-w-0">

                            {/* Store Header */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mb-5 text-right">
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">كود خصم {store.nameAr}</h1>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    كوبون {store.nameAr} 2026 بنسبة 10% اكواد وعروض Noon مصر حصرية
                                </p>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
                                    <span className="font-bold text-gray-700">{store.couponCount} كوبونات</span>
                                    <span>|</span>
                                    <span>آخر تحديث: {store.lastUpdate}</span>
                                    <span>|</span>
                                    <div className="flex items-center gap-1.5">
                                        <Stars rating={store.rating} />
                                        <span className="font-bold text-gray-700">{store.rating}</span>
                                        <span>({store.reviewCount.toLocaleString()} تقييمات)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Coupon Cards */}
                            <div className="flex flex-col gap-3 mb-6">
                                {coupons.map((c, i) => (
                                    <CouponCard key={i} coupon={c} onOpen={setSelectedCoupon} store={store} />
                                ))}
                            </div>

                            {/* Store Description */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right text-sm text-gray-700 leading-loose">
                                <p>
                                    <strong>كود خصم {store.nameAr}</strong> يساعدك على الاستفادة من خصم 10% إضافي على جميع المنتجات على موقع Noon مصر، بشمل المنتجات المخفضة – قُم بلصق كوبون نون (ALM1) في ملخص عربية التسوق لتطلق الخصم وتوفر المال!
                                </p>
                            </div>

                            {/* FAQ */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-2">الأسئلة الشائعة حول كود خصم, كوبونات {store.nameAr} مصر 2026</h2>
                                <div className="divide-y divide-gray-100">
                                    {faqs.map((f, i) => <FaqItem key={i} faq={f} />)}
                                </div>
                            </div>

                            {/* Coupon Codes Table */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-2xl font-black text-gray-800 mb-4">كود خصم {store.nameAr}</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b-2 border-gray-100">
                                                <th className="text-right pb-3 text-gray-500 font-bold text-xs">الخصم</th>
                                                <th className="text-center pb-3 text-gray-500 font-bold text-xs">كوبون خصم</th>
                                                <th className="text-right pb-3 text-gray-500 font-bold text-xs">التفاصيل</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {couponTable.map((row, i) => (
                                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                    <td className="py-3 text-[#00BFA5] font-bold text-xs whitespace-nowrap">{row.discount}</td>
                                                    <td className="py-3 text-center">
                                                        {row.code === 'رابط للتفعيل'
                                                            ? <a href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer" className="text-[#00BFA5] text-xs font-bold hover:underline">رابط للتفعيل</a>
                                                            : <span className="bg-yellow-100 text-yellow-800 font-black text-xs px-3 py-1 rounded-lg">{row.code}</span>
                                                        }
                                                    </td>
                                                    <td className="py-3 text-gray-700 text-xs leading-relaxed">{row.desc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Store Stats Banner */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4">احصائيات كوبونات {store.nameAr}</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { num: '854',    label: 'كوبونات الخصم والعروض على المسوق™.' },
                                        { num: '1,255',  label: 'المتاجر التي تُقدم كوبونات على المسوق™.' },
                                        { num: '9,312',  label: 'عدد المسوقين الشهري عبر موقع المسوق™.' },
                                        { num: '15.32%', label: 'قيمة الخصومات المتوسطة للمستخدمين.' },
                                    ].map((s, i) => (
                                        <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                                            <div className="text-2xl font-black text-[#00BFA5] mb-1">{s.num}</div>
                                            <div className="text-[10px] text-gray-500 leading-snug">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Short Links */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-lg font-black text-gray-800 mb-3">روابط مختصرة</h2>
                                <div className="flex flex-col gap-2">
                                    {shortLinks.map((l, i) => (
                                        <a key={i} href="#" className="text-[#00BFA5] text-sm hover:underline leading-relaxed">
                                            {l}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Article: How to use */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">كيف استخدم كود خصم {store.nameAr} مصر 2026؟</h2>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    للاستمتاع بخصم 10% إضافي على جميع المنتجات من موقع Noon مصر، انسخ كود خصم نون القادمة من شروتك (ALM1) في ملخص الدفع، على أن نشتري بقيمة 100 جنيه مصري على الأقل.
                                </p>
                                {/* Step image placeholder */}
                                <div className="rounded-xl overflow-hidden border border-gray-200 mb-4">
                                    <div className="bg-gradient-to-l from-[#F5C518] to-yellow-300 p-4 flex items-center justify-center gap-3">
                                        <div className="text-4xl">🌙</div>
                                        <div className="text-2xl font-black text-gray-800">noon</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 text-sm text-gray-600 text-right leading-relaxed">
                                        <p>أضف المنتجات إلى عربة التسوق ← اذهب إلى ملخص الطلب ← أدخل الكوبون (ALM1) في خانة الكود ← اضغط تطبيق ← استمتع بخصم 10% 🎉</p>
                                    </div>
                                </div>
                            </div>

                            {/* Coupon Types */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4">أنواع اكواد خصم {store.nameAr} مصر 2026</h2>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                    لا تُقم بالتسوق من موقع Noon مصر قبل اكتشاف اكواد خصم نون والتخفيضات الحصرية عبر المسوق في الزمن الحقيقي، والتي تجد من بينها:
                                </p>
                                <div className="flex flex-col gap-4">
                                    {noonTypes.map((t, i) => (
                                        <div key={i}>
                                            <h3 className="font-black text-gray-800 text-base mb-1">{t.title}</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* About Noon */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">نبذة عن {store.nameAr} مصر</h2>
                                <div className="text-sm text-gray-600 leading-loose flex flex-col gap-3">
                                    <p>نون هي منصة شاملة للتسوق الإلكتروني، تأسست في المملكة العربية السعودية عام 2016، متاحة لجميع المتسوقين عبر الإنترنت في السعودية والإمارات ومصر.</p>
                                    <p>وعليه، فإن نون مصر هو الموقع الإلكتروني للتجزئة المتاح لجميع عملاء Noon في جمهورية مصر العربية.</p>
                                    <p>تلتزم نون مصر في متجرها الإلكتروني في مصر بتقديم أفضل المنتجات من شتى الفئات للأهم الماركات المحلية والعالمية، بأسعار تنافسية تليق بأي ميزانية.</p>
                                    <p>بالإضافة إلى ذلك، فإنها توفر خدمات الشحن المجاني والتوصيل السريع على جميع المنتجات والطلبيات المؤهلة، الإرجاع المجاني، خدمة الضمان المؤهلة، خيارات دفع متنوعة تشمل الدفع عند الاستلام والتقسيط وغيرها الكثير.</p>
                                    <p>لا تفوت اكواد خصم نون وعروض نون مصر الحصرية التي تمكّنك من توفير المال في كل مرة تتسوق فيها من موقع Noon مصر.</p>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4">7 نصائح للحصول على خصم {store.nameAr} وتوفير المال عند التسوق من موقع Noon</h2>
                                <p className="text-sm text-gray-500 mb-4">إليك بعض النصائح والإرشادات حول اكواد خصم نون وغيرها من العروض والممارسات التي تضمن لك توفير المال عند التسوق من متجر نون مصر:</p>
                                <ol className="flex flex-col gap-3">
                                    {[
                                        `استخدم كود خصم نون مصر عبر المسوق. احرص على استخدام كود نون (ALM1) في ملخص كل شروة لتخصم 10% من القيمة الإجمالية وتوفّر المال!`,
                                        `لا تفوت اكواد خصم نون عبر المسوق. المسوق يقدم لك أحدث كوبونات خصم نون 2026 في الزمن الحقيقي، فعالة 100% على جميع المنتجات والماركات.`,
                                        `تحقق من عروض نون اليوم في جميع الأحداث الكبرى. بالإضافة إلى عروض نون اليومية وصفقات الفلاش، فاحرص على ألا تفوت خصومات نون في أحداث التسوق الخاصة والأعياد.`,
                                        `أنفق 200 جنيه على الأقل للحصول على شحن مجاني.`,
                                        `استخدم خدمات الدفع الآجل والتقسيط الميسر. عند الشراء بقيمة 500 جنيه على الأقل، يمكنك استخدام خيار الدفع بالتقسيط.`,
                                        `قارن أسعار المنتجات على الدوام من بائعين مختلفين لتخطف السعر الأمثل.`,
                                        `تحقق من تقييم البائع والمراجعات المنشورين لتتخذ قرار الشراء الأمثل.`,
                                    ].map((tip, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                                            <span className="font-black text-[#F5C518] shrink-0 mt-0.5">{i + 1}.</span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Features */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4">مميزات متجر {store.nameAr} مصر</h2>
                                <ul className="flex flex-col gap-3">
                                    {noonFeatures.map((f, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                                            <span className="text-[#00BFA5] shrink-0 mt-0.5">•</span>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Shipping */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">سياسة الشحن والتوصيل</h2>
                                <div className="text-sm text-gray-600 leading-loose flex flex-col gap-2">
                                    <p>يوفّر متجر نون مصر خدمة الشحن والتوصيل المجاني إلى جميع المناطق في جمهورية مصر العربية، عند الشراء بقيمة 200 جنيه أو أكثر. وإلا فأفرض رسوم شحن تجدها في ملخص الطلبية.</p>
                                    <p>كما يقدم موقع نون مصر خدمة الشحن والتوصيل بنفس اليوم (استلمها اليوم) عند الطلب قبل الساعة 13:00، على جميع منتجات نون إكسبريس.</p>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">خيارات الدفع المتاحة</h2>
                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">بعد تطبيق كود خصم نون في ملخص طلبك ستتوقف عليك تحديد إحدى وسائل الدفع التالية لإتمام عملية الشراء والسداد:</p>
                                <ul className="flex flex-col gap-2 text-sm text-gray-600">
                                    {['البطاقات الائتمانية.', 'الدفع نقداً عند الاستلام.', 'خدمة Valu.', 'الأقساط الشهرية الميسرة لعملاء البنوك الشريكة.'].map((p, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-[#00BFA5] shrink-0">•</span>
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Returns */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">سياسة الإرجاع والاستبدال</h2>
                                <div className="text-sm text-gray-600 leading-loose flex flex-col gap-2">
                                    <p>يتيح لك متجر نون مصر إرجاع المنتج لاستعادة ثمنه أو استبداله خلال 15 يوماً من موعد تسلّمه، بشرط ألا يكون من المنتجات غير القابلة للإرجاع في حالته الأصلية، غير مستخدم، في تغليفه وعبوته الأصليين، مع كافة ملحقاته وعبواته ومرفقاته.</p>
                                    <p>يمكنك تقديم طلب إرجاع عبر حسابك الشخصي على موقع نون مصر أو من خلال التواصل مع خدمة العملاء.</p>
                                </div>
                            </div>

                            {/* Customer Service */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">طرق التواصل مع خدمة عملاء {store.nameAr} مصر</h2>
                                <ul className="flex flex-col gap-2 text-sm text-gray-600">
                                    <li className="flex gap-2"><span className="text-[#00BFA5]">•</span><span>رقم الهاتف: 16358</span></li>
                                    <li className="flex gap-2"><span className="text-[#00BFA5]">•</span><span>ساعات العمل: يومياً: 10:00-22:00</span></li>
                                    <li className="flex gap-2"><span className="text-[#00BFA5]">•</span><span>البريد الإلكتروني: egypt@noon.com</span></li>
                                    <li className="flex gap-2"><span className="text-[#00BFA5]">•</span><a href="#" className="text-[#00BFA5] hover:underline">فيسبوك نون</a></li>
                                    <li className="flex gap-2"><span className="text-[#00BFA5]">•</span><a href="#" className="text-[#00BFA5] hover:underline">تويتر نون</a></li>
                                    <li className="flex gap-2"><span className="text-[#00BFA5]">•</span><a href="#" className="text-[#00BFA5] hover:underline">انستغرام نون</a></li>
                                </ul>
                            </div>

                            {/* Reviews */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4">تقييمات حقيقية من مستخدمي تطبيق المسوق للكوبونات</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {reviews.map((r, i) => (
                                        <div key={i} className="border border-gray-100 rounded-2xl p-4 text-right">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex flex-col items-end flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">
                                                            {[1,2,3,4,5].map(s => (
                                                                <span key={s} className={`text-xs ${s <= r.stars ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-gray-400">{r.date}</span>
                                                    </div>
                                                    <span className="font-black text-sm text-gray-800">{r.name}</span>
                                                </div>
                                                <div
                                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0"
                                                    style={{ background: r.bg }}
                                                >
                                                    {r.initials}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 leading-relaxed">"{r.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Similar Stores */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4">متاجر مشابهة لـ {store.nameAr}</h2>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                    {similarStores.map((s, i) => (
                                        <a key={i} href={`/store/${s.slug}`} className="flex flex-col items-center gap-2 border border-gray-100 rounded-xl p-3 hover:border-[#F5C518] transition-colors">
                                            <SideStoreLogo2 domain={s.domain} name={s.name} color="#F5C518" />
                                            <span className="text-[10px] text-gray-500 text-center leading-tight">{s.name}</span>
                                            <span className="text-[10px] font-bold text-[#00BFA5]">{s.discount}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Service Sidebar section for mobile */}
                            <div className="lg:hidden">
                                <Sidebar onGiftHunter={() => setShowGH(true)} store={store} sideStores={topStores} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <GiftHunter open={showGH} onClose={() => setShowGH(false)} />
            <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} store={store} />
        </MainLayout>
    );
}
