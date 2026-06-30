<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            ['name' => 'Admin', 'password' => 'password']
        );

        User::updateOrCreate(
            ['email' => 'a.mansour.code@gmail.com'],
            ['name' => 'Admin', 'password' => 'password']
        );

        $this->call([
            CategorySeeder::class,
            StoreSeeder::class,
            CouponSeeder::class,
            BlogSeeder::class,
            ContentSeeder::class,
        ]);
    }
}
