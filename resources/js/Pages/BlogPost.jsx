import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';
import { getArticleBySlug, getRelatedArticles } from '../data/blogData';

const uImg = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fit=crop&auto=format`;

// ==================== STATIC DATA ====================

const sideStores = [
    { name: 'Almatar',    domain: 'almatar.com',    color: '#E53935', slug: 'almatar'     },
    { name: 'Amazon',     domain: 'amazon.sa',       color: '#FF9900', slug: 'amazon'      },
    { name: 'Noon',       domain: 'noon.com',        color: '#FEEE00', slug: 'noon-egypt'  },
    { name: 'AliExpress', domain: 'aliexpress.com',  color: '#FF4747', slug: 'aliexpress'  },
    { name: 'Waffarha',   domain: 'waffarha.com',    color: '#FF6B35', slug: 'waffarha'    },
    { name: 'DeFacto',    domain: 'defacto.com',     color: '#1A1A2E', slug: 'defacto'     },
    { name: 'Farfetch',   domain: 'farfetch.com',    color: '#111111', slug: 'farfetch'    },
    { name: 'iHerb',      domain: 'iherb.com',       color: '#3D8B37', slug: 'iherb'       },
    { name: 'Max',        domain: 'maxfashion.com',  color: '#D32F2F', slug: 'max-fashion' },
];

const sideArticles = [
    { slug: 'top-tourist-destinations-world', cat: 'TRAVEL – سياحة وسفر',     title: 'اكثر الدول سياحة في العالم 5 دول عليك زيارتها',              img: '1476514525535-07fb3b4ae5f1' },
    { slug: 'hijab-fashion-models',           cat: 'FASHION – الأزياء',        title: 'بجامة تيرمال رجالي شيك وأشهر أماكن البيع بسعر خيالي',        img: '1558618666-fcd25c85cd64'   },
    { slug: 'pharmacy-online-coupons',        cat: 'HEALTH – صحة ولياقة',      title: 'تخفيضات باث أند بودي 2025 – خصم حتى 80% على بعض المنتجات',  img: '1512436991641-6745cae21c5b' },
    { slug: 'iphone-samsung-deals',           cat: 'TECH – الإلكترونيات',      title: 'أفضل سماعات لاسلكية 2025 بأفضل الأسعار',                     img: '1505740420928-5e560c06d30e' },
];

const reviews = [
    { name: 'فواز العلوي',   initials: 'ف', bg: '#00BFA5', date: '13-03-2026', stars: 5, text: '"ممتاز ويعطي كوبونات مجاناً!"' },
    { name: 'مجدي فرح',      avatar: uImg('1507003211169-0a1dd7228f2d', 120), date: '29-03-2026', stars: 5, text: '"ممتاز جداً كان تجربة رائعة للغاية، المنى من الجميع حمل التطبيق والاستمتاع بالخصم الجبار"' },
    { name: 'اسامه بن طالب', initials: 'I', bg: '#00BFA5', date: '07-03-2026', stars: 5, text: '"تجربتي كانت ممتازة جداً"' },
    { name: 'Abrheem Jal',    initials: 'A', bg: '#78909C', date: '10-03-2026', stars: 5, text: '"تطبيق ممتاز وانصح باستخدامه عند طلب اي شي"' },
];

// ==================== COMPONENTS ====================

function ReviewCard({ review }) {
    return (
        <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2 text-right">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{review.date}</span>
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {Array.from({ length: review.stars }).map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                    </div>
                    <span className="font-bold text-sm text-gray-800">{review.name}</span>
                    {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0" style={{ background: review.bg }}>
                            {review.initials}
                        </div>
                    )}
                </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
        </div>
    );
}

function CouponCard({ coupon }) {
    const [copied, setCopied] = useState(false);
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${coupon.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${coupon.domain}&size=256`,
    ];
    const failed = idx >= sources.length;
    const copy = () => { navigator.clipboard?.writeText(coupon.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-stretch">
            <div className="flex-1 p-4 text-right">
                <div className="mb-2">
                    {failed ? (
                        <span className="font-black text-sm" style={{ color: coupon.color }}>{coupon.store}</span>
                    ) : (
                        <img key={idx} src={sources[idx]} alt={coupon.store} className="h-8 w-20 object-contain" onError={() => setIdx(i => i + 1)} />
                    )}
                </div>
                <div className="text-lg font-black text-[#00BFA5] mb-1">{coupon.discount}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{coupon.desc}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 px-4 border-l border-dashed border-gray-200 shrink-0">
                <div className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 tracking-widest">
                    {coupon.code}
                </div>
                <button
                    onClick={copy}
                    className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
                        copied ? 'bg-green-500 text-white' : 'bg-[#00BFA5] text-white hover:bg-[#009e87]'
                    }`}
                >
                    {copied ? '✓ تم النسخ' : 'انسخ الكود'}
                </button>
            </div>
        </div>
    );
}

function SideStoreLogo({ store }) {
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${store.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${store.domain}&size=256`,
    ];
    const failed = idx >= sources.length;
    return failed ? (
        <span className="text-[10px] font-black" style={{ color: store.color }}>{store.name}</span>
    ) : (
        <img key={idx} src={sources[idx]} alt={store.name} className="w-8 h-8 object-contain" onError={() => setIdx(i => i + 1)} />
    );
}

