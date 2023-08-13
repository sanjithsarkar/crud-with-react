<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function Store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email',
            'password' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }

        $input = $request->all();
        $input['password'] = Hash::make($request->password);

        $imgPath = '';
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . $image->getClientOriginalName();
            $imgPath = $image->storeAs('public/images', $imageName);
            $input['image'] = $imgPath;
        }
        $user = User::create($input);

        // $success['token'] = $user->createToken('MyApp')->plainTextToken;
        // $success['name'] = $user->name;

        $response = [
            'success' => true,
            'message' => 'User Register Successfully!!'
        ];

        return response()->json($response, 200);
    }

    public function Index()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->image_url = Storage::url($user->image);
        }

        return response()->json(['users' => $users]);
    }

    public function Destroy(User $user)
    {
        $users = $user->delete();

        return response()->json(['users' => $users]);
    }

    public function Show(User $user)
    {
        return response()->json(['user' => $user]);
    }

    public function Update(User $user, Request $request)
    {

        $user->name = $request->name;
        $user->email = $request->email;
        $user->update();
        return response()->json(['user' => $user]);
    }
}
