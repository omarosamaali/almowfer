import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import NewsletterBox from '../Components/NewsletterBox';
import GiftHunter from '../Components/GiftHunter';
import { getAuthorBySlug, getArticlesByAuthor, blogAuthors } from '../data/blogData';

// ==================== STATIC SIDEBAR DATA ====================

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

// ==================== COMPONENTS ====================

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

function ArticleCard({ article }) {
    return (
        <Link href={`/blog/${article.slug}`} className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
                <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <div className="p-4 text-right">
                <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                    style={{ background: article.tagColor || '#00BFA5' }}
                >
                    {article.tagEn} – {article.tag}
                </span>
                <h3 className="text-sm font-bold text-gray-800 mt-2 leading-snug group-hover:text-[#00BFA5] transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2">{article.date}</p>
            </div>
        </Link>
    );
}

function Sidebar({ onGiftHunter }) {
    return (
        <aside className="flex flex-col gap-5">
            <NewsletterBox />

            {/* Best Stores */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <Link href="/stores" className="text-xs text-[#00BFA5]">كل المتاجر</Link>
                    <h3 className="font-black text-sm text-gray-800">المتاجر العالمية</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {sideStores.map((s, i) => (
                        <a key={i} href={`/store/${s.slug}`} className="border border-gray-100 rounded-xl p-2 flex items-center justify-center h-14 hover:border-[#00BFA5] transition-colors">
                            <SideStoreLogo store={s} />
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
                        <p className="text-xs text-gray-500 leading-relaxed">تقدم في المراحل واكسب الوحدات واستبدلها بقسائم شرائية مميزة!</p>
                        <div className="flex flex-col gap-1.5 mt-1">
                            <a href="#" className="bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded-lg text-center">🍎 App Store</a>
                            <a href="#" className="bg-black text-white text-[10px] font-bold py-1.5 px-3 rounded-lg text-center">▶ Google Play</a>
                        </div>
                    </div>
                    <div className="w-16 h-24 bg-linear-to-br from-[#00BFA5] to-[#4CAF50] rounded-xl flex items-center justify-center text-3xl shrink-0">📱</div>
                </div>
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

            {/* Other Authors */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <Link href="/blog" className="text-xs text-[#00BFA5]">المدونة</Link>
                    <h3 className="font-black text-sm text-gray-800">تعرف على المؤلفين</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {blogAuthors.map((a, i) => (
                        <Link key={i} href={`/blog-author/${a.slug}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors group">
                            <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                            <div className="flex-1 text-right">
                                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00BFA5] transition-colors">{a.name}</p>
                                <p className="text-xs text-gray-400">{a.role}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

// ==================== NOT FOUND ====================

function AuthorNotFound() {
    return (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-black text-gray-800 mb-3">المؤلف غير موجود</h2>
            <p className="text-gray-500 mb-6">عذراً، لم نتمكن من إيجاد هذا المؤلف.</p>
            <Link href="/blog" className="bg-[#00BFA5] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#009e87] transition-colors">
                العودة للمدونة
            </Link>
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function BlogAuthor() {
    const [showGH, setShowGH] = useState(false);
    const { slug } = usePage().props;

    const author = getAuthorBySlug(slug);
    const articles = author ? getArticlesByAuthor(author) : [];

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 justify-end flex-wrap">
                        <span className="text-gray-700 font-medium">الكاتب: {author?.name ?? 'مؤلف'}</span>
                        <span>\</span>
                        <Link href="/blog" className="text-[#00BFA5] hover:underline">تعرف على المؤلفين</Link>
                        <span>\</span>
                        <Link href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

                        {/* ===== MAIN CONTENT ===== */}
                        <div className="flex flex-col gap-6">

                            {author ? (
                                <>
                                    {/* Author Card */}
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                                        <div className="flex items-start gap-5 flex-row-reverse text-right">
                                            {/* Avatar */}
                                            <div className="shrink-0">
                                                <img
                                                    src={author.avatar}
                                                    alt={author.name}
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-[#E8F8F5] shadow-md"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 justify-end mb-1">
                                                    {/* Social Icons */}
                                                    <div className="flex items-center gap-2">
                                                        {author.social.facebook && (
                                                            <a href={author.social.facebook} className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity text-sm font-bold">f</a>
                                                        )}
                                                        {author.social.twitter && (
                                                            <a href={author.social.twitter} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity text-xs font-bold">𝕏</a>
                                                        )}
                                                        {author.social.instagram && (
                                                            <a href={author.social.instagram} className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity text-white text-sm" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>📸</a>
                                                        )}
                                                    </div>
                                                    <h1 className="text-2xl sm:text-3xl font-black text-gray-800">{author.name}</h1>
                                                </div>
                                                <p className="text-sm text-[#00BFA5] font-bold mb-3">{author.role}</p>
                                                <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Articles */}
                                    <div>
                                        <h2 className="text-xl font-black text-gray-800 text-right mb-4">
                                            Latest Blog Posts
                                        </h2>
                                        {articles.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {articles.map((article, i) => (
                                                    <ArticleCard key={i} article={article} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                                                <span className="text-4xl block mb-3">📝</span>
                                                <p className="font-bold">لا توجد مقالات بعد لهذا المؤلف</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <AuthorNotFound />
                            )}
                        </div>

                        {/* ===== SIDEBAR ===== */}
                        <Sidebar onGiftHunter={() => setShowGH(true)} />
                    </div>
                </div>
            </div>

            <GiftHunter open={showGH} onClose={() => setShowGH(false)} />
        </MainLayout>
    );
}
