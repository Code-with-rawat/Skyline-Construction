<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testmonial;
use Illuminate\Http\Request;

class TestmonialController extends Controller
{
        //This method will returns all activeTestmonials

    public function index(){
        $testmonial =Testmonial::where('status',1)->orderBy('created_at', 'DESC')->get();
         return response()->json([
                'status' => true,
                'data' => $testmonial
            ]); 
    }

    //This method will retuns to limited Testmonials

    public function latestTestmonials(Request $request){
        $testmonial =Testmonial::where('status', 1)
        ->take($request->get('limit'))
        ->orderBy('created_at', 'DESC')->get();

         return response()->json([
                'status' => true,
                'data' => $testmonial
            ]);  
    }
}
