<?php

namespace App\Filament\Pages;

use App\Services\AdminApiService;
use BackedEnum;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class RequestDomain extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedGlobeAlt;

    protected static ?string $navigationLabel = 'طلب نطاق جديد';

    protected static string|UnitEnum|null $navigationGroup = 'الإعدادات';

    protected static ?int $navigationSort = 10;

    protected static ?string $slug = 'request-domain';

    protected string $view = 'filament.pages.request-domain';

    public string $domain = '';

    public ?string $currentDomain = null;

    public ?bool $currentDomainActive = null;

    public function mount(): void
    {
        $tenantDomain = getTenantDetails()['data']['domain'] ?? null;

        if (is_array($tenantDomain) && ! empty($tenantDomain['domain'])) {
            $this->currentDomain = $tenantDomain['domain'];
            $this->currentDomainActive = (bool) ($tenantDomain['status'] ?? false);
            $this->domain = $tenantDomain['domain'];
        }
    }

    public function submitDomain(): void
    {
        $this->validate([
            'domain' => [
                'required',
                'string',
                'max:255',
                'regex:/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/',
            ],
        ], [
            'domain.required' => 'يرجى إدخال النطاق.',
            'domain.regex' => 'صيغة النطاق غير صالحة. مثال: example.com',
        ]);

        $response = app(AdminApiService::class)->setDomain($this->domain);

        if (($response['success'] ?? false) === true) {
            $this->currentDomain = $this->domain;
            $this->currentDomainActive = false;

            Notification::make()
                ->title($response['message'] ?? 'تم إرسال طلب النطاق بنجاح.')
                ->success()
                ->send();

            return;
        }

        Notification::make()
            ->title($response['message'] ?? 'فشل إرسال طلب النطاق.')
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
