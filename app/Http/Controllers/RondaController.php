<?php

namespace App\Http\Controllers;

use App\Models\Participante;
use App\Models\Ronda;
use App\Models\User;
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

    public function addPlayers(Request $request)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
            'ronda_id' => 'required|exists:rondas,id'
        ]);

        $participantes = [];
        
        foreach ($request->user_ids as $userId) {
            $participantes[] = Participante::create([
                'user_id' => $userId,
                'ronda_id' => $request->ronda_id
            ]);
        }

        return response()->json([
            'message' => 'Participantes agregados exitosamente',
            'participantes' => $participantes
        ], 201);
    }

    public function setWinner(Request $request)
    {
        $request->validate([
            'ronda_id' => 'required|exists:rondas,id',
            'user_id' => 'required|exists:users,id',
            'win' => 'required|boolean'
        ]);

        $participante = Participante::where('ronda_id', $request->ronda_id)
            ->where('user_id', $request->user_id)
            ->firstOrFail();

        // Marcar al participante como ganador
        $participante->winner = $request->win;
        $participante->save();

        return response()->json([
            'message' => 'Ganador establecido exitosamente',
            'participante' => $participante
        ], 200);
    }

}
