import { Link, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTenantUrl } from '../../utils/useTenantUrl';

export default function SubscribeCheckout({ selectedPackage }) {
    const url = useTenantUrl();
    const { data, setData, post, processing, errors } = useForm({
        package_id: selectedPackage?.id ?? '',
        billing_period: 'monthly',
        coupon: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(url('/subscribe/process-payment'));
    };

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen" dir="rtl">
                <div className="max-w-2xl mx-auto px-4 py-10">
                    <div className="mb-6">
                        <Link href={url('/subscribe')} className="text-sm text-[#00BFA5] hover:underline font-bold">
                            ← العودة للباقات
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h1 className="text-2xl font-black text-gray-900 mb-2 text-right">إتمام الاشتراك</h1>
                        <p className="text-gray-600 text-sm mb-6 text-right">راجع تفاصيل الباقة ثم أكمل الدفع عبر Ziina.</p>

                        <div className="bg-gray-50 rounded-xl p-5 mb-6 text-right">
                            <h2 className="font-black text-lg text-gray-900 mb-1">{selectedPackage?.name}</h2>
                            <p className="text-[#00BFA5] font-black text-2xl">{selectedPackage?.price}</p>
                            {selectedPackage?.plan && (
                                <p className="text-xs text-gray-500 mt-2">{selectedPackage.plan}</p>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div className="text-right">
                                <label className="block text-sm font-bold text-gray-700 mb-2">مدة الفوترة</label>
                                <select
                                    value={data.billing_period}
                                    onChange={(e) => setData('billing_period', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00BFA5]"
                                >
                                    <option value="monthly">شهري</option>
                                    <option value="yearly">سنوي</option>
                                </select>
                                {errors.billing_period && (
                                    <p className="text-red-500 text-xs mt-1">{errors.billing_period}</p>
                                )}
                            </div>

                            <div className="text-right">
                                <label className="block text-sm font-bold text-gray-700 mb-2">كود الخصم (اختياري)</label>
                                <input
                                    type="text"
                                    value={data.coupon}
                                    onChange={(e) => setData('coupon', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00BFA5]"
                                    placeholder="أدخل كود الخصم"
                                />
                                {errors.coupon && (
                                    <p className="text-red-500 text-xs mt-1">{errors.coupon}</p>
                                )}
                            </div>

                            {errors.package_id && (
                                <p className="text-red-500 text-sm text-right">{errors.package_id}</p>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#F5C518] hover:bg-yellow-400 disabled:opacity-60 text-black font-black py-3 rounded-xl transition-colors"
                            >
                                {processing ? 'جاري التحويل للدفع...' : 'الدفع عبر Ziina'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
