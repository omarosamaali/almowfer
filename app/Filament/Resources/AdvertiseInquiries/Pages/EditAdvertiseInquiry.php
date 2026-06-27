<?php

namespace App\Filament\Resources\AdvertiseInquiries\Pages;

use App\Filament\Resources\AdvertiseInquiries\AdvertiseInquiryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAdvertiseInquiry extends EditRecord
{
    protected static string $resource = AdvertiseInquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
