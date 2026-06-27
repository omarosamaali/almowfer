<?php

namespace App\Filament\Resources\BlogArticles\Tables;

use App\Filament\Support\Labels;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BlogArticlesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('blog_author_id')
                    ->label(Labels::BLOG_AUTHOR_ID)
                    ->numeric()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label(Labels::SLUG)
                    ->searchable(),
                TextColumn::make('tag')
                    ->label(Labels::TAG)
                    ->searchable(),
                TextColumn::make('tag_en')
                    ->label(Labels::TAG_EN)
                    ->searchable(),
                TextColumn::make('tag_color')
                    ->label(Labels::TAG_COLOR)
                    ->searchable(),
                TextColumn::make('title')
                    ->label(Labels::TITLE)
                    ->searchable(),
                TextColumn::make('label')
                    ->label(Labels::LABEL)
                    ->searchable(),
                TextColumn::make('img')
                    ->label(Labels::IMG)
                    ->searchable(),
                TextColumn::make('published_at')
                    ->label(Labels::PUBLISHED_AT)
                    ->searchable(),
                TextColumn::make('read_time')
                    ->label(Labels::READ_TIME)
                    ->searchable(),
                TextColumn::make('views')
                    ->label(Labels::VIEWS)
                    ->searchable(),
                IconColumn::make('is_published')
                    ->label(Labels::IS_PUBLISHED)
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
