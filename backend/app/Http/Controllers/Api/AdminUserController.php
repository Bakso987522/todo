<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('role');

        if ($request->filled('role')) {
            $query->whereHas('role', function ($q) use ($request) {
                $q->where('name', $request->input('role'));
            });
        }

        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->input('email') . '%');
        }

        $perPage = $request->input('per_page', 10);
        $users = $query->paginate($perPage);

        return response()->json($users);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'max_lists' => 'nullable|integer|min:0',
            'max_tasks_per_list' => 'nullable|integer|min:0',
        ]);

        $user = User::findOrFail($id);

        $user->role_id = $validated['role_id'];
        $user->max_lists = $validated['max_lists'] ?? null;
        $user->max_tasks_per_list = $validated['max_tasks_per_list'] ?? null;

        $user->save();

        return response()->json([
            'message' => 'Użytkownik zaktualizowany.',
            'user' => $user,
        ]);
    }

}
