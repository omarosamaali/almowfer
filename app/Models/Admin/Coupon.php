<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Coupon extends Model
{
    protected $fillable = [
        'name',
        'business_activity_id',
        'category_id',
        'discount_percentage',
        'valid_days',
        'max_usage_per_user',
        'code',
    ];

    protected $casts = [
        'discount_percentage' => 'decimal:2',
        'valid_days' => 'integer',
        'max_usage_per_user' => 'integer',
    ];

    /**
     * Get the business activity that owns the coupon.
     */
    public function businessActivity(): BelongsTo
    {
        return $this->belongsTo(BusinessActivity::class);
    }

    /**
     * Get the category that owns the coupon.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the packages for the coupon.
     */
    public function packages(): BelongsToMany
    {
        return $this->belongsToMany(Package::class, 'coupon_packages', 'coupon_id', 'package_id')
            ->withTimestamps();
    }
}
