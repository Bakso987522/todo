<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TodoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();
        $items = $user->todoItems()->get();
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $val = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_done' => ['boolean'],
            'todo_list_id' => ['required', 'exists:todo_lists,id'],
        ]);
        $user = request()->user();
        $list = $user->todoLists()->findOrFail($val['todo_list_id']);
        $item = $list->todoItems()->create([
            'name' => $val['name'],
            'is_done' => $val['is_done'] ?? false,
        ]);
        return response()->json($item);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
