<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('discount');
            $table->string('code')->nullable();
            $table->string('type')->nullable();
            $table->json('badges')->nullable();
            $table->string('btn_label')->nullable();
            $table->string('badge')->nullable();
            $table->string('logo')->nullable();
            $table->unsignedInteger('used_today')->nullable();
            $table->string('last_used')->nullable();
            $table->string('last_saving')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->string('section')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
