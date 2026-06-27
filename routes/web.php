<?php

use App\Http\Controllers\FormSubmissionController;
use App\Services\FrontendDataService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$frontend = app(FrontendDataService::class);

Route::get('/', fn () => Inertia::render('Home', [
    'stores' => $frontend->homeStores(),
    'categories' => $frontend->homeCategories(),
    'topCoupons' => $frontend->couponsBySection('home_top'),
    'bestCoupons' => $frontend->couponsBySection('home_best'),
    'bestForYou' => $frontend->couponsBySection('home_best_for_you'),
    'electronics' => $frontend->couponsBySection('home_electronics'),
    'reviews' => $frontend->reviews(),
    'stats' => $frontend->stats('home'),
    'faqItems' => $frontend->faqs('home'),
]));

Route::get('/stores', fn () => Inertia::render('Stores', [
    'allStores' => $frontend->storesList(),
    'storeCategories' => $frontend->storeCategoriesFilter(),
    'reviews' => $frontend->reviews(),
    'stats' => $frontend->stats('stores'),
    'topStores' => $frontend->topStores(),
]));

Route::get('/categories', fn () => Inertia::render('Categories', [
    'categories' => $frontend->categoriesList(),
    'topStores' => $frontend->topStores(),
    'stats' => $frontend->stats('home'),
]));

Route::get('/blog', fn () => Inertia::render('Blog', $frontend->blogListing()));

Route::get('/contact', fn () => Inertia::render('Contact', [
    'topStores' => $frontend->topStores(),
    'reviews' => $frontend->reviews(),
]));

Route::get('/terms', fn () => Inertia::render('Terms'));
Route::get('/advertise', fn () => Inertia::render('Advertise', [
    'faqs' => $frontend->faqs('advertise'),
]));
Route::get('/about', fn () => Inertia::render('About'));

Route::get('/blog/{slug}', function (string $slug) use ($frontend) {
    $data = $frontend->blogArticle($slug);
    abort_unless($data, 404);

    return Inertia::render('BlogPost', [
        'slug' => $slug,
        ...$data,
        'reviews' => $frontend->reviews(),
        'topStores' => $frontend->topStores(),
    ]);
});

Route::get('/blog-author/{slug}', function (string $slug) use ($frontend) {
    $data = $frontend->blogAuthor($slug);
    abort_unless($data, 404);

    return Inertia::render('BlogAuthor', [
        'slug' => $slug,
        ...$data,
    ]);
});

Route::get('/store/{slug}', function (string $slug) use ($frontend) {
    $data = $frontend->storeDetail($slug);
    abort_unless($data, 404);

    return Inertia::render('StoreDetail', [
        ...$data,
        'similarStores' => $frontend->topStores(6),
        'reviews' => $frontend->reviews(),
        'faqItems' => $frontend->faqs('store'),
        'topStores' => $frontend->topStores(),
    ]);
});

Route::get('/category/{slug}', function (string $slug) use ($frontend) {
    $data = $frontend->categoryDetail($slug);
    abort_unless($data, 404);

    return Inertia::render('CategoryDetail', [
        ...$data,
        'reviews' => $frontend->reviews(),
        'faqItems' => $frontend->faqs('category'),
        'stats' => $frontend->stats('home'),
        'topStores' => $frontend->topStores(),
    ]);
});

Route::post('/newsletter', [FormSubmissionController::class, 'newsletter'])->name('newsletter.subscribe');
Route::post('/contact', [FormSubmissionController::class, 'contact'])->name('contact.submit');
Route::post('/advertise', [FormSubmissionController::class, 'advertise'])->name('advertise.submit');
