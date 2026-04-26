<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\DashboardController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/activities', [ActiviteController::class, 'index']);
Route::get('/activities/{id}', [ActiviteController::class, 'show']);



Route::get('/dashboard', [DashboardController::class, 'index']);

use App\Http\Controllers\SystemRoleController;

Route::get('/system/roles/functional-admins', [SystemRoleController::class, 'functionalAdmins']);
Route::get('/system/roles/communicators', [SystemRoleController::class, 'communicators']);
Route::get('/system/roles/system-admins', [SystemRoleController::class, 'systemAdmins']);

Route::get('/system/employees/search', [SystemRoleController::class, 'searchEmployee']);

Route::post('/system/users/{userId}/roles/functional-admin', [SystemRoleController::class, 'assignFunctionalAdmin']);
Route::delete('/system/users/{userId}/roles/functional-admin', [SystemRoleController::class, 'removeFunctionalAdmin']);

Route::post('/system/users/{userId}/roles/communicator', [SystemRoleController::class, 'assignCommunicator']);
Route::delete('/system/users/{userId}/roles/communicator', [SystemRoleController::class, 'removeCommunicator']);

Route::post('/system/users/{userId}/roles/system-admin', [SystemRoleController::class, 'assignSystemAdmin']);
Route::delete('/system/users/{userId}/roles/system-admin', [SystemRoleController::class, 'removeSystemAdmin']);

Route::get('/system/audit-logs', [SystemRoleController::class, 'auditLogs']);