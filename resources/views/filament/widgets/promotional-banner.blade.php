<x-filament-widgets::widget>
    @if ($imageUrl)
        <div class="promo-banner">
            <img
                src="{{ $imageUrl }}"
                alt="إعلان"
                class="promo-banner__image"
                loading="lazy"
            />
        </div>
    @endif
</x-filament-widgets::widget>
