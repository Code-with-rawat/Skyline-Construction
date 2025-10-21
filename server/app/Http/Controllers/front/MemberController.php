<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
      //This method will returns all active Members

    public function index(){
        $Member = Member::where('status',1)->orderBy('created_at', 'DESC')->get();
         return response()->json([
                'status' => true,
                'data' => $Member
            ]); 
    }

    //This method will retuns to limited Members

    public function latestMembers(Request $request){
        $Member = Member::where('status', 1)
        ->take($request->get('limit'))
        ->orderBy('created_at', 'DESC')->get();

         return response()->json([
                'status' => true,
                'data' => $Member
            ]);  
    }
}
