<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;
class TodoListController extends Controller
{
    use SoftDeletes;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = request()->user();

        $lists = TodoList::with('color')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($lists);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $val = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'color_id' => ['nullable', 'integer', 'exists:colors,id'],
            'dead_line' => ['nullable', 'date'],
        ]);
        $user = $request->user();

        $todo = TodoList::create([
            'name' => ucfirst($val['name']),
            'description' => ucfirst($val['name']),
            'color_id' => $val['color_id'] ?? null,
            'dead_line' => $val['dead_line'] ?? null,
            'user_id' => $user->id
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoList $todolist, Request $request)
    {
        if ($request->user()->id !== $todolist->user_id) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $todolist->load([
            'todoItems' => function ($query) {
                $query->with('tag')
                ->orderBy('is_done')
                    ->orderBy('id', 'desc');
            },
            'color'
        ]);



        return response()->json($todolist);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TodoList $todolist)
    {
        if ($request->user()->id !== $todolist->user_id) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $val = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'color_id' => ['nullable', 'integer', 'exists:colors,id'],
            'dead_line' => ['nullable', 'date'],
            'is_done' => ['boolean'],
            'is_archived' => ['boolean'],
            'done_at' => ['nullable', 'date'],
        ]);

        $todolist->update($val);
        return response()->json($todolist);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoList $todolist, Request $request)
    {

        if ($request->user()->id !== $todolist->user_id) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $todolist->delete();
        return response()->json(null, 204);
    }
}
