<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SystemRoleController extends Controller
{
    private function usersByRole($roleName)
    {
        $role = DB::table('roles')->where('name', $roleName)->first();

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => "Role {$roleName} not found"
            ], 404);
        }

        $users = DB::table('users')
            ->join('user_roles', 'users.id', '=', 'user_roles.user_id')
            ->where('user_roles.role_id', $role->id)
            ->select(
                'users.id',
                'users.name',
                'users.first_name',
                'users.email',
                'users.employee_number',
                'users.active'
            )
            ->orderBy('users.name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    private function assignRole($userId, $roleName)
    {
        $role = DB::table('roles')->where('name', $roleName)->first();

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => "Role {$roleName} not found"
            ], 404);
        }

        $user = DB::table('users')->where('id', $userId)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $exists = DB::table('user_roles')
            ->where('user_id', $userId)
            ->where('role_id', $role->id)
            ->exists();

        if (!$exists) {
            DB::table('user_roles')->insert([
                'user_id' => $userId,
                'role_id' => $role->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Role assigned successfully'
        ]);
    }

    private function removeRole($userId, $roleName)
    {
        $role = DB::table('roles')->where('name', $roleName)->first();

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => "Role {$roleName} not found"
            ], 404);
        }

        if ($roleName === 'SYSTEM_ADMIN') {
            $systemAdminCount = DB::table('user_roles')
                ->where('role_id', $role->id)
                ->count();

            if ($systemAdminCount <= 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'At least one System Admin must remain active.'
                ], 400);
            }
        }

        DB::table('user_roles')
            ->where('user_id', $userId)
            ->where('role_id', $role->id)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role removed successfully'
        ]);
    }

    public function functionalAdmins()
    {
        return $this->usersByRole('FUNCTIONAL_ADMIN');
    }

    public function communicators()
    {
        return $this->usersByRole('COMMUNICATOR');
    }

    public function systemAdmins()
    {
        return $this->usersByRole('SYSTEM_ADMIN');
    }

    public function searchEmployee(Request $request)
    {
        $query = $request->query('query');

        if (!$query) {
            return response()->json([
                'success' => false,
                'message' => 'Search query is required'
            ], 400);
        }

        $user = DB::table('users')
            ->where('employee_number', $query)
            ->orWhere('id', $query)
            ->select(
                'id',
                'name',
                'first_name',
                'email',
                'employee_number',
                'active'
            )
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function assignFunctionalAdmin($userId)
    {
        return $this->assignRole($userId, 'FUNCTIONAL_ADMIN');
    }

    public function removeFunctionalAdmin($userId)
    {
        return $this->removeRole($userId, 'FUNCTIONAL_ADMIN');
    }

    public function assignCommunicator($userId)
    {
        return $this->assignRole($userId, 'COMMUNICATOR');
    }

    public function removeCommunicator($userId)
    {
        return $this->removeRole($userId, 'COMMUNICATOR');
    }

    public function assignSystemAdmin($userId)
    {
        return $this->assignRole($userId, 'SYSTEM_ADMIN');
    }

    public function removeSystemAdmin($userId)
    {
        return $this->removeRole($userId, 'SYSTEM_ADMIN');
    }

    public function auditLogs()
    {
        return response()->json([
            'success' => true,
            'data' => []
        ]);
    }
}