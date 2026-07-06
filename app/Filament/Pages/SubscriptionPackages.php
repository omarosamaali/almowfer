<?php

namespace App\Filament\Pages;

use App\Services\AdminApiService;
use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class SubscriptionPackages extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCreditCard;

    protected static ?string $navigationLabel = 'باقات الاشتراك';

    protected static ?string $title = 'اختر باقة الاشتراك';

    protected static ?string $slug = 'subscription-packages';

    protected static ?int $navigationSort = -100;

    protected string $view = 'filament.pages.subscription-packages';

    /** @var list<array<string, mixed>> */
    public array $packages = [];

    public ?string $paymentStatus = null;

    public ?string $paymentMessage = null;

    public function mount(): void
    {
        $this->packages = app(AdminApiService::class)->getPackages();
        $this->paymentStatus = request()->query('status');
        $this->paymentMessage = request()->query('message');
    }

    public function getHeading(): string
    {
        return '';
    }

    public function getSubheading(): ?string
    {
        return null;
    }
}
