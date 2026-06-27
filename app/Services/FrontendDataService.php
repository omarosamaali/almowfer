<?php

namespace App\Services;

use App\Models\BlogArticle;
use App\Models\BlogAuthor;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Faq;
use App\Models\Review;
use App\Models\SiteStat;
use App\Models\Store;
use Illuminate\Support\Collection;

class FrontendDataService
{
    public function homeCategories(): array
    {
        return Category::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Category $c) => [
                'name' => $c->name,
                'icon' => $c->icon,
                'slug' => $c->slug,
            ])
            ->prepend(['name' => 'جميع الفئات', 'icon' => '🔲', 'slug' => 'all'])
            ->values()
            ->all();
    }

    public function homeStores(): array
    {
        return Store::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->limit(9)
            ->get()
            ->map(fn (Store $s) => $this->formatStoreMini($s))
            ->all();
    }

    public function storesList(): array
    {
        return Store::query()
            ->where('is_active', true)
            ->withCount(['coupons' => fn ($q) => $q->where('is_active', true)])
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Store $s) => [
                'name' => $s->name,
                'domain' => $s->domain,
                'coupons' => $s->coupons_count,
                'color' => $s->color,
                'category' => $s->category_label,
                'desc' => $s->description,
                'slug' => $s->slug,
            ])
            ->all();
    }

    public function storeCategoriesFilter(): array
    {
        return Store::query()
            ->where('is_active', true)
            ->whereNotNull('category_label')
            ->distinct()
            ->orderBy('category_label')
            ->pluck('category_label')
            ->prepend('جميع الفئات')
            ->values()
            ->all();
    }

    public function categoriesList(): array
    {
        return Category::query()
            ->where('is_active', true)
            ->with(['stores' => fn ($q) => $q->limit(3)])
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Category $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'icon' => $c->icon,
                'bg' => $c->bg_gradient,
                'light' => $c->is_light,
                'slug' => $c->slug,
                'stores' => $c->stores->map(fn (Store $s) => [
                    'name' => $s->name,
                    'domain' => $s->domain,
                    'discount' => $s->pivot->discount_preview,
                    'color' => $s->color,
                    'slug' => $s->slug,
                ])->all(),
            ])
            ->all();
    }

    public function couponsBySection(string $section, int $limit = 10): array
    {
        return Coupon::query()
            ->where('is_active', true)
            ->where('section', $section)
            ->with('store')
            ->orderBy('sort_order')
            ->limit($limit)
            ->get()
            ->map(fn (Coupon $c) => $this->formatCouponCard($c))
            ->all();
    }

    public function storeDetail(string $slug): ?array
    {
        $store = Store::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with(['coupons' => fn ($q) => $q->where('is_active', true)->orderBy('sort_order')])
            ->first();

        if (! $store) {
            return null;
        }

        return [
            'store' => [
                'name' => $store->name,
                'nameAr' => $store->name_ar ?? $store->name,
                'domain' => $store->domain,
                'slug' => $store->slug,
                'color' => $store->color,
                'textColor' => $store->text_color ?? '#000',
                'logo' => $store->logo ?? "https://logo.clearbit.com/{$store->domain}",
                'rating' => (float) ($store->rating ?? 0),
                'reviewCount' => $store->review_count,
                'couponCount' => $store->coupons->count(),
                'lastUpdate' => $store->last_update?->format('d/m/Y'),
                'code' => $store->default_code,
            ],
            'coupons' => $store->coupons->map(fn (Coupon $c) => [
                'title' => $c->title,
                'desc' => $c->description,
                'discount' => $c->discount,
                'badges' => $c->badges ?? [],
                'usedToday' => $c->used_today,
                'lastUsed' => $c->last_used,
                'lastSaving' => $c->last_saving,
                'type' => $c->type,
                'code' => $c->code,
            ])->all(),
            'couponTable' => $store->coupons->map(fn (Coupon $c) => [
                'discount' => $c->discount,
                'code' => $c->code ?? 'رابط للتفعيل',
                'desc' => $c->description,
            ])->all(),
        ];
    }

    public function categoryDetail(string $slug): ?array
    {
        $category = Category::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with(['children', 'coupons' => fn ($q) => $q->where('is_active', true)->with('store')])
            ->first();

        if (! $category) {
            return null;
        }

        $coupons = Coupon::query()
            ->where('is_active', true)
            ->where('category_id', $category->id)
            ->with('store')
            ->orderBy('sort_order')
            ->get();

        if ($coupons->isEmpty()) {
            $coupons = Coupon::query()
                ->where('is_active', true)
                ->with('store')
                ->orderBy('sort_order')
                ->limit(8)
                ->get();
        }

        return [
            'category' => [
                'name' => $category->name,
                'nameEn' => $category->name_en,
                'parent' => $category->parent?->name,
                'parentSlug' => $category->parent?->slug,
                'slug' => $category->slug,
                'icon' => $category->icon,
                'color' => $category->color ?? '#00BFA5',
                'couponCount' => $coupons->count(),
                'storeCount' => Store::where('category_id', $category->id)->count(),
                'lastUpdate' => now()->format('d/m/Y'),
            ],
            'subCategories' => $category->children->map(fn (Category $c) => [
                'name' => $c->name,
                'slug' => $c->slug,
                'icon' => $c->icon,
                'active' => false,
            ])->all(),
            'coupons' => $coupons->map(fn (Coupon $c) => $this->formatCouponCard($c))->all(),
        ];
    }

    public function blogListing(): array
    {
        $articles = BlogArticle::query()
            ->where('is_published', true)
            ->with('author')
            ->latest('id')
            ->get();

        $authors = BlogAuthor::query()->orderBy('name')->get();

        $categoryArticleSections = $articles
            ->groupBy('tag')
            ->map(fn (Collection $group, $tag) => [
                'name' => $tag,
                'icon' => '📁',
                'articles' => $group->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->values()->all(),
            ])
            ->values()
            ->all();

        return [
            'articles' => $articles->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->all(),
            'featuredArticles' => $articles->take(3)->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->all(),
            'latestArticles' => $articles->take(6)->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->all(),
            'popularArticles' => $articles->sortByDesc('views')->take(5)->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->values()->all(),
            'blogCategories' => $articles->groupBy('tag')->map(fn (Collection $group, $tag) => [
                'name' => $tag,
                'icon' => '📁',
            ])->values()->all(),
            'allBlogCategories' => $articles->pluck('tag')->unique()->filter()->values()->all(),
            'categoryArticleSections' => $categoryArticleSections,
            'blogAuthors' => $authors->map(fn (BlogAuthor $a) => [
                'slug' => $a->slug,
                'name' => $a->name,
                'avatar' => $a->avatar,
            ])->all(),
        ];
    }

    public function blogArticle(string $slug): ?array
    {
        $article = BlogArticle::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->with(['author', 'articleCoupons'])
            ->first();

        if (! $article) {
            return null;
        }

        $related = BlogArticle::query()
            ->whereIn('slug', $article->related_slugs ?? [])
            ->where('is_published', true)
            ->limit(3)
            ->get();

        return [
            'article' => [
                'slug' => $article->slug,
                'tag' => $article->tag,
                'tagEn' => $article->tag_en,
                'tagColor' => $article->tag_color,
                'title' => $article->title,
                'label' => $article->label,
                'img' => $article->img,
                'date' => $article->published_at,
                'readTime' => $article->read_time,
                'views' => $article->views,
                'author' => $article->author?->name,
                'intro' => $article->intro,
                'sections' => $article->sections ?? [],
                'coupons' => $article->articleCoupons->map(fn ($c) => [
                    'store' => $c->store_name,
                    'domain' => $c->domain,
                    'color' => $c->color,
                    'discount' => $c->discount,
                    'desc' => $c->description,
                    'code' => $c->code,
                ])->all(),
                'relatedSlugs' => $article->related_slugs ?? [],
            ],
            'relatedArticles' => $related->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->all(),
        ];
    }

    public function blogAuthor(string $slug): ?array
    {
        $author = BlogAuthor::query()->where('slug', $slug)->first();
        if (! $author) {
            return null;
        }

        $articles = BlogArticle::query()
            ->where('blog_author_id', $author->id)
            ->where('is_published', true)
            ->get();

        return [
            'author' => [
                'slug' => $author->slug,
                'name' => $author->name,
                'nameEn' => $author->name_en,
                'avatar' => $author->avatar,
                'role' => $author->role,
                'bio' => $author->bio,
                'social' => $author->social ?? [],
                'articleSlugs' => $articles->pluck('slug')->all(),
            ],
            'articles' => $articles->map(fn (BlogArticle $a) => $this->formatBlogCard($a))->all(),
        ];
    }

    public function reviews(string $context = 'global'): array
    {
        return Review::query()
            ->where('is_active', true)
            ->where('context', $context)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Review $r) => [
                'name' => $r->name,
                'date' => $r->review_date,
                'avatar' => $r->avatar,
                'initials' => $r->initials,
                'initial' => $r->initials ?? $r->avatar,
                'bg' => $r->bg_color,
                'color' => $r->bg_color,
                'stars' => $r->stars,
                'text' => $r->text,
            ])
            ->all();
    }

    public function faqs(string $context = 'home'): array
    {
        return Faq::query()
            ->where('is_active', true)
            ->where('context', $context)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Faq $f) => ['q' => $f->question, 'a' => $f->answer])
            ->all();
    }

    public function stats(string $page = 'home'): array
    {
        return SiteStat::query()
            ->where('is_active', true)
            ->where('page', $page)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (SiteStat $s) => [
                'icon' => $s->icon,
                'value' => $s->value,
                'num' => $s->value,
                'label' => $s->label,
                'desc' => $s->label,
            ])
            ->all();
    }

    public function topStores(int $limit = 9): array
    {
        return Store::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get()
            ->map(fn (Store $s) => $this->formatStoreMini($s))
            ->all();
    }

    private function formatStoreMini(Store $store): array
    {
        return [
            'name' => $store->name,
            'color' => $store->color,
            'slug' => $store->slug,
            'domain' => $store->domain,
        ];
    }

    private function formatCouponCard(Coupon $coupon): array
    {
        $store = $coupon->store;

        return [
            'store' => $store?->name,
            'domain' => $store?->domain,
            'discount' => $coupon->discount,
            'desc' => $coupon->description,
            'btn' => $coupon->btn_label ?? 'احصل',
            'badge' => $coupon->badge,
            'logo' => $coupon->logo,
            'slug' => $store?->slug,
            'code' => $coupon->code,
        ];
    }

    private function formatBlogCard(BlogArticle $article): array
    {
        return [
            'slug' => $article->slug,
            'tag' => $article->tag,
            'tagEn' => $article->tag_en,
            'title' => $article->title,
            'img' => $article->img,
            'label' => $article->label,
        ];
    }
}
