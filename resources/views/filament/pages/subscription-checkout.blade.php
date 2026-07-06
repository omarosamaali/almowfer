<x-filament-panels::page>
    <div class="sub-page sub-checkout">
        <a href="{{ \App\Filament\Pages\SubscriptionPackages::getUrl() }}" class="sub-checkout__back">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            العودة للباقات
        </a>

        @if ($selectedPackage)
            <div class="sub-checkout__panel">
                <div class="sub-hero" style="padding: 1.25rem 1rem; margin-bottom: 1.5rem;">
                    <h1 class="sub-hero__title" style="font-size: 1.35rem; margin-bottom: 0.25rem;">إتمام الاشتراك</h1>
                    <p class="sub-hero__subtitle" style="font-size: 0.8125rem;">راجع تفاصيل الباقة ثم أكمل الدفع بأمان عبر Ziina.</p>
                </div>

                <div class="sub-checkout__summary">
                    <h2 class="sub-checkout__summary-name">{{ $selectedPackage['name'] ?? '' }}</h2>
                    <p class="sub-checkout__summary-price">{{ $selectedPackage['price'] ?? '' }}</p>
                    @if (! empty($selectedPackage['plan']))
                        <p class="sub-checkout__summary-plan">{{ $selectedPackage['plan'] }}</p>
                    @endif
                </div>

                <form wire:submit="processPayment">
                    <div class="sub-field">
                        <label class="sub-field__label" for="billingPeriod">مدة الفوترة</label>
                        <select id="billingPeriod" wire:model="billingPeriod" class="sub-field__select">
                            <option value="monthly">شهري</option>
                            <option value="yearly">سنوي</option>
                        </select>
                        @error('billingPeriod')
                            <p class="sub-field__error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="sub-field">
                        <label class="sub-field__label" for="coupon">كود الخصم (اختياري)</label>
                        <input
                            id="coupon"
                            type="text"
                            wire:model="coupon"
                            placeholder="أدخل كود الخصم"
                            class="sub-field__input"
                        />
                        @error('coupon')
                            <p class="sub-field__error">{{ $message }}</p>
                        @enderror
                    </div>

                    <button type="submit" wire:loading.attr="disabled" class="sub-pay-btn">
                        <span wire:loading.remove wire:target="processPayment">الدفع عبر Ziina</span>
                        <span wire:loading wire:target="processPayment">جاري التحويل للدفع...</span>
                    </button>

                    <p class="sub-pay-note">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="14" height="14">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        عملية الدفع آمنة ومشفّرة
                    </p>
                </form>
            </div>
        @endif
    </div>
</x-filament-panels::page>
