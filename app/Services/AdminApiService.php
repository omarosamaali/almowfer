<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AdminApiService
{
    private static ?bool $promotionalBannerFetched = null;

    /** @var array<string, mixed>|null */
    private static ?array $promotionalBannerResponse = null;

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

    /**
     * @return array<string, mixed>
     */
    public function attemptLogin(string $email, #[\SensitiveParameter] string $password): array
    {
        if (! $this->baseUrl()) {
            return [
                'success' => false,
                'message' => 'Admin API غير مُعد.',
            ];
        }

        try {
            $response = Http::post($this->baseUrl().'/api/login', [
                'email' => $email,
                'password' => $password,
            ]);

            $responseData = $response->json() ?? [];

            if (
                $response->successful()
                && ($responseData['success'] ?? false) === true
                && isset($responseData['data']['token'])
            ) {
                Cookie::queue('admin_api_token', $responseData['data']['token'], 60 * 24 * 30);

                return $responseData;
            }

            return [
                'success' => false,
                'message' => $responseData['message'] ?? 'بيانات الاعتماد غير صحيحة.',
            ];
        } catch (\Exception $e) {
            Log::error('Failed to authenticate with admin API: '.$e->getMessage());

            return [
                'success' => false,
                'message' => 'تعذر الاتصال بـ Admin API.',
            ];
        }
    }

    public function storeTokenFromLogin(string $email, #[\SensitiveParameter] string $password): void
    {
        $this->attemptLogin($email, $password);
    }

    /**
     * @return array<string, mixed>
     */
    public function setDomain(string $domain): array
    {
        if (! $this->baseUrl()) {
            return [
                'success' => false,
                'message' => 'Admin API غير مُعد.',
            ];
        }

        try {
            $response = Http::withHeaders($this->headers())
                ->post($this->baseUrl().'/api/set-domain', [
                    'domain' => $domain,
                ]);

            return $response->json() ?? [
                'success' => false,
                'message' => 'استجابة غير صالحة من Admin API.',
            ];
        } catch (\Exception $e) {
            Log::error('Error setting domain: '.$e->getMessage());

            return [
                'success' => false,
                'message' => 'حدث خطأ أثناء إرسال طلب النطاق.',
            ];
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function createTicket(string $subject, string $message): array
    {
        if (! $this->baseUrl()) {
            return [
                'success' => false,
                'message' => 'Admin API غير مُعد.',
            ];
        }

        if (! Cookie::get('admin_api_token')) {
            return [
                'success' => false,
                'message' => 'انتهت جلسة الاتصال. يرجى تسجيل الخروج ثم تسجيل الدخول مرة أخرى.',
            ];
        }

        try {
            $response = Http::withHeaders($this->headers())
                ->post($this->baseUrl().'/api/create-ticket', [
                    'subject' => $subject,
                    'message' => $message,
                    'tenant' => getTenantPrefix(),
                ]);

            $data = $response->json() ?? [
                'success' => false,
                'message' => 'استجابة غير صالحة من Admin API.',
            ];

            if (! $response->successful() || ($data['success'] ?? false) !== true) {
                Log::warning('create-ticket failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'tenant' => getTenantPrefix(),
                ]);
            }

            return $data;
        } catch (\Exception $e) {
            Log::error('Error creating ticket: '.$e->getMessage());

            return [
                'success' => false,
                'message' => 'حدث خطأ أثناء إرسال التذكرة.',
            ];
        }
    }

    public function getPromotionalBanner(): ?string
    {
        if (self::$promotionalBannerFetched) {
            $image = self::$promotionalBannerResponse['data']['image'] ?? null;

            return is_string($image) && $image !== '' ? $image : null;
        }

        self::$promotionalBannerFetched = true;
        self::$promotionalBannerResponse = null;

        if (! $this->baseUrl() || ! Cookie::get('admin_api_token')) {
            return null;
        }

        try {
            $response = Http::withHeaders($this->headers())
                ->get($this->baseUrl().'/api/promotional-banner');

            if (! $response->successful()) {
                Log::warning('Failed to fetch promotional banner: '.$response->body());

                return null;
            }

            $data = $response->json() ?? [];
            self::$promotionalBannerResponse = $data;

            if (($data['success'] ?? false) !== true) {
                return null;
            }

            $image = $data['data']['image'] ?? null;

            return is_string($image) && $image !== '' ? $image : null;
        } catch (\Exception $e) {
            Log::error('Error fetching promotional banner: '.$e->getMessage());

            return null;
        }
    }
}
