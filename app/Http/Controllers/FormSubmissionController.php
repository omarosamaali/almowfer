<?php

namespace App\Http\Controllers;

use App\Models\AdvertiseInquiry;
use App\Models\ContactInquiry;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FormSubmissionController extends Controller
{
    public function newsletter(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        NewsletterSubscriber::firstOrCreate(
            ['email' => $validated['email']],
            ['subscribed_at' => now()]
        );

        return back()->with('success', 'تم الاشتراك بنجاح');
    }

    public function contact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        ContactInquiry::create($validated);

        return back()->with('success', 'تم إرسال رسالتك بنجاح');
    }

    public function advertise(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string'],
        ]);

        AdvertiseInquiry::create($validated);

        return back()->with('success', 'تم إرسال طلبك بنجاح');
    }
}
