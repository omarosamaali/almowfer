<?php

namespace App\Filament\Resources\Faqs\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('question')
                    ->label(Labels::QUESTION)
                    ->required(),
                Textarea::make('answer')
                    ->label(Labels::ANSWER)
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('context')
                    ->label(Labels::CONTEXT)
                    ->required()
                    ->default('home'),
                TextInput::make('sort_order')
                    ->label(Labels::SORT_ORDER)
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->label(Labels::IS_ACTIVE)
                    ->required(),
            ]);
    }
}
