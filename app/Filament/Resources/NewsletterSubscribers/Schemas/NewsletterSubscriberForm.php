<?php

namespace App\Filament\Resources\NewsletterSubscribers\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NewsletterSubscriberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('email')
                    ->label(Labels::EMAIL)
                    ->email()
                    ->required(),
                DateTimePicker::make('subscribed_at')
                    ->label(Labels::SUBSCRIBED_AT)
                    ->required(),
            ]);
    }
}
