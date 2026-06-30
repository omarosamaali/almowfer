<?php

namespace App\Filament\Auth\Pages;

use App\Models\User;
use App\Services\AdminApiService;
use DanHarrin\LivewireRateLimiting\Exceptions\TooManyRequestsException;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Facades\Filament;
use Illuminate\Auth\SessionGuard;
use Illuminate\Support\Str;

class Login extends BaseLogin
{
    public function authenticate(): ?LoginResponse
    {
        try {
            $this->rateLimit(5);
        } catch (TooManyRequestsException $exception) {
            $this->getRateLimitedNotification($exception)?->send();

            return null;
        }

        if (config('services.admin.url')) {
            return $this->authenticateViaAdminApi($this->form->getState());
        }

        return parent::authenticate();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    protected function authenticateViaAdminApi(array $data): LoginResponse
    {
        $result = app(AdminApiService::class)->attemptLogin(
            $data['email'],
            $data['password'],
        );

        if (! ($result['success'] ?? false)) {
            $this->throwFailureValidationException();
        }

        $userPayload = $result['data']['user'] ?? [];
        $name = is_array($userPayload) ? ($userPayload['name'] ?? $data['email']) : $data['email'];

        $user = User::firstOrCreate(
            ['email' => $data['email']],
            [
                'name' => $name,
                'password' => Str::password(32),
            ],
        );

        if ($user->name !== $name) {
            $user->update(['name' => $name]);
        }

        if (! $user->canAccessPanel(Filament::getCurrentOrDefaultPanel())) {
            $this->throwFailureValidationException();
        }

        /** @var SessionGuard $authGuard */
        $authGuard = Filament::auth();

        $authGuard->login($user, $data['remember'] ?? false);
        session()->regenerate();

        return app(LoginResponse::class);
    }
}
