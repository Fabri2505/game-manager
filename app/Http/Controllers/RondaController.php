<?php

namespace App\Http\Controllers;

use App\Models\Participante;
use App\Models\Ronda;
use Illuminate\Http\Request;

class RondaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "fec"=> 'required|date',
            "hora_ini"=> 'required|date_format:H:i:s',
            "hora_fin"=> 'required|date_format:H:i:s|after:hora_ini',
            "game_id"=> 'required|exists:games,id',
            "participantes" => 'required|array',
            "participantes.*" => 'required|exists:users,id',
        ]);

        $ronda = Ronda::create([
           'fec' => $validated['fec'],
           'hora_ini' => $validated['hora_ini'],
           'hora_fin' => $validated['hora_fin'],
           'game_id' => $validated['game_id']
       ]);

        foreach ($validated['participantes'] as $userId) {
            Participante::create([
                'user_id' => $userId,
                'ronda_id' => $ronda->id,
                'winner' => false // Valor por defecto
            ]);
        }

        return response()->json($ronda->load('participantes.user'), 201);

    }
}
