<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        Log::info('Request input:', $request->all());
        $val = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
            'todo_list_id' => ['required', 'exists:todo_lists,id'],
            'tag_name' => ['nullable', 'string', 'max:255'],
        ]);
        $user = request()->user();
        $list = $user->todoLists()->findOrFail($val['todo_list_id']);
        $tagId = null;
        if (!empty($val['tag_name'] ?? null)) {
            Log::info('Creating or getting tag', ['name' => $val['tag_name']]);

            $tag = \App\Models\Tag::firstOrCreate(['name' => $val['tag_name']]);
            $tagId = $tag->id;
        }
        $item = $list->todoItems()->create([
            'name' => ucfirst($val['name']),
            'is_done' => $val['is_done'] ?? false,
            'deadline' => $val['deadline'] ?? null,
            'tag_id' => $tagId
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
        $val = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'is_done' => ['sometimes', 'boolean']
        ]);
        $user = request()->user();
        $item = $user->todoItems()->findOrFail($id);
        $item->update($val);
        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
