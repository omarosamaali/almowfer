<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AdminApiService
{
    public function baseUrl(): ?string
    {
        return config('services.admin.url');
    }

    /**
     * @return array<string, string>
     */
    public function headers(): array
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $token = Cookie::get('admin_api_token');
        if ($token) {
            $headers['Authorization'] = 'Bearer '.$token;
        }

        return $headers;
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function getPackages(): array
    {
        if (! $this->baseUrl()) {
            return [];
        }

        try {
            $response = Http::withHeaders($this->headers())
                ->get($this->baseUrl().'/api/packages');

            if ($response->successful()) {
                return $response->json('data') ?? [];
            }

            Log::warning('Failed to fetch packages: '.$response->body());
        } catch (\Exception $e) {
            Log::error('Error fetching packages: '.$e->getMessage());
        }

        return [];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function processPayment(array $payload): array
    {
        if (! $this->baseUrl()) {
            return [
                'success' => false,
                'message' => 'Admin API غير مُعد.',
            ];
        }

        try {
            $response = Http::withHeaders($this->headers())
                ->post($this->baseUrl().'/api/subscribe/process-payment', [
                    ...$payload,
                    'tenant' => getTenantPrefix(),
                ]);

            return $response->json() ?? [
                'success' => false,
                'message' => 'استجابة غير صالحة من Admin API.',
            ];
        } catch (\Exception $e) {
            Log::error('Error processing payment: '.$e->getMessage());

            return [
                'success' => false,
                'message' => 'حدث خطأ أثناء معالجة الدفع.',
            ];
        }
    }

    public function storeTokenFromLogin(string $email, #[\SensitiveParameter] string $password): void
    {
        if (! $this->baseUrl()) {
            return;
        }

        try {
            $response = Http::post($this->baseUrl().'/api/login', [
                'email' => $email,
                'password' => $password,
            ]);

            if (! $response->successful()) {
                return;
            }

            $responseData = $response->json();

            if (
                ($responseData['success'] ?? false) === true
                && isset($responseData['data']['token'])
            ) {
                Cookie::queue('admin_api_token', $responseData['data']['token'], 60 * 24 * 30);
            }
        } catch (\Exception $e) {
            Log::error('Failed to get admin API token: '.$e->getMessage());
        }
    }
}
