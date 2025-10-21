<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testmonial;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;
use function Laravel\Prompts\error;

class TestmonialController extends Controller
{
    // This method will return  all
    public function index(){
         $testmonial = Testmonial::OrderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testmonial
        ]);
    }

    // This method will returns single testmonial

    public function show($id){
        $testmonial = Testmonial::find($id);
        if($testmonial==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'testmonial not found'
            ]);
        }

        return response()->json(
            [
                'status' => true,
                'data' => $testmonial
            ]
            );
    }

    public function store(Request $request){
        $validate = Validator::make($request->all(),[
            'testmonial' => 'required',
            'citation' => 'required'
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validate->errors()
            ]);
        }

        $testmonial = new Testmonial();
        $testmonial->testmonial = $request->testmonial;
        $testmonial->citation = $request->citation;
        $testmonial->designation = $request->designation;
        $testmonial->save();
        
        if($request->imageId>0){
            $oldImage = $testmonial->image;
            $tempImg = TempImage::find($request->imageId);

            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$testmonial->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/testmonials/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(300, 300);
                $image->save($DestImage);
                $testmonial->image = $filename;
                $testmonial->save();

                if($oldImage != ''){
                    File::delete(public_path('Uploads/testmonials/'.$oldImage));
                }
                
            }
            }
        return response()->json([
            'status' => true,
            'message' => 'Testmonial Created succesfully'
        ]);


    }

       public function update(Request $request, $id ){
            
        $testmonial=  Testmonial::find($id);

        if ($testmonial==null){
        return response()->json(
          [  'status ' => false,
            'message' => 'Testmonial not found'
          ] 
        );}

            $validator = Validator::make($request->all(),[
                'testmonial' => 'required',
                'citation' => 'required' 
            ]);

            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }
                    $testmonial->testmonial = $request->testmonial;
                    $testmonial->citation = $request->citation;
                    $testmonial->designation = $request->designation;
                    $testmonial->save();

            // save temp images here
            if($request->imageId>0){
            $oldImage = $testmonial->image;
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$testmonial->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/testmonials/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(300, 300);
                $image->save($DestImage);
                $testmonial->image = $filename;
                $testmonial->save();

                if($oldImage != ''){
                    File::delete(public_path('Uploads/testmonials/'.$oldImage));
                }
                
            }
        }

            return response()->json([
                'status' => true,
                'message' => 'Testmonials Update Success'
            ]);
    }
     public function destroy($id){
         $testmonial = Testmonial::find($id);

        if($testmonial==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'Testmonials not found'
            ]);
        }
           File::delete(public_path('Uploads/testmonials/'.$testmonial->image));

            $testmonial->delete();
         

        return response()->json(
            [
                'status' => true,
                'message' => 'Testmonials data deleted'
            ]
            );
    }
}
