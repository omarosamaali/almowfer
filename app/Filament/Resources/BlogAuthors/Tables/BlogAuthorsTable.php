<?php

namespace App\Filament\Resources\BlogAuthors\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BlogAuthorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('slug')
                    ->label(Labels::SLUG)
                    ->searchable(),
                TextColumn::make('name')
                    ->label(Labels::NAME)
                    ->searchable(),
                TextColumn::make('name_en')
                    ->label(Labels::NAME_EN)
                    ->searchable(),
                TextColumn::make('avatar')
                    ->label(Labels::AVATAR)
                    ->searchable(),
                TextColumn::make('role')
                    ->label(Labels::ROLE)
                    ->searchable(),
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
