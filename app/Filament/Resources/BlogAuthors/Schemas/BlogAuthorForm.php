<?php

namespace App\Filament\Resources\BlogAuthors\Schemas;

use App\Filament\Support\Labels;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BlogAuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->label(Labels::SLUG)
                    ->required(),
                TextInput::make('name')
                    ->label(Labels::NAME)
                    ->required(),
                TextInput::make('name_en')
                    ->label(Labels::NAME_EN),
                TextInput::make('avatar')
                    ->label(Labels::AVATAR),
                TextInput::make('role')
                    ->label(Labels::ROLE),
                Textarea::make('bio')
                    ->label(Labels::BIO)
                    ->columnSpanFull(),
                Textarea::make('social')
                    ->label(Labels::SOCIAL)
                    ->columnSpanFull(),
            ]);
    }
}
