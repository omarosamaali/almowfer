<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coupon extends Model
{
    protected $fillable = [
        'store_id', 'category_id', 'title', 'description', 'discount', 'code',
        'type', 'badges', 'btn_label', 'badge', 'logo', 'used_today',
        'last_used', 'last_saving', 'is_verified', 'section', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'badges' => 'array',
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
