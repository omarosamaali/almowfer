import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// ==================== FOOTER DATA ====================

const footerStores    = ['كود خصم نون', 'كود خصم تويو', 'كود خصم باث اند بودي', 'كود خصم سيفي', 'كود خصم ممزورلد', 'كود خصم بوكينج', 'كود خصم علي اكسبرس', 'كود خصم اي هيرب', 'كود خصم نمشي', 'كود خصم دكتور نيوتريشن'];
const footerOccasions = ['جميع المتاجر', 'الأعياد والعطلات', 'عروض الجمعة السوداء', 'عروض الجمعة البيضاء', 'عروض اليوم الوطني الإماراتي', 'عروض اليوم الوطني السعودي', 'عروض رمضان', 'عيد الأضحى', 'أفضل مواقع حجز الطيران', 'أفضل لحجز الفنادق', 'اضافة كروم مكتشف الاكواد'];
const footerInfo      = ['عن المسوق', 'اعلن مع المسوق', 'تواصل معنا', 'افصاح المعلن', 'الشروط والاحكام', 'سياسة الخصوصية', 'خريطة الموقع'];
const socialLinks     = ['📌', '🎵', '✈️', '▶️', '📸', '📘', '✖️'];

// ==================== COUNTRY SELECTOR ====================

const countries = [
    { code: 'SA', iso: 'sa', name: 'السعودية'  },
    { code: 'AE', iso: 'ae', name: 'الامارات'  },
    { code: 'EG', iso: 'eg', name: 'مصر'       },
    { code: 'KW', iso: 'kw', name: 'الكويت'    },
    { code: 'OT', iso: null, name: 'دولة أخرى' },
];

function FlagImg({ iso, size = 28 }) {
    if (!iso) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        );
    }
    return (
        <img
            src={`https://flagcdn.com/w40/${iso}.png`}
            width={size}
            height={Math.round(size * 0.75)}
            alt={iso}
            className="rounded-sm object-cover"
            style={{ minWidth: size }}
        />
    );
}

