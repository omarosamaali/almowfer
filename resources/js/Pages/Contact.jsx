import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import GiftHunter from '../Components/GiftHunter';
import NewsletterBox from '../Components/NewsletterBox';
import { useTenantUrl } from '../utils/useTenantUrl';

// ==================== DATA ====================

const topStores = [
    { name: 'almatar',    domain: 'almatar.com',     color: '#E31837', slug: 'almatar'     },
    { name: 'Amazon',     domain: 'amazon.eg',       color: '#FF9900', slug: 'amazon'      },
    { name: 'Noon',       domain: 'noon.com',        color: '#FEEE00', slug: 'noon-egypt'  },
    { name: 'AliExpress', domain: 'aliexpress.com',  color: '#FF6A00', slug: 'aliexpress'  },
    { name: 'Waffarha',   domain: 'waffarha.com',    color: '#FF6B35', slug: 'waffarha'    },
    { name: 'DeFacto',    domain: 'defacto.com.tr',  color: '#E40046', slug: 'defacto'     },
    { name: 'FARFETCH',   domain: 'farfetch.com',    color: '#000000', slug: 'farfetch'    },
    { name: 'iHerb',      domain: 'iherb.com',       color: '#8CC63F', slug: 'iherb'       },
    { name: 'max',        domain: 'maxfashion.com',  color: '#E31837', slug: 'max-fashion' },
];

const recentArticles = [
    { tag: 'الجمال والعناية', tagEn: 'BEAUTY',  title: 'تخفيضات سيفورا القادمة في 2025 – خصومات حتى 80% هذا العام',             color: '#E91E8C' },
    { tag: 'سياحة وسفر',     tagEn: 'TRAVEL',  title: 'أكثر الدول سياحة في العالم أشهر 5 دول يارخص سعر زيارتها مع كوبونات المسوق', color: '#0079C1' },
    { tag: 'الأزياء',        tagEn: 'FASHION', title: 'نجامة تيرمال رجالي شبك وأشهر أماكن البيع بسعر خيالي',                   color: '#6B3A2A' },
    { tag: 'الجمال والعناية', tagEn: 'BEAUTY',  title: 'تخفيضات باث اند بودي 2025 – خصم حتى 80% على بعض المنتجات',              color: '#E91E8C' },
];

const reviews = [
    { name: 'فواز العلوي',   initial: 'ف', bg: '#00BFA5', date: '13-03-2026', stars: 5, text: '"ممتاز ويعطي كوبونات مجاناً"' },
    { name: 'مجدي فرح',      initial: 'م', bg: '#8B6B55', date: '29-03-2026', stars: 5, text: '"ممتاز جدا كانت تجربة رائعة للغاية المنى من الجميع ز حميل التطبيق والاستمتاع بالا حصم الجبار"' },
    { name: 'اسامه بن طالب', initial: 'ا', bg: '#00BFA5', date: '07-03-2026', stars: 5, text: '"تجربتي كنت ممتاز جداً"' },
    { name: 'Abrheem Jal',   initial: 'A', bg: '#607D8B', date: '10-03-2026', stars: 5, text: '"تطبيق ممتاز وبروفر عليك كنب ز ا نصح باستخدامه عند طلب ا ي شئ"' },
];

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
        <img key={srcIdx} src={sources[srcIdx]} alt={store.name}
            onError={() => setSrcIdx(i => i + 1)} referrerPolicy="no-referrer"
            className="max-h-7 max-w-full object-contain" />
    );
}

// ==================== HELP ITEM ====================

