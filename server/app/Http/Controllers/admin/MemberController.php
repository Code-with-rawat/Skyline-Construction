<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;

class MemberController extends Controller
{
    // This method will return  all
    public function index(){
         $member = Member::OrderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }

    // This method will returns single member data

    public function show($id){
        $member = Member::find($id);
        if($member==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'member not found'
            ]);
        }

        return response()->json(
            [
                'status' => true,
                'data' => $member
            ]
            );
    }

    // This method will store and insert in Member data

    public function store(Request $request){
        $validate = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validate->errors()
            ]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkdin_url = $request->linkdin_url;
        $member->status = $request->status;
        $member->save();
        
        if($request->imageId>0){
            $oldImage = $member->image;
            $tempImg = TempImage::find($request->imageId);

            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$member->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Members/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(400, 500);
                $image->save($DestImage);
                $member->image = $filename;
                $member->save();

                if($oldImage != ''){
                    File::delete(public_path('Uploads/Members/'.$oldImage));
                }
                
            }
            }
        return response()->json([
            'status' => true,
            'message' => 'Member Created succesfully'
        ]);


    }

     public function update(Request $request, $id ){
            
        $member=  Member::find($id);

        if ($member==null){
        return response()->json(
          [  'status ' => false,
            'message' => 'Member not found'
          ] 
        );}

            $validator = Validator::make($request->all(),[
                'name' => 'required',
                'job_title' => 'required' 
            ]);

            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }
                    $member->name = $request->name;
                    $member->job_title = $request->job_title;
                    $member->linkdin_url = $request->linkdin_url;
                    $member->status = $request->status;
                    $member->save();
        

            // save temp images here
            if($request->imageId>0){
            $oldImage = $member->image;
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$member->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Members/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(400, 500);
                $image->save($DestImage);
                $member->image = $filename;
                $member->save();

                if($oldImage != ''){
                    File::delete(public_path('Uploads/Members/'.$oldImage));
                }
                
            }
        }

            return response()->json([
                'status' => true,
                'message' => 'Members Update Success'
            ]);
    }

    public function destroy($id){
         $member = Member::find($id);

        if($member==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'Members not found'
            ]);
        }
           File::delete(public_path('Uploads/Members/'.$member->image));

            $member->delete();
         

        return response()->json(
            [
                'status' => true,
                'message' => 'Members data deleted'
            ]
            );
    }
}
