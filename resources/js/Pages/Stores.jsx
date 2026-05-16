import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';

// ==================== DATA ====================

// color = brand color for text fallback
const allStores = [
    { name: 'noon',              domain: 'noon.com',             coupons: 7, color: '#F6A623', category: 'تسوق',         desc: 'أقوى عروض نون الحصرية: خصم حتى 80% + كود خصم 10%...'             },
    { name: 'Amazon',            domain: 'amazon.com',           coupons: 7, color: '#FF9900', category: 'تسوق',         desc: 'خصومات أمازون حتى 40% على المقاضي والمستلزمات اليومية'           },
    { name: 'almatar',           domain: 'almatar.com',          coupons: 2, color: '#E91E8C', category: 'رحلات',        desc: 'كود خصم المطار: خصم 5% على حجوزات الطيران + 5% كاش باك'          },
    { name: 'DeFacto',           domain: 'defacto.com.tr',       coupons: 5, color: '#1A1A1A', category: 'أزياء',        desc: 'كود خصم ديفاكتو بنسبة 10% إضافي على كل المتجر'                   },
    { name: 'Waffarha',          domain: 'waffarha.com',         coupons: 5, color: '#FF6B35', category: 'تسوق',         desc: 'أكواد خصم وفرها بنسبة حتى 65% + 10% كاش باك'                     },
    { name: 'AliExpress',        domain: 'aliexpress.com',       coupons: 1, color: '#FF4747', category: 'تسوق',         desc: 'كود خصم علي اكسبرس يصل إلى 70% على أفضل المنتجات'                },
    { name: 'Max',               domain: 'max-fashion.com',      coupons: 3, color: '#002A5C', category: 'أزياء',        desc: 'كود خصم ماكس بقيمة 10% إضافي على أفضل المنتجات غير...'          },
    { name: 'iHerb',             domain: 'iherb.com',            coupons: 3, color: '#5B8C3E', category: 'صحة',          desc: 'كود خصم اي هيرب: خصم حتى 65% + 20% إضافي'                       },
    { name: 'FARFETCH',          domain: 'farfetch.com',         coupons: 2, color: '#1A1A1A', category: 'أزياء',        desc: 'خصم فارفيتش حتى 70% على ستايلات مختارة'                          },
    { name: 'Trip.com',          domain: 'trip.com',             coupons: 5, color: '#1A73E8', category: 'رحلات',        desc: 'كود خصم تريب حتى 15% على الجولات والأنشطة'                       },
    { name: 'ChildrenSalon',     domain: 'childrensalon.com',    coupons: 3, color: '#8B4513', category: 'أزياء',        desc: 'تخفيضات الصيف: خصم حتى 60%'                                      },
    { name: 'Airalo',            domain: 'airalo.com',           coupons: 2, color: '#6C5CE7', category: 'خدمات',        desc: 'كود خصم Airalo بقيمة 10% إضافي على بطاقات eSIM'                  },
    { name: 'Decathlon',         domain: 'decathlon.com',        coupons: 3, color: '#0082C3', category: 'سبورت',        desc: 'كود خصم ديكاتلون بقيمة 10% إضافي على كل الموقع'                  },
    { name: 'Eurowings',         domain: 'eurowings.com',        coupons: 1, color: '#840098', category: 'رحلات',        desc: 'خصم حتى 20% على أفضل الوجهات لمستخدمي...'                        },
    { name: 'Adidas',            domain: 'adidas.com',           coupons: 2, color: '#1A1A1A', category: 'سبورت',        desc: 'خصم أديداس حتى 50% على أفضل المنتجات'                            },
    { name: 'Ubuy',              domain: 'ubuy.com',             coupons: 9, color: '#FF6B00', category: 'تسوق',         desc: 'خصم يوباي بقيمة 85% على أفضل المنتجات + 5% إضافي'                },
    { name: 'IHG Hotels',        domain: 'ihg.com',              coupons: 2, color: '#003580', category: 'رحلات',        desc: 'كود خصم IHG بنسبة 25% على حجوزات الفنادق والمنتجعات'             },
    { name: 'SQUATWOLF',         domain: 'squatwolf.com',        coupons: 1, color: '#1A1A1A', category: 'سبورت',        desc: 'كود خصم سكواتوولف بقيمة 15% على كل الموقع'                       },
    { name: 'H&M',               domain: 'hm.com',               coupons: 1, color: '#E50010', category: 'أزياء',        desc: 'عروض H&M: خصم حتى 75% على ستايلات مختارة'                        },
    { name: 'Alibaba',           domain: 'alibaba.com',          coupons: 6, color: '#FF6A00', category: 'تسوق',         desc: 'خصم علي بابا بنسبة 10% على أفضل المنتجات مميزة'                  },
    { name: 'RayaShop',          domain: 'rayashop.com',         coupons: 6, color: '#0066CC', category: 'إلكترونيات',   desc: 'كود خصم رايه شوب بقيمة 10% إضافي على كل المتجر'                  },
    { name: 'Foot Locker',       domain: 'footlocker.com',       coupons: 6, color: '#CC0000', category: 'سبورت',        desc: 'كود خصم فوت لوكر بقيمة 5% على المنتجات غير المخفضة'              },
    { name: 'Dr. Nutrition',     domain: 'drnutrition.co.uk',    coupons: 7, color: '#1B5E20', category: 'صحة',          desc: 'كود خصم دكتور نيوتريشن بقيمة 10% إضافي على كل...'                },
    { name: 'DHgate',            domain: 'dhgate.com',           coupons: 4, color: '#E31837', category: 'تسوق',         desc: 'كود خصم DHgate بقيمة 70% على أفضل المنتجات'                      },
    { name: 'HUAWEI',            domain: 'huawei.com',           coupons: 6, color: '#CF0A2C', category: 'إلكترونيات',   desc: 'كود خصم هواوي مصر بقيمة 5% على جميع المنتجات'                   },
    { name: 'New Balance',       domain: 'newbalance.com',       coupons: 3, color: '#CC0000', category: 'سبورت',        desc: 'كود خصم نيو بالانس بقيمة 10% إضافي على جميع...'                  },
    { name: 'Shahid',            domain: 'shahid.net',           coupons: 1, color: '#00BFA5', category: 'خدمات',        desc: 'وفر حتى 50% على باقات شاهد VIP'                                  },
    { name: 'EGO',               domain: 'ego-shoes.co.uk',      coupons: 1, color: '#1A1A1A', category: 'أزياء',        desc: 'كود خصم ايجو بقيمة 5% على جميع المشاوير'                         },
    { name: 'goibibo',           domain: 'goibibo.com',          coupons: 1, color: '#E91E8C', category: 'رحلات',        desc: 'عروض Goibibo: خصم حتى 20% على الفنادق المختارة'                  },
    { name: 'The Luxury Closet', domain: 'theluxurycloset.com',  coupons: 2, color: '#1A1A1A', category: 'أزياء',        desc: 'خصم ذا لكشري كلوزيت حتى 80% على أفضل التشكيلات...'               },
    { name: 'Virgin Megastore',  domain: 'virginmegastore.me',   coupons: 5, color: '#E31837', category: 'إلكترونيات',   desc: 'كود خصم فيرجن نستينه حتى 50% على أفضل المنتجات'                  },
    { name: 'Skyscanner',        domain: 'skyscanner.com',       coupons: 3, color: '#0770E3', category: 'رحلات',        desc: 'حجز طيران Skyscanner في أفضل الوجهات بأرخص الأسعار'              },
    { name: 'AVG',               domain: 'avg.com',              coupons: 1, color: '#1676F3', category: 'خدمات',        desc: 'عروض اي في جي: وفر حتى 20%'                                      },
    { name: 'VOGACLOSET',        domain: 'vogacloset.com',       coupons: 1, color: '#C2185B', category: 'أزياء',        desc: 'خصم فوجا كلوزيت حتى 80% على أفضل التشكيلات...'                   },
    { name: 'edureka',           domain: 'edureka.co',           coupons: 1, color: '#F9A825', category: 'خدمات',        desc: 'اشتري 1 واحصل على 2 مجاناً + 20% كاش باك'                        },
    { name: 'Cloudways',         domain: 'cloudways.com',        coupons: 1, color: '#2C3E50', category: 'خدمات',        desc: 'عروض كلاود ويز: خصم 95$ على الباقة الشهرية'                      },
    { name: 'Tickets to Do',     domain: 'ticketstodo.com',      coupons: 1, color: '#00BFA5', category: 'رحلات',        desc: 'كود خصم TicketsToDo بنسبة 5% إضافي على جميع التذاكر'             },
    { name: 'Trust.Zone',        domain: 'trust.zone',           coupons: 1, color: '#2ECC71', category: 'خدمات',        desc: 'عروض تراست زون: وفر 70% مع باقة سنوية'                           },
    { name: 'Bait Al Kandora',   domain: 'baitalkandora.com',    coupons: 1, color: '#6D4C41', category: 'أزياء رجالية', desc: 'كوبون خصم 10% من بيت الكندورة'                                   },
    { name: 'flynas',            domain: 'flynas.com',           coupons: 7, color: '#00BFA5', category: 'رحلات',        desc: 'عروض برنامج الولاء سمايل 2026: خصم حتى 50% وتقاط...'            },
    { name: 'GetRentacar',       domain: 'getrentacar.com',      coupons: 1, color: '#1565C0', category: 'رحلات',        desc: 'كود خصم GetRentacar بنسبة 10% على تذاكر مختارة'                  },
    { name: 'TicketNetwork',     domain: 'ticketnetwork.com',    coupons: 1, color: '#1565C0', category: 'رحلات',        desc: 'خصم TicketNetwork: خصم 10% على تذاكر مختارة'                     },
    { name: 'Samsung',           domain: 'samsung.com',          coupons: 2, color: '#1428A0', category: 'إلكترونيات',   desc: 'خصم سامسونج مصر 10% ومزايا إضافية على منتجات...'                 },
    { name: 'B.TECH',            domain: 'btech.com',            coupons: 1, color: '#E31837', category: 'إلكترونيات',   desc: 'برومو كود بي تك بنسبة 10% عند الشراء من موقع نون'                },
    { name: 'The Outnet',        domain: 'theoutnet.com',        coupons: 4, color: '#1A1A1A', category: 'أزياء',        desc: 'كود خصم ذا اوت نت بنسبة 70% على الأزياء'                         },
    { name: 'ANI YÜZÜK',         domain: 'aniyuzuk.com',         coupons: 1, color: '#7B1FA2', category: 'اكسسوارات',    desc: 'خصم يصل إلى 50% على عطور النساء'                                 },
    { name: 'CesDeals',          domain: 'cesdeals.com',         coupons: 1, color: '#E53935', category: 'تسوق',         desc: 'عروض فلاش: احصل على خصم لتشكيلة الخصم'                          },
    { name: 'CigaBuy',           domain: 'cigabuy.com',          coupons: 1, color: '#FF6B00', category: 'تسوق',         desc: 'احصل على خصم حتى 70% على كل الموقع'                              },
    { name: 'Depositphotos',     domain: 'depositphotos.com',    coupons: 1, color: '#2979FF', category: 'خدمات',        desc: 'خصم حتى 20% على صور وفيديوهات احترافية'                          },
    { name: 'Drimsim',           domain: 'drimsim.com',          coupons: 1, color: '#00ACC1', category: 'خدمات',        desc: 'انترنت سريع ومكالمات في جميع أنحاء العالم'                       },
    { name: 'Booking',           domain: 'booking.com',          coupons: 3, color: '#003580', category: 'رحلات',        desc: 'كود خصم بوكينج حتى 20% على حجوزات الفنادق'                      },
    { name: 'Namshi',            domain: 'namshi.com',           coupons: 4, color: '#E91E8C', category: 'أزياء',        desc: 'كود خصم نمشي 15% على أحدث صيحات الموضة + شحن مجاني'             },
];

