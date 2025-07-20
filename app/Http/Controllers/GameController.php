<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'descrip' => 'required|string|max:255',
            'monto' => 'required|numeric|min:0',
            'fec_juego' => 'required|date',
            'fec_cierre' => 'required|date|after:fec_juego'
        ]);

        $game = Game::created($validated);

        return response()->json($game, 201);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:games,id',
            'fec_cierre' => 'required|date|after:now'
        ]);

        $game = Game::findOrFail($validated['id']);
        $game->fec_cierre = $validated['fec_cierre'];
        $game->save();

        return response()->json($game, 200);
    }
}
