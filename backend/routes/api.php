<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = $request->user()->load('role');

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role->name,
        'max_lists' => $user->max_lists,
        'max_tasks_per_list' => $user->max_tasks_per_list,
    ]);
});

Route::middleware(['auth:sanctum'])->apiResource('todolists',\App\Http\Controllers\Api\TodoListController::class);
Route::middleware(['auth:sanctum'])->apiResource('todoitems',\App\Http\Controllers\Api\TodoItemController::class);
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::post('/admin/users', [\App\Http\Controllers\Api\AdminUserController::class, 'index']);
    Route::put('/admin/users/{id}', [\App\Http\Controllers\Api\AdminUserController::class, 'update']);
});Route::get('/colors',[\App\Http\Controllers\Api\ColorController::class, 'index']);
