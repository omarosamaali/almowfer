<?php

namespace App\Filament\Pages;

use App\Services\AdminApiService;
use BackedEnum;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class SupportTickets extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    protected static ?string $navigationLabel = 'تذاكر الدعم';

    protected static string|UnitEnum|null $navigationGroup = 'الإعدادات';

    protected static ?int $navigationSort = 15;

    protected static ?string $slug = 'support-tickets';

    protected static ?string $title = 'تذاكر الدعم الفني';

    protected string $view = 'filament.pages.support-tickets';

    /** @var list<array<string, mixed>> */
    public array $tickets = [];

    public string $subject = '';

    public string $message = '';

    public function mount(): void
    {
        $this->loadTickets();
    }

    public function createTicket(): void
    {
        $this->validate([
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ], [
            'subject.required' => 'يرجى إدخال موضوع التذكرة.',
            'message.required' => 'يرجى إدخال نص الرسالة.',
        ]);

        $response = app(AdminApiService::class)->createTicket($this->subject, $this->message);

        if (($response['success'] ?? false) === true) {
            $this->subject = '';
            $this->message = '';
            $this->loadTickets();

            Notification::make()
                ->title($response['message'] ?? 'تم إرسال التذكرة بنجاح.')
                ->success()
                ->send();

            return;
        }

        Notification::make()
            ->title($response['message'] ?? 'فشل إرسال التذكرة.')
            ->danger()
            ->send();
    }

    protected function loadTickets(): void
    {
        $this->tickets = getSupportTickets();
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
