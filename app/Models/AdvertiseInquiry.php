<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdvertiseInquiry extends Model
{
    protected $fillable = [
        'name', 'email', 'company', 'phone', 'message',
    ];
}
