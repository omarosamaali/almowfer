<?php

namespace App\Enums;

enum FaqContext: string
{
    case Home = 'home';
    case Store = 'store';
    case Category = 'category';
    case Advertise = 'advertise';

    public function label(): string
    {
        return match ($this) {
            self::Home => 'الصفحة الرئيسية',
            self::Store => 'صفحة المتجر',
            self::Category => 'صفحة الفئة',
            self::Advertise => 'صفحة الإعلان',
        };
    }

    /**
     * @return array<string, string>
     */
    public static function labels(): array
    {
        $labels = [];

        foreach (self::cases() as $case) {
            $labels[$case->value] = $case->label();
        }

        return $labels;
    }

    public static function labelFor(?string $value): string
    {
        if ($value === null) {
            return '—';
        }

        return self::tryFrom($value)?->label() ?? $value;
    }
}
