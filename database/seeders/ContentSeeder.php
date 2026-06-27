<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\Review;
use App\Models\SiteStat;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['q' => 'ما هو أفضل موقع خصومات؟', 'a' => 'المسوق هو أفضل موقع كوبونات خصم للمتاجر الإلكترونية والماركات ومنصات التسوق في العالم العربي وحول العالم الذي يضمن لك توفير المزيد من المال عند التسوق أونلاين.', 'context' => 'home'],
            ['q' => 'هل المسوق هو موقع كوبونات موثوق؟', 'a' => 'نعم، جميع أكواد الخصم والكوبونات التي نقدمها لك مضمونة 100%. عليك التأكد من مراجعة شروط وأحكام كل كود خصم عبر عرض تفاصيل بطاقة الكوبون.', 'context' => 'home'],
            ['q' => 'ما هي كوبونات الخصم وكيف يمكنني استخدامها؟', 'a' => 'كوبونات الخصم تُعرف أيضاً بـ رموز الخصم أو أكواد الخصم وهي الكي نقدمها لك كي توفر المال عند التسوق من متاجر ومواقع التسوق عبر الإنترنت.', 'context' => 'home'],
            ['q' => 'هل يمكنني استخدام كود الخصم أكثر من مرة؟', 'a' => 'ذلك يتوقف على شروط وأحكام الكوبون، فهناك بعض الكوبونات التي يمكن استخدامها أكثر من مرة، في حين أن بعضها يصلح للاستخدام مرة واحدة فقط.', 'context' => 'home'],
            ['q' => 'هل جميع المتاجر الإلكترونية تتيح لي استخدام كوبونات خصم المسوق؟', 'a' => 'موقع المسوق يمنحك أكثر من 800 كود خصم لأشهر المتاجر الإلكترونية في عالمنا العربي وحول العالم.', 'context' => 'home'],
            ['q' => 'كيف احصل على خصم إضافي عند التسوق عبر الإنترنت؟', 'a' => 'استخدم كوبونات خصم المسوق وأضف كوبون المسوق عند الدفع في ملخص سلة الشراء لتحقيق الخصم الإضافي.', 'context' => 'home'],
        ];

        foreach ($faqs as $index => $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['q'], 'context' => $faq['context']],
                ['answer' => $faq['a'], 'sort_order' => $index + 1, 'is_active' => true]
            );
        }

        $reviews = [
            ['name' => 'فواز العلوي', 'avatar' => 'ف', 'bg_color' => '#00BFA5', 'date' => '13-03-2026', 'text' => '"ممتاز ويعطيك كوبونات مجاناً"'],
            ['name' => 'مجدي فرج', 'avatar' => 'م', 'bg_color' => '#3F51B5', 'date' => '29-03-2026', 'text' => '"ممتاز جداً جداً كانت تجربة رائعة للغاية، أنصح بتحميل التطبيق والاستمتاع بالخصم الجبار"'],
            ['name' => 'اسامة بن طالب', 'avatar' => 'أ', 'bg_color' => '#607D8B', 'date' => '07-03-2026', 'text' => '"تجربتي كانت ممتازة جداً"'],
            ['name' => 'Abrheem Jal', 'avatar' => 'A', 'bg_color' => '#795548', 'date' => '10-03-2026', 'text' => '"تطبيق ممتاز ويروع عليك كثير، أنصح باستخدامه عند طلب أي شيء"'],
        ];

        foreach ($reviews as $index => $review) {
            Review::updateOrCreate(
                ['name' => $review['name'], 'text' => $review['text']],
                [
                    'context' => 'global',
                    'avatar' => $review['avatar'],
                    'bg_color' => $review['bg_color'],
                    'review_date' => $review['date'],
                    'stars' => 5,
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }

        $stats = [
            ['icon' => '🏷️', 'value' => '858', 'label' => 'كوبونات الخصم والعروض المتاحة على موقع المسوق™', 'page' => 'home'],
            ['icon' => '🛒', 'value' => '1,255', 'label' => 'المتاجر التي تقدم كوبونات وعروض على موقع المسوق™', 'page' => 'home'],
            ['icon' => '👥', 'value' => '10,782', 'label' => 'عدد المسوقين الشهري عبر موقع المسوق™', 'page' => 'home'],
            ['icon' => '💰', 'value' => '15.37%', 'label' => 'قيمة الخصومات المتوسطة التي يحصل عليها المستخدمون', 'page' => 'home'],
            ['icon' => '🏷️', 'value' => '854', 'label' => 'كوبونات الخصم والعروض المتاحة على موقع المسوق™', 'page' => 'stores'],
            ['icon' => '🛒', 'value' => '1,255', 'label' => 'المتاجر التي تقدم كوبونات وعروض على موقع المسوق™', 'page' => 'stores'],
        ];

        foreach ($stats as $index => $stat) {
            SiteStat::updateOrCreate(
                ['page' => $stat['page'], 'label' => $stat['label']],
                [
                    'icon' => $stat['icon'],
                    'value' => $stat['value'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
