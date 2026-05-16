<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',           fn() => Inertia::render('Home'));
Route::get('/stores',     fn() => Inertia::render('Stores'));
Route::get('/categories', fn() => Inertia::render('Categories'));
Route::get('/blog',       fn() => Inertia::render('Blog'));
Route::get('/contact',    fn() => Inertia::render('Contact'));
Route::get('/terms',      fn() => Inertia::render('Terms'));
Route::get('/advertise',  fn() => Inertia::render('Advertise'));
Route::get('/about',      fn() => Inertia::render('About'));
Route::get('/blog/{slug}', fn(string $slug) => Inertia::render('BlogPost', ['slug' => $slug]));
Route::get('/blog-author/{slug}', fn(string $slug) => Inertia::render('BlogAuthor', ['slug' => $slug]));
Route::get('/store/{slug}', fn() => Inertia::render('StoreDetail'));
Route::get('/category/{slug}', fn() => Inertia::render('CategoryDetail'));
