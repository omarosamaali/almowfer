<?php

namespace App\Filament\Resources\AdvertiseInquiries\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AdvertiseInquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label(Labels::NAME)
                    ->required(),
                TextInput::make('email')
                    ->label(Labels::EMAIL)
                    ->email()
                    ->required(),
                TextInput::make('company')
                    ->label(Labels::COMPANY),
                TextInput::make('phone')
                    ->label(Labels::PHONE)
                    ->tel(),
                Textarea::make('message')
                    ->label(Labels::MESSAGE)
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
