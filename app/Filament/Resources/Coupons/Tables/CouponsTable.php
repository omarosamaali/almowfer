<?php

namespace App\Filament\Resources\Coupons\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CouponsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('store.name')
                    ->label(Labels::STORE)
                    ->searchable(),
                TextColumn::make('category.name')
                    ->label(Labels::CATEGORY)
                    ->searchable(),
                TextColumn::make('title')
                    ->label(Labels::TITLE)
                    ->searchable(),
                TextColumn::make('discount')
                    ->label(Labels::DISCOUNT)
                    ->searchable(),
                TextColumn::make('code')
                    ->label(Labels::CODE)
                    ->searchable(),
                TextColumn::make('type')
                    ->label(Labels::TYPE)
                    ->searchable(),
                TextColumn::make('btn_label')
                    ->label(Labels::BTN_LABEL)
                    ->searchable(),
                TextColumn::make('badge')
                    ->label(Labels::BADGE)
                    ->searchable(),
                TextColumn::make('logo')
                    ->label(Labels::LOGO)
                    ->searchable(),
                TextColumn::make('used_today')
                    ->label(Labels::USED_TODAY)
                    ->numeric()
                    ->sortable(),
                TextColumn::make('last_used')
                    ->label(Labels::LAST_USED)
                    ->searchable(),
                TextColumn::make('last_saving')
                    ->label(Labels::LAST_SAVING)
                    ->searchable(),
                IconColumn::make('is_verified')
                    ->label(Labels::IS_VERIFIED)
                    ->boolean(),
                TextColumn::make('section')
                    ->label(Labels::SECTION)
                    ->searchable(),
                TextColumn::make('sort_order')
                    ->label(Labels::SORT_ORDER)
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label(Labels::IS_ACTIVE)
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label(Labels::CREATED_AT)
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label(Labels::UPDATED_AT)
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
