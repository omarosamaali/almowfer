<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteStat extends Model
{
    protected $fillable = [
        'icon', 'value', 'label', 'page', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
