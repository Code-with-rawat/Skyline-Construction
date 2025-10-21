<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    
    //This method will returns all active services

    public function index(){
        $services = Service::where('status',1)->orderBy('created_at', 'DESC')->get();
         return response()->json([
                'status' => true,
                'data' => $services
            ]); 
    }

    //This method will retuns to limited services

    public function latestServices(Request $request){
        $services = Service::where('status', 1)
        ->take($request->get('limit'))
        ->orderBy('created_at', 'DESC')->get();

         return response()->json([
                'status' => true,
                'data' => $services
            ]);  
    }

        //This method will returns single services

    public function service($id){
        $services = Service::find($id);
        if($services == null){
            return response()->json([
                    'status' => false,
                    'message'=> 'service not found'       
            ]);
        }


         return response()->json([
                'status' => true,
                'data' => $services
            ]); 
    }
}