function HelpItem({ icon, title, desc }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
            <div className="w-9 h-9 rounded-full bg-[#E8F8F5] flex items-center justify-center text-lg shrink-0 mt-0.5">
                {icon}
            </div>
            <div className="text-right flex-1">
                <p className="font-bold text-gray-800 text-sm mb-0.5">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function Contact() {
    const [showGH, setShowGH] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const url = useTenantUrl();
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(url('/contact'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmitted(true);
            },
        });
    };

    const showSuccess = submitted || flash?.success;

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <a href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</a>
                        <span>\</span>
                        <span className="text-gray-700 font-medium">تواصل معنا</span>
                    </div>

                    {/* Two column layout */}
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* ===== SIDEBAR ===== */}
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

                            {/* App + AI Promo */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <div className="pb-4 mb-4 border-b border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <div className="text-4xl">📱</div>
                                        <div className="flex-1">
                                            <h3 className="font-black text-gray-800 text-sm mb-1">احصل على تطبيق المسوق!</h3>
                                            <p className="text-xs text-gray-500 mb-3">تقدم في المراحل واكسب وحدات المسوق - استبدل وحدات المسوق بقسائم شرائية مميزة!</p>
                                            <div className="flex gap-1.5">
                                                <a href="#" className="bg-black text-white text-xs font-bold py-1.5 px-2.5 rounded-lg">🍎 App Store</a>
                                                <a href="#" className="bg-black text-white text-xs font-bold py-1.5 px-2.5 rounded-lg">▶ Google Play</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-4xl">🎁</div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-gray-800 text-sm mb-1 text-center">مرحبا بك انا نوره</h3>
                                        <p className="text-xs text-gray-500 mb-3">اكتشف قوة الذكاء الاصطناعي مع هذا البوت الذي ام تم تصميمه خصيصاً لإيجاد الهدية المثالية!</p>
                                        <button onClick={() => setShowGH(true)} className="inline-block bg-[#FF4081] text-white text-xs font-bold py-2 px-4 rounded-full">هيا نبدأ</button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Articles */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <div className="flex items-center justify-between mb-3">
                                    <a href="/blog" className="text-xs text-[#00BFA5] hover:underline">المزيد من المقالات</a>
                                    <h3 className="font-black text-gray-800">مقال جديد</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {recentArticles.map((a, i) => (
                                        <a key={i} href="/blog/article" className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors">
                                            <div className="w-14 h-11 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs text-center px-1 leading-tight"
                                                style={{ background: `linear-gradient(135deg, ${a.color}99, ${a.color})` }}>
                                                {a.tagEn}
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-[#00BFA5] font-bold">{a.tag}</span>
                                                <p className="text-xs text-gray-700 mt-0.5 line-clamp-2 leading-relaxed">{a.title}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <h3 className="font-black text-gray-800 mb-4 leading-snug">تقييمات حقيقية من مستخدمي تطبيق المسوق للكوبونات</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {reviews.map((r, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-3">
                                            <div className="flex flex-col items-center gap-1.5 mb-2">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base"
                                                    style={{ background: r.bg }}>
                                                    {r.initial}
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs font-bold text-gray-800">{r.name}</div>
                                                    <div className="text-xs text-gray-400">{r.date}</div>
                                                </div>
                                                <div className="text-yellow-400 text-xs">{'★'.repeat(r.stars)}</div>
                                            </div>
                                            <p className="text-xs text-gray-600 text-center leading-relaxed line-clamp-3">{r.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Service */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm text-right">
                                <h3 className="font-black text-gray-800 mb-2">خدمة عملاء المسوق</h3>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">إذا وجدت كود لا يعمل، أو ترغب في مشاركة ملاحظاتك، لا تتردد في التواصل معنا عبر البريد الإلكتروني أو الانضمام إلى مجموعة محبي المسوق!</p>
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
                                    { icon: '🏷️', num: '854',    label: 'كوبونات الخصم وعروض التخفيضات المتاحة على موقع المسوق™.' },
                                    { icon: '🛍️', num: '1,255',  label: 'المتاجر التي تقدم كوبونات وعروض على موقع المسوق™.' },
                                    { icon: '👥', num: '9,312',  label: 'عدد المسوقين الشهري عبر موقع المسوق™.' },
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
                        <main className="flex-1 min-w-0 order-1 lg:order-2 flex flex-col gap-6">

                            {/* Hero */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-3">نحن هنا من اجلك</h1>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3 leading-relaxed">
                                    فريق العمل يعمل على مدار الساعة للرد على استفساراتكم واستقبال اقتراحاتكم
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    سواء اكتشفت كود خصم لا يعمل، أو تريد اقتراح متجر جديد، أو لديك سؤال عن التطبيق، أو مجرد تريد التواصل معنا – فريق المسوق هنا من أجلك. نحن نشر حقيقيون نحب مساعدة مجتمعنا على التوفير أكثر، ونأخذ كل رسالة بجدية تامة.
                                </p>
                            </div>

                            {/* Contact form */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-2 flex items-center justify-end gap-2">
                                    <span>أرسل لنا رسالة</span>
                                    <span className="text-2xl">✉️</span>
                                </h2>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                    املأ النموذج أدناه وسيتواصل معك فريقنا في أقرب وقت ممكن.
                                </p>

                                {showSuccess && (
                                    <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm font-bold">
                                        {flash?.success || 'تم إرسال رسالتك بنجاح.'}
                                    </div>
                                )}

                                <form onSubmit={submitContact} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="contact-name" className="block text-sm font-bold text-gray-700 mb-1.5">الاسم *</label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20"
                                                placeholder="اسمك الكامل"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="contact-email" className="block text-sm font-bold text-gray-700 mb-1.5">البريد الإلكتروني *</label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                dir="ltr"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20"
                                                placeholder="example@email.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-subject" className="block text-sm font-bold text-gray-700 mb-1.5">الموضوع</label>
                                        <input
                                            id="contact-subject"
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20"
                                            placeholder="موضوع الرسالة"
                                        />
                                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="contact-message" className="block text-sm font-bold text-gray-700 mb-1.5">الرسالة *</label>
                                        <textarea
                                            id="contact-message"
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 resize-y focus:outline-none focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20"
                                            placeholder="اكتب رسالتك هنا..."
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="self-end bg-[#00BFA5] hover:bg-[#00a892] disabled:opacity-60 text-white font-black py-3 px-8 rounded-xl transition-colors"
                                    >
                                        {processing ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                                    </button>
                                </form>
                            </div>

                            {/* How can we help */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-4 flex items-center justify-end gap-2">
                                    <span>كيف يمكننا مساعدتك؟</span>
                                    <span className="text-2xl">💬</span>
                                </h2>
                                <HelpItem
                                    icon="🔗"
                                    title="كود منتهي أو لا يعمل؟"
                                    desc="فريق الجودة لدينا يعمل على مدار الساعة للحفاظ على الأكواد محدثة، لكن أحياناً يفوتنا كود. أخبرنا وسنصلحه بسرعة."
                                />
                                <HelpItem
                                    icon="🏪"
                                    title="متجرك المفضل غير موجود؟"
                                    desc="لم تجد علامتك التجارية المفضلة على المسوق؟ راسلنا وسيبذل جهدنا قصارى لإضافتها إلى قائمتنا التي تضم أكثر من 1,000 متجر."
                                />
                                <HelpItem
                                    icon="💡"
                                    title="لديك ملاحظة أو اقتراح؟"
                                    desc="نحن دائماً نتحسن. أفكارك تساعدنا على بناء تجربة أفضل لمجتمع المسوق بأكمله."
                                />
                                <HelpItem
                                    icon="❤️"
                                    title="استفسار تجاري أو شراكة؟"
                                    desc="هل أنت علامة تجارية أو ناشر مهتم بالعمل معنا؟ فريق تطوير الأعمال لدينا سيسعد بالتواصل معك."
                                />
                            </div>

                            {/* Location */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-5 flex items-center justify-end gap-2">
                                    <span>أين نتواجد</span>
                                    <span className="text-2xl">📍</span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="font-black text-gray-800 mb-2">دبي، الإمارات العربية المتحدة:</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">برج الماس، أبراج بحيرات جميرا، ALMAS-22-D-2</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="font-black text-gray-800 mb-2">الرياض، المملكة العربية السعودية:</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">طريق الملك فهد 4050، 4055، 4000، الرياض 12333</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col gap-2 text-right">
                                    <a href="mailto:support@almowafir.com" className="flex items-center justify-end gap-2 text-sm text-[#00BFA5] hover:underline">
                                        <span>support@almowafir.com</span>
                                        <span>✉️</span>
                                    </a>
                                    <a href="mailto:ksa@almowafir.com" className="flex items-center justify-end gap-2 text-sm text-[#00BFA5] hover:underline">
                                        <span>ksa@almowafir.com</span>
                                        <span>✉️</span>
                                    </a>
                                    <a href="tel:+971582399141" className="flex items-center justify-end gap-2 text-sm text-[#00BFA5] hover:underline">
                                        <span>+971582399141</span>
                                        <span>📞</span>
                                    </a>
                                </div>
                            </div>

                            {/* Response time */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3 flex items-center justify-end gap-2">
                                    <span>وقت الاستجابة</span>
                                    <span className="text-2xl">⏱️</span>
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    نرد عادة خلال <span className="font-bold text-gray-800">يوم عمل واحد</span>. للمشكلات العاجلة ككودو لا يعمل أثناء تخفيضات مباشرة، واتساب هو أسرع طريقة للوصول إلينا.
                                </p>
                            </div>

                            {/* Community */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm text-right">
                                <h2 className="text-xl font-black text-gray-800 mb-3 flex items-center justify-end gap-2">
                                    <span>تواصل مع المجتمع</span>
                                    <span className="text-2xl">🌐</span>
                                </h2>
                                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                                    انضم إلى آلاف المتسوقين الأذكياء في قنواتنا – احصل على أفضل العروض، شارك النصائح، وابق على اطلاع بأحدث الكوبونات:
                                </p>
                                <ul className="flex flex-col gap-3 mb-6">
                                    {[
                                        { icon: '✈️', name: 'تيليغرام', desc: 'عروض لحظية ودردشة المجتمع', color: '#2CA5E0' },
                                        { icon: '📘', name: 'فيسبوك',   desc: 'آخر الأخبار وتحديثات المجتمع',  color: '#1877F2' },
                                        { icon: '📸', name: 'إنستغرام', desc: 'عروض بلمسة بصرية مميزة',        color: '#E1306C' },
                                        { icon: '🎵', name: 'تيك توك',  desc: 'نصائح التوفير في مقاطع قصيرة',  color: '#000000' },
                                    ].map((item, i) => (
                                        <li key={i}>
                                            <a href="#" className="flex items-center justify-end gap-3 group">
                                                <div className="text-right">
                                                    <span className="text-sm font-bold text-gray-800 group-hover:text-[#00BFA5] transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-gray-400 text-sm"> – {item.desc}</span>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
                                                    style={{ background: item.color + '22', color: item.color }}>
                                                    {item.icon}
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col items-end gap-4">
                                    <a href="mailto:support@almowafir.com" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                                        <div className="w-14 h-14 rounded-full bg-[#E8F8F5] flex items-center justify-center text-3xl shadow">
                                            ✉️
                                        </div>
                                        <span className="text-xs text-[#00BFA5] font-bold">البريد الإلكتروني</span>
                                    </a>
                                    <a href="#" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                                        <div className="w-14 h-14 rounded-full bg-[#E7F6EF] flex items-center justify-center text-3xl shadow">
                                            💬
                                        </div>
                                        <span className="text-xs text-[#25D366] font-bold">واتساب</span>
                                    </a>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
            </div>
            <GiftHunter open={showGH} onClose={() => setShowGH(false)} />
        </MainLayout>
    );
}
