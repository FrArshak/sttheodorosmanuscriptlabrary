<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'post_type',
        'post_en',
        'post_am',
        'image',
        'created_by'
    ];

    protected $casts = [
        'post_am' => 'array',
        'post_en' => 'array',
    ];
}
