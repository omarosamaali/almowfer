import { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

const features = [
    { icon: '🎯', title: 'إعلان مستهدف', desc: 'استهداف دقيق لجمهور مهتم بالتسوق والخصومات في السعودية والإمارات ومصر والكويت والعالم العربي.' },
    { icon: '📱', title: 'موقع وتطبيق', desc: 'الظهور على موقع المسوق وتطبيقه الذكي في آن واحد لأقصى وصول ممكن لجمهورك المستهدف.' },
    { icon: '💰', title: 'أمثل الأسعار', desc: 'باقات إعلانية مرنة تناسب الشركات الناشئة والمتوسطة والكبيرة بأفضل عائد على الاستثمار.' },
    { icon: '📊', title: 'تقارير مفصّلة', desc: 'متابعة أداء حملاتك الإعلانية لحظةً بلحظة من خلال لوحة تحكم شاملة ودقيقة.' },
    { icon: '🛍️', title: 'جمهور مشتري', desc: 'ملايين المتسوقين الذين يبحثون أصلاً عن الخصومات والعروض — جمهورك المثالي بامتياز.' },
    { icon: '🌍', title: 'تغطية واسعة', desc: 'السعودية، الإمارات، مصر، الكويت والعالم العربي كله — منصة إعلانية بلا حدود جغرافية.' },
];

const stats = [
    { num: '+1,255', label: 'متجر شريك' },
    { num: '+9,312', label: 'مستخدم شهري' },
    { num: '+854',   label: 'كوبون نشط' },
    { num: '15.32%', label: 'متوسط الخصم' },
];

// ==================== FAQ ITEM ====================

function FaqItem({ item }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between py-4 text-right gap-4"
            >
                <span className={`text-xl transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                <span className="flex-1 font-bold text-gray-800 text-sm sm:text-base">{item.q}</span>
            </button>
            {open && (
                <p className="text-sm text-gray-600 leading-relaxed pb-4 text-right pr-2">{item.a}</p>
            )}
        </div>
    );
}

// ==================== MAIN PAGE ====================

export default function Advertise({ faqs = [] }) {

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen">

                {/* ===== HERO ===== */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <a href="/" className="text-[#00BFA5] hover:underline">الصفحة الرئيسية</a>
                            <span>\</span>
                            <span className="text-gray-700 font-medium">اعلن معنا</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                            {/* Text */}
                            <div className="text-right order-2 lg:order-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 leading-snug mb-5">
                                    ابدأ بزيادة المبيعات وضمان ازدهار علامتك التجارية مع المسوق
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                                    نحن نوفر الفرصة عبر منصتنا (موقع وتطبيق المسوق) لمختلف العلامات التجارية للإعلان معنا عبر باقات مدفوعة، لنعزّز بذلك ظهورها وزيادة الوعي بها. الشراكة معنا تتيح لك الظهور والوصول إلى قاعدة عملاء أكبر وأوسع، وبالتالي إلى زيادة المبيعات بشكل هائل.
                                </p>
                            </div>

                            {/* Visual */}
                            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3">
                                {/* Phone mockup */}
                                <div
                                    className="col-span-1 row-span-2 rounded-2xl flex flex-col items-center justify-center p-6 gap-4 min-h-[260px]"
                                    style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #4CAF50 100%)' }}
                                >
                                    <div className="text-white font-black text-2xl text-center leading-snug">
                                        اصبح اسهل مع.<br />تطبيق وموقع المسوق
                                    </div>
                                    <div className="text-6xl">📱</div>
                                    <div className="text-white/80 text-xs text-center font-bold">Almowafir</div>
                                </div>

                                {/* Top right */}
                                <div
                                    className="rounded-2xl flex items-center justify-center p-5 min-h-[120px]"
                                    style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)' }}
                                >
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🛍️</div>
                                        <p className="text-xs font-bold text-[#00BFA5]">التسوق الذكي</p>
                                    </div>
                                </div>

                                {/* Bottom right */}
                                <div
                                    className="rounded-2xl flex items-center justify-center p-5 min-h-[120px]"
                                    style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #26C6DA 100%)' }}
                                >
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">💸</div>
                                        <p className="text-xs font-black text-white">وفّر أكثر مع<br />المسوق</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10">

                    {/* ===== STATS ===== */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                                <div className="text-2xl sm:text-3xl font-black text-[#00BFA5] mb-1">{s.num}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* ===== BEST PLATFORM ===== */}
                    <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm mb-8 text-right">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-5 text-center">
                            افضل منصة اعلانية للشركات والمشاريع بأمثل الأسعار
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            احصل على أفضل حملة اعلانية فعالة في العالم العربي عبر المسوق، موقعاً وتطبيقاً، حيث يمكنك الترويج لمنتجاتك وخدماتك وزيادة الوعي بعلامتك التجارية وغيرها الكثير وغيرها الكثير بأفضل تكاليف.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            بوصفه أفضل موقع وتطبيق كوبونات وعروض خصم في العالم العربي، فإن المسوق هو أفضل منصة إعلانية للشركات والعلامات التجارية والمشاريع الصغيرة والمتوسطة والكبيرة التي تسعى لإطلاق حملات إعلانية متعددة الأهداف تستهدف الجماهير في المملكة العربية السعودية بالمقام الأول، إلى جانب الإمارات العربية المتحدة، مصر والكويت والمزيد.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            إن الإعلان عبر المسوق يضمن مضمون النتائج، ويحقق لك أعلى عائد على الاستثمار. الشراكة معنا تتيح لك تنفيذ كافة استراتيجياتك التسويقية بكل احتياجاتك بكل تأكيد وتوفر لك المجهود والمال.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            الأمر المدهش حول المسوق أنه ليس مجرد منصة إعلانية بل تطبيق خدمات لا يطبق خدمات بتوفير أقوى الكوبونات والخصومات للأهم المتاجر الإلكترونية والعلامات التجارية المحلية والعالمية، ولذلك هو منصة تفاعلية جداً بفضلها استقطاب عشاق التسوق عبر الإنترنت للحصول على أفضل توفير المال.
                        </p>
                    </div>

                    {/* ===== BEST METHOD ===== */}
                    <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm mb-8 text-right">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-5 text-center">
                            افضل طريقة لعمل اعلان ناجح للشركات والمشاريع في عالم التسوق الرقمى
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            أفضل طريقة عمل إعلان في عالم التسوق عبر الإنترنت هي الإعلان في المسوق، موقعاً أو تطبيقاً، مساء أنت أردت في ترويج منتجاتك أو إطلاق حملة لزيادة الوعي بعلامتك التجارية أو زيادة عدد تحميل التطبيق الخاص بك، فأنت ستجد ما تحتاجه لديك في المسوق المقدمة بأفضل باقات تفاعلية مدمجة.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            من أجل من خلال إطلاق حملة إعلانية عبر موقع المسوق أو تطبيقه فأنك ستحقق الوصول المباشر والفعّال إلى ملايين العملاء، سواء من خلال إعلانات الراية أو الإعلانات المبثقة أو الإشعارات أو حتى من منصات التواصل الاجتماعي وغيرها من حلول الذكاء الاصطناعي التي نعتمدها بكل احتياجاتك التسويقية سنتائي وتوفر لك المجهود والمال.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            الأمر الرائع هو أن الإعلان عبر المسوق ناجح دائماً لأن الحملات الإعلانية ستعمل على تلبية احتياجات الجماهير الخاصة أن موقعنا وتطبيقنا خاصة أن موقعنا وتطبيقنا خاصة أن الحملات مع جمهور رقمي نسق أن الموقع الرقمي يسوق في عالم رقمي نسق وداينامكيي جداً، وعليه فإن التفاعل مؤكد.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            وبالتالي، فإن الإعلان عبر المسوق ناجح دائماً لأن الحملات الإعلانية ستعمل على تلبية احتياجات الجماهير الخاصة، مع التركيز على تلبية احتياجاتهم في عالم تسوق رقمي ديناميكي جداً، وعليه فإن التفاعل مؤكد.
                        </p>
                    </div>

                    {/* ===== FEATURES GRID ===== */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-6 text-center">
                            المفهوم الأحدث للإعلانات الرقمية عبر المسوق
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-right border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="text-3xl mb-3">{f.icon}</div>
                                    <h3 className="font-black text-gray-800 mb-2">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== SME SECTION ===== */}
                    <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm mb-8 text-right">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-5 text-center">
                            افضل منصات إعلانية للشركات في السعودية للمؤسسات الناشئة، الصغيرة والكبيرة
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            المسوق هو أفضل منصة اعلانية للشركات في السعودية، سواء أكانت ناشئة أو متوسطة أو كبيرة، حيث يمكنك الاستفادة من حلول وأدوات الإعلان الرقمي المستهدف لها جمهاهير لجماهير مهتمة بالشراء والتسوق عبر الإنترنت، معتمداً على خبرتنا الطويلة في توفير المال الذي يقوم على الأساس، والتي نقوم على النمو والتحديث المستمر.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            لا يقتصر الأمر عند إنشاء حملة إعلانية عبر المسوق على الإعلانات النموذجية، بل الأمور هذا يتجاوز ذلك إلى الإعلان عبر موقعنا وتطبيقنا والإعلان عبر الكوابل المبثقة والعروض المبثقة من خلالها من خيرتنا من خيرتنا مستفيدين من الأسعار الشائقة والعروض التوفيرية، كافة منصات التواصل الاجتماعي التي ندبرها، إلى جانب الإشعارات والبريد الإلكتروني والنشرات الإخبارية والمزيد، مع نسبة تفاعل هائلة.
                        </p>
                    </div>

                    {/* ===== FAQ ===== */}

                    <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm mb-8">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-6 text-center">
                            الأسئلة الشائعة حول المسوق كمنصة إعلانية للشركات في السعودية والعالم العربي
                        </h2>
                        <div className="divide-y divide-gray-100">
                            {faqs.map((item, i) => (
                                <FaqItem key={i} item={item} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
