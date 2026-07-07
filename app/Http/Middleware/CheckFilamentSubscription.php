<?php

namespace App\Http\Middleware;

use App\Filament\Pages\SubscriptionPackages;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckFilamentSubscription
{
    /**
     * @var list<string>
     */
    protected array $allowedRoutes = [
        'filament.admin.pages.subscription-packages',
        'filament.admin.pages.subscription-checkout',
        'filament.admin.pages.request-domain',
        'filament.admin.pages.support-tickets',
        'filament.admin.pages.support-tickets.view',
    ];

    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->routeIs($this->allowedRoutes)) {
            return $next($request);
        }

        if (isSubscriptionExpired()) {
            return redirect(SubscriptionPackages::getUrl());
        }

        return $next($request);
    }
}
