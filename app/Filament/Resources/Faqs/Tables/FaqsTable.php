<?php

namespace App\Filament\Resources\Faqs\Tables;

use App\Enums\FaqContext;
use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class FaqsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question')
                    ->label(Labels::QUESTION)
                    ->searchable(),
                TextColumn::make('context')
                    ->label(Labels::PLACEMENT)
                    ->formatStateUsing(fn (?string $state): string => FaqContext::labelFor($state))
                    ->badge()
                    ->searchable(),
                TextColumn::make('target')
                    ->label(Labels::TARGET)
                    ->state(function ($record): string {
                        if ($record->context === FaqContext::Store->value) {
                            return $record->store?->name ?? '—';
                        }

                        if ($record->context === FaqContext::Category->value) {
                            return $record->category?->name ?? '—';
                        }

                        return '—';
                    }),
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
