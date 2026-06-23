import { Head, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';

// ==================== DATA ====================

const stores = [
    { name: 'Almatar',    color: '#E91E8C', slug: 'almatar',    domain: 'almatar.com'    },
    { name: 'Amazon',     color: '#FF9900', slug: 'amazon',     domain: 'amazon.com'     },
    { name: 'noon',       color: '#D4A800', slug: 'noon-egypt', domain: 'noon.com'       },
    { name: 'AliExpress', color: '#FF4747', slug: 'aliexpress', domain: 'aliexpress.com' },
    { name: 'Waffarha',   color: '#FF6B35', slug: 'waffarha',   domain: 'waffarha.com'   },
    { name: 'DeFacto',    color: '#222',    slug: 'defacto',    domain: 'defacto.com'    },
    { name: 'FARFETCH',   color: '#111',    slug: 'farfetch',   domain: 'farfetch.com'   },
    { name: 'iHerb',      color: '#5B8C3E', slug: 'iherb',      domain: 'iherb.com'      },
    { name: 'Max',        color: '#002A5C', slug: 'max-fashion', domain: 'maxfashion.com' },
];

const categories = [
    { name: 'جميع الفئات',         icon: '🔲', slug: 'all'          },
    { name: 'فنادق',              icon: '🏨', slug: 'hotels'       },
    { name: 'عطور',               icon: '🧴', slug: 'perfumes'     },
    { name: 'العاب الفيديو',      icon: '🎮', slug: 'gaming'       },
    { name: 'أزياء',              icon: '👗', slug: 'fashion'      },
    { name: 'إلكترونيات',         icon: '📱', slug: 'electronics'  },
    { name: 'الجمال والعناية',    icon: '💄', slug: 'beauty'       },
    { name: 'الطفل',              icon: '🍼', slug: 'kids'         },
    { name: 'رحلات',              icon: '✈️', slug: 'travel'       },
    { name: 'مستلزمات السيارات', icon: '🚗', slug: 'automotive'   },
    { name: 'خدمات',              icon: '🌐', slug: 'services'     },
];

const topCoupons = [
    { store: 'Amazon',   domain: 'amazon.com',   discount: 'خصم حتى 40%',                           desc: 'خصومات أمازون حتى 40% على المقاضي والمستلزمات اليومية',         btn: 'احصل',       badge: 'جديد',    logo: '🛒', slug: 'amazon',      code: 'AMZN40'  },
    { store: 'noon',     domain: 'noon.com',      discount: 'أقوى العروض: خصم حتى 80% + 10% إضافي', desc: 'أقوى عروض نون الحصرية: خصم حتى 80% + كود خصم 10%...',           btn: 'انسخ الكود', badge: 'جديد',    logo: '🛍️', slug: 'noon-egypt',  code: 'ALM1'    },
    { store: 'iHerb',   domain: 'iherb.com',     discount: 'خصم حتى 65% + 20% إضافي',               desc: 'كود خصم اي هيرب: خصم حتى 65% + 20% إضافي',                     btn: 'انسخ الكود', badge: 'جديد',    logo: '🌿', slug: 'iherb',       code: 'ALM20'   },
    { store: 'FARFETCH', domain: 'farfetch.com',  discount: 'أفضل الستايلات: خصم حتى 70%',           desc: 'خصم فارفيتش حتى 70% على ستايلات مختارة',                        btn: 'احصل',       badge: 'جديد',    logo: '👔', slug: 'farfetch',    code: null      },
    { store: 'Noon',     domain: 'noon.com',      discount: 'خصم 10% إضافي',                         desc: 'كود خصم نون الحصري 10% إضافي على كل الموقع',                    btn: 'انسخ الكود', badge: 'جديد',    logo: '🌙', slug: 'noon-egypt',  code: 'ALM1'    },
];

const bestCoupons = [
    { store: 'airalo',        domain: 'airalo.com',        discount: 'خصم 10% على جميع بطاقات eSIM',              desc: 'كود خصم Airalo بقيمة 10% إضافي على جميع بطاقات eSIM',             btn: 'انسخ الكود', badge: 'جديد',    logo: '📡', slug: 'airalo',        code: 'AIRALO10'  },
    { store: 'Almatar',       domain: 'almatar.com',       discount: 'حجوزات الطيران: خصم 5% + 5% كاش باك',      desc: 'كود خصم المطار: خصم 5% على حجوزات الطيران + 5% كاش باك',          btn: 'انسخ الكود', badge: 'لا يفوت', logo: '✈️', slug: 'almatar',       code: 'ALM5'      },
    { store: 'Trip.com',      domain: 'trip.com',          discount: 'الجولات والأنشطة: خصم حتى 15%',            desc: 'كود خصم تريب حتى 15% على الجولات والأنشطة',                       btn: 'احصل',       badge: 'جديد',    logo: '🗺️', slug: 'trip',          code: null        },
    { store: 'ChildrenSalon', domain: 'childrensalon.com', discount: 'خصم حتى 60%',                              desc: 'تخفيضات الصيف: خصم حتى 60%',                                      btn: 'احصل',       badge: 'جديد',    logo: '👶', slug: 'childrensalon', code: null        },
    { store: 'SQUATWOLF',     domain: 'squatwolf.com',     discount: 'خصم 15%',                                  desc: 'كود خصم سكواتوولف بقيمة 15% على كل الموقع',                       btn: 'احصل',       badge: 'جديد',    logo: '💪', slug: 'squatwolf',     code: 'WOLF15'    },
];

const bestForYou = [
    { store: 'SQUATWOLF',  domain: 'squatwolf.com', discount: 'خصم 15%',                            desc: 'كود خصم سكواتوولف بقيمة 15% على كل الموقع',             btn: 'احصل',       badge: 'جديد',    logo: '💪', slug: 'squatwolf',   code: 'WOLF15'  },
    { store: 'IHG Hotels', domain: 'ihg.com',        discount: 'خصم حتى 25%',                        desc: 'كود خصم IHG بنسبة 25% على حجوزات الفنادق والمنتجعات',   btn: 'احصل',       badge: 'جديد',    logo: '🏨', slug: 'ihg',         code: null      },
    { store: 'Max',        domain: 'maxfashion.com', discount: 'خصم 10% على المنتجات غير المخفضة',   desc: 'كود خصم ماكس بقيمة 10% إضافي على أفضل المنتجات...',     btn: 'احصل',       badge: 'جديد',    logo: '🛒', slug: 'max-fashion', code: 'MAX10'   },
    { store: 'Ubuy',       domain: 'ubuy.com',       discount: 'خصم حتى 85% + 5% إضافي',             desc: 'خصم يوباي بقيمة 85% على أفضل المنتجات + 5% إضافي',     btn: 'احصل',       badge: 'جديد',    logo: '🌍', slug: 'ubuy',        code: null      },
    { store: 'Booking',    domain: 'booking.com',    discount: 'خصم حتى 20% على الفنادق',             desc: 'كود خصم بوكينج حتى 20% على حجوزات الفنادق حول العالم', btn: 'انسخ الكود', badge: 'جديد',    logo: '🏩', slug: 'booking',     code: 'BK20'    },
    { store: 'Namshi',     domain: 'namshi.com',     discount: 'خصم 15% + شحن مجاني',                desc: 'كود خصم نمشي 15% على أحدث صيحات الموضة + شحن مجاني',   btn: 'انسخ الكود', badge: 'لا يفوت', logo: '👠', slug: 'namshi',      code: 'NMS15'   },
    { store: 'H&M',        domain: 'hm.com',         discount: 'خصم 10% على كل المتجر',              desc: 'كود خصم H&M بقيمة 10% على كافة المنتجات',              btn: 'احصل',       badge: 'جديد',    logo: '🧥', slug: 'hm',          code: 'HM10'    },
];

const electronics = [
    { store: 'Virgin Megastore', domain: 'virginmegastore.com', discount: 'خصم حتى 50%',                     desc: 'كود خصم فيرجن نستينه حتى 50% على أفضل المنتجات',  btn: 'احصل',       badge: 'جديد',    logo: '🎵', slug: 'virgin',    code: null      },
    { store: 'DHgate',           domain: 'dhgate.com',          discount: 'خصم حتى 70%',                     desc: 'كود خصم DHgate حتى 70% على أفضل المنتجات',         btn: 'احصل',       badge: 'جديد',    logo: '🏪', slug: 'dhgate',    code: null      },
    { store: 'HUAWEI',           domain: 'huawei.com',          discount: 'خصم 5% إضافي على جميع المنتجات', desc: 'كود خصم هواوي بقيمة 5% إضافي على جميع المنتجات',  btn: 'انسخ الكود', badge: 'جديد',    logo: '📱', slug: 'huawei',    code: 'HW5'     },
    { store: 'RayaShop',         domain: 'rayashop.com',        discount: 'خصم 10% إضافي على كل المتجر',    desc: 'كود خصم رايه شوب بقيمة 10% إضافي على كل المتجر',  btn: 'انسخ الكود', badge: 'يوصى به', logo: '🖥️', slug: 'rayashop' },
    { store: 'Samsung',          domain: 'samsung.com',         discount: 'خصم 8% على الهواتف والأجهزة',    desc: 'كود خصم سامسونج 8% على أحدث الهواتف والأجهزة',    btn: 'انسخ الكود', badge: 'جديد',    logo: '📲', slug: 'samsung',   code: 'SAM8'    },
    { store: 'Noon Electronics', domain: 'noon.com',            discount: 'خصم حتى 40% + 10% إضافي',        desc: 'كود خصم نون إلكترونيات حتى 40% + 10% كود إضافي',   btn: 'احصل',       badge: 'جديد',    logo: '💻', slug: 'noon-egypt', code: 'ALM1'    },
    { store: 'Jarir',            domain: 'jarir.com',           discount: 'خصم 5% على كل المشتريات',         desc: 'كود خصم جرير بقيمة 5% على جميع المنتجات الإلكترونية', btn: 'احصل',    badge: 'جديد',    logo: '📚', slug: 'jarir',      code: 'JRR5'    },
];

const reviews = [
    { name: 'فواز العلوي',   date: '13-03-2026', avatar: 'ف', color: '#00BFA5', text: '"ممتاز ويعطيك كوبونات مجاناً"' },
    { name: 'مجدي فرج',     date: '29-03-2026', avatar: 'م', color: '#3F51B5', text: '"ممتاز جداً جداً كانت تجربة رائعة للغاية، أنصح بتحميل التطبيق والاستمتاع بالخصم الجبار"' },
    { name: 'اسامة بن طالب', date: '07-03-2026', avatar: 'أ', color: '#607D8B', text: '"تجربتي كانت ممتازة جداً"' },
    { name: 'Abrheem Jal',  date: '10-03-2026', avatar: 'A', color: '#795548', text: '"تطبيق ممتاز ويروع عليك كثير، أنصح باستخدامه عند طلب أي شيء"' },
];

const stats = [
    { icon: '🏷️', value: '858',    label: 'كوبونات الخصم والعروض المتاحة على موقع المسوق™' },
    { icon: '🛒', value: '1,255',  label: 'المتاجر التي تقدم كوبونات وعروض على موقع المسوق™' },
    { icon: '👥', value: '10,782', label: 'عدد المسوقين الشهري عبر موقع المسوق™' },
    { icon: '💰', value: '15.37%', label: 'قيمة الخصومات المتوسطة التي يحصل عليها المستخدمون' },
];

const faqItems = [
    { q: 'ما هو أفضل موقع خصومات؟',                                              a: 'المسوق هو أفضل موقع كوبونات خصم للمتاجر الإلكترونية والماركات ومنصات التسوق في العالم العربي وحول العالم الذي يضمن لك توفير المزيد من المال عند التسوق أونلاين.' },
    { q: 'هل المسوق هو موقع كوبونات موثوق؟',                                      a: 'نعم، جميع أكواد الخصم والكوبونات التي نقدمها لك مضمونة 100%. عليك التأكد من مراجعة شروط وأحكام كل كود خصم عبر عرض تفاصيل بطاقة الكوبون.' },
    { q: 'ما هي كوبونات الخصم وكيف يمكنني استخدامها؟',                            a: 'كوبونات الخصم تُعرف أيضاً بـ رموز الخصم أو أكواد الخصم وهي الكي نقدمها لك كي توفر المال عند التسوق من متاجر ومواقع التسوق عبر الإنترنت.' },
    { q: 'هل يمكنني استخدام كود الخصم أكثر من مرة؟',                              a: 'ذلك يتوقف على شروط وأحكام الكوبون، فهناك بعض الكوبونات التي يمكن استخدامها أكثر من مرة، في حين أن بعضها يصلح للاستخدام مرة واحدة فقط.' },
    { q: 'هل جميع المتاجر الإلكترونية تتيح لي استخدام كوبونات خصم المسوق؟',      a: 'موقع المسوق يمنحك أكثر من 800 كود خصم لأشهر المتاجر الإلكترونية في عالمنا العربي وحول العالم.' },
    { q: 'كيف احصل على خصم إضافي عند التسوق عبر الإنترنت؟',                       a: 'استخدم كوبونات خصم المسوق وأضف كوبون المسوق عند الدفع في ملخص سلة الشراء لتحقيق الخصم الإضافي.' },
];

// ==================== SUB COMPONENTS ====================


function StoreLogo({ domain, fallback, imgClass = 'h-12 max-w-[140px] object-contain' }) {
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`,
    ];
    if (idx >= sources.length) return typeof fallback === 'string' ? <span className="text-4xl">{fallback}</span> : <>{fallback}</>;
    return <img key={idx} src={sources[idx]} alt={domain} className={imgClass} onError={() => setIdx(p => p + 1)} />;
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

                {/* Close */}
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>

                {/* Badges */}
                <div className="flex justify-end gap-2 pt-1">
                    <span className="text-xs font-bold text-[#FF4081] flex items-center gap-1">🔥 جديد</span>
                    <span className="text-xs font-bold text-orange-500 flex items-center gap-1">🔥 لا تفوت</span>
                </div>

                {/* Store logo */}
                <div className="flex justify-center">
                    <StoreLogo domain={coupon.domain} fallback={coupon.logo} />
                </div>

                {/* Title */}
                <p className="font-black text-gray-900 text-base text-center leading-snug">
                    {coupon.discount}
                </p>

                {/* Code box */}
                {coupon.code ? (
                    <button
                        onClick={copy}
                        className="flex items-center border-2 border-dashed border-gray-300 rounded-2xl px-4 py-3 gap-3 hover:border-[#00BFA5] transition-colors w-full"
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
                        <span className="text-sm text-gray-500 font-bold">لا يوجد كود — انقر للحصول على العرض</span>
                    </div>
                )}

                {/* CTA button */}
                <button
                    onClick={copy}
                    className="w-full bg-[#00BFA5] hover:bg-[#00A896] active:scale-95 text-white font-black py-3.5 rounded-2xl text-base transition-all"
                >
                    {copied ? '✓ تم النسخ — تسوق الآن!' : 'انسخ الكود وتسوق'}
                </button>
            </div>
        </div>
    );
}

function CouponCard({ coupon, onOpen }) {
    const handleClick = () => {
        if (coupon.btn === 'انسخ الكود') {
            onOpen(coupon);
        } else {
            window.open(`https://${coupon.domain}`, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl border-2 border-dashed border-gray-200 p-3 sm:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <a href={`/store/${coupon.slug}`} className="text-gray-400 text-xs border border-gray-200 rounded-lg px-2 py-0.5 hover:bg-gray-50 hover:text-[#00BFA5] transition-colors shrink-0">التفاصيل</a>
                <span className="text-xs font-bold text-[#00BFA5] bg-[#E8F8F5] px-2 py-0.5 rounded-full flex items-center gap-1 truncate">
                    🤖 {coupon.badge}
                </span>
            </div>
            <div className="text-3xl text-center my-1">{coupon.logo}</div>
            <div className="text-center font-extrabold text-sm text-gray-800 leading-snug">{coupon.store}</div>
            <div className="text-center font-bold text-sm text-gray-900 leading-snug">{coupon.discount}</div>
            <div className="text-center text-xs text-gray-500 leading-relaxed line-clamp-2">{coupon.desc}</div>
            <button
                onClick={handleClick}
                className="mt-auto w-full bg-[#00BFA5] hover:bg-[#00A896] active:scale-95 text-white font-bold py-2 rounded-xl text-sm transition-all"
            >
                {coupon.btn === 'انسخ الكود' ? 'انسخ الكود' : 'معاينة'}
            </button>
        </div>
    );
}

