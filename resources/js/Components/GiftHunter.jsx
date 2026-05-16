import { useState, useEffect } from 'react';

// ==================== TYPEWRITER ====================

function Typewriter({ text, speed = 35, onDone }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        const timer = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(timer);
                setDone(true);
                onDone?.();
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text]);

    return (
        <>
            {displayed}
            {!done && <span className="animate-pulse text-[#00BFA5] font-thin">|</span>}
        </>
    );
}

// ==================== DATA ====================

const occasions = [
    'لا توجد مناسبة خاصة', 'خطوبية', 'زفاف', 'عيد ميلاد', 'تخرج',
    'عيد الأم', 'عيد الأب', 'رمضان', 'عيد الفطر', 'عيد الأضحى', 'يوم الحب',
];

const countries = [
    'المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'مملكة البحرين',
    'دولة الكويت', 'سلطنة عُمان', 'دولة قطر', 'المملكة الأردنية الهاشمية',
    'جمهورية مصر العربية', 'أخرى',
];

const currencies = {
    'المملكة العربية السعودية': 'ر.س', 'الإمارات العربية المتحدة': 'د.إ',
    'مملكة البحرين': 'د.ب', 'دولة الكويت': 'د.ك', 'سلطنة عُمان': 'ر.ع',
    'دولة قطر': 'ر.ق', 'المملكة الأردنية الهاشمية': 'د.أ',
    'جمهورية مصر العربية': 'ج.م', 'أخرى': '$',
};

const mockGifts = [
    {
        title: 'ساعة ذكية فوسيل',
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop&auto=format',
        color: '#E8F5E9',
        stores: [
            { name: 'Amazon',  domain: 'amazon.sa',    desc: 'ساعة بنظام تحديد المواقع GPS، شاشة تعمل باللمس 1.97 بوصة ...' },
            { name: 'Namshi',  domain: 'namshi.com',   desc: 'اشتري ديرتي ساعة ذكية سجا سونيك في الكويت' },
        ],
    },
    {
        title: 'طقم عطور ماركة جيفنشي',
        img: 'https://images.unsplash.com/photo-1523293182385-6c3e0e04f2f0?w=120&h=120&fit=crop&auto=format',
        color: '#F3E5F5',
        stores: [
            { name: 'Bloomingdales', domain: 'bloomingdales.com', desc: 'تسوّقوا شوباردـ اون لاين - بلومينغديلز الإمارات' },
            { name: 'Nice One',      domain: 'niceone.com',       desc: 'تسوق جميع منتجات الجمال أونلاين | نايس ون السعودية' },
            { name: 'Deraa',         domain: 'deraa.com',         desc: 'عطر سويف الرجالي من براود - متجر درعه' },
        ],
    },
    {
        title: 'حقيبة ظهر أديداس',
        img: 'https://images.unsplash.com/photo-1553456558-dff8b02d1e4d?w=120&h=120&fit=crop&auto=format',
        color: '#E3F2FD',
        stores: [
            { name: 'Namshi', domain: 'namshi.com',      desc: 'اديداس الأطفال شنط ظهر أونلاين - نمشي - Namshi' },
            { name: 'RIVA',   domain: 'rivafashion.com', desc: 'خصم حتى 70% + 10% إضافي' },
        ],
    },
];

// ==================== STORE ROW ====================

