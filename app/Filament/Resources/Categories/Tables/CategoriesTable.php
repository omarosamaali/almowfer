<?php

namespace App\Filament\Resources\Categories\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('parent.name')
                    ->label(Labels::PARENT_CATEGORY)
                    ->searchable(),
                TextColumn::make('name')
                    ->label(Labels::NAME)
                    ->searchable(),
                TextColumn::make('name_en')
                    ->label(Labels::NAME_EN)
                    ->searchable(),
                TextColumn::make('slug')
                    ->label(Labels::SLUG)
                    ->searchable(),
                TextColumn::make('icon')
                    ->label(Labels::ICON)
                    ->searchable(),
                IconColumn::make('is_light')
                    ->label(Labels::IS_LIGHT)
                    ->boolean(),
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
