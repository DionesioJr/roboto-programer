<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    // retorna todos os perfil
    public function viewAllProfile(){

        return response()->json(Profile::all()); // retorna todos os perfil do banco de dados
    }

    // realiza o cadastro de um perfil
    public function addNewProfile(Request $request){

        return response()->json($request->all()); // retorna todos os perfil do banco de dados
    }
    //
}
