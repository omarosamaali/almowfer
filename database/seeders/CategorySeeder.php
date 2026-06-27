<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'فنادق', 'slug' => 'hotels', 'icon' => '🏨', 'bg' => 'linear-gradient(135deg, #2C1810 0%, #6B3A2A 50%, #8B5E3C 100%)', 'light' => false],
            ['name' => 'عطور', 'slug' => 'perfumes', 'icon' => '🌺', 'bg' => 'linear-gradient(135deg, #F9E0E8 0%, #F5B8CC 50%, #EFA8BE 100%)', 'light' => true],
            ['name' => 'ألعاب الفيديو', 'slug' => 'gaming', 'icon' => '🎮', 'bg' => 'linear-gradient(135deg, #0D0D2B 0%, #1A1A4A 50%, #252560 100%)', 'light' => false],
            ['name' => 'أزياء', 'slug' => 'fashion', 'icon' => '👗', 'bg' => 'linear-gradient(135deg, #3D2B1F 0%, #6B4C38 50%, #8B6B55 100%)', 'light' => false],
            ['name' => 'إلكترونيات', 'slug' => 'electronics', 'icon' => '💻', 'bg' => 'linear-gradient(135deg, #E8C000 0%, #F5D000 50%, #FFE033 100%)', 'light' => true],
            ['name' => 'الجمال والعناية', 'slug' => 'beauty', 'icon' => '💄', 'bg' => 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 50%, #F48FB1 100%)', 'light' => true],
            ['name' => 'الطفل', 'slug' => 'kids', 'icon' => '🧸', 'bg' => 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 50%, #4FC3F7 100%)', 'light' => true],
            ['name' => 'رحلات', 'slug' => 'travel', 'icon' => '✈️', 'bg' => 'linear-gradient(135deg, #006064 0%, #00838F 50%, #00ACC1 100%)', 'light' => false],
            ['name' => 'مستلزمات السيارات', 'slug' => 'automotive', 'icon' => '🚗', 'bg' => 'repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)', 'light' => false],
            ['name' => 'خدمات', 'slug' => 'services', 'icon' => '🌐', 'bg' => 'repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)', 'light' => false],
            ['name' => 'هواتف ذكية', 'slug' => 'smartphones', 'icon' => '📱', 'bg' => 'linear-gradient(135deg, #BBDEFB 0%, #90CAF9 50%, #64B5F6 100%)', 'light' => true],
            ['name' => 'المنزل', 'slug' => 'home', 'icon' => '🏠', 'bg' => 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 50%, #9C27B0 100%)', 'light' => false],
            ['name' => 'اكسسوارات', 'slug' => 'accessories', 'icon' => '💎', 'bg' => 'repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)', 'light' => false],
            ['name' => 'أزياء الأولاد', 'slug' => 'boys-fashion', 'icon' => '👦', 'bg' => 'repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)', 'light' => false],
            ['name' => 'أزياء نسائية', 'slug' => 'womens-fashion', 'icon' => '👒', 'bg' => 'repeating-linear-gradient(135deg, #00BFA5 0px, #00BFA5 20px, #00D4B8 20px, #00D4B8 40px)', 'light' => false],
            ['name' => 'رياضة', 'slug' => 'sports', 'icon' => '⚽', 'bg' => 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)', 'light' => false],
            ['name' => 'طعام', 'slug' => 'food', 'icon' => '🍕', 'bg' => 'linear-gradient(135deg, #BF360C 0%, #D84315 50%, #E64A19 100%)', 'light' => false],
            ['name' => 'صحة ولياقة', 'slug' => 'health', 'icon' => '💊', 'bg' => 'linear-gradient(135deg, #004D40 0%, #00695C 50%, #00796B 100%)', 'light' => false],
        ];

        foreach ($categories as $index => $cat) {
            Category::updateOrCreate(
                ['slug' => $cat['slug']],
                [
                    'name' => $cat['name'],
                    'name_en' => Str::slug($cat['name']),
                    'icon' => $cat['icon'],
                    'bg_gradient' => $cat['bg'],
                    'is_light' => $cat['light'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
