<?php

namespace App\Filament\Resources\AdvertiseInquiries;

use App\Filament\Resources\AdvertiseInquiries\Pages\CreateAdvertiseInquiry;
use App\Filament\Resources\AdvertiseInquiries\Pages\EditAdvertiseInquiry;
use App\Filament\Resources\AdvertiseInquiries\Pages\ListAdvertiseInquiries;
use App\Filament\Resources\AdvertiseInquiries\Schemas\AdvertiseInquiryForm;
use App\Filament\Resources\AdvertiseInquiries\Tables\AdvertiseInquiriesTable;
use App\Models\AdvertiseInquiry;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AdvertiseInquiryResource extends Resource
{
    protected static ?string $model = AdvertiseInquiry::class;

    protected static ?string $navigationLabel = 'طلبات الإعلان';

    protected static ?string $modelLabel = 'طلب إعلان';

    protected static ?string $pluralModelLabel = 'طلبات الإعلان';

    protected static string|\UnitEnum|null $navigationGroup = 'الاستفسارات';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return AdvertiseInquiryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AdvertiseInquiriesTable::configure($table);
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
            'index' => ListAdvertiseInquiries::route('/'),
            'create' => CreateAdvertiseInquiry::route('/create'),
            'edit' => EditAdvertiseInquiry::route('/{record}/edit'),
        ];
    }
}
