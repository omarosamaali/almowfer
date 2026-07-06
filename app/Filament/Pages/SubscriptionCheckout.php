<?php

namespace App\Filament\Pages;

use App\Services\AdminApiService;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SubscriptionCheckout extends Page
{
    protected static ?string $slug = 'subscription-checkout';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $title = 'إتمام الاشتراك';

    protected string $view = 'filament.pages.subscription-checkout';

    public ?array $selectedPackage = null;

    public string $billingPeriod = 'monthly';

    public string $coupon = '';

    public function mount(): void
    {
        $packageId = request()->query('package_id');

        if (! $packageId) {
            $this->redirect(SubscriptionPackages::getUrl());

            return;
        }

        $this->selectedPackage = collect(app(AdminApiService::class)->getPackages())
            ->first(fn ($package) => ($package['id'] ?? null) == $packageId);

        if (! $this->selectedPackage) {
            Notification::make()
                ->title('الباقة غير موجودة.')
                ->danger()
                ->send();

            $this->redirect(SubscriptionPackages::getUrl());
        }
    }

    public function processPayment(): void
    {
        $this->validate([
            'billingPeriod' => 'required|in:monthly,yearly',
            'coupon' => 'nullable|string',
        ]);

        $response = app(AdminApiService::class)->processPayment([
            'package_id' => $this->selectedPackage['id'],
            'coupon' => $this->coupon ?: null,
            'billing_period' => $this->billingPeriod,
            'callback' => SubscriptionPackages::getUrl(),
        ]);

        if (($response['success'] ?? false) === true && isset($response['data']['payment_url'])) {
            $this->redirect($response['data']['payment_url'], navigate: false);

            return;
        }

        Notification::make()
            ->title($response['message'] ?? 'فشل بدء عملية الدفع.')
            ->danger()
            ->send();
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
