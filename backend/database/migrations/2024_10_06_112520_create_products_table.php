<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration {
    public function up() {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(); // Puedes actualizar para almacenar el nombre si lo necesitas
            $table->string('url');
            $table->decimal('current_price', 10, 2)->nullable();
            $table->decimal('threshold_price', 10, 2);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('monitoring_status')->default(true);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('products');
    }
}