const storeCategories = ['كل الفئات', 'أزياء', 'أزياء رجالية', 'خدمات', 'إلكترونيات', 'الجمال والعناية', 'عروض اليوم', 'رحلات', 'اكسسوارات', 'احذية', 'تسوق', 'سبورت', 'منزل', 'صحة', 'غذاء'];

const reviews = [
    { name: 'فواز العلوي',   date: '13-03-2026', avatar: 'ف', color: '#00BFA5', text: '"ممتاز ويعطيك كوبونات مجاناً"' },
    { name: 'مجدي فرج',     date: '29-03-2026', avatar: 'م', color: '#3F51B5', text: '"ممتاز جداً جداً كانت تجربة رائعة"' },
    { name: 'اسامة بن طالب', date: '07-03-2026', avatar: 'أ', color: '#607D8B', text: '"تجربتي كانت ممتازة جداً"' },
    { name: 'Abrheem Jal',  date: '10-03-2026', avatar: 'A', color: '#795548', text: '"تطبيق ممتاز ويروع عليك كثير"' },
];

const stats = [
    { icon: '🏷️', value: '854',    label: 'كوبونات الخصم والعروض المتاحة على موقع الموفر™' },
    { icon: '🛒', value: '1,255',  label: 'المتاجر التي تقدم كوبونات وعروض على موقع الموفر™' },
    { icon: '👥', value: '9,312',  label: 'عدد الموفرين الشهري عبر موقع الموفر™' },
    { icon: '💰', value: '15.32%', label: 'قيمة الخصومات المتوسطة التي يحصل عليها المستخدمون' },
];

