<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use App\Models\PriceLog;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Services\PriceScraperService;

class MonitorPrices extends Command {
    protected $signature = 'monitor:prices';
    protected $description = 'Monitorizar los precios de los productos';

    public function __construct() {
        parent::__construct();
    }

    public function handle() {
        Log::info('Iniciando la monitorización de precios.');

        $products = Product::where('monitoring_status', true)->get();
        foreach ($products as $product) {
            Log::info("Procesando producto: {$product->name}, URL: {$product->url}");

            try {
                $priceScraper = new PriceScraperService();
                $price = $priceScraper->scrapePrice($product->url);

                if ($price) {
                    Log::info("Precio encontrado: {$price} para el producto: {$product->name}");

                    $product->current_price = $price;
                    $product->save();

                    PriceLog::create([
                        'product_id' => $product->id,
                        'price' => $price,
                        'checked_at' => now(),
                    ]);

                    if ($price <= $product->threshold_price) {
                        Log::info("El precio del producto {$product->name} ha caído por debajo del umbral. Enviando notificación.");
                        $this->sendNotification($product);
                    }
                } else {
                    Log::warning("No se pudo extraer el precio para el producto: {$product->name}");
                }
            } catch (\Exception $e) {
                Log::error("Error al procesar el producto {$product->name}: " . $e->getMessage());
            }
        }

        Log::info('Finalizó la monitorización de precios.');
    }

    protected function sendNotification($product) {
        $message = "El precio del producto ha bajado a {$product->current_price}. Visita: {$product->url}";

        // Opción 1: Notificación por email
        // Mail::to('admin@example.com')->send(new \App\Mail\PriceDropNotification($message));

        Mail::raw($message, function ($message) {
            $message->to('destinatario@example.com')
                ->subject('Chollo a la vista');
        });

        // Opción 2: Notificación por Telegram (usando alguna librería para integración)
        // Telegram::sendMessage(['chat_id' => $user->telegram_chat_id, 'text' => $message]);
    }
}
