<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogArticle extends Model
{
    protected $fillable = [
        'blog_author_id', 'slug', 'tag', 'tag_en', 'tag_color', 'title', 'label',
        'img', 'published_at', 'read_time', 'views', 'intro', 'sections',
        'related_slugs', 'is_published',
    ];

    protected function casts(): array
    {
        return [
            'sections' => 'array',
            'related_slugs' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(BlogAuthor::class, 'blog_author_id');
    }

    public function articleCoupons(): HasMany
    {
        return $this->hasMany(BlogArticleCoupon::class);
    }
}
