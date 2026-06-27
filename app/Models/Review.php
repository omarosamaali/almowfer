<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Review extends Model
{
    protected $fillable = [
        'name', 'avatar', 'initials', 'bg_color', 'stars', 'text',
        'review_date', 'context', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function reviewable(): MorphTo
    {
        return $this->morphTo();
    }
}
