<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\PriceLog;
use App\Services\PriceScraperService;
use Illuminate\Http\Request;

class ProductApiController extends Controller {
    protected $priceScraper;

    public function __construct(PriceScraperService $priceScraper) {
        $this->priceScraper = $priceScraper;
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'url' => 'required|url',
            'threshold_price' => 'required|numeric',
        ]);

        $product = Product::create([
            'url' => $validated['url'],
            'threshold_price' => $validated['threshold_price'],
            'user_id' => 0,
            'monitoring_status' => true,
        ]);

        return response()->json(['message' => 'Producto añadido exitosamente', 'product' => $product], 201);
    }

    public function destroy($id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Monitorización eliminada exitosamente'], 200);
    }

    public function checkPrice($id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        try {
            $price = $this->priceScraper->scrapePrice($product->url);

            if ($price) {
                $product->current_price = $price;
                $product->save();

                return response()->json(['current_price' => $price], 200);
            } else {
                return response()->json(['message' => 'No se pudo extraer el precio actual'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener el precio: ' . $e->getMessage()], 500);
        }
    }

    public function priceHistory($id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $priceLogs = PriceLog::where('product_id', $product->id)->get();

        return response()->json($priceLogs, 200);
    }
}
