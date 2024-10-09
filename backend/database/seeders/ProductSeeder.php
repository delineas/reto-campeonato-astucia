<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductSeeder extends Seeder {
    public function run() {
        Product::create([
            'name' => 'RØDE Sistema de microfonía inalámbrica ultracompacto Wireless ME con micrófonos Integrados, tecnología GainAssist y 100m de Alcance para filmaciones, entrevistas y creación de contenidos',
            'url' => 'https://www.amazon.es/R%C3%98DE-inal%C3%A1mbrica-ultracompacto-filmaciones-entrevistas/dp/B0BQLB596V/ref=asc_df_B0BQLB596V/?tag=googshopes-21&linkCode=df0&hvadid=699839896301&hvpos=&hvnetw=g&hvrand=14999077079970602309&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1005546&hvtargid=pla-1965556344361&psc=1&mcid=fcc5a6e63e9b3277b31e4e41684b4446&gad_source=1',
            'current_price' => 145.21,
            'threshold_price' => 140.00,
            'user_id' => 1, // Cambia esto según el usuario existente en tu base de datos
            'monitoring_status' => true,
        ]);
    }
}
