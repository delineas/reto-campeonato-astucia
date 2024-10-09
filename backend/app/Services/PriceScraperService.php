<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PriceScraperService {
    public function scrapePrice($url) {
        try {
            Log::info("Iniciando scraping para URL: {$url}");
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language' => 'en-US,en;q=0.9',
                'Accept-Encoding' => 'gzip, deflate, br',
                'Connection' => 'keep-alive'
            ])->get($url);

            $html = $response->body();
            preg_match('/<span class="a-offscreen">(.*?)<\/span>/', $html, $matches);

            $price = isset($matches[1]) ? floatval(str_replace(',', '.', preg_replace('/[^\d,]/', '', $matches[1]))) : null;

            Log::info("Precio extraído: " . ($price ? $price : 'No se pudo extraer el precio'));

            return $price;
        } catch (\Exception $e) {
            Log::error('Error al hacer scraping del precio: ' . $e->getMessage());
            throw new \Exception('Error al hacer scraping del precio: ' . $e->getMessage());
        }
    }
}
