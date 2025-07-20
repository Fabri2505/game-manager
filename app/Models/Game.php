<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'descrip',
        'monto',
        'fec_juego',
        'fec_cierre',
    ];

    
}
