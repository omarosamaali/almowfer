<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{

    protected function authenticated(Request $request, $user)
    {
        // Send API request to admin application to get token
        try {
            $adminUrl = env('ADMIN_URL');
            if (!$adminUrl) {
                // If ADMIN_URL is not configured, continue without API call
                return;
            }

            // Make API call to admin login endpoint
            $response = Http::post($adminUrl . '/api/login', [
                'email' => $user->email,
                'password' => $request->password,
            ]);

            if ($response->successful()) {
                $responseData = $response->json();
                
                // Check if response has success and token
                if (isset($responseData['success']) && $responseData['success'] === true && isset($responseData['data']['token'])) {
                    $token = $responseData['data']['token'];
                    
                    // Store token in cookie (expires in 30 days)
                    Cookie::queue('admin_api_token', $token, 60 * 24 * 30);
                }
            }
        } catch (\Exception $e) {
            // Log error but don't prevent login
            Log::error('Failed to get admin API token: ' . $e->getMessage());
        }
    }
}
