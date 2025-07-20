<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\RondaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('players', [PlayerController::class,'index']);
    Route::post('game', [GameController::class,'store']);
    Route::put('game/cierre', [GameController::class,'update']);
    Route::post('ronda', [RondaController::class,'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
