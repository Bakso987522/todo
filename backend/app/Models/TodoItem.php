<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoItem extends Model
{
    protected $fillable = [
        'name',
        'is_done',
        'todo_list_id',
    ];
    public function todoList()
    {
        return $this->belongsTo(TodoList::class);
    }

}
