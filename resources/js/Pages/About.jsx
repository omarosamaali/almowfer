import { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';

const uImg = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fit=crop&auto=format`;

// ==================== DATA ====================

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

const features = [
    {
        title: 'أفضل العلامات التجارية الدولية والمحلية',
        desc: 'نحن نعمل مع المتاجر العالمية الدولية لتحصل دائماً على خصم من العلامات التجارية التي ترغب بها!',
        img: '1553062407-98eeb64c6a62',
    },
    {
        title: 'أفضل الخصومات المميزة',
        desc: 'يتميز فريقنا المحلي بتكامله العميق مع المجتمع التجاري في دول مجلس التعاون الخليجي، مما يتيح لنا التفاوض عن أفضل الخصومات المميزة لك في المتاجر التي تحب التسوق بها.',
        img: '1607082374535-a6642aef7c7e',
    },
    {
        title: 'اختر من بين أكثر من 1000 متجر',
        desc: 'مع أكثر من 1000 متجر للاختيار من بينها، ستجد دائماً الكوبون المناسب للمنتج الذي تحتاجه!',
        img: '1481437156560-3205f6a55735',
    },
    {
        title: 'كوبونات خصم موثوقة',
        desc: 'يعمل فريقنا المختص على ضمان الجودة على مدار الساعة على اختيار وتحديث الكوبونات، حيث لا تضيع وقتك ويتمكن العميل دائماً من الحصول على الخصم المطلوب.',
        img: '1589998059171-988d887df646',
    },
    {
        title: 'انضموا إلى مسابقاتنا!',
        desc: 'شارك في مسابقات المؤثرين لدينا – شارك خصومات مميزة مع متابعيك واربح جائزة سخية!',
        img: '1567427017947-545c5f8d16ad',
    },
    {
        title: 'استخدم المسوق من أي مكان',
        desc: 'يسهل استخدام المسوق وتوفره في أي مكان تريد! استخدم موقعنا، وتطبيق الكوبونات، والملحق الإضافي للمتصفح، وتطبيق صياد الهدايا الذي يعمل بتقنية الذكاء الاصطناعي.',
        img: '1512941937669-90a1b58e7e9c',
    },
    {
        title: 'نحن نفهمكم احتياجاتكم للتسوق',
        desc: 'يتألف فريق المسوق من متسوقين بارعين مثلك – لذلك نحن نحب إيجاد أفضل الصفقات ومساعدتك على توفير المال أيضاً 😊',
        img: '1497366216548-37526070297c',
    },
];

const howPoints = [
    'نحن نبني علاقات وثيقة مع أفضل العلامات التجارية الدولية ودول مجلس التعاون الخليجي مثل نون، نمشي، أمازون وعلي اكسبريس حتى تحصل على أكثر الخصومات الحصرية.',
    'نقوم باختيار الكوبونات باستخدام فريق من البشر الحقيقيين ونتحقق من صحتها باستخدام تقنية المسوق الحصرية حتى تكون رموزك دائماً نشطة.',
    'نحدث الرموز يومياً مع كافة البيانات ذات الصلة حتى تحصل دائماً على كامل الصورة لاتخاذ قرار الشراء.',
    'نراقب الأسواق باستمرار مع فريق من المحترفين المدربين في التوفير لحظة إصدار الخصم.',
    'نتفاوض باستمرار مع شركاتنا التجاريين للتفاوض عن أكثر الخصومات المميزة لك – مجتمع المسوق.',
    'نعطي الأولوية لأفضل الكوبونات على صفحتنا حتى تتمكن من العثور على الكود الذي يمنحك أفضل التوفير.',
    'نحدث جميع الرموز بشروط الاستخدام والشروط الواضحة لتواريخ الصلاحية وشروط الاستبدال.',
];

const stats = [
    { icon: '🏷️', num: '854',    desc: 'كوبونات الخصم وعروض التخفيضات المتاحة على موقع المسوق™.' },
    { icon: '🛍️', num: '1,255',  desc: 'المتاجر التي تُقدم كوبونات وعروض على موقع المسوق™.' },
    { icon: '👥', num: '9,312',  desc: 'عدد المسوقين الشهري عبر موقع المسوق™.' },
    { icon: '💯', num: '15.32%', desc: 'قيمة الخصومات المتوسطة التي يحصل عليها مستخدمو موقع المسوق™.' },
];

const testimonials = [
    { name: 'عبد الله',    text: 'الآن أكثر من أي وقت مضى، كل شيء مذهل... مثالي وبسيط لاستكشاف رموز الترويجية لمختلف المتاجر.' },
    { name: 'محمد الحاج', text: 'أحد الأفضل! خدمات رائعة وأفضل تطبيق...' },
    { name: 'نادية',       text: 'تطبيق مفيد جداً للعثور على عروض حصرية. شكراً لكم!' },
];

const sideArticles = [
    { cat: 'BEAUTY – الجمال والعناية', title: 'تخفيضات سيفورا القادمة في 2025 – خصومات حتى 80%',          img: '1522335789203-aabd1fc54bc9' },
    { cat: 'TRAVEL – سياحة وسفر',     title: 'اكثر الدول سياحة في العالم 5 دول عليك زيارتها',            img: '1476514525535-07fb3b4ae5f1' },
    { cat: 'FASHION – الزياء',         title: 'بجامة تيرمال رجالي شيك وأشهر أماكن البيع بسعر خيالي',     img: '1558618666-fcd25c85cd64' },
    { cat: 'BEAUTY – الجمال والعناية', title: 'تخفيضات باث أند بودي 2025 – خصم حتى 80% على بعض المنتجات', img: '1512436991641-6745cae21c5b' },
];

const socialChannels = [
    { handle: 'Facebook@المسوق',   desc: 'التفاعل والدردشة مع أعضاء القناة والتعرف على أفضل خصومات المتاجر للسعودية، الامارات وجميع دول الخليج.' },
    { handle: 'Youtube@المسوق',    desc: 'توفر لكم القناة العديد من النصائح وعروض الخصم الحصرية للمنتجات والمزيد لمساعدتك على اتخاذ قرارات الشراء الاوفر.' },
    { handle: 'Twitter@المسوق',    desc: 'تقدم لك التويتر الخاصة بالمسوق أفضل عروض الخصم والكوبونات الحصرية وعروض المنتجات الخاصة من متاجرك المفضلة!' },
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

function Sidebar({ onGiftHunter }) {
    const [email, setEmail] = useState('');
    return (
        <aside className="flex flex-col gap-5">

            {/* Newsletter */}
            <NewsletterBox />

            {/* Best Stores */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <a href="/stores" className="text-xs text-[#00BFA5]">كل المتاجر</a>
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
                        <p className="text-xs text-gray-500 leading-relaxed">تقدم في المراحل واكسب الوحدات - استبدل وحدات المسوق بقسائم شرائية مميزة!</p>
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

            {/* Latest Articles */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <a href="/blog" className="text-xs text-[#00BFA5]">المزيد من المقالات</a>
                    <h3 className="font-black text-sm text-gray-800">مقال جديد</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {sideArticles.map((a, i) => (
                        <a key={i} href="/blog/article" className="flex gap-3 items-start hover:bg-gray-50 rounded-xl p-1 -m-1 transition-colors">
                            <img src={uImg(a.img, 120)} alt={a.title} className="w-16 h-14 rounded-lg object-cover shrink-0" />
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

export default function About() {
    const [showGH, setShowGH] = useState(false);
    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 justify-end">
                        <span className="text-gray-700 font-medium">عن المسوق</span>
                        <span>\</span>
                        <a href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

                        {/* ===== MAIN CONTENT ===== */}
                        <div className="flex flex-col gap-6">

                            {/* Hero + Features */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 leading-snug mb-6">
                                    لماذا موقع المسوق هو موقع الكوبونات الاول بالسعودية، مصر ودول الخليج؟
                                </h1>
                                <div className="flex flex-col gap-5">
                                    {features.map((f, i) => (
                                        <div key={i} className="flex gap-4 items-start border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                                            <img
                                                src={uImg(f.img, 240)}
                                                alt={f.title}
                                                className="w-24 h-20 rounded-xl object-cover shrink-0"
                                            />
                                            <div className="flex-1">
                                                <h2 className="font-black text-gray-800 mb-1">{f.title}</h2>
                                                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Best Coupons */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="p-6 sm:p-8 text-right flex flex-col justify-center">
                                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-3">
                                            أفضل كوبونات الخصم وعروض التخفيض هو ما نقوم به!
                                        </h2>
                                        <h3 className="text-base font-black text-gray-700 mb-3">
                                            يسعدنا ان نقدم لكم افضل عروض الخصم والكوبونات الحصرية
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            للجميع يحب الحصول على أفضل صفقة تخفيض قبل الشراء عبر الإنترنت نحن نعمل بحماس لإيجاد أفضل كوبونات خصم وعروض التخفيض الحصرية من أفضل متاجر السعودية، الإمارات، مصر ودول الخليج (عمان، البحرين، الكويت) لدينا أيضاً متاجر عالمية تلائم للشراء من جميع الدول. نحن نفحص ونتأكد من كل عروض وكوبون قبل نشره لنضمن اكواد الخصم ان تكون فعالة 100%
                                        </p>
                                        <a href="/" className="text-sm text-[#00BFA5] font-bold hover:underline">وفر الآن ←</a>
                                    </div>
                                    <div className="min-h-[240px]">
                                        <img
                                            src={uImg('1460925895917-afdab827c52f', 600)}
                                            alt="كوبونات خصم"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-5">وفّر المال من خلال موقع المسوق™ مصر.</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {stats.map((s, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="text-2xl shrink-0">{s.icon}</span>
                                            <div>
                                                <div className="text-2xl font-black text-[#00BFA5]">{s.num}</div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-2">
                                    نعمل بجهد لنوفر لكم الخصومات على المشتريات التي تحتاجون إليها – حتى تستطيعوا شراء المزيد وتوفير المال...
                                </h2>
                                <a href="/" className="text-sm text-[#00BFA5] font-bold hover:underline">وفر الآن ←</a>
                                <h3 className="text-lg font-black text-gray-800 mt-5 mb-2">كيف يوفر لك المسوق المزيد؟</h3>
                                <p className="text-sm text-[#00BFA5] font-bold mb-2">💪 عمليتنا الطريقة المتميزة هي ما يميزنا!</p>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">التقني والابتكار والاهتمام بالتفاصيل يُقبلان إلى الحصول على أفضل ومزيد من التوفير لك.</p>
                                <ol className="flex flex-col gap-3">
                                    {howPoints.map((p, i) => (
                                        <li key={i} className="flex gap-3 items-start text-sm text-gray-600 leading-relaxed">
                                            <span className="font-black text-[#00BFA5] shrink-0">{i + 1}.</span>
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Team */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-1">✨ فريق المسوق</h2>
                                <p className="text-sm text-gray-600 mb-5">يتميز فريقنا المحترف بالتفوق وبالعناية بمجتمعنا يحفزنا على القيام بالمزيد؛ تعرف على فرقنا!</p>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <h3 className="font-black text-gray-800 mb-1">فريق اختيار وتحقق الكوبونات:</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">يراقب فريق الكوبونات لدينا باستمرار أفضل المعاملات التجارية عبر العالم لتحديد وتعزيز توفير السوق لتوفير المزيد لمجتمعنا. يتم اختيار الكوبونات من قبل فريق من التعاون الخليجي والتفاوض على الخصومات والصفقات نيابةً عنك. يتمتع الفريق من البشر الحقيقيين من خلال 1000 شركة وما زال يستمر في التفكير والابتكار لإيجاد طرق جديدة للتوفير.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-800 mb-1">فريق الدعم ومجموعاتنا:</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">يعمل فريق الدعم لدينا بجد على مدار الساعة لضمان سلاسة عمل موقع المسوق وتطبيقه والتمكين المستخدمين من الوصول إلى الموقع واستخدام كل كوبون وصفقة بسهولة. يشارك هذا الفريق أيضاً مع مجتمعنا من خلال التفاعل مع المستخدمين على قنوات التواصل الاجتماعي للموفر وجمع الملاحظات لتحسين موقعنا وتطبيقنا والكوبونات.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-800 mb-1">فريق تطوير التقنية:</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">يعمل فريقنا التقني المتميز في التكنولوجيا بجد على مدار الساعة لضمان سلاسة عمل موقع المسوق ووظيفته وامتداد المتصفح المصمم بكفاءة حتى يتمكن المستخدمين من الوصول والعمل بسهولة. يُدخل الفريق العامل ميزات جديدة وتحسين وظيفة وتحسين الأمان، بالإضافة إلى الابتكار لأدوات جديدة مصممة لمساعدة مستخدمينا على توفير المزيد من المال بشكل أسهل.</p>
                                    </div>
                                </div>
                                <div className="mt-5 pt-5 border-t border-gray-100">
                                    <h3 className="font-black text-gray-800 mb-2">اصل بنا</h3>
                                    <p className="text-sm text-gray-600">إيميل: <a href="mailto:info@almowafir.com" className="text-[#00BFA5]">info@almowafir.com</a></p>
                                    <p className="text-sm text-gray-600">WhatsApp: +9710582-399-141</p>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-1">❤️ ماذا يقول زوارنا؟</h2>
                                <p className="text-sm text-gray-500 mb-5">لا تستمع فقط إلى كلامنا – اقرأ التقييمات من عملائنا!</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {testimonials.map((t, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-700 leading-relaxed mb-3">"{t.text}"</p>
                                            <p className="text-sm font-black text-gray-800">— {t.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Influencer */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-2">💡 اصبح مؤثر للموفر!</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    هل أنت مؤثر يحب توفير المال مع المسوق؟ اعمل مع المسوق لإسعاد متابعيك بخصومات ساخنة على منتجات رائعة – واحصل على خصومات خاصة إضافية لقناتك!
                                </p>
                            </div>

                            {/* More with Almowafir */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3">✅ احصل على المزيد مع المسوق</h2>
                                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                    فرقنا الموهوبة دائماً تفكر في طرق جديدة لإسعاد مجتمع المسوق بالابتكارات والأدوات لجعل توفير المال أسهل! احصل على أقصى استفادة من المسوق عندما تجرب كل شيء منها:
                                </p>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <h3 className="font-black text-gray-800 mb-1">Almowafir Browser Extension (Chrome/Safari) إضافة كروم اكستنشن المسوق</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            هو كل ما تحبه عن التسوق مع المسوق – المتاجر التي تحبها، والمبيعات والاهتمامات التي تثير اهتمامك، والرموز التي توفر لك التوفير الذي تحتاجه. قم بتنزيل ملحق Chrome أو Safari وانظر بنفسك!
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-800 mb-1">تطبيق المسوق على موبايلك</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            اكتشف تطبيق المسوق وستجد عروض وصفقات المتاجر التي تحب – حتى تتسوق وتوفر في أي وقت ومكان! متاح على منتجر التطبيقات:{' '}
                                            <a href="#" className="text-[#00BFA5]">AppStore</a> / <a href="#" className="text-[#00BFA5]">Playstore</a> / <a href="#" className="text-[#00BFA5]">AppGallery</a>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-800 mb-1">Almowafir.com موقع المسوق</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            يُعد موقع المسوق خارطة طريق للمساعدة في الفور بالتسوق، تضم قائمتنا التي تضم أكثر من 1000 علامة تجارية في كل فئة من الأغذية والموضة والأدوات المنزلية والتكنولوجيا وغيرها، حتى تتمكن من توفير المال على كل ما تشتريه.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Community Channels */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                                    <div>
                                        <h2 className="text-xl font-black text-gray-800 mb-2">قنوات مجتمع المسوق</h2>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            تمتلك مجتمع المسوق العديد من القنوات المثيرة حيث يمكنك التحدث مع مستخدمين آخرين والبقاء على اطلاع دائم بأحدث المقسائم والصفقات.
                                        </p>
                                        <ul className="flex flex-col gap-3 text-sm text-gray-600">
                                            {socialChannels.map((s, i) => (
                                                <li key={i}>
                                                    <a href="#" className="text-[#00BFA5] font-bold">{s.handle}</a>
                                                    {' – '}{s.desc}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600 mb-2">أيضاً، تذكر الاتصال بنا عبر:</p>
                                            <ul className="flex flex-col gap-1">
                                                {['Instagram@المسوق', 'Telegram@المسوق', 'TikTok@المسوق', 'Pinterest@المسوق'].map((s, i) => (
                                                    <li key={i}><a href="#" className="text-[#00BFA5] text-sm">{s}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            src={uImg('1432888555-e9e7c90e8250', 400)}
                                            alt="مجتمع المسوق"
                                            className="w-full rounded-xl object-cover aspect-video"
                                        />
                                        <p className="text-sm text-gray-500 mt-2">تواصلوا وتابعوا صفحات التواصل الاجتماعي لموقع المسوق!</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        سر نجاحنا هو استمراراً في التواصل مع متابعينا عبر شبكات التواصل الاجتماعي المختلفة لهدف دراسة مطالبك ورغباتك الحقيقية حتى نعثر لك على أحدث كوبونات الخصم الحصرية.
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        تمكنك <a href="/contact" className="text-[#00BFA5] font-bold">التواصل معنا</a> في حال وجود تساؤلات لديك لنستطيع مساعدتك قدر الإمكان.
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        لمزيد من المعلومات تمكنك الإطلاع على <a href="#" className="text-[#00BFA5]">سياسة الخصوصية</a> وشروط الإستخدام على موقع المسوق.
                                    </p>
                                    <p className="font-black text-gray-800 text-base">من الآن توفر على كل شروة أونلاين باستخدام كوبونات الخصم من المسوق!</p>
                                </div>
                            </div>

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
