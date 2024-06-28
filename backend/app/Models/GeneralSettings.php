<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSettings extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'setting_key',
        'setting_value',
        'setting_json'
    ];

    protected $casts = [
        'json_value' => 'array'
    ];
}