function Sidebar({ onGiftHunter }) {
    return (
        <aside className="flex flex-col gap-5">
            <NewsletterBox />

            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <Link href="/stores" className="text-xs text-[#00BFA5]">كل المتاجر</Link>
                    <h3 className="font-black text-sm text-gray-800">أفضل المتاجر</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {sideStores.map((s, i) => (
                        <a key={i} href={`/store/${s.slug}`} className="border border-gray-100 rounded-xl p-2 flex items-center justify-center h-14 hover:border-[#00BFA5] transition-colors">
                            <SideStoreLogo store={s} />
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-black text-sm text-gray-800 text-right mb-3">تسوق كالمحترفين</h3>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-2 flex-1 text-right">
                        <p className="font-black text-sm text-gray-800 leading-snug">احصل على تطبيق الموفر!</p>
                        <p className="text-xs text-gray-500 leading-relaxed">تقدم في المراحل واكسب الوحدات واستبدلها بقسائم شرائية مميزة!</p>
                        <div className="flex flex-col gap-1.5 mt-1">
                            <a href="#" className="bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded-lg text-center">🍎 App Store</a>
                            <a href="#" className="bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded-lg text-center">▶ Google Play</a>
                        </div>
                    </div>
                    <div className="w-16 h-24 bg-linear-to-br from-[#00BFA5] to-[#4CAF50] rounded-xl flex items-center justify-center text-3xl shrink-0">📱</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex-1 text-right">
                        <h3 className="font-black text-sm text-gray-800 mb-1">اكتشف اروع الهدايا مع صياد الهدايا</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">اكتشف قوة الذكاء الاصطناعي مع هذا البوت الذي تم تصميمه خصيصاً لإيجاد الهدية المثالية!</p>
                        <button onClick={onGiftHunter} className="bg-[#FF4081] text-white text-xs font-black px-4 py-2 rounded-xl w-full">جربه الآن</button>
                    </div>
                    <div className="text-4xl shrink-0">🤖</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <Link href="/blog" className="text-xs text-[#00BFA5]">المزيد من المقالات</Link>
                    <h3 className="font-black text-sm text-gray-800">مقال جديد</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {sideArticles.map((a, i) => (
                        <Link key={i} href={`/blog/${a.slug}`} className="flex gap-3 items-start hover:bg-gray-50 rounded-xl p-1 -m-1 transition-colors">
                            <img src={uImg(a.img, 120)} alt={a.title} className="w-16 h-14 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 text-right">
                                <p className="text-[10px] text-[#00BFA5] font-bold mb-0.5">{a.cat}</p>
                                <p className="text-xs text-gray-700 leading-snug line-clamp-2">{a.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

// ==================== ARTICLE CONTENT RENDERER ====================

function ArticleContent({ article }) {
    return (
        <>
            {/* Meta + Title */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                <div className="flex items-center gap-3 justify-end flex-wrap mb-4">
                    <span className="text-xs font-black px-3 py-1 rounded-full text-white" style={{ background: article.tagColor || '#00BFA5' }}>
                        {article.tagEn} – {article.tag}
                    </span>
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">👁 {article.views} مشاهدة</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 leading-snug mb-4">
                    {article.title}
                </h1>
                <p className="text-sm text-gray-500">
                    بقلم <span className="font-bold text-[#00BFA5]">{article.author}</span>
                </p>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
                <img src={article.img} alt={article.title} className="w-full aspect-video object-cover" />
            </div>

            {/* Intro */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                <p className="text-base text-gray-700 leading-relaxed">{article.intro}</p>
            </div>

            {/* Sections */}
            {article.sections?.map((section, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                    <h2 className="text-xl font-black text-gray-800 mb-4">{section.heading}</h2>
                    {section.content && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{section.content}</p>
                    )}
                    {section.list && (
                        <ul className="flex flex-col gap-3 text-sm text-gray-600">
                            {section.list.map((item, j) => (
                                <li key={j} className="flex items-start gap-3">
                                    <span className="text-[#00BFA5] font-black shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {section.grid && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.grid.map((item, j) => (
                                <div key={j} className="border border-gray-100 rounded-xl p-4 hover:border-[#00BFA5] transition-colors">
                                    <div className="text-3xl mb-2">{item.icon}</div>
                                    <h3 className="font-black text-gray-800 mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Coupons */}
            {article.coupons?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                    <h2 className="text-xl font-black text-gray-800 mb-2">أقوى أكواد الخصم الآن</h2>
                    <p className="text-sm text-gray-500 mb-5">انسخ الكود واستخدمه مباشرة عند الشراء</p>
                    <div className="flex flex-col gap-3">
                        {article.coupons.map((c, i) => (
                            <CouponCard key={i} coupon={c} />
                        ))}
                    </div>
                </div>
            )}

            {/* Why Almowafir */}
            <div className="rounded-2xl p-6 sm:p-8 text-right" style={{ background: 'linear-gradient(135deg, #E8F8F5 0%, #E8F5E9 100%)' }}>
                <h2 className="text-xl font-black text-gray-800 mb-3">لماذا الموفر أفضل مكان لإيجاد الكوبونات؟</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    يعمل فريق الموفر على مدار الساعة للتحقق من صحة جميع أكواد الخصم وتحديثها يومياً، لضمان حصولك دائماً على كوبونات فعالة وصالحة الاستخدام. كما نتفاوض مباشرة مع أشهر المتاجر لنوفر لك خصومات حصرية لا تجدها في أي مكان آخر.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { icon: '✅', text: 'كوبونات موثقة' },
                        { icon: '🔄', text: 'تحديث يومي'    },
                        { icon: '🎯', text: 'خصومات حصرية'  },
                        { icon: '💸', text: 'مجاني 100%'    },
                    ].map((f, i) => (
                        <div key={i} className="bg-white/70 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">{f.icon}</div>
                            <p className="text-xs font-black text-gray-700">{f.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// ==================== NOT FOUND ====================

function ArticleNotFound() {
    return (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-black text-gray-800 mb-3">المقال غير موجود</h2>
            <p className="text-gray-500 mb-6">عذراً، لم نتمكن من إيجاد هذا المقال.</p>
            <Link href="/blog" className="bg-[#00BFA5] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#009e87] transition-colors">
                العودة للمدونة
            </Link>
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function BlogPost() {
    const [showGH, setShowGH] = useState(false);
    const { slug } = usePage().props;

    const article = getArticleBySlug(slug);
    const relatedArticles = article ? getRelatedArticles(article.relatedSlugs || []) : [];

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 justify-end flex-wrap">
                        <span className="text-gray-700 font-medium truncate max-w-50">{article?.title ?? 'مقال'}</span>
                        <span>\</span>
                        <Link href="/blog" className="text-[#00BFA5] hover:underline">المدونة</Link>
                        <span>\</span>
                        <Link href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

                        {/* ===== ARTICLE ===== */}
                        <article className="flex flex-col gap-5">
                            {article ? <ArticleContent article={article} /> : <ArticleNotFound />}

                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                    <h2 className="text-xl font-black text-gray-800 mb-5">مقالات ذات صلة</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {relatedArticles.map((a, i) => (
                                            <Link key={i} href={`/blog/${a.slug}`} className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-[#00BFA5] transition-colors">
                                                <img src={a.img} alt={a.title} className="w-full aspect-video object-cover" />
                                                <div className="p-3">
                                                    <span className="text-[10px] font-black" style={{ color: a.tagColor || '#00BFA5' }}>{a.tagEn} – {a.tag}</span>
                                                    <p className="text-xs font-bold text-gray-800 mt-1 leading-snug group-hover:text-[#00BFA5] transition-colors line-clamp-2">{a.title}</p>
                                                    <p className="text-[10px] text-gray-400 mt-2">{a.date}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* User Reviews */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-5">تقييمات حقيقية من مستخدمي تطبيق الموفر للكوبونات</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {reviews.map((r, i) => (
                                        <ReviewCard key={i} review={r} />
                                    ))}
                                </div>
                            </div>

                            {/* Customer Service */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-2">خدمة عملاء الموفر</h2>
                                <p className="text-sm text-gray-500 mb-5">إذا وجدت كود لا يعمل، لديك كود تود إضافته، أو ترغب في مشاركة ملاحظاتك، لا تتردد في التواصل معنا!</p>
                                <div className="flex flex-wrap gap-3 justify-end">
                                    {[
                                        { icon: '✉️', label: 'البريد الإلكتروني', href: 'mailto:support@almowafir.com' },
                                        { icon: '📸', label: 'إنستغرام',           href: '#' },
                                        { icon: '💬', label: 'واتساب',             href: '#' },
                                        { icon: '✈️', label: 'تيليغرام',           href: '#' },
                                    ].map((ch, i) => (
                                        <a key={i} href={ch.href} className="flex items-center gap-2 bg-gray-50 hover:bg-[#E8F8F5] border border-gray-100 hover:border-[#00BFA5] rounded-xl px-4 py-2.5 transition-all">
                                            <span className="text-sm font-bold text-gray-700">{ch.label}</span>
                                            <span className="text-lg">{ch.icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* ===== SIDEBAR ===== */}
                        <Sidebar onGiftHunter={() => setShowGH(true)} />
                    </div>
                </div>
            </div>

            <GiftHunter open={showGH} onClose={() => setShowGH(false)} />
        </MainLayout>
    );
}