// ==================== STORE CARD ====================

function storeSlug(store) {
    return store.domain
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

export default function Stores() {
    const [activeCategory, setActiveCategory] = useState('كل الفئات');
    const [showCount, setShowCount] = useState(25);
    const [showGH, setShowGH] = useState(false);

    const filteredStores = activeCategory === 'كل الفئات'
        ? allStores
        : allStores.filter(s => s.category === activeCategory);

    const visibleStores = filteredStores.slice(0, showCount);
    const hasMore = showCount < filteredStores.length;

    return (
        <MainLayout>
            <Head title="جميع المتاجر - الموفر" />
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
                                    <p className="text-sm font-bold text-gray-700 mt-1">احصل على تطبيق الموفر!</p>
                                    <p className="text-xs text-gray-500 mt-1">تقدم في المراحل واكسب الوحدات - استبدل وحدات الموفر بقسائم شرائية مميزة!</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href="#" className="flex-1 bg-black text-white text-xs font-bold py-2 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800">🍎 App Store</a>
                                <a href="#" className="flex-1 bg-black text-white text-xs font-bold py-2 px-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800">▶ Google Play</a>
                            </div>
                        </div>

                        {/* AI Gift Finder */}
                        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm text-right">
                            <div className="text-3xl mb-2">🎁🤖</div>
                            <h3 className="font-extrabold text-gray-800">اكتشف اروع الهدايا مع صياد الهدايا</h3>
                            <p className="text-xs text-gray-500 mt-2 mb-3">اكتشف قوة الذكاء الاصطناعي مع هذا البوت الذي تم تصميمه خصيصاً لإيجاد الهدية المثالية!</p>
                            <button onClick={() => setShowGH(true)} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl text-sm transition-colors">
                                جربه الآن
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
                        تقييمات حقيقية من مستخدمي تطبيق الموفر للكوبونات
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
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">وفر المال من خلال موقع الموفر™</h2>
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
