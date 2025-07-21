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
    Route::get('players', [PlayerController::class,'index'])->name('players.index');
    Route::post('game', [GameController::class,'store'])->name('game.store');
    Route::put('game/cierre', [GameController::class,'update'])->name('game.cierre');
    Route::post('ronda', [RondaController::class,'store'])->name('ronda.store');
    Route::post('ronda/add-players', [RondaController::class,'addPlayers'])->name('ronda.addPlayers');
    Route::put('ronda/set-winner', [RondaController::class,'setWinner'])->name('ronda.setWinner');

    Route::get('home-games', function () {
        return Inertia::render('HomeGames');
    })->name('home-games');
    Route::get('golpeado',function () {
        return Inertia::render('Golpeado');
    })->name('golpeado');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
