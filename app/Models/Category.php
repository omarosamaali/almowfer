<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Category extends Model
{
    protected $fillable = [
        'parent_id', 'name', 'name_en', 'slug', 'icon', 'bg_gradient',
        'is_light', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_light' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function stores(): BelongsToMany
    {
        return $this->belongsToMany(Store::class)
            ->withPivot(['discount_preview', 'sort_order'])
            ->orderByPivot('sort_order');
    }

    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class);
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