function CountrySelector() {
    const [open,     setOpen]    = useState(false);
    const [selected, setSelect] = useState('EG');
    const wrapRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const current = countries.find(c => c.code === selected);

    return (
        <div className="relative" ref={wrapRef}>
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#00BFA5] transition-colors select-none"
            >
                <FlagImg iso={current.iso} size={24} />
                <span className="hidden sm:inline">{current.name}</span>
                <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {countries.map(c => (
                        <button
                            key={c.code}
                            onClick={() => { setSelect(c.code); setOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                selected === c.code
                                    ? 'border-[#00BFA5] bg-[#00BFA5]'
                                    : 'border-gray-300'
                            }`}>
                                {selected === c.code && (
                                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                )}
                            </div>
                            <FlagImg iso={c.iso} size={26} />
                            <span className="flex-1 text-right text-sm font-medium text-gray-700">{c.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ==================== APP MODAL ====================

function AppDownloadModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-999" onClick={onClose}>
            <div
                className="absolute top-16 right-3 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 w-90 flex gap-4"
                dir="rtl"
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 text-lg leading-none"
                >✕</button>

                {/* Text side */}
                <div className="flex-1 text-right">
                    <h3 className="font-black text-gray-900 text-base mb-1.5">احصل على تطبيق المسوق!</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                        تقدم في المراحل واكسب الوحدات - استبدل وحدات المسوق بقسائم شرائية مميزة!
                    </p>
                    <div className="flex flex-col gap-2">
                        <a
                            href="#"
                            className="flex items-center gap-2 bg-black text-white rounded-xl px-3 py-2 hover:bg-gray-800 transition-colors"
                        >
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="white">
                                <path d="M3.18 23.76c.35.2.76.2 1.12.01l11.4-6.54-2.5-2.5-10.02 9.03zM.54 1.27C.2 1.64 0 2.18 0 2.87v18.26c0 .69.2 1.23.54 1.6l.08.08 10.23-10.23v-.24L.62 1.19l-.08.08zM20.46 10.37l-2.9-1.66-2.8 2.8 2.8 2.8 2.92-1.67c.83-.48.83-1.25-.02-1.27zM4.3.24L15.7 6.77l-2.5 2.5L3.18.24C3.54.04 3.95.04 4.3.24z"/>
                            </svg>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[9px] text-gray-300">GET IT ON</span>
                                <span className="text-sm font-bold">Google Play</span>
                            </div>
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 bg-black text-white rounded-xl px-3 py-2 hover:bg-gray-800 transition-colors"
                        >
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="white">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04l-.05.17zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[9px] text-gray-300">Download on the</span>
                                <span className="text-sm font-bold">App Store</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* QR side */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-24 h-24 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https://almowafir.com/app&color=000000&bgcolor=ffffff"
                            alt="QR Code"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-[10px] text-gray-500 text-center leading-tight w-24">
                        قم بمسح رمز QR باستخدام كاميرا هاتفك
                    </p>
                </div>
            </div>
        </div>
    );
}

// ==================== HEADER ====================

function Header() {
    const [searchQuery,    setSearchQuery]    = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [appModalOpen,   setAppModalOpen]   = useState(false);

    const navLinks = ['الرئيسية', 'جميع المتاجر', 'جميع الفئات', 'المدونة', 'تواصل معنا', 'الشروط والاحكام', 'اعلن معنا', 'عن المسوق'];

    return (
        <>
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">

                {/* Top Bar */}
                <div className="flex items-center justify-between py-2 sm:py-3 gap-2 sm:gap-4">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 shrink-0">
                        <span className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-linear-to-l from-[#00BFA5] to-[#4CAF50]">المُسوق</span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-[#00BFA5] to-[#4CAF50] flex items-center justify-center text-white font-bold text-base sm:text-lg">م</div>
                    </a>

                    {/* Search */}
                    <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-xl">
                        <div className="relative">
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                            <input
                                type="text"
                                placeholder="إبحث عن الكوبونات والمتاجر"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-gray-200 rounded-full py-2 pr-9 pl-4 text-sm focus:outline-none focus:border-[#00BFA5] bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Desktop Left: Language + App */}
                    <div className="hidden lg:flex items-center gap-4 shrink-0">
                        <CountrySelector />
                        <button
                            onClick={() => setAppModalOpen(true)}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#00BFA5] transition-colors whitespace-nowrap"
                        >
                            <span>قم بتحميل تطبيق المسوق</span><span>🍎</span>
                        </button>
                    </div>

                    {/* Mobile: hamburger */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="القائمة"
                    >
                        <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
                        <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
                        <div className="w-5 h-0.5 bg-gray-600"></div>
                    </button>
                </div>

                {/* Desktop Nav */}
                <nav className="justify-center hidden lg:flex items-center gap-5 py-2 border-t border-gray-100">
                    {navLinks.map((link) => (
                        link === 'الرئيسية'
                            ? <Link key={link} href="/" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'جميع المتاجر'
                            ? <Link key={link} href="/stores" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'جميع الفئات'
                            ? <Link key={link} href="/categories" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'المدونة'
                            ? <Link key={link} href="/blog" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'تواصل معنا'
                            ? <Link key={link} href="/contact" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'الشروط والاحكام'
                            ? <Link key={link} href="/terms" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'اعلن معنا'
                            ? <Link key={link} href="/advertise" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                        : link === 'عن المسوق'
                            ? <Link key={link} href="/about" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</Link>
                            : <a key={link} href="#" className="text-sm text-gray-700 hover:text-[#00BFA5] transition-colors whitespace-nowrap">{link}</a>
                    ))}
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="lg:hidden border-t border-gray-100 py-3 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            link === 'الرئيسية'
                                ? <Link key={link} href="/" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'جميع المتاجر'
                                ? <Link key={link} href="/stores" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'جميع الفئات'
                                ? <Link key={link} href="/categories" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'المدونة'
                                ? <Link key={link} href="/blog" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'تواصل معنا'
                                ? <Link key={link} href="/contact" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'الشروط والاحكام'
                                ? <Link key={link} href="/terms" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'اعلن معنا'
                                ? <Link key={link} href="/advertise" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                            : link === 'عن المسوق'
                                ? <Link key={link} href="/about" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</Link>
                                : <a key={link} href="#" className="text-sm text-gray-700 hover:text-[#00BFA5] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">{link}</a>
                        ))}
                        <div className="flex items-center gap-4 px-3 pt-2 border-t border-gray-100 mt-1">
                            <CountrySelector />
                            <button onClick={() => setAppModalOpen(true)} className="text-sm text-gray-600">تحميل التطبيق 🍎</button>
                        </div>
                    </nav>
                )}
            </div>
        </header>

        {appModalOpen && <AppDownloadModal onClose={() => setAppModalOpen(false)} />}
        </>
    );
}

// ==================== FOOTER ====================

function Footer() {
    return (
        <footer className="bg-white mt-10 sm:mt-14 pt-8 sm:pt-10 pb-6 shadow-inner">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">

                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-8 border-b border-gray-200 text-right">

                    {/* Social */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-gray-800 mb-3 sm:mb-4">لا تفوت أي عرض ابداً</h3>
                        <p className="text-sm text-gray-500 mb-4">تابعنا على مواقع التواصل الاجتماعي، احصل على أفضل الكوبونات وعروض الخصم</p>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#E8F8F5] flex items-center justify-center text-base transition-colors">{icon}</a>
                            ))}
                        </div>
                    </div>

                    {/* Occasions */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3 sm:mb-4">عروض المناسبات</h3>
                        <ul className="space-y-1.5">
                            {footerOccasions.map((item, i) => (
                                <li key={i}><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#00BFA5] transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3 sm:mb-4">معلومات المسوق</h3>
                        <ul className="space-y-1.5">
                            {footerInfo.map((item, i) => (
                                <li key={i}><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#00BFA5] transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Top Stores */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3 sm:mb-4">اشهر المتاجر</h3>
                        <ul className="space-y-1.5">
                            {footerStores.map((item, i) => (
                                <li key={i}><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#00BFA5] transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-right">

                    {/* App Download */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">حمل التطبيق مجاناً الآن!</h3>
                        <p className="text-sm text-gray-500 mb-4">أكواد خصم, عروض حصرية, جوائز قيمة</p>
                        <div className="flex gap-3 flex-wrap">
                            <a href="#" className="bg-black text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-800">▶ Google Play</a>
                            <a href="#" className="bg-black text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-800">🍎 App Store</a>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1">
                            <span className="text-xs text-gray-500">🔒 DMCA PROTECTED</span>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="flex items-center justify-center sm:justify-start lg:justify-center">
                        <div className="w-40 h-28 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                            🗺️ خريطة الموقع
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3">تواصل معنا</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-start gap-2 justify-end">
                                <span className="text-right text-xs leading-relaxed">ALMAS Tower, Jumeirah Lakes Towers ALMAS-22-D-2 - Dubai, UAE</span>
                                <span className="shrink-0">📍</span>
                            </div>
                            <div className="flex items-start gap-2 justify-end">
                                <span className="text-right text-xs leading-relaxed">King Fahd Rd, 4055, 8000, Riyadh 12333, Saudi Arabia</span>
                                <span className="shrink-0">📍</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="text-xs">support@almowafir.com</span>
                                <span>✉️</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="text-xs">ksa@almowafir.com</span>
                                <span>✉️</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="text-xs">+971 582399141</span>
                                <span>📞</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">© كل الحقوق محفوظة للموفر</p>
                </div>
            </div>
        </footer>
    );
}

// ==================== MAIN LAYOUT ====================

export default function MainLayout({ children }) {
    return (
        <div dir="rtl" className="min-h-screen bg-gray-100 font-sans text-gray-800">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
