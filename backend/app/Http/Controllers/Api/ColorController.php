<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ColorResource;

class ColorController extends Controller
{
    public function index()
    {
        return ColorResource::collection(\App\Models\Color::all());
    }
}
