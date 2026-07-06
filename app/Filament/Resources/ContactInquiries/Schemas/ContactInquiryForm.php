<?php

namespace App\Filament\Resources\ContactInquiries\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ContactInquiryForm
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
                TextInput::make('subject')
                    ->label(Labels::SUBJECT),
                Textarea::make('message')
                    ->label(Labels::MESSAGE)
                    ->required()
                    ->rows(6)
                    ->columnSpanFull(),
            ]);
    }
}
