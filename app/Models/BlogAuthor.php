<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogAuthor extends Model
{
    protected $fillable = [
        'slug', 'name', 'name_en', 'avatar', 'role', 'bio', 'social',
    ];

    protected function casts(): array
    {
        return [
            'social' => 'array',
        ];
    }

    public function articles(): HasMany
    {
        return $this->hasMany(BlogArticle::class);
    }
}
