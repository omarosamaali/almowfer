<x-filament-panels::page>
    <div class="sub-page domain-page">
        <div class="domain-form-card">
            <div class="domain-form-card__header">
                <span class="domain-form-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="22" height="22">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </span>
                <h2 class="domain-form-card__title">طلب نطاق جديد</h2>
            </div>

            @if ($currentDomain)
                <div class="domain-status {{ $currentDomainActive ? 'domain-status--active' : 'domain-status--pending' }}">
                    <span class="domain-status__label">النطاق الحالي:</span>
                    <span class="domain-status__value" dir="ltr">{{ $currentDomain }}</span>
                    <span class="domain-status__badge">
                        {{ $currentDomainActive ? 'مُفعّل' : 'قيد الربط' }}
                    </span>
                </div>

            @else

            <form wire:submit="submitDomain" class="domain-form">
                <div class="domain-field">
                    <label class="domain-field__label" for="domain">النطاق</label>
                    <input
                        id="domain"
                        type="text"
                        wire:model="domain"
                        placeholder="example.com"
                        dir="ltr"
                        class="domain-field__input"
                    />
                    @error('domain')
                        <p class="domain-field__error">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" wire:loading.attr="disabled" class="domain-submit-btn">
                    <span wire:loading.remove wire:target="submitDomain">إرسال الطلب</span>
                    <span wire:loading wire:target="submitDomain">جاري الإرسال...</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </form>
            @endif
        </div>

        <div class="domain-guide-card">
            <div class="domain-guide-card__header">
                <span class="domain-guide-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </span>
                <h3 class="domain-guide-card__title">كيفية ربط النطاق الخاص بك</h3>
            </div>

            <p class="domain-guide-card__intro">
                قم بتغيير سجلات خادم الأسماء في موقع مزود النطاق الخاص بك.
            </p>

            <ol class="domain-guide-card__steps">
                <li>قم بتسجيل الدخول إلى حساب GoDaddy الخاص بك</li>
                <li>انتقل إلى صفحة إدارة النطاق الخاص بك وابحث عن خوادم الأسماء (أو خوادم الأسماء المخصصة).</li>
                <li>احذف سجلات خادم الأسماء الموجودة والصق سجلات خوادم الأسماء التالية:</li>
            </ol>

            <div class="domain-ns-box">
                <code dir="ltr">ns1.dns-parking.com</code>
                <code dir="ltr">ns2.dns-parking.com</code>
            </div>

            <div class="domain-note">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="18" height="18">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <p>
                    <strong>ملاحظة:</strong>
                    قد يستغرق ربط النطاق الخاص بك ما يصل إلى 24 ساعة. قد تتوقف إعدادات DNS المخصصة مثل البريد الإلكتروني أو الخدمات الأخرى عن العمل ما لم تقم بإضافتها مرة أخرى في Hostinger.
                </p>
            </div>
        </div>
    </div>
</x-filament-panels::page>
