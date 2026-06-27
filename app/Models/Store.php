<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Store extends Model
{
    protected $fillable = [
        'category_id', 'name', 'name_ar', 'slug', 'domain', 'color', 'text_color',
        'logo', 'rating', 'review_count', 'description', 'category_label',
        'default_code', 'last_update', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:1',
            'last_update' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class);
    }

    public function featuredCategories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)
            ->withPivot(['discount_preview', 'sort_order']);
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
