<x-filament-panels::page>
    <div class="sub-page ticket-page">
        <div class="ticket-form-card">
            <div class="ticket-form-card__header">
                <span class="ticket-form-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="22" height="22">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </span>
                <h2 class="ticket-form-card__title">تذكرة دعم جديدة</h2>
            </div>

            <p class="ticket-form-card__intro">
                صف مشكلتك أو استفسارك وسيقوم فريق الدعم بالرد عليك في أقرب وقت.
            </p>

            <form wire:submit="createTicket" class="ticket-form">
                <div class="ticket-field">
                    <label class="ticket-field__label" for="ticket-subject">الموضوع</label>
                    <input
                        id="ticket-subject"
                        type="text"
                        wire:model="subject"
                        placeholder="موضوع التذكرة"
                        class="ticket-field__input"
                    />
                    @error('subject')
                        <p class="ticket-field__error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="ticket-field">
                    <label class="ticket-field__label" for="ticket-message">الرسالة</label>
                    <textarea
                        id="ticket-message"
                        wire:model="message"
                        rows="5"
                        placeholder="اشرح مشكلتك بالتفصيل..."
                        class="ticket-field__textarea"
                    ></textarea>
                    @error('message')
                        <p class="ticket-field__error">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" wire:loading.attr="disabled" class="ticket-submit-btn">
                    <span wire:loading.remove wire:target="createTicket">إرسال التذكرة</span>
                    <span wire:loading wire:target="createTicket">جاري الإرسال...</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </form>
        </div>

        <div class="ticket-list-card">
            <div class="ticket-list-card__header">
                <h3 class="ticket-list-card__title">تذاكري</h3>
                <span class="ticket-list-card__count">{{ count($tickets) }} تذكرة</span>
            </div>

            @if (count($tickets) === 0)
                <div class="ticket-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" width="40" height="40">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p>لا توجد تذاكر بعد.</p>
                </div>
            @else
                <div class="ticket-list">
                    @foreach ($tickets as $ticket)
                        @php
                            $status = strtolower($ticket['status'] ?? 'open');
                            $statusClass = match ($status) {
                                'pending' => 'ticket-status--pending',
                                'answered' => 'ticket-status--answered',
                                'closed' => 'ticket-status--closed',
                                default => 'ticket-status--open',
                            };
                        @endphp
                        <article class="ticket-item">
                            <div class="ticket-item__main">
                                <h4 class="ticket-item__subject">{{ $ticket['subject'] ?? 'بدون موضوع' }}</h4>
                                <p class="ticket-item__preview">{{ \Illuminate\Support\Str::limit($ticket['message'] ?? '', 80) }}</p>
                                @if (! empty($ticket['created_at']))
                                    <time class="ticket-item__date" dir="ltr">{{ $ticket['created_at'] }}</time>
                                @endif
                            </div>
                            <div class="ticket-item__actions">
                                <span class="ticket-status {{ $statusClass }}">
                                    {{ supportTicketStatusLabel($status) }}
                                </span>
                                <a
                                    href="{{ \App\Filament\Pages\ViewSupportTicket::getUrl(['ticket' => $ticket['id'] ?? '']) }}"
                                    class="ticket-item__link"
                                >
                                    عرض التفاصيل
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-filament-panels::page>
