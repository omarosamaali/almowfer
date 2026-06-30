<?php

namespace App\Filament\Auth\Pages;

use App\Services\AdminApiService;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Filament\Auth\Pages\Login as BaseLogin;

class Login extends BaseLogin
{
    public function authenticate(): ?LoginResponse
    {
        $credentials = $this->form->getState();
        $response = parent::authenticate();

        if ($response !== null) {
            app(AdminApiService::class)->storeTokenFromLogin(
                $credentials['email'],
                $credentials['password'],
            );
        }

        return $response;
    }
}
