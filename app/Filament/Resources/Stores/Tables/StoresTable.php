<?php

namespace App\Filament\Resources\Stores\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class StoresTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('category.name')
                    ->label(Labels::CATEGORY)
                    ->searchable(),
                TextColumn::make('name')
                    ->label(Labels::NAME)
                    ->searchable(),
                TextColumn::make('name_ar')
                    ->label(Labels::NAME_AR)
                    ->searchable(),
                TextColumn::make('slug')
                    ->label(Labels::SLUG)
                    ->searchable(),
                TextColumn::make('domain')
                    ->label(Labels::DOMAIN)
                    ->searchable(),
                TextColumn::make('color')
                    ->label(Labels::COLOR)
                    ->searchable(),
                TextColumn::make('text_color')
                    ->label(Labels::TEXT_COLOR)
                    ->searchable(),
                TextColumn::make('logo')
                    ->label(Labels::LOGO)
                    ->searchable(),
                TextColumn::make('rating')
                    ->label(Labels::RATING)
                    ->numeric()
                    ->sortable(),
                TextColumn::make('review_count')
                    ->label(Labels::REVIEW_COUNT)
                    ->numeric()
                    ->sortable(),
                TextColumn::make('category_label')
                    ->label(Labels::CATEGORY_LABEL)
                    ->searchable(),
                TextColumn::make('default_code')
                    ->label(Labels::DEFAULT_CODE)
                    ->searchable(),
                TextColumn::make('last_update')
                    ->label(Labels::LAST_UPDATE)
                    ->date()
                    ->sortable(),
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
