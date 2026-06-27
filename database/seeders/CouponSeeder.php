<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Store;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        $coupons = [
            ['store' => 'amazon', 'section' => 'home_top', 'title' => 'خصم حتى 40%', 'desc' => 'خصومات أمازون حتى 40% على المقاضي والمستلزمات اليومية', 'discount' => 'خصم حتى 40%', 'code' => 'AMZN40', 'btn' => 'احصل', 'badge' => 'جديد', 'logo' => '🛒'],
            ['store' => 'noon-egypt', 'section' => 'home_top', 'title' => 'أقوى العروض: خصم حتى 80% + 10% إضافي', 'desc' => 'أقوى عروض نون الحصرية: خصم حتى 80% + كود خصم 10%...', 'discount' => 'خصم حتى 80%', 'code' => 'ALM1', 'btn' => 'انسخ الكود', 'badge' => 'جديد', 'logo' => '🛍️'],
            ['store' => 'iherb', 'section' => 'home_top', 'title' => 'خصم حتى 65% + 20% إضافي', 'desc' => 'كود خصم اي هيرب: خصم حتى 65% + 20% إضافي', 'discount' => 'خصم حتى 65%', 'code' => 'ALM20', 'btn' => 'انسخ الكود', 'badge' => 'جديد', 'logo' => '🌿'],
            ['store' => 'farfetch', 'section' => 'home_top', 'title' => 'أفضل الستايلات: خصم حتى 70%', 'desc' => 'خصم فارفيتش حتى 70% على ستايلات مختارة', 'discount' => 'خصم حتى 70%', 'code' => null, 'btn' => 'احصل', 'badge' => 'جديد', 'logo' => '👔'],
            ['store' => 'airalo', 'section' => 'home_best', 'title' => 'خصم 10% على جميع بطاقات eSIM', 'desc' => 'كود خصم Airalo بقيمة 10% إضافي على جميع بطاقات eSIM', 'discount' => 'خصم 10%', 'code' => 'AIRALO10', 'btn' => 'انسخ الكود', 'badge' => 'جديد', 'logo' => '📡'],
            ['store' => 'almatar', 'section' => 'home_best', 'title' => 'حجوزات الطيران: خصم 5% + 5% كاش باك', 'desc' => 'كود خصم المطار: خصم 5% على حجوزات الطيران + 5% كاش باك', 'discount' => 'خصم 5%', 'code' => 'ALM5', 'btn' => 'انسخ الكود', 'badge' => 'لا يفوت', 'logo' => '✈️'],
            ['store' => 'squatwolf', 'section' => 'home_best_for_you', 'title' => 'خصم 15%', 'desc' => 'كود خصم سكواتوولف بقيمة 15% على كل الموقع', 'discount' => 'خصم 15%', 'code' => 'WOLF15', 'btn' => 'احصل', 'badge' => 'جديد', 'logo' => '💪'],
            ['store' => 'booking', 'section' => 'home_best_for_you', 'title' => 'خصم حتى 20% على الفنادق', 'desc' => 'كود خصم بوكينج حتى 20% على حجوزات الفنادق حول العالم', 'discount' => 'خصم 20%', 'code' => 'BK20', 'btn' => 'انسخ الكود', 'badge' => 'جديد', 'logo' => '🏩'],
            ['store' => 'namshi', 'section' => 'home_best_for_you', 'title' => 'خصم 15% + شحن مجاني', 'desc' => 'كود خصم نمشي 15% على أحدث صيحات الموضة + شحن مجاني', 'discount' => 'خصم 15%', 'code' => 'NMS15', 'btn' => 'انسخ الكود', 'badge' => 'لا يفوت', 'logo' => '👠'],
            ['store' => 'samsung', 'section' => 'home_electronics', 'title' => 'خصم 8% على الهواتف والأجهزة', 'desc' => 'كود خصم سامسونج 8% على أحدث الهواتف والأجهزة', 'discount' => 'خصم 8%', 'code' => 'SAM8', 'btn' => 'انسخ الكود', 'badge' => 'جديد', 'logo' => '📲', 'category' => 'electronics'],
            ['store' => 'huawei', 'section' => 'home_electronics', 'title' => 'خصم 5% إضافي على جميع المنتجات', 'desc' => 'كود خصم هواوي بقيمة 5% إضافي على جميع المنتجات', 'discount' => 'خصم 5%', 'code' => 'HW5', 'btn' => 'انسخ الكود', 'badge' => 'جديد', 'logo' => '📱', 'category' => 'electronics'],
        ];

        $noonCoupons = [
            ['title' => 'أقوى العروض: خصم حتى 80% + 10% إضافي', 'desc' => 'أقوى عروض نون الحضرية خصم حتى 80% + كود خصم 10% إضافي', 'discount' => 'خصم حتى 80%', 'badges' => ['جديد', 'شحن مجاني', 'كوبون موثق'], 'used_today' => 335, 'last_used' => '8 ساعات', 'last_saving' => '12.5 جنيه', 'type' => 'تنزيلات', 'code' => null],
            ['title' => 'الأفضل مبيعاً: خصم 10% إضافي على كل الموقع', 'desc' => 'كود خصم نون 10% إضافي على أفضل المنتجات', 'discount' => 'كوبون 10%', 'badges' => ['الأكثر مبيعاً', 'كوبون موثق'], 'used_today' => 54, 'last_used' => '5 ساعات', 'last_saving' => '32.3 جنيه', 'type' => 'كوبون خصم', 'code' => 'ALM1'],
            ['title' => 'الأجهزة الكهربائية: خصم 40% + 10% إضافي', 'desc' => 'كود خصم نون 40% على الأجهزة الكهربائية + 10% إضافي', 'discount' => 'خصم 40%', 'badges' => ['كوبون موثق'], 'used_today' => 261, 'last_used' => '6 ساعات', 'last_saving' => '15.7 جنيه', 'type' => 'كوبون خصم', 'code' => 'ALM1'],
        ];

        foreach ($coupons as $index => $data) {
            $store = Store::where('slug', $data['store'])->first();
            if (! $store) {
                continue;
            }

            $category = isset($data['category'])
                ? Category::where('slug', $data['category'])->first()
                : null;

            Coupon::updateOrCreate(
                [
                    'store_id' => $store->id,
                    'section' => $data['section'],
                    'title' => $data['title'],
                ],
                [
                    'category_id' => $category?->id,
                    'description' => $data['desc'],
                    'discount' => $data['discount'],
                    'code' => $data['code'],
                    'btn_label' => $data['btn'],
                    'badge' => $data['badge'],
                    'logo' => $data['logo'],
                    'is_verified' => true,
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }

        $noon = Store::where('slug', 'noon-egypt')->first();
        if ($noon) {
            foreach ($noonCoupons as $index => $data) {
                Coupon::updateOrCreate(
                    [
                        'store_id' => $noon->id,
                        'section' => 'store_detail',
                        'title' => $data['title'],
                    ],
                    [
                        'description' => $data['desc'],
                        'discount' => $data['discount'],
                        'code' => $data['code'],
                        'type' => $data['type'],
                        'badges' => $data['badges'],
                        'used_today' => $data['used_today'],
                        'last_used' => $data['last_used'],
                        'last_saving' => $data['last_saving'],
                        'is_verified' => true,
                        'sort_order' => $index + 1,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
