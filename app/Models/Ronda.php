<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ronda extends Model
{
    use HasFactory;

    protected $fillable = [
        'fec',
        'hora_ini',
        'hora_fin',
        'game_id'
    ];

    protected $casts = [
        'fec' => 'date',
        'hora_ini' => 'datetime',
        'hora_fin' => 'datetime'
    ];

    // Relaciones
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function participantes()
    {
        return $this->hasMany(Participante::class);
    }
}
