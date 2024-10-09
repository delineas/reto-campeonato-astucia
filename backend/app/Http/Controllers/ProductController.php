<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'url' => 'required|url',
            'threshold_price' => 'required|numeric',
        ]);

        $product = new Product();
        $product->url = $validated['url'];
        $product->threshold_price = $validated['threshold_price'];
        $product->user_id = Auth::id();
        $product->monitoring_status = true;
        $product->save();

        return redirect()->route('products.index');
    }

    public function toggleMonitoring(Product $product) {
        $product->monitoring_status = !$product->monitoring_status;
        $product->save();

        return redirect()->back();
    }
}
