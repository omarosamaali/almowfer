<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class TenantSubscription extends Model
{
    protected $table = 'tenant_subscriptions';

    protected $fillable = [
        'tenant_id',
        'package_id',
        'subscription_type',
        'start_date',
        'end_date',
        'price',
        'payment_status',
        'payment_method',
        'payment_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
