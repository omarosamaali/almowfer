<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Admin\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->routeIs('subscribePage') || $request->routeIs('subscribe.processPayment') || $request->routeIs('subscribe.checkout'))
            return $next($request);

        $tenantDetails = getTenantDetails();

        // Check if subscription is expired
        $endDate = $tenantDetails['data']['tenant_subscription']['end_date'] ?? null;
        if ($endDate && date('Y-m-d', strtotime($endDate)) < date('Y-m-d', strtotime(now()))) {
            return redirect()->route('subscribePage');
        }

        return $next($request);
    }
}
