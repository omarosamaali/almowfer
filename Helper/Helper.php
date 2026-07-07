<?php

// use App\Models\Language;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Request;
use App\Models\Admin\Tenant as AdminTenant;

// if (!function_exists('getAllLangs')) {
//     function getAllLangs()
//     {
//         try {
//             return Language::active()->get();
//         } catch (\Exception $e) {
//             // Return empty collection if languages table doesn't exist yet
//             return collect();
//         }
//     }
// }

// if (!function_exists('getAllKeyLangs')) {
//     function getAllKeyLangs()
//     {
//         try {
//             return Language::active()->pluck('code')->toArray();
//         } catch (\Exception $e) {
//             // Return empty array if languages table doesn't exist yet
//             return [];
//         }
//     }
// }

// check if function getPathLang
// if (!function_exists('getPathLang')) {
//     function getPathLang()
//     {
//         $prefix = Request::segment(1);
//         $allKeyLangs = getAllKeyLangs();

//         if (in_array($prefix, $allKeyLangs))
//             return $prefix;

//         return null;
//     }
// }

// check if function getTenantPrefix
if (! function_exists('isValidTenantSegment')) {
    function isValidTenantSegment(?string $segment): bool
    {
        if (! $segment) {
            return false;
        }

        if ($segment === 'admin') {
            return false;
        }

        if (str_starts_with($segment, 'livewire')) {
            return false;
        }

        $reserved = ['api', 'up', 'build', 'vendor', 'storage', 'sanctum'];

        if (in_array($segment, $reserved, true)) {
            return false;
        }

        return (bool) preg_match('/^[a-zA-Z0-9_-]+$/', $segment);
    }
}

if (! function_exists('resolveTenantPrefix')) {
    function resolveTenantPrefix(?\Illuminate\Http\Request $request = null): ?string
    {
        $request = $request ?? request();

        if (session()->has('tenant_prefix')) {
            return session('tenant_prefix');
        }

        if ($tenant = $request->route('tenant')) {
            return $tenant;
        }

        $segment = $request->segment(1);
        if (isValidTenantSegment($segment)) {
            return $segment;
        }

        if ($referer = $request->header('referer')) {
            $path = parse_url($referer, PHP_URL_PATH) ?: '';
            $parts = array_values(array_filter(explode('/', trim($path, '/'))));

            foreach ($parts as $index => $part) {
                if ($part === 'admin' && $index > 0 && isValidTenantSegment($parts[$index - 1])) {
                    return $parts[$index - 1];
                }
            }

            if (isset($parts[0]) && isValidTenantSegment($parts[0])) {
                return $parts[0];
            }
        }

        return null;
    }
}

if (!function_exists('getTenantPrefix')) {
    function getTenantPrefix()
    {
        return resolveTenantPrefix() ?? Request::segment(1);
    }
}

if (!function_exists('getBackendPath')) {
    function getBackendPath()
    {
        $prefix = getTenantPrefix();
        return $prefix ? $prefix . '/admin' : 'admin';
    }
}

// check if function isTenantPath
if (!function_exists('isTenantPath')) {
    function isTenantPath($get_username = true)
    {
        $prefix = getTenantPrefix();

        if (!$prefix)
            return false;

        if ($prefix !== 'admin') {
            $tenant = AdminTenant::on('admin')->where('username', $prefix)->first();
            return $get_username ? $tenant?->username : $tenant;
        }

        return false;
    }
}

// check if function isTenantUser
if (!function_exists('isTenantUser')) {
    function isTenantUser()
    {
        $tenant = Auth::guard('tenant')->user();
        return $tenant ?: false;
    }
}

if (!function_exists('getTenantDetails')) {
    function getTenantDetails()
    {
        $response = Http::get(env('ADMIN_URL') . '/api/get-tenant-details?tenant=' . getTenantPrefix() . '&domain=' . request()->getSchemeAndHttpHost());
        return $response->json();
    }
}

if (! function_exists('isSubscriptionExpired')) {
    function isSubscriptionExpired(): bool
    {
        $tenantDetails = getTenantDetails();
        $endDate = $tenantDetails['data']['tenant_subscription']['end_date'] ?? null;

        return $endDate && date('Y-m-d', strtotime($endDate)) < date('Y-m-d', strtotime(now()));
    }
}

