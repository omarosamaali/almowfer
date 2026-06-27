<?php

namespace App\Filament\Resources\BlogArticles\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class BlogArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('blog_author_id')
                    ->label(Labels::BLOG_AUTHOR_ID)
                    ->numeric(),
                TextInput::make('slug')
                    ->label(Labels::SLUG)
                    ->required(),
                TextInput::make('tag')
                    ->label(Labels::TAG),
                TextInput::make('tag_en')
                    ->label(Labels::TAG_EN),
                TextInput::make('tag_color')
                    ->label(Labels::TAG_COLOR),
                TextInput::make('title')
                    ->label(Labels::TITLE)
                    ->required(),
                TextInput::make('label')
                    ->label(Labels::LABEL),
                TextInput::make('img')
                    ->label(Labels::IMG),
                TextInput::make('published_at')
                    ->label(Labels::PUBLISHED_AT),
                TextInput::make('read_time')
                    ->label(Labels::READ_TIME),
                TextInput::make('views')
                    ->label(Labels::VIEWS),
                Textarea::make('intro')
                    ->label(Labels::INTRO)
                    ->columnSpanFull(),
                Textarea::make('sections')
                    ->label(Labels::SECTIONS)
                    ->columnSpanFull(),
                Textarea::make('related_slugs')
                    ->label(Labels::RELATED_SLUGS)
                    ->columnSpanFull(),
                Toggle::make('is_published')
                    ->label(Labels::IS_PUBLISHED)
                    ->required(),
            ]);
    }
}
