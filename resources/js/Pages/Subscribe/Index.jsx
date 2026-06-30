import { Link, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTenantUrl } from '../../utils/useTenantUrl';

export default function SubscribeIndex({ packages = [], paymentStatus, paymentMessage }) {
    const url = useTenantUrl();
    const { flash } = usePage().props;

    const showSuccess = paymentStatus === 'success' || flash?.success;
    const showError = paymentStatus === 'failed' || paymentStatus === 'error' || flash?.error;
    const statusMessage = paymentMessage || flash?.success || flash?.error;

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen" dir="rtl">
                <div className="max-w-5xl mx-auto px-4 py-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-gray-900 mb-3">اختر باقة الاشتراك</h1>
                        <p className="text-gray-600 text-sm">اختر الباقة المناسبة لموقعك واستمر في تقديم أفضل العروض لعملائك.</p>
                    </div>

                    {showSuccess && (
                        <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 text-green-800 px-5 py-4 text-sm font-bold text-right">
                            {statusMessage || 'تم الاشتراك بنجاح.'}
                        </div>
                    )}

                    {showError && (
                        <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 px-5 py-4 text-sm font-bold text-right">
                            {statusMessage || 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.'}
                        </div>
                    )}

                    {packages.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500">
                            لا توجد باقات متاحة حالياً. تأكد من تسجيل الدخول إلى لوحة التحكم ثم حاول مرة أخرى.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg) => (
                                <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col text-right">
                                    <h2 className="text-xl font-black text-gray-900 mb-2">{pkg.name}</h2>
                                    {pkg.plan && (
                                        <span className="inline-block self-end text-xs font-bold text-[#00BFA5] bg-[#E8F8F5] px-3 py-1 rounded-full mb-4">
                                            {pkg.plan}
                                        </span>
                                    )}
                                    <div className="text-3xl font-black text-[#00BFA5] mb-4">
                                        {pkg.price}
                                        <span className="text-sm text-gray-500 font-bold mr-1">/ شهر</span>
                                    </div>
                                    {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                                        <ul className="flex-1 space-y-2 mb-6 text-sm text-gray-600">
                                            {pkg.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-[#00BFA5] shrink-0">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link
                                        href={url(`/subscribe/checkout?package_id=${pkg.id}`)}
                                        className="block text-center bg-[#F5C518] hover:bg-yellow-400 text-black font-black py-3 rounded-xl transition-colors"
                                    >
                                        اشترك الآن
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
