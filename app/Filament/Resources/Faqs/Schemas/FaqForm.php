<?php

namespace App\Filament\Resources\Faqs\Schemas;

use App\Enums\FaqContext;
use App\Filament\Support\Labels;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Get;
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
                Select::make('context')
                    ->label(Labels::PLACEMENT)
                    ->options(FaqContext::labels())
                    ->default(FaqContext::Home->value)
                    ->live()
                    ->afterStateUpdated(function ($state, callable $set): void {
                        if ($state !== FaqContext::Store->value) {
                            $set('store_id', null);
                        }

                        if ($state !== FaqContext::Category->value) {
                            $set('category_id', null);
                        }
                    })
                    ->required(),
                Select::make('store_id')
                    ->label(Labels::TARGET_STORE)
                    ->relationship('store', 'name')
                    ->searchable()
                    ->preload()
                    ->visible(fn (Get $get): bool => $get('context') === FaqContext::Store->value)
                    ->required(fn (Get $get): bool => $get('context') === FaqContext::Store->value),
                Select::make('category_id')
                    ->label(Labels::TARGET_CATEGORY)
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->visible(fn (Get $get): bool => $get('context') === FaqContext::Category->value)
                    ->required(fn (Get $get): bool => $get('context') === FaqContext::Category->value),
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
