<?php

namespace App\Filament\Resources\Coupons\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CouponForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('store_id')
                    ->label(Labels::STORE)
                    ->relationship('store', 'name')
                    ->required(),
                Select::make('category_id')
                    ->label(Labels::CATEGORY)
                    ->relationship('category', 'name'),
                TextInput::make('title')
                    ->label(Labels::TITLE)
                    ->required(),
                Textarea::make('description')
                    ->label(Labels::DESCRIPTION)
                    ->columnSpanFull(),
                TextInput::make('discount')
                    ->label(Labels::DISCOUNT)
                    ->required(),
                TextInput::make('code')
                    ->label(Labels::CODE),
                TextInput::make('type')
                    ->label(Labels::TYPE),
                TagsInput::make('badges')
                    ->label(Labels::BADGES)
                    ->separator(','),
                TextInput::make('btn_label')
                    ->label(Labels::BTN_LABEL),
                TextInput::make('badge')
                    ->label(Labels::BADGE),
                TextInput::make('logo')
                    ->label(Labels::LOGO),
                TextInput::make('used_today')
                    ->label(Labels::USED_TODAY)
                    ->numeric(),
                TextInput::make('last_used')
                    ->label(Labels::LAST_USED),
                TextInput::make('last_saving')
                    ->label(Labels::LAST_SAVING),
                Toggle::make('is_verified')
                    ->label(Labels::IS_VERIFIED)
                    ->required(),
                TextInput::make('section')
                    ->label(Labels::SECTION),
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
