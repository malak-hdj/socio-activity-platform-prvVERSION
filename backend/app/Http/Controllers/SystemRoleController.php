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

    private function addAuditLog($action, $userId, $roleName)
    {
        try {
            $targetUser = DB::table('users')->where('id', $userId)->first();
    
            DB::table('audit_logs')->insert([
                'user_id' => request()->header('X-User-Id') ?? 4,
                'action' => $action,
                'target_table' => 'user_roles',
                'target_id' => $userId,
                'target_name' => $targetUser
                    ? trim($targetUser->first_name . ' ' . $targetUser->name)
                    : 'Unknown user',
                'details' => json_encode([
    'role' => $roleName
]),
                'ip_address' => request()->ip(),
                'action_date' => now()->format('Y-m-d H:i:s'),
            ]);
    
        } catch (\Throwable $e) {
            \Log::error('Audit log failed: ' . $e->getMessage());
        }
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

        $systemAdminRole = DB::table('roles')
            ->where('name', 'SYSTEM_ADMIN')
            ->first();

        if ($systemAdminRole && $roleName !== 'SYSTEM_ADMIN') {
            $alreadySystemAdmin = DB::table('user_roles')
                ->where('user_id', $userId)
                ->where('role_id', $systemAdminRole->id)
                ->exists();

            if ($alreadySystemAdmin) {
                return response()->json([
                    'success' => false,
                    'message' => 'This user is already a System Admin and already has full access.'
                ], 400);
            }
        }

        $exists = DB::table('user_roles')
            ->where('user_id', $userId)
            ->where('role_id', $role->id)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'This user already has this role.'
            ], 400);
        }

        DB::table('user_roles')->insert([
            'user_id' => $userId,
            'role_id' => $role->id,
        ]);

        $this->addAuditLog('Assigned Role', $userId, $roleName);

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

        $user = DB::table('users')->where('id', $userId)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
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

        $deleted = DB::table('user_roles')
            ->where('user_id', $userId)
            ->where('role_id', $role->id)
            ->delete();

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'This user does not have this role.'
            ], 400);
        }

        $this->addAuditLog('Removed Role', $userId, $roleName);

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
        $query = trim($request->query('query'));

        if (!$query) {
            return response()->json([
                'success' => false,
                'message' => 'Employee number is required'
            ], 400);
        }

        $user = DB::table('users')
            ->where('employee_number', $query)
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
        $logs = DB::table('audit_logs')
            ->leftJoin('users as actor', 'audit_logs.user_id', '=', 'actor.id')
            ->select(
                'audit_logs.id',
                'audit_logs.action_date as date',
                DB::raw("CONCAT(actor.first_name, ' ', actor.name) as user"),
                DB::raw("'SYSTEM_ADMIN' as role"),
                'audit_logs.action',
                'audit_logs.target_name as target',
                DB::raw("JSON_UNQUOTE(JSON_EXTRACT(audit_logs.details, '$.role')) as details")
               
            )
            ->orderByDesc('audit_logs.action_date')
            ->get();
    
        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }
}

