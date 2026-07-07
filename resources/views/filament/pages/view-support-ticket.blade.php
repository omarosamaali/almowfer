<x-filament-panels::page>
    @if ($ticket)
        @php
            $status = strtolower($ticket['status'] ?? 'open');
            $statusClass = match ($status) {
                'pending' => 'ticket-status--pending',
                'answered' => 'ticket-status--answered',
                'closed' => 'ticket-status--closed',
                default => 'ticket-status--open',
            };
            $replies = is_array($ticket['replies'] ?? null) ? $ticket['replies'] : [];
        @endphp

        <div class="sub-page ticket-page">
            <a href="{{ \App\Filament\Pages\SupportTickets::getUrl() }}" class="ticket-back-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                العودة إلى التذاكر
            </a>

            <div class="ticket-detail-card">
                <div class="ticket-detail-card__header">
                    <div>
                        <h2 class="ticket-detail-card__subject">{{ $ticket['subject'] ?? 'بدون موضوع' }}</h2>
                        @if (! empty($ticket['created_at']))
                            <time class="ticket-detail-card__date" dir="ltr">{{ $ticket['created_at'] }}</time>
                        @endif
                    </div>
                    <span class="ticket-status {{ $statusClass }}">
                        {{ supportTicketStatusLabel($status) }}
                    </span>
                </div>

                <div class="ticket-thread">
                    <div class="ticket-bubble ticket-bubble--tenant" style="background-color: #7d7d7d78;">
                        <div class="ticket-bubble__label">رسالتك</div>
                        <p class="ticket-bubble__text">{{ $ticket['message'] ?? '' }}</p>
                    </div>

                    @forelse ($replies as $reply)
                        <div class="ticket-bubble ticket-bubble--admin">
                            <div class="ticket-bubble__label">
                                فريق الدعم
                                @if (! empty($reply['created_at']))
                                    <time dir="ltr">{{ $reply['created_at'] }}</time>
                                @endif
                            </div>
                            <p class="ticket-bubble__text">{{ is_array($reply) ? ($reply['message'] ?? '') : $reply }}</p>
                        </div>
                    @empty
                        <div class="ticket-no-replies">
                            <p>لم يتم الرد على هذه التذكرة بعد. سيقوم فريق الدعم بالرد قريباً.</p>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>
    @endif
</x-filament-panels::page>
