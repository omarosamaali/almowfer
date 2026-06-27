<?php

namespace App\Filament\Resources\SiteStats\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SiteStatForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('icon')
                    ->label(Labels::ICON),
                TextInput::make('value')
                    ->label(Labels::VALUE)
                    ->required(),
                TextInput::make('label')
                    ->label(Labels::LABEL)
                    ->required(),
                TextInput::make('page')
                    ->label(Labels::PAGE)
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
