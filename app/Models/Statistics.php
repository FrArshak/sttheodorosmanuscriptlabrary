<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statistics extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'statistics_date',
        'statistics_count',
        'statistics_data',
    ];

    protected $casts = [
        'statistics_data' => 'array'
    ];

}
