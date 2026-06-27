<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        $stores = [
            ['name' => 'noon', 'slug' => 'noon-egypt', 'domain' => 'noon.com', 'color' => '#F6A623', 'category' => 'تسوق', 'desc' => 'أقوى عروض نون الحصرية: خصم حتى 80% + كود خصم 10%...', 'coupons' => 7, 'name_ar' => 'نون', 'rating' => 4.2, 'reviews' => 5830, 'code' => 'ALM1'],
            ['name' => 'Amazon', 'slug' => 'amazon', 'domain' => 'amazon.com', 'color' => '#FF9900', 'category' => 'تسوق', 'desc' => 'خصومات أمازون حتى 40% على المقاضي والمستلزمات اليومية', 'coupons' => 7],
            ['name' => 'almatar', 'slug' => 'almatar', 'domain' => 'almatar.com', 'color' => '#E91E8C', 'category' => 'رحلات', 'desc' => 'كود خصم المطار: خصم 5% على حجوزات الطيران + 5% كاش باك', 'coupons' => 2],
            ['name' => 'DeFacto', 'slug' => 'defacto', 'domain' => 'defacto.com.tr', 'color' => '#1A1A1A', 'category' => 'أزياء', 'desc' => 'كود خصم ديفاكتو بنسبة 10% إضافي على كل المتجر', 'coupons' => 5],
            ['name' => 'Waffarha', 'slug' => 'waffarha', 'domain' => 'waffarha.com', 'color' => '#FF6B35', 'category' => 'تسوق', 'desc' => 'أكواد خصم وفرها بنسبة حتى 65% + 10% كاش باك', 'coupons' => 5],
            ['name' => 'AliExpress', 'slug' => 'aliexpress', 'domain' => 'aliexpress.com', 'color' => '#FF4747', 'category' => 'تسوق', 'desc' => 'كود خصم علي اكسبرس يصل إلى 70% على أفضل المنتجات', 'coupons' => 1],
            ['name' => 'Max', 'slug' => 'max-fashion', 'domain' => 'max-fashion.com', 'color' => '#002A5C', 'category' => 'أزياء', 'desc' => 'كود خصم ماكس بقيمة 10% إضافي على أفضل المنتجات غير...', 'coupons' => 3],
            ['name' => 'iHerb', 'slug' => 'iherb', 'domain' => 'iherb.com', 'color' => '#5B8C3E', 'category' => 'صحة', 'desc' => 'كود خصم اي هيرب: خصم حتى 65% + 20% إضافي', 'coupons' => 3],
            ['name' => 'FARFETCH', 'slug' => 'farfetch', 'domain' => 'farfetch.com', 'color' => '#1A1A1A', 'category' => 'أزياء', 'desc' => 'خصم فارفيتش حتى 70% على ستايلات مختارة', 'coupons' => 2],
            ['name' => 'Trip.com', 'slug' => 'trip', 'domain' => 'trip.com', 'color' => '#1A73E8', 'category' => 'رحلات', 'desc' => 'كود خصم تريب حتى 15% على الجولات والأنشطة', 'coupons' => 5],
            ['name' => 'Booking', 'slug' => 'booking', 'domain' => 'booking.com', 'color' => '#003580', 'category' => 'رحلات', 'desc' => 'كود خصم بوكينج حتى 20% على حجوزات الفنادق', 'coupons' => 3],
            ['name' => 'Namshi', 'slug' => 'namshi', 'domain' => 'namshi.com', 'color' => '#E91E8C', 'category' => 'أزياء', 'desc' => 'كود خصم نمشي 15% على أحدث صيحات الموضة + شحن مجاني', 'coupons' => 4],
            ['name' => 'H&M', 'slug' => 'hm', 'domain' => 'hm.com', 'color' => '#E50010', 'category' => 'أزياء', 'desc' => 'عروض H&M: خصم حتى 75% على ستايلات مختارة', 'coupons' => 1],
            ['name' => 'SQUATWOLF', 'slug' => 'squatwolf', 'domain' => 'squatwolf.com', 'color' => '#1A1A1A', 'category' => 'سبورت', 'desc' => 'كود خصم سكواتوولف بقيمة 15% على كل الموقع', 'coupons' => 1],
            ['name' => 'Ubuy', 'slug' => 'ubuy', 'domain' => 'ubuy.com', 'color' => '#FF6B00', 'category' => 'تسوق', 'desc' => 'خصم يوباي بقيمة 85% على أفضل المنتجات + 5% إضافي', 'coupons' => 9],
            ['name' => 'Airalo', 'slug' => 'airalo', 'domain' => 'airalo.com', 'color' => '#6C5CE7', 'category' => 'خدمات', 'desc' => 'كود خصم Airalo بقيمة 10% إضافي على بطاقات eSIM', 'coupons' => 2],
            ['name' => 'Samsung', 'slug' => 'samsung', 'domain' => 'samsung.com', 'color' => '#1428A0', 'category' => 'إلكترونيات', 'desc' => 'خصم سامسونج مصر 10% ومزايا إضافية على منتجات...', 'coupons' => 2],
            ['name' => 'HUAWEI', 'slug' => 'huawei', 'domain' => 'huawei.com', 'color' => '#CF0A2C', 'category' => 'إلكترونيات', 'desc' => 'كود خصم هواوي مصر بقيمة 5% على جميع المنتجات', 'coupons' => 6],
            ['name' => 'RayaShop', 'slug' => 'rayashop', 'domain' => 'rayashop.com', 'color' => '#0066CC', 'category' => 'إلكترونيات', 'desc' => 'كود خصم رايه شوب بقيمة 10% إضافي على كل المتجر', 'coupons' => 6],
            ['name' => 'Virgin Megastore', 'slug' => 'virgin', 'domain' => 'virginmegastore.me', 'color' => '#E31837', 'category' => 'إلكترونيات', 'desc' => 'كود خصم فيرجن نستينه حتى 50% على أفضل المنتجات', 'coupons' => 5],
            ['name' => 'DHgate', 'slug' => 'dhgate', 'domain' => 'dhgate.com', 'color' => '#E31837', 'category' => 'تسوق', 'desc' => 'كود خصم DHgate بقيمة 70% على أفضل المنتجات', 'coupons' => 4],
            ['name' => 'ChildrenSalon', 'slug' => 'childrensalon', 'domain' => 'childrensalon.com', 'color' => '#8B4513', 'category' => 'أزياء', 'desc' => 'تخفيضات الصيف: خصم حتى 60%', 'coupons' => 3],
            ['name' => 'IHG Hotels', 'slug' => 'ihg', 'domain' => 'ihg.com', 'color' => '#003580', 'category' => 'رحلات', 'desc' => 'كود خصم IHG بنسبة 25% على حجوزات الفنادق والمنتجعات', 'coupons' => 2],
        ];

        $categoryMap = [
            'تسوق' => 'fashion',
            'أزياء' => 'fashion',
            'رحلات' => 'travel',
            'إلكترونيات' => 'electronics',
            'صحة' => 'health',
            'سبورت' => 'sports',
            'خدمات' => 'services',
        ];

        foreach ($stores as $index => $data) {
            $categorySlug = $categoryMap[$data['category']] ?? 'services';
            $category = Category::where('slug', $categorySlug)->first();

            Store::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'name' => $data['name'],
                    'name_ar' => $data['name_ar'] ?? null,
                    'domain' => $data['domain'],
                    'color' => $data['color'],
                    'text_color' => $data['slug'] === 'noon-egypt' ? '#000' : null,
                    'description' => $data['desc'],
                    'category_label' => $data['category'],
                    'category_id' => $category?->id,
                    'rating' => $data['rating'] ?? null,
                    'review_count' => $data['reviews'] ?? 0,
                    'default_code' => $data['code'] ?? null,
                    'last_update' => now(),
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }

        $this->seedCategoryStoreRelations();
    }

    private function seedCategoryStoreRelations(): void
    {
        $relations = [
            'gaming' => [
                ['slug' => 'virgin', 'discount' => 'خصم حتى %50'],
                ['slug' => 'ubuy', 'discount' => 'حصرياً! خصم حتى %80'],
                ['slug' => 'noon-egypt', 'discount' => 'أقوى العروض: خصم حتى...'],
            ],
            'fashion' => [
                ['slug' => 'amazon', 'discount' => 'أفضل المنتجات...'],
                ['slug' => 'farfetch', 'discount' => 'أفضل الستايلات...'],
                ['slug' => 'noon-egypt', 'discount' => 'أقوى العروض: خصم حتى...'],
            ],
            'electronics' => [
                ['slug' => 'ubuy', 'discount' => 'حصرياً! خصم حتى %80'],
                ['slug' => 'amazon', 'discount' => 'أفضل المنتجات...'],
                ['slug' => 'noon-egypt', 'discount' => 'أقوى العروض: خصم حتى...'],
            ],
            'travel' => [
                ['slug' => 'airalo', 'discount' => 'خصم %10 على جميع...'],
                ['slug' => 'almatar', 'discount' => 'حجوزات الطيران: خص...'],
                ['slug' => 'trip', 'discount' => 'الجولات والأنشطة...'],
            ],
        ];

        foreach ($relations as $categorySlug => $storeItems) {
            $category = Category::where('slug', $categorySlug)->first();
            if (! $category) {
                continue;
            }

            foreach ($storeItems as $sort => $item) {
                $store = Store::where('slug', $item['slug'])->first();
                if ($store) {
                    $category->stores()->syncWithoutDetaching([
                        $store->id => [
                            'discount_preview' => $item['discount'],
                            'sort_order' => $sort + 1,
                        ],
                    ]);
                }
            }
        }
    }
}
