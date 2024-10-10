<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductApiController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/products', [ProductApiController::class, 'store']);
Route::delete('/products/{id}', [ProductApiController::class, 'destroy']);
Route::get('/products/{id}/check-price', [ProductApiController::class, 'checkPrice']);
Route::get('/products/{id}/price-history', [ProductApiController::class, 'priceHistory']);
Route::get('/products/{id}/find-by-asin', [ProductApiController::class, 'findByAsin']);
