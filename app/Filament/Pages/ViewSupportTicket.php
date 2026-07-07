<?php

namespace App\Filament\Pages;

use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ViewSupportTicket extends Page
{
    protected static ?string $slug = 'support-tickets/view';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $title = 'تفاصيل التذكرة';

    protected string $view = 'filament.pages.view-support-ticket';

    /** @var array<string, mixed>|null */
    public ?array $ticket = null;

    public function mount(): void
    {
        $ticketId = request()->query('ticket');

        if (! $ticketId) {
            $this->redirectToList('معرّف التذكرة غير صالح.');

            return;
        }

        $this->ticket = collect(getSupportTickets())
            ->first(fn ($ticket) => (string) ($ticket['id'] ?? '') === (string) $ticketId);

        if (! $this->ticket) {
            $this->redirectToList('التذكرة غير موجودة.');
        }
    }

    protected function redirectToList(string $message): void
    {
        Notification::make()
            ->title($message)
            ->danger()
            ->send();

        $this->redirect(SupportTickets::getUrl());

        return;
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
