<?php

namespace App\Models;

use App\Enums\FaqContext;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Faq extends Model
{
    protected $fillable = [
        'question',
        'answer',
        'context',
        'store_id',
        'category_id',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Faq $faq): void {
            if ($faq->context !== FaqContext::Store->value) {
                $faq->store_id = null;
            }

            if ($faq->context !== FaqContext::Category->value) {
                $faq->category_id = null;
            }
        });
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
