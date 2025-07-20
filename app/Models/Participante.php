<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participante extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'winner'
    ];

    protected $casts = [
        'winner' => 'boolean'
    ];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ronda()
    {
        return $this->belongsTo(Ronda::class);
    }
}
