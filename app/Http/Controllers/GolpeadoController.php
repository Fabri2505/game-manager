<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolpeadoController extends Controller
{
    public function index() {
        $users = User::all();
        return Inertia::render('HomeGolpeado',[
            'players' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ];
            }) 
        ]);
    }
}
