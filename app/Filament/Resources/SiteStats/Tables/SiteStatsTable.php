<?php

namespace App\Filament\Resources\SiteStats\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteStatsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('icon')
                    ->label(Labels::ICON)
                    ->searchable(),
                TextColumn::make('value')
                    ->label(Labels::VALUE)
                    ->searchable(),
                TextColumn::make('label')
                    ->label(Labels::LABEL)
                    ->searchable(),
                TextColumn::make('page')
                    ->label(Labels::PAGE)
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
