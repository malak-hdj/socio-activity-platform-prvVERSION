<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_activities' => DB::table('activities')->count(),
                'active_activities' => DB::table('activities')->where('status', 'ACTIVE')->count(),
                'total_users' => DB::table('users')->count(),
                'total_registrations' => DB::table('registrations')->count(),
                'pending_registrations' => DB::table('registrations')->where('status', 'PENDING')->count(),
                'total_notifications' => DB::table('notifications')->count(),
            ]
        ]);
    }
}