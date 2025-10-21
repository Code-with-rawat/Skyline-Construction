<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{
    
    // this method will run all projects
    public function index(){
            $project = Project::orderBy('created_at','DESC')->get();
             return response()->json([
                'status' => true,
                'data' => $project
             ]);
    }


    // this method will insert in db
    public function store(Request $request){

            $request->merge(['slug'=>Str::slug($request->slug)]);
            $validator = Validator::make($request->all(),[
                'title' => 'Required',
                'slug' => 'Required|unique:Projects,slug',
            ]);

            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }

            $project = new Project();
            $project->title = $request->title;
            $project->slug = Str::slug($request->slug);
            $project->short_desc = $request->short_desc;
            $project->content = $request->content;
            $project->construction_type = $request->construction_type;
            $project->sector = $request->sector;
            $project->status = $request->status;
            $project->location = $request->location;
            $project->save();

            // save temp images here
            if($request->imageId>0){
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$project->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Projects/Small/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(500, 600);
                $image->save($DestImage);


                // create Large thumbnail
                $DestImage = public_path('Uploads/Projects/Large/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->scaleDown(1200);
                $image->save($DestImage);

                $project->image = $filename;
                $project->save();

                
            }
        }

            return response()->json([
                'status' => true,
                'message' => 'projects added Success'
            ]);
    }

    public function update(Request $request, $id ){
            
        $project =  Project::find($id);
        if ($project==null){
        return response()->json(
          [  'status ' => false,
            'message' => 'Project not found'
          ] 
        );}
        $request->merge(['slug'=>Str::slug($request->slug)]);
            $validator = Validator::make($request->all(),[
                'title' => 'Required',
                'slug' => 'required|unique:Projects,slug,'.$id.',id'
            ]);

            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }

            $project->title = $request->title;
            $project->slug = Str::slug($request->slug);
            $project->short_desc = $request->short_desc;
            $project->content = $request->content;
            $project->construction_type = $request->construction_type;
            $project->sector = $request->sector;
            $project->status = $request->status;
            $project->location = $request->location;
            $project->save();

            // save temp images here
            if($request->imageId>0){
            $oldImage = $project->image;
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$project->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Projects/Small/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(500, 600);
                $image->save($DestImage);


                // create Large thumbnail
                $DestImage = public_path('Uploads/Projects/Large/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->scaleDown(1200);
                $image->save($DestImage);

                $project->image = $filename;
                $project->save();

                if($oldImage != ''){
                    File::delete(public_path('Uploads/Projects/Large/'.$oldImage));
                    File::delete(public_path('Uploads/Projects/Small/'.$oldImage));
                }
                
            }
        }

            return response()->json([
                'status' => true,
                'message' => 'projects Update Success'
            ]);
    }

    public function show($id){
        $project = Project::find($id);
        if($project==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'service not found'
            ]);
        }

        return response()->json(
            [
                'status' => true,
                'data' => $project
            ]
            );
    }

    public function destroy($id){
         $project = Project::find($id);

        if($project==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'Projects not found'
            ]);
        }
           File::delete(public_path('Uploads/Projects/Large/'.$project->image));
           File::delete(public_path('Uploads/Projects/Small/'.$project->image));

            $project->delete();
         

        return response()->json(
            [
                'status' => true,
                'message' => 'Projects data deleted'
            ]
            );
    }
    }