function StoreRow({ store }) {
    const [idx, setIdx] = useState(0);
    const sources = [
        `https://logo.clearbit.com/${store.domain}`,
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${store.domain}&size=128`,
    ];
    const failed = idx >= sources.length;
    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
            <span className="text-gray-300 text-lg">›</span>
            <div className="w-20 flex items-center justify-center shrink-0">
                {failed ? (
                    <span className="text-xs font-black text-gray-600">{store.name}</span>
                ) : (
                    <img key={idx} src={sources[idx]} alt={store.name} className="h-8 w-20 object-contain" onError={() => setIdx(i => i + 1)} />
                )}
            </div>
            <div className="flex-1 text-right">
                <p className="text-sm text-gray-700 leading-snug">{store.desc}</p>
                <span className="text-xs text-[#FF4081] font-bold">🏷️ كوبون</span>
            </div>
        </div>
    );
}

// ==================== GIFT CARD ====================

function GiftCard({ gift }) {
    return (
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: gift.color }}>
            <div className="flex items-center justify-between p-4">
                <img src={gift.img} alt={gift.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <h3 className="text-xl font-black text-gray-800 flex-1 text-right mr-4">{gift.title}</h3>
            </div>
            <div className="bg-white rounded-2xl mx-3 mb-3">
                <p className="text-xs text-gray-400 text-right px-4 pt-3 pb-1">احصل عليه من:</p>
                <div className="px-3">
                    {gift.stores.map((store, i) => (
                        <StoreRow key={i} store={store} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ==================== MAIN COMPONENT ====================

export default function GiftHunter({ open, onClose }) {
    const [step,     setStep]     = useState(0);
    const [phase,    setPhase]    = useState(0);
    const [gender,   setGender]   = useState(null);
    const [age,      setAge]      = useState('');
    const [hobbies,  setHobbies]  = useState('');
    const [occasion, setOccasion] = useState(occasions[0]);
    const [country,  setCountry]  = useState(countries[0]);
    const [budget,   setBudget]   = useState(500);
    const [loading,  setLoading]  = useState(false);
    const [done,     setDone]     = useState(false);

    // reset phase when modal opens
    useEffect(() => { if (open) setPhase(0); }, [open]);

    if (!open) return null;

    const currency = currencies[country] || '$';

    const handleSearch = () => {
        setLoading(true);
        setStep(6);
        setTimeout(() => {
            setLoading(false);
            setDone(true);
            setStep(7);
        }, 2500);
    };

    const reset = () => {
        setStep(0); setPhase(0); setGender(null); setAge(''); setHobbies('');
        setOccasion(occasions[0]); setCountry(countries[0]);
        setBudget(500); setLoading(false); setDone(false);
    };

    const handleClose = () => { reset(); onClose(); };

    return (
        <div className="fixed inset-0 bg-white z-[200] overflow-y-auto" dir="rtl">

            {/* BETA badge */}
            <div className="fixed top-0 left-0 bg-[#FF4081] text-white text-xs font-black px-4 py-2 rounded-br-xl z-10">BETA</div>

            {/* Close button */}
            {!loading && (
                <button
                    onClick={handleClose}
                    className="fixed top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl z-10 leading-none"
                    aria-label="إغلاق"
                >✕</button>
            )}

            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">

                {/* ── Step 0: Welcome + Gender ── */}
                {step === 0 && (
                    <div className="w-full max-w-md text-center">
                        <div className="flex items-end justify-center gap-2 mb-6">
                            <div className="text-7xl">🤖</div>
                            <div className="text-5xl mb-2">🎁</div>
                        </div>

                        {/* Line 1 */}
                        <h1 className="text-2xl font-black text-gray-800 leading-snug min-h-8">
                            {phase >= 0 && (
                                <Typewriter
                                    text="السلام عليكم,"
                                    speed={60}
                                    onDone={() => setPhase(1)}
                                />
                            )}
                        </h1>

                        {/* Line 2 */}
                        <h1 className="text-xl font-black text-gray-800 leading-snug mb-4 min-h-14">
                            {phase >= 1 && (
                                <Typewriter
                                    text="انا صياد الهدايا الروبوتي, و مهمتي الاقيلك افضل اقتراحات للهدايا"
                                    speed={30}
                                    onDone={() => setPhase(2)}
                                />
                            )}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm text-gray-500 mb-8 min-h-10">
                            {phase >= 2 && (
                                <Typewriter
                                    text="ما تصدقني؟ قبلت التحدي! جربني و اجب على كم من سؤال و شوف بعينك..."
                                    speed={28}
                                    onDone={() => setPhase(3)}
                                />
                            )}
                        </p>

                        {/* Buttons — appear after typing done */}
                        {phase >= 3 && (
                            <>
                                <h2 className="text-lg font-black text-gray-800 mb-4">الهدية مخصصة ل:</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {['امراة', 'رجل'].map(g => (
                                        <button
                                            key={g}
                                            onClick={() => { setGender(g); setStep(1); }}
                                            className={`py-4 rounded-2xl font-bold text-lg border-2 transition-all ${
                                                gender === g
                                                    ? 'bg-[#00BFA5] text-white border-[#00BFA5]'
                                                    : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                                            }`}
                                        >{g}</button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ── Step 1: Age ── */}
                {step === 1 && (
                    <div className="w-full max-w-md">
                        <h2 className="text-xl font-black text-gray-800 mb-6 text-right">العمر بالسنوات</h2>
                        <input
                            type="number"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && age && setStep(2)}
                            placeholder="18"
                            min={1} max={120}
                            className="w-full border-2 border-[#00BFA5] rounded-xl px-4 py-4 text-xl text-center outline-none"
                            autoFocus
                        />
                        <button
                            onClick={() => age && setStep(2)}
                            disabled={!age}
                            className="w-full mt-4 bg-[#00BFA5] disabled:opacity-40 text-white font-black py-4 rounded-2xl text-lg transition-opacity"
                        >التالي</button>
                    </div>
                )}

                {/* ── Step 2: Hobbies ── */}
                {step === 2 && (
                    <div className="w-full max-w-md">
                        <h2 className="text-xl font-black text-gray-800 mb-6 text-right">اي هوايات او اهتمامات لمستلم الهدية؟</h2>
                        <input
                            type="text"
                            value={hobbies}
                            onChange={e => setHobbies(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && setStep(3)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-base outline-none focus:border-[#00BFA5] bg-gray-50"
                            autoFocus
                        />
                        <button
                            onClick={() => setStep(3)}
                            className="w-full mt-4 bg-[#00BFA5] text-white font-black py-4 rounded-2xl text-lg"
                        >التالي</button>
                    </div>
                )}

                {/* ── Step 3: Occasion ── */}
                {step === 3 && (
                    <div className="w-full max-w-md">
                        <h2 className="text-xl font-black text-gray-800 mb-6 text-right">ما هي مناسبة الهدية؟</h2>
                        <div className="relative">
                            <select
                                value={occasion}
                                onChange={e => setOccasion(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-base outline-none focus:border-[#00BFA5] bg-gray-50 appearance-none text-right"
                            >
                                {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                        </div>
                        <button
                            onClick={() => setStep(4)}
                            className="w-full mt-4 bg-[#00BFA5] text-white font-black py-4 rounded-2xl text-lg"
                        >التالي</button>
                    </div>
                )}

                {/* ── Step 4: Country ── */}
                {step === 4 && (
                    <div className="w-full max-w-md">
                        <h2 className="text-xl font-black text-gray-800 mb-6 text-right">من اين حضرتك؟</h2>
                        <div className="border-2 border-[#00BFA5] rounded-xl overflow-hidden">
                            {countries.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setCountry(c)}
                                    className={`w-full text-right px-5 py-3.5 text-base border-b border-gray-100 last:border-0 transition-colors ${
                                        country === c
                                            ? 'bg-[#E8F8F5] text-[#00BFA5] font-bold'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >{c}</button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(5)}
                            className="w-full mt-4 bg-[#00BFA5] text-white font-black py-4 rounded-2xl text-lg"
                        >Select</button>
                    </div>
                )}

                {/* ── Step 5: Budget ── */}
                {step === 5 && (
                    <div className="w-full max-w-md">
                        <h2 className="text-xl font-black text-gray-800 mb-2 text-right">كم تريد يكون ثمن الهية؟</h2>
                        <p className="text-right text-[#00BFA5] font-black text-lg mb-6">{currency} {budget}</p>
                        <input
                            type="range"
                            min={10}
                            max={3000}
                            step={10}
                            value={budget}
                            onChange={e => setBudget(Number(e.target.value))}
                            className="w-full accent-[#00BFA5] h-2 cursor-pointer"
                        />
                        <button
                            onClick={handleSearch}
                            className="w-full mt-8 bg-[#00BFA5] text-white font-black py-5 rounded-2xl text-xl border-4 border-[#00BFA5]/30"
                        >يلا نبحث</button>
                    </div>
                )}

                {/* ── Step 6: Loading ── */}
                {step === 6 && loading && (
                    <div className="text-center px-4">
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-10 leading-snug">
                            لحظة لو سمحت, انا ابحث عن افضل هدية ممكن تهديها
                        </h2>
                        <div className="grid grid-cols-2 gap-3 w-14 mx-auto">
                            {[
                                { color: '#FF4081', delay: '0ms'   },
                                { color: '#00BFA5', delay: '150ms' },
                                { color: '#00BFA5', delay: '300ms' },
                                { color: '#FF4081', delay: '450ms' },
                            ].map((d, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-6 rounded-full animate-bounce"
                                    style={{ backgroundColor: d.color, animationDelay: d.delay }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 7: Results ── */}
                {step === 7 && done && (
                    <div className="w-full max-w-lg">
                        <h2 className="text-2xl font-black text-gray-800 mb-6 text-right">
                            افكار لهدايا {mockGifts.length} تمت المهمه بنجاح! اليك
                        </h2>
                        <div className="flex flex-col gap-4">
                            {mockGifts.map((gift, i) => (
                                <GiftCard key={i} gift={gift} />
                            ))}
                        </div>
                        <button
                            onClick={reset}
                            className="w-full mt-6 bg-[#00BFA5] text-white font-black py-4 rounded-2xl text-base flex items-center justify-center gap-2"
                        >
                            <span>🔄</span> ابدا مهمة البحث عن هدايا من جديد
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
