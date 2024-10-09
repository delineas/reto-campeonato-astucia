<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePriceLogsTable extends Migration {
    public function up() {
        Schema::create('price_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->timestamp('checked_at');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('price_logs');
    }
}
