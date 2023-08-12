<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function Store(Request $request){
        
        $input = $request->all();
        // $input['password'] = bcrypt($input['password']);
        $input['password'] = Hash::make($request->password);
        $user = User::create($input);

        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;

        $response = [
            'success' => true,
            'data' => $success,
            'message' => 'User Register Successfully!!'
        ];

        return response()->json($response, 200);
    }

    public function Index(){
        $users = User::all();

        return response()->json(['users' => $users]);
    }

    public function Destroy(User $user){
        $users = $user->delete();

        return response()->json(['users' => $users]);
    }

    public function Show(User $user){
        return response()->json(['user' => $user]);
    }

    public function Update(User $user, Request $request){

        $user->name = $request->name;
        $user->email = $request->email;
        $user->update();
        return response()->json(['user' => $user]);
    }
}
