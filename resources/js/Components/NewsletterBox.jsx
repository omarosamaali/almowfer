import { useState } from 'react';

export default function NewsletterBox() {
    const [email,      setEmail]      = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const submit = () => {
        if (!email.trim() || !email.includes('@')) return;
        setSubscribed(true);
    };

    return (
        <div className="bg-linear-to-br from-[#00BFA5] to-[#4CAF50] rounded-2xl p-4 text-white">
            {subscribed ? (
                <div className="flex flex-col items-center gap-3 py-3 text-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl animate-bounce">🎉</div>
                    <p className="font-black text-lg">مبروك!</p>
                    <p className="text-sm opacity-90 leading-relaxed">
                        لقد تم إضافة بريدك الإلكتروني إلى قائمة الموفر البريدية.
                    </p>
                    <p className="text-xs opacity-75">ستصلك أفضل العروض والكوبونات الحصرية قريباً 💌</p>
                </div>
            ) : (
                <>
                    <div className="text-right mb-3">
                        <div className="text-2xl mb-1">✉️✉️</div>
                        <h3 className="font-extrabold text-base sm:text-lg">إشترك في قائمة الموفر البريدية</h3>
                        <p className="text-sm opacity-90 mt-1">احصل على عروض وكوبونات حصرية مباشرة على بريدك الالكتروني</p>
                    </div>
                    <div className="flex">
                        <button
                            onClick={submit}
                            className="bg-white text-[#00BFA5] font-bold px-3 py-2 rounded-r-xl text-sm hover:bg-gray-100 transition-colors shrink-0"
                        >»</button>
                        <input
                            type="email"
                            placeholder="أدخل بريدك الالكتروني"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && submit()}
                            className="flex-1 min-w-0 bg-white/20 text-white placeholder-white/70 px-3 py-2 rounded-l-xl text-sm focus:outline-none border border-white/30"
                        />
                    </div>
                </>
            )}
        </div>
    );
}
