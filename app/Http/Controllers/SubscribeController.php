<?php

namespace App\Http\Controllers;

use App\Services\AdminApiService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubscribeController extends Controller
{
    public function __construct(
        protected AdminApiService $adminApi,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Subscribe/Index', [
            'packages' => $this->adminApi->getPackages(),
            'paymentStatus' => $request->query('status'),
            'paymentMessage' => $request->query('message'),
        ]);
    }

    public function checkout(Request $request): Response|RedirectResponse
    {
        $request->validate([
            'package_id' => 'required|integer',
        ]);

        $selectedPackage = collect($this->adminApi->getPackages())
            ->first(fn ($package) => ($package['id'] ?? null) == $request->package_id);

        if (! $selectedPackage) {
            return redirect()
                ->route('subscribePage', ['tenant' => getTenantPrefix()])
                ->with('error', 'الباقة غير موجودة.');
        }

        return Inertia::render('Subscribe/Checkout', [
            'selectedPackage' => $selectedPackage,
        ]);
    }

    public function processPayment(Request $request): RedirectResponse
    {
        $request->validate([
            'package_id' => 'required|integer',
            'coupon' => 'nullable|string',
            'billing_period' => 'nullable|string|in:monthly,yearly',
        ]);

        $response = $this->adminApi->processPayment([
            'package_id' => $request->package_id,
            'coupon' => $request->coupon,
            'billing_period' => $request->billing_period ?? 'monthly',
            'callback' => route('subscribePage', ['tenant' => getTenantPrefix()]),
        ]);

        if (($response['success'] ?? false) === true && isset($response['data']['payment_url'])) {
            return redirect()->away($response['data']['payment_url']);
        }

        return back()->with('error', $response['message'] ?? 'فشل بدء عملية الدفع.');
    }
}
