<?php

namespace App\Filament\Resources\BlogAuthors;

use App\Filament\Resources\BlogAuthors\Pages\CreateBlogAuthor;
use App\Filament\Resources\BlogAuthors\Pages\EditBlogAuthor;
use App\Filament\Resources\BlogAuthors\Pages\ListBlogAuthors;
use App\Filament\Resources\BlogAuthors\Schemas\BlogAuthorForm;
use App\Filament\Resources\BlogAuthors\Tables\BlogAuthorsTable;
use App\Models\BlogAuthor;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BlogAuthorResource extends Resource
{
    protected static ?string $model = BlogAuthor::class;

    protected static ?string $navigationLabel = 'كُتّاب المدونة';

    protected static ?string $modelLabel = 'كاتب';

    protected static ?string $pluralModelLabel = 'كُتّاب المدونة';

    protected static string|\UnitEnum|null $navigationGroup = 'المدونة';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return BlogAuthorForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BlogAuthorsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBlogAuthors::route('/'),
            'create' => CreateBlogAuthor::route('/create'),
            'edit' => EditBlogAuthor::route('/{record}/edit'),
        ];
    }
}
