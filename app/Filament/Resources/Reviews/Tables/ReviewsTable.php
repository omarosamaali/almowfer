<?php

namespace App\Filament\Resources\Reviews\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('reviewable_type')
                    ->label(Labels::REVIEWABLE_TYPE)
                    ->searchable(),
                TextColumn::make('reviewable_id')
                    ->label(Labels::REVIEWABLE_ID)
                    ->numeric()
                    ->sortable(),
                TextColumn::make('context')
                    ->label(Labels::CONTEXT)
                    ->searchable(),
                TextColumn::make('name')
                    ->label(Labels::NAME)
                    ->searchable(),
                TextColumn::make('avatar')
                    ->label(Labels::AVATAR)
                    ->searchable(),
                TextColumn::make('initials')
                    ->label(Labels::INITIALS)
                    ->searchable(),
                TextColumn::make('bg_color')
                    ->label(Labels::BG_COLOR)
                    ->searchable(),
                TextColumn::make('stars')
                    ->label(Labels::STARS)
                    ->numeric()
                    ->sortable(),
                TextColumn::make('review_date')
                    ->label(Labels::REVIEW_DATE)
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
