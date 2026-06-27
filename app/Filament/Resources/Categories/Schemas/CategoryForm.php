<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('parent_id')
                    ->label(Labels::PARENT_CATEGORY)
                    ->relationship('parent', 'name'),
                TextInput::make('name')
                    ->label(Labels::NAME)
                    ->required(),
                TextInput::make('name_en')
                    ->label(Labels::NAME_EN),
                TextInput::make('slug')
                    ->label(Labels::SLUG)
                    ->required(),
                TextInput::make('icon')
                    ->label(Labels::ICON),
                Textarea::make('bg_gradient')
                    ->label(Labels::BG_GRADIENT)
                    ->columnSpanFull(),
                Toggle::make('is_light')
                    ->label(Labels::IS_LIGHT)
                    ->required(),
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
