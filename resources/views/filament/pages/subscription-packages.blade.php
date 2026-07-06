<x-filament-panels::page>
    <div class="sub-page">
        <div class="sub-hero">
            <div class="sub-hero__icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="28" height="28">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
            </div>
            <h1 class="sub-hero__title">اختر باقة الاشتراك</h1>
            <p class="sub-hero__subtitle">اختر الباقة المناسبة لموقعك واستمر في تقديم أفضل العروض والكوبونات لعملائك.</p>
        </div>

        @if ($paymentStatus === 'success')
            <div class="sub-alert sub-alert--success">
                <svg class="sub-alert__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{{ $paymentMessage ?: 'تم الاشتراك بنجاح.' }}</span>
            </div>
        @endif

        @if (in_array($paymentStatus, ['failed', 'error'], true))
            <div class="sub-alert sub-alert--error">
                <svg class="sub-alert__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span>{{ $paymentMessage ?: 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.' }}</span>
            </div>
        @endif

        @if (count($packages) === 0)
            <div class="sub-empty">
                <svg class="sub-empty__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <p class="sub-empty__text">لا توجد باقات متاحة حالياً.<br>تأكد من اتصال Admin API ثم حاول مرة أخرى.</p>
            </div>
        @else
            <div class="sub-grid">
                @foreach ($packages as $index => $package)
                    @php
                        $isFeatured = count($packages) >= 3 && $index === 1;
                    @endphp
                    <article class="sub-card {{ $isFeatured ? 'sub-card--featured' : '' }}">
                        @if ($isFeatured)
                            <span class="sub-card__badge">الأكثر شعبية</span>
                        @endif

                        @if (! empty($package['plan']))
                            <span class="sub-card__plan">{{ $package['plan'] }}</span>
                        @endif

                        <h2 class="sub-card__name">{{ $package['name'] ?? '' }}</h2>

                        <div class="sub-card__price-wrap">
                            <div class="sub-card__price">
                                {{ $package['price'] ?? '' }}
                                <span class="sub-card__period">/ شهر</span>
                            </div>
                        </div>

                        @if (! empty($package['features']) && is_array($package['features']))
                            <ul class="sub-card__features">
                                @foreach ($package['features'] as $feature)
                                    <li class="sub-card__feature">
                                        <span class="sub-card__check">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </span>
                                        <span>{{ $feature }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        @endif

                        <a
                            href="{{ \App\Filament\Pages\SubscriptionCheckout::getUrl() }}?package_id={{ $package['id'] }}"
                            class="sub-card__cta"
                        >
                            اشترك الآن
                        </a>
                    </article>
                @endforeach
            </div>
        @endif
    </div>
</x-filament-panels::page>
