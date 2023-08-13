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

        //dd($request->all());

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

        $response = [
            'success' => true,
            'message' => 'User Register Successfully!!'
        ];

        return response()->json($response, 200);
    }


    // ------------------- display all user ------------------------

    public function Index()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->image_url = Storage::url($user->image);
        }

        return response()->json(['users' => $users]);
    }


    // ------------------- Delete user by id ------------------------

    public function Destroy(User $user)
    {

        $image = $user->image;

        if ($image) {
            unlink(storage_path('app/' . $image));
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully.',
            ]);
        } else {

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully.',
            ]);
        }

        return response()->json(['user' => $user]);
    }


    // ------------------- display user by id ------------------------

    public function Show(User $user)
    {
        $user->image_url = Storage::url($user->image);

        return response()->json(['user' => $user]);
    }


    // ------------------- update user by id ------------------------

    public function update(User $user, Request $request)
    {
        // dd($request->all());

        $user->name = $request->name;
        $user->email = $request->email;

        $imgPath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($user->image) {
                unlink(storage_path('app/' . $user->image));
            }
            $imageName = time() . $image->getClientOriginalName();
            $imgPath = $image->storeAs('public/images', $imageName);
            // $user['image'] = $imgPath;
        }

        $user->image = $imgPath ?? $user->image;

        $user->update();

        return response()->json(['user' => $user]);
    }
}
