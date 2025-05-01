<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoItem extends Model
{
    protected $fillable = [
        'name',
        'is_done',
        'deadline',
        'tag_id',
        'todo_list_id',
    ];
    public function todoList()
    {
        return $this->belongsTo(TodoList::class);
    }
    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }

}
