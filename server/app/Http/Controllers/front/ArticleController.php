<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Articles;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    // This method will returns to all articles
     public function index(){
        $articles = Articles::where('status',1)->orderBy('created_at', 'DESC')->get();
         return response()->json([
                'status' => true,
                'data' => $articles
            ]); 
    }

    //This method will retuns to limited articles

    public function latestarticles(Request $request){
        $articles = Articles::where('status', 1)
        ->take($request->get('limit'))
        ->orderBy('created_at', 'DESC')->get();

         return response()->json([
                'status' => true,
                'data' => $articles
            ]);  
    }
       //This method will returns single Articles

    public function article($id){
        $articles = Articles::find($id);
        if($articles == null){
            return response()->json([
                    'status' => false,
                    'message'=> 'Articles not found'       
            ]);
        }


         return response()->json([
                'status' => true,
                'data' => $articles
            ]); 
    }
}
