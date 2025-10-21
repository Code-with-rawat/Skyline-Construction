<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Articles;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ArticleController extends Controller
{
    // This method will fetch all articles
    public function index(){
        $article = Articles::OrderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    } 

    
    // This method will fetch limited articles

     public function show($id){

        $articles = Articles::find($id);

        if($articles===null){
            return response()->json([
                'status' => false,
                'message' => 'Articles not found'
            ]);

        }
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    } 

    public function store(Request $request){
         $request->merge(['slug'=>Str::slug($request->slug)]);
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:articles,slug'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $article = new Articles();

        if($article===null){
            return response()->json([
                'status' => false,
                'message' => 'Articles not found'
            ]);

        }
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);;
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;

         if($request->imageId>0){
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$article->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Articles/Small/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(450, 300);
                $image->save($DestImage);


                // create Large thumbnail
                $DestImage = public_path('Uploads/Articles/Large/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->scaleDown(1200);
                $image->save($DestImage);

                $article->image = $filename;
                $article->save();

                
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article Created succesfully'
        ]);
    }
    public function update($id, Request $request){

        $article = Articles::find($id);
         $request->merge(['slug'=>Str::slug($request->slug)]);
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:articles,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);;
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

         if($request->imageId>0){
            $oldImage = $article->image;
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$article->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Articles/Small/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(450, 300);
                $image->save($DestImage);


                // create Large thumbnail
                $DestImage = public_path('Uploads/Articles/Large/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->scaleDown(1200);
                $image->save($DestImage);

                $article->image = $filename;
                $article->save();
                
                if($oldImage != ''){
                    File::delete(public_path('Uploads/Articles/Large/'.$oldImage));
                    File::delete(public_path('Uploads/Articles/Small/'.$oldImage));
                }
                
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article Updated succesfully'
        ]);
    }

    public function destroy($id) {
        $article = Articles::find($id);

        if($article==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'Articles not found'
            ]);
        }
           File::delete(public_path('Uploads/Articles/Large/'.$article->image));
           File::delete(public_path('Uploads/Articles/Small/'.$article->image));

            $article->delete();
         

        return response()->json(
            [
                'status' => true,
                'message' => 'Articles data deleted'
            ]
            );
    }
}
