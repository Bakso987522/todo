<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Najpierw usuwamy starą kolumnę 'role'
            $table->dropColumn('role');

            // Potem dodajemy nową kolumnę 'role_id'
            $table->unsignedBigInteger('role_id')->nullable()->after('id');

            $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Przywracamy kolumnę 'role'
            $table->string('role')->default('user');

            // Usuwamy 'role_id' i klucz obcy
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });
    }
};
