<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('slug')->unique();
            $table->string('domain');
            $table->string('color')->nullable();
            $table->string('text_color')->nullable();
            $table->string('logo')->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->unsignedInteger('review_count')->default(0);
            $table->text('description')->nullable();
            $table->string('category_label')->nullable();
            $table->string('default_code')->nullable();
            $table->date('last_update')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
