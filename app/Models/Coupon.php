<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected function badges(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => self::normalizeBadges(
                $value === null ? null : json_decode($value, true) ?? $value
            ),
            set: fn ($value) => json_encode(self::normalizeBadges($value), JSON_UNESCAPED_UNICODE),
        );
    }

    /**
     * @return list<string>
     */
    public static function normalizeBadges(mixed $badges): array
    {
        if (is_array($badges)) {
            return array_values(array_filter($badges, fn ($badge) => is_string($badge) && trim($badge) !== ''));
        }

        if (is_string($badges) && trim($badges) !== '') {
            $decoded = json_decode($badges, true);
            if (is_array($decoded)) {
                return self::normalizeBadges($decoded);
            }

            return array_values(array_filter(array_map('trim', preg_split('/\s*,\s*/', $badges) ?: [])));
        }

        return [];
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
