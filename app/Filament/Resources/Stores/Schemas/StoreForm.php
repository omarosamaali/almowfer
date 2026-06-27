<?php

namespace App\Filament\Resources\Stores\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StoreForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->label(Labels::CATEGORY)
                    ->relationship('category', 'name'),
                TextInput::make('name')
                    ->label(Labels::NAME)
                    ->required(),
                TextInput::make('name_ar')
                    ->label(Labels::NAME_AR),
                TextInput::make('slug')
                    ->label(Labels::SLUG)
                    ->required(),
                TextInput::make('domain')
                    ->label(Labels::DOMAIN)
                    ->required(),
                TextInput::make('color')
                    ->label(Labels::COLOR),
                TextInput::make('text_color')
                    ->label(Labels::TEXT_COLOR),
                TextInput::make('logo')
                    ->label(Labels::LOGO),
                TextInput::make('rating')
                    ->label(Labels::RATING)
                    ->numeric(),
                TextInput::make('review_count')
                    ->label(Labels::REVIEW_COUNT)
                    ->required()
                    ->numeric()
                    ->default(0),
                Textarea::make('description')
                    ->label(Labels::DESCRIPTION)
                    ->columnSpanFull(),
                TextInput::make('category_label')
                    ->label(Labels::CATEGORY_LABEL),
                TextInput::make('default_code')
                    ->label(Labels::DEFAULT_CODE),
                DatePicker::make('last_update')
                    ->label(Labels::LAST_UPDATE),
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
