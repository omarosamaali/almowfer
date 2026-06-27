<?php

namespace Database\Seeders;

use App\Models\BlogArticle;
use App\Models\BlogArticleCoupon;
use App\Models\BlogAuthor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/blog.json');
        if (! File::exists($path)) {
            return;
        }

        $data = json_decode(File::get($path), true);
        $authorMap = [];

        foreach ($data['authors'] ?? [] as $author) {
            $model = BlogAuthor::updateOrCreate(
                ['slug' => $author['slug']],
                [
                    'name' => $author['name'],
                    'name_en' => $author['nameEn'] ?? null,
                    'avatar' => $author['avatar'] ?? null,
                    'role' => $author['role'] ?? null,
                    'bio' => $author['bio'] ?? null,
                    'social' => $author['social'] ?? null,
                ]
            );
            $authorMap[$author['name']] = $model->id;
            $authorMap[$author['slug']] = $model->id;
        }

        foreach ($data['articles'] ?? [] as $article) {
            $authorId = $authorMap[$article['author']] ?? null;

            $model = BlogArticle::updateOrCreate(
                ['slug' => $article['slug']],
                [
                    'blog_author_id' => $authorId,
                    'tag' => $article['tag'] ?? null,
                    'tag_en' => $article['tagEn'] ?? null,
                    'tag_color' => $article['tagColor'] ?? null,
                    'title' => $article['title'],
                    'label' => $article['label'] ?? null,
                    'img' => $article['img'] ?? null,
                    'published_at' => $article['date'] ?? null,
                    'read_time' => $article['readTime'] ?? null,
                    'views' => $article['views'] ?? null,
                    'intro' => $article['intro'] ?? null,
                    'sections' => $article['sections'] ?? null,
                    'related_slugs' => $article['relatedSlugs'] ?? null,
                    'is_published' => true,
                ]
            );

            $model->articleCoupons()->delete();
            foreach ($article['coupons'] ?? [] as $sort => $coupon) {
                BlogArticleCoupon::create([
                    'blog_article_id' => $model->id,
                    'store_name' => $coupon['store'],
                    'domain' => $coupon['domain'] ?? null,
                    'color' => $coupon['color'] ?? null,
                    'discount' => $coupon['discount'],
                    'description' => $coupon['desc'] ?? null,
                    'code' => $coupon['code'] ?? null,
                    'sort_order' => $sort + 1,
                ]);
            }
        }
    }
}