if (! function_exists('getSubscriptionInfo')) {
    /**
     * @return array{end_date: string, formatted: string, expired: bool, days_remaining: int}|null
     */
    function getSubscriptionInfo(): ?array
    {
        $tenantDetails = getTenantDetails();

        if (! is_array($tenantDetails)) {
            return null;
        }

        $subscription = $tenantDetails['data']['tenant_subscription'] ?? null;

        if (! is_array($subscription) || empty($subscription['end_date'])) {
            return null;
        }

        $end = \Carbon\Carbon::parse($subscription['end_date'])->startOfDay();
        $today = now()->startOfDay();
        $expired = $end->lt($today);

        return [
            'end_date' => $subscription['end_date'],
            'formatted' => $end->locale('ar')->translatedFormat('d F Y'),
            'expired' => $expired,
            'days_remaining' => $expired ? 0 : (int) $today->diffInDays($end),
        ];
    }
}

if (! function_exists('getSupportTickets')) {
    /**
     * @return list<array<string, mixed>>
     */
    function getSupportTickets(): array
    {
        $tenantDetails = getTenantDetails();

        if (! is_array($tenantDetails)) {
            return [];
        }

        $tickets = $tenantDetails['data']['tickets'] ?? [];

        return is_array($tickets) ? array_values($tickets) : [];
    }
}

if (! function_exists('supportTicketStatusLabel')) {
    function supportTicketStatusLabel(string $status): string
    {
        return match (strtolower($status)) {
            'open' => 'مفتوحة',
            'in_progress' => 'قيد المعالجة',
            'closed' => 'مغلقة',
            default => $status,
        };
    }
}

// check if function tenantConnectionDatabase
if (!function_exists('adminConnectionDatabase')) {
    function adminConnectionDatabase()
    {
        // config(["database.connections.admin" => config('database.connections.admin')]);

        // session()->put('admin_connection_name', 'admin');

        // DB::connection('admin');

        return 'admin';
    }
}

if (!function_exists('tenantConnectionDatabase')) {
    function tenantConnectionDatabase($tenant = null)
    {
        $tenant = $tenant ?? getTenantDetails();
        if (!$tenant['data'] || !$tenant['data']['is_active'] || $tenant['data']['category']['key'] != 'almoswiq') {
            return false;
        }

        $tenantData = $tenant['data'];

        $databaseCredential = $tenantData['database_credential'];
        if (!$databaseCredential)
            throw new \Exception('Database credential not found');

        // Get default MySQL connection config as base
        $defaultConfig = config('database.connections.mysql');

        // Build tenant database configuration
        $tenantConfig = [
            'driver' => 'mysql',
            'host' => $defaultConfig['host'] ?? env('DB_HOST', '127.0.0.1'),
            'port' => $defaultConfig['port'] ?? env('DB_PORT', '3306'),
            'database' => $databaseCredential['db_name'],
            'username' => $databaseCredential['db_user'],
            'password' => $databaseCredential['db_password'],
            'charset' => $defaultConfig['charset'] ?? env('DB_CHARSET', 'utf8mb4'),
            'collation' => $defaultConfig['collation'] ?? env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => $defaultConfig['prefix'] ?? env('DB_TABLE_PREFIX', ''),
            'prefix_indexes' => $defaultConfig['prefix_indexes'] ?? true,
            'strict' => $defaultConfig['strict'] ?? true,
            'engine' => $defaultConfig['engine'] ?? null,
            'options' => $defaultConfig['options'] ?? [],
        ];

        $tenantConnectionName = 'tenant_' . $databaseCredential['db_name'];
        config(["database.connections.$tenantConnectionName" => $tenantConfig]);
        session()->put('tenant_connection_name', $tenantConnectionName);

        DB::reconnect($tenantConnectionName);

        return $tenantConnectionName;
    }
}

// check if function authUser
if (!function_exists('authUser')) {
    /**
     * Get the authenticated user.
     *
     * @return \App\Models\User|\App\Models\Tenant|\App\Models\Developer|null
     */
    function authUser()
    {
        return Auth::user() ?? Auth::guard('tenant')->user() ?? Auth::guard('developer')->user();
    }
}

// get Tenant_Model
if (!function_exists('getTenantModel')) {
    /**
     * Get the tenant model.
     *
     * @param string $section_unique_name
     */
    function getTenantModel(string $section_unique_name)
    {
        // $tenantModel = "App\Models\Tenant\Tenant_" . Str::studly($section_unique_name);
        $tenantModel = "App\Models\Tenant\Tenant_Complex";
        return new $tenantModel;
    }
}

// Get available fields for a section
// if (!function_exists('getAvailableFields')) {
//     function getAvailableFields()
//     {
//         return Column::where('is_active', true)
//             ->pluck('unique_name')
//             ->toArray();
//     }
// }

