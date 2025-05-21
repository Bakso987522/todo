<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Color;

class TodoList extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'color_id',
        'done_at',
        'deadline',
        'deleted_at',

    ];
    public function color()
    {
        return $this->belongsTo(Color::class);
    }
    public function TodoItems()
    {
        return $this->hasMany(TodoItem::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
