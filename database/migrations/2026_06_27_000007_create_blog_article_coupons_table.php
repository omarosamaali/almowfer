<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_article_coupons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_article_id')->constrained()->cascadeOnDelete();
            $table->string('store_name');
            $table->string('domain')->nullable();
            $table->string('color')->nullable();
            $table->string('discount');
            $table->text('description')->nullable();
            $table->string('code')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_article_coupons');
    }
};
