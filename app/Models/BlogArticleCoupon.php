<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogArticleCoupon extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'blog_article_id', 'store_name', 'domain', 'color', 'discount',
        'description', 'code', 'sort_order',
    ];

    public function article(): BelongsTo
    {
        return $this->belongsTo(BlogArticle::class, 'blog_article_id');
    }
}
