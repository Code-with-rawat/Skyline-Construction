<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request) {
            $validator = Validator::make($request->all(),[
                    'email'=> 'required|email',
                    'password' => 'required',
                    
            ]);

            if($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }
            else{
                $Credentials = [
                    'email' => $request->email,
                    'password' => $request->password
                ];
                if(Auth::attempt($Credentials)){

                    $user = User::find(Auth::user()->id);
                    $token = $user->createToken('token')->plainTextToken;
                    return response()->json([
                    'status' => TRUE,
                    'token' => $token,
                    'id' => Auth::user()->id
                ]);
                    
                }
                else{
                   return response()->json([
                    'status' => false,
                    'message' => 'Either email/password both are incorrect'
                ]); 
                }
            }            
        }
        public function logout() {
             $user = User::find(Auth::user()->id);
             $user->tokens()->delete();

              return response()->json([
                    'status' =>true,
                    'message' => 'Logout Succedd'
              ]);
        }
}