function CouponsSection({ title, coupons, onOpen }) {
    const containerRef = useRef(null);
    const [index,      setIndex]    = useState(0);
    const [cardWidth,  setCardWidth] = useState(191);
    const [visible,    setVisible]  = useState(4);

    const GAP = 12;

    useEffect(() => {
        const measure = () => {
            const el = containerRef.current;
            if (!el) return;
            const w = el.offsetWidth;
            const v = w < 480 ? 1 : w < 650 ? 2 : w < 860 ? 3 : 4;
            setVisible(v);
            setCardWidth(Math.floor((w - GAP * (v - 1)) / v));
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => { setIndex(0); }, [visible]);

    const step     = cardWidth + GAP;
    const maxIndex = Math.max(0, coupons.length - visible);
    const pages    = Math.ceil(coupons.length / visible);
    const activePage = Math.min(Math.floor(index / visible), pages - 1);

    const prev      = () => setIndex(i => Math.max(0, i - 1));
    const next      = () => setIndex(i => Math.min(maxIndex, i + 1));
    const goToPage  = (p) => setIndex(Math.min(p * visible, maxIndex));

    const offset = index * step;

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 text-center">{title}</h2>
            </div>

            <div className="relative" ref={containerRef}>
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20
                               w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100
                               flex items-center justify-center text-xl text-gray-500
                               hover:text-[#00BFA5] hover:shadow-xl transition-all
                               disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="السابق"
                >‹</button>

                <div className="overflow-hidden">
                    <div
                        className="flex pb-3 transition-transform duration-500 ease-in-out"
                        style={{ gap: `${GAP}px`, transform: `translateX(${offset}px)` }}
                    >
                        {coupons.map((c, i) => (
                            <div key={i} className="shrink-0" style={{ width: cardWidth }}>
                                <CouponCard coupon={c} onOpen={onOpen} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={next}
                    disabled={index >= maxIndex}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20
                               w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100
                               flex items-center justify-center text-xl text-gray-500
                               hover:text-[#00BFA5] hover:shadow-xl transition-all
                               disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="التالي"
                >›</button>
            </div>

            {pages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: pages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activePage === i
                                    ? 'w-6 bg-[#00BFA5]'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`صفحة ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function Home() {
    const [openFaq, setOpenFaq] = useState(null);
    const [showGH, setShowGH] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    return (
        <MainLayout>
            <Head title="المسوق: افضل موقع كوبونات خصم وخصومات 2026" />
            <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

                {/* Hero: Store Grid + Banner */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">

                    {/* Store Grid */}
                    <div className="sm:w-56 lg:w-64 shrink-0 bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <Link href="/stores" className="text-xs text-gray-500 hover:text-[#00BFA5] underline">الجميع</Link>
                            <h3 className="font-extrabold text-gray-800 text-sm sm:text-base">المتاجر العالمية</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {stores.map((store, i) => (
                                <a key={i} href={`/store/${store.slug}`} className="border border-gray-100 rounded-xl p-2 flex items-center justify-center hover:border-[#00BFA5] hover:shadow-sm transition-all bg-white aspect-square overflow-hidden">
                                    <StoreLogo domain={store.domain} fallback={<span className="text-[10px] font-extrabold text-center leading-tight" style={{ color: store.color }}>{store.name}</span>} imgClass="h-8 max-w-[72px] object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Hero Banner */}
                    <div className="flex-1 rounded-2xl overflow-hidden bg-linear-to-l from-yellow-400 to-yellow-300 flex items-center justify-between p-4 sm:p-6 lg:p-8 shadow-sm relative min-h-45 sm:min-h-55 lg:min-h-70">
                        <div className="z-10">
                            <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-red-600 leading-none">خصم</div>
                            <div className="text-5xl sm:text-7xl lg:text-8xl font-black text-red-600 leading-none">10%</div>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-600">إضافي</div>
                        </div>
                        <div className="flex flex-col items-center z-10">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">🌙 noon</span>
                            <button
                                onClick={() => setSelectedCoupon({ store: 'Noon', domain: 'noon.com', discount: 'خصم 10% إضافي', desc: 'كود خصم نون الحصري 10% إضافي على كل الموقع', logo: '🌙', slug: 'noon-egypt' })}
                                className="mt-3 sm:mt-4 bg-[#00BFA5] text-white font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg hover:bg-[#00A896] transition-colors"
                            >
                                احصل على الكود
                            </button>
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-56 lg:w-64 h-40 sm:h-56 lg:h-64 rounded-full border-8 border-yellow-200 opacity-30 pointer-events-none"></div>
                    </div>
                </div>

                {/* Slider Dots */}
                <div className="flex justify-center gap-2 mb-4 sm:mb-6">
                    <div className="w-8 h-2 rounded-full bg-[#00BFA5]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 shadow-sm">
                    <div className="justify-center flex gap-3 sm:gap-5 overflow-x-auto no-scrollbar">
                        {categories.map((cat, i) => (
                            <a key={i} href={`/category/${cat.slug}`} className="flex flex-col items-center gap-1.5 min-w-14.5 sm:min-w-17 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 group-hover:bg-[#E8F8F5] flex items-center justify-center text-xl sm:text-2xl transition-colors border-2 border-transparent group-hover:border-[#00BFA5]">
                                    {cat.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs text-center text-gray-600 group-hover:text-[#00BFA5] transition-colors whitespace-nowrap">{cat.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Page Title */}
                <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 text-center mb-6 sm:mb-8 px-2">
                    المسوق: افضل موقع كوبونات خصم وخصومات 2026
                </h1>

                {/* ===== 2-COLUMN LAYOUT ===== */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

                    {/* SIDEBAR */}
                    <aside className="w-full lg:w-72 lg:shrink-0 order-2 lg:order-1">

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

                        {/* Email Subscribe */}
                        <NewsletterBox />

                        {/* Latest Articles */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <a href="/blog" className="text-xs text-[#00BFA5] hover:underline">المزيد من المقالات</a>
                                <h3 className="font-extrabold text-gray-800">مقال جديد</h3>
                            </div>
                            {[
                                { cat: 'BEAUTY – الجمال والعناية', title: 'تخفيضات سيفورا القادمة في 2025 – خصومات حتى 80%', img: '🛍️' },
                                { cat: 'TRAVEL – سياحة وسفر',      title: 'أفضل الدول سياحةً في العالم لهذا العام',             img: '✈️' },
                            ].map((article, i) => (
                                <a key={i} href="/blog/article" className="flex items-center gap-3 mb-3 hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">{article.img}</div>
                                    <div className="text-right flex-1 min-w-0">
                                        <div className="text-xs text-[#00BFA5] font-medium">{article.cat}</div>
                                        <div className="text-xs text-gray-700 font-medium mt-1 leading-snug line-clamp-2">{article.title}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN COUPONS */}
                    <div className="flex-1 min-w-0 order-1 lg:order-2">
                        <CouponsSection title="اقوى اكواد ابريل"        coupons={topCoupons}  onOpen={setSelectedCoupon} />
                        <CouponsSection title="افضل العروض والكوبونات" coupons={bestCoupons} onOpen={setSelectedCoupon} />
                        <CouponsSection title="العروض الأمثل لك"        coupons={bestForYou}  onOpen={setSelectedCoupon} />
                        <CouponsSection title="اجهزة الكترونية"         coupons={electronics} onOpen={setSelectedCoupon} />

                    </div>
                </div>

                {/* ===== SEO CONTENT ===== */}
                <section className="mt-8 bg-white rounded-2xl p-4 sm:p-8 shadow-sm text-right space-y-5">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">كوبونات خصم وعروض المسوق 2026</h2>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">افضل موقع يعطيك كود خصم في العالم العربي</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">أهلاً وسهلاً بك في المسوق Almowafir، وهو عبارة عن أفضل موقع يعطيك كود خصم لتوفير المزيد من المال عند التسوق عبر الإنترنت مستفيداً من أقوى كوبونات وأكواد الخصم الحصرية.</p>
                    </div>
                    {[
                        { title: 'ما هو موقع المسوق؟',                        text: 'موقع Almowafir هو أفضل موقع كوبونات خصم في العالم العربي، يساعدك على توفير المال المحقق عند التسوق عبر الإنترنت، حيث تجد فيه أي كود خصم أو كوبون خاص بالمتاجر الإلكترونية في دول الخليج والشرق الأوسط وحول العالم.' },
                        { title: 'أهم موقع كوبون خصم',                        text: 'احصل على أقوى كوبون خصم لتحقق تخفيضات إضافية على كل عملية تسوق عبر الإنترنت، حيث يمكنك استخدام كود خصم المسوق في ملخص السلة لتطبيق الخصم الإضافي المقدم.' },
                        { title: 'موقع كوبونات مجاني 100%',                   text: 'المسوق هو موقع كوبونات مجاني 100%، يقدم لك جميع الخدمات دون مقابل، ليضمن لك توفير المال المحقق في كل مرة تقوم فيها بالشراء عبر الإنترنت.' },
                        { title: 'اكستنشن المسوق – مكتشف اكواد الخصم',       text: 'مكتشف اكواد الخصم من Almowafir هو اكستنشن كروم يقوم بالعثور لأجلك على كوبون الخصم الخاص بالمتجر الذي تقوم بالتسوق منه، ثم تطبيقه تلقائياً في ملخص سلة الشراء، بحيث لا تفوتك أي فرصة لتوفير المال عند التسوق أونلاين.' },
                    ].map((s, i) => (
                        <div key={i}>
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                        </div>
                    ))}
                </section>

            </main>
            <GiftHunter open={showGH} onClose={() => setShowGH(false)} />
            <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
        </MainLayout>
    );
}
