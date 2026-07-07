<?php

namespace App\Filament\Widgets;

use App\Services\AdminApiService;
use Filament\Widgets\Widget;

class PromotionalBannerWidget extends Widget
{
    protected static ?int $sort = -20;

    protected int|string|array $columnSpan = 'full';

    protected string $view = 'filament.widgets.promotional-banner';

    public ?string $imageUrl = null;

    public static function canView(): bool
    {
        return filled(app(AdminApiService::class)->getPromotionalBanner());
    }

    public function mount(): void
    {
        $this->imageUrl = app(AdminApiService::class)->getPromotionalBanner();
    }
}
