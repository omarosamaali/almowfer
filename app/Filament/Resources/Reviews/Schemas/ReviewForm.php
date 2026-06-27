<?php

namespace App\Filament\Resources\Reviews\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('reviewable_type')
                    ->label(Labels::REVIEWABLE_TYPE),
                TextInput::make('reviewable_id')
                    ->label(Labels::REVIEWABLE_ID)
                    ->numeric(),
                TextInput::make('context')
                    ->label(Labels::CONTEXT)
                    ->required()
                    ->default('global'),
                TextInput::make('name')
                    ->label(Labels::NAME)
                    ->required(),
                TextInput::make('avatar')
                    ->label(Labels::AVATAR),
                TextInput::make('initials')
                    ->label(Labels::INITIALS),
                TextInput::make('bg_color')
                    ->label(Labels::BG_COLOR),
                TextInput::make('stars')
                    ->label(Labels::STARS)
                    ->required()
                    ->numeric()
                    ->default(5),
                Textarea::make('text')
                    ->label(Labels::TEXT)
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('review_date')
                    ->label(Labels::REVIEW_DATE),
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
