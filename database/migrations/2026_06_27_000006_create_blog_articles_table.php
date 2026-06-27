<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_author_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('tag')->nullable();
            $table->string('tag_en')->nullable();
            $table->string('tag_color')->nullable();
            $table->string('title');
            $table->string('label')->nullable();
            $table->string('img')->nullable();
            $table->string('published_at')->nullable();
            $table->string('read_time')->nullable();
            $table->string('views')->nullable();
            $table->text('intro')->nullable();
            $table->json('sections')->nullable();
            $table->json('related_slugs')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_articles');
    }
};
