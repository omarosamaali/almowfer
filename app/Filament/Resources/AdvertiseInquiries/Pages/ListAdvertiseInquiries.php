<?php

namespace App\Filament\Resources\AdvertiseInquiries\Pages;

use App\Filament\Resources\AdvertiseInquiries\AdvertiseInquiryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAdvertiseInquiries extends ListRecords
{
    protected static string $resource = AdvertiseInquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
