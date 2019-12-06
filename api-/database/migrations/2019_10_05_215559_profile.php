<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Profile extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('pk');
            $table->string('pk_instagram');
            $table->string('username');
            $table->string('full_name');
            $table->string('profile_pic_url');
            $table->string('password');
            $table->boolean('status')->default(1);
            $table->timestamp('date_creation');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
