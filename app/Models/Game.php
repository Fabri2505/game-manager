<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'descrip',
        'monto',
        'fec_juego',
        'fec_cierre',
    ];

    protected $casts = [
        'monto' => 'decimal:2',
        'fec_juego' => 'datetime',
        'fec_cierre' => 'datetime'
    ];

    public function rondas()
    {
        return $this->hasMany(Ronda::class);
    }
}
