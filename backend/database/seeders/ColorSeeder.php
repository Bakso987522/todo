<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('colors')->insert([
            ['name' => 'blue'],
            ['name' => 'gray'],
            ['name' => 'teal'],
            ['name' => 'green'],
            ['name' => 'yellow'],
            ['name' => 'orange'],
            ['name' => 'red'],
            ['name' => 'pink'],
            ['name' => 'purple'],
        ]);
    }
}