// Get available fields with their types and translation info for a section
// if (!function_exists('getAvailableFieldsWithTypes')) {
//     function getAvailableFieldsWithTypes()
//     {
//         return Column::where('is_active', true)
//             ->select('unique_name', 'type', 'has_translation')
//             ->get()
//             ->mapWithKeys(function ($column) {
//                 return [$column->unique_name => [
//                     'type' => $column->type,
//                     'has_translation' => $column->has_translation
//                 ]];
//             })
//             ->toArray();
//     }
// }

// Make helper method for translate data
// if (!function_exists('translateData')) {
//     /**
//      * Translate data based on field configuration
//      * Returns data in Spatie Translatable format
//      */
//     function translateData($data, $sectionFields, $sourceLanguage = 'en')
//     {
//         $translationService = app(\App\Services\TranslationService::class);
//         $translatedData = [];
//         $translationData = [];

//         // First, identify translatable fields and prepare translation data
//         foreach ($sectionFields as $field) {
//             $fieldName = $field['name'];
//             $hasLanguage = $field['has_language'] ?? false;

//             if ($hasLanguage && isset($data[$fieldName]) && !empty($data[$fieldName])) {
//                 $text = $data[$fieldName];
                
//                 if (is_string($text)) {
//                     // Get translations
//                     $translations = $translationService->translateToAllLanguages($text, $sourceLanguage);
//                     $translationData[$fieldName] = $translations;
//                 }
//             }
//         }

//         // Copy all non-translatable fields to the main data array
//         foreach ($data as $key => $value) {
//             $isTranslatable = false;
//             foreach ($sectionFields as $field) {
//                 if ($field['name'] === $key && ($field['has_language'] ?? false)) {
//                     $isTranslatable = true;
//                     break;
//                 }
//             }
            
//             if (!$isTranslatable) {
//                 $translatedData[$key] = $value;
//             }
//         }

//         // Add translation data
//         if (!empty($translationData)) {
//             $translatedData['_translations'] = $translationData;
//         }

//         return $translatedData;
//     }
// }

// if (!function_exists('translateGroupsData')) {
//     /**
//      * Translate groups data based on field configuration
//      * Returns data in Spatie Translatable format
//      */
//     function translateGroupsData($groupsData, $sectionFields, $sourceLanguage = 'en')
//     {
//         $translationService = app(\App\Services\TranslationService::class);
//         $translatedGroups = [];

//         foreach ($groupsData as $groupIndex => $groupData) {
//             $translatedGroup = $groupData;

//             foreach ($sectionFields as $field) {
//                 $fieldName = $field['name'];
//                 $hasLanguage = $field['has_language'] ?? false;
//                 $isIngroup = $field['ingroup'] ?? false;

//                 if ($hasLanguage && $isIngroup && isset($groupData[$fieldName]) && !empty($groupData[$fieldName])) {
//                     $text = $groupData[$fieldName];
                    
//                     if (is_string($text)) {
//                         $translations = $translationService->translateToAllLanguages($text, $sourceLanguage);
//                         $translatedGroup[$fieldName] = $translations;
//                     }
//                 }
//             }

//             $translatedGroups[] = $translatedGroup;
//         }

//         return $translatedGroups;
//     }
// }

// Currency helper functions
// if (!function_exists('business_currency')) {
//     function business_currency()
//     {
//         $tenant = auth()->guard('tenant')->user();
//         if (!$tenant) {
//             return \App\Models\Dokkan\Currency::where('is_default', true)->first() ?? (object)['symbol' => '$', 'position' => 'left', 'code' => 'USD'];
//         }
        
//         $business = $tenant->activeBusiness();
//         if (!$business) {
//             return \App\Models\Dokkan\Currency::where('is_default', true)->first() ?? (object)['symbol' => '$', 'position' => 'left', 'code' => 'USD'];
//         }
        
//         // Get currency from business settings or use default
//         return \App\Models\Dokkan\Currency::where('is_default', true)->first() ?? (object)['symbol' => '$', 'position' => 'left', 'code' => 'USD'];
//     }
// }

// if (!function_exists('currency_format')) {
//     function currency_format($amount, $currency = null, $decimals = 2)
//     {
//         $currency = $currency ?? business_currency();
//         $formatted = number_format($amount, $decimals);
        
//         if ($currency->position === 'right') {
//             return $formatted . ' ' . $currency->symbol;
//         } else {
//             return $currency->symbol . ' ' . $formatted;
//         }
//     }
// }

// if (!function_exists('formatted_date')) {
//     function formatted_date($date, $format = 'Y-m-d H:i')
//     {
//         if (!$date) {
//             return '';
//         }
        
//         if (is_string($date)) {
//             $date = \Carbon\Carbon::parse($date);
//         }
        
//         return $date->format($format);
//     }
// }
