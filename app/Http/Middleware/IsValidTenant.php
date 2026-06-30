<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsValidTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tenantPrefix = resolveTenantPrefix($request);

        if (! $tenantPrefix) {
            abort(404);
        }

        session(['tenant_prefix' => $tenantPrefix]);

        $tenantDetails = getTenantDetails();

        if (!$tenantDetails['success'])
            abort(404);

        if ($tenantDetails && $tenantDetails['data'] && $tenantDetails['data']['domain'] && $tenantDetails['data']['domain']['status'] == true) {
            $domainUrl = $tenantDetails['data']['domain']['domain'];
            // Add protocol if not present
            if (!Str::startsWith($domainUrl, ['http://', 'https://'])) {
                // Use https by default, or http in local environment
                $protocol = $request->secure() || !app()->environment('local') ? 'https://' : 'http://';
                $domainUrl = $protocol . $domainUrl;
            }
            return redirect()->away($domainUrl);
        }


        $tenantConnectionName = tenantConnectionDatabase($tenantDetails);

        if (!$tenantConnectionName)
            abort(404);

        config(['database.default' => $tenantConnectionName]);

        return $next($request);
    }
}
