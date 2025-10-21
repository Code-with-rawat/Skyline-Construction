<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
      
    //This method will returns all active Projects

    public function index(){
        $projects = Project::where('status',1)->orderBy('created_at', 'DESC')->get();
         return response()->json([
                'status' => true,
                'data' => $projects
            ]); 
    }

    //This method will retuns to limited Projects

    public function latestprojects(Request $request){
        $projects = Project::where('status', 1)
        ->take($request->get('limit'))
        ->orderBy('created_at', 'DESC')->get();

         return response()->json([
                'status' => true,
                'data' => $projects
            ]);  
    }
       //This method will returns single Projects

    public function project($id){
        $projects = Project::find($id);
        if($projects == null){
            return response()->json([
                    'status' => false,
                    'message'=> 'project not found'       
            ]);
        }


         return response()->json([
                'status' => true,
                'data' => $projects
            ]); 
    }
}
