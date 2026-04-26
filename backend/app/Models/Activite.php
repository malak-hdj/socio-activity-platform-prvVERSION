<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    protected $table = 'activities';

    // If your new DB has timestamps, set this to true
    public $timestamps = true;

    protected $fillable = [
        'title',
        'description',
        'category',
        'seniority_required',
        'confirmation_delay',
        'document_upload_deadline',
        'transport_included',
        'meals_included',
        'document_required',
        'has_draw',
        'demand_level',
        'status'
    ];
}