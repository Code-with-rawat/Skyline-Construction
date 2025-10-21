<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Models\TempImage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;




class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          $services = Service::orderBy('created_at','DESC')->get();
         return response()->json([
                'status' => true,
                'data' => $services
            ]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->merge(['slug'=>Str::slug($request->slug)]);
         $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug'
        ]);

        if($validator-> fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $model = new Service();
        $model->title = $request->title;
        $model->short_desc = $request->short_desc;
        $model->slug = Str::slug($request->slug);
        $model->content = $request->content;
        $model->status = $request->status;
        $model->save();

           if($request->imageId>0){
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$model->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Services/Small/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(500, 600);
                $image->save($DestImage);


                // create Large thumbnail
                $DestImage = public_path('Uploads/Services/Large/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->scaleDown(1200);
                $image->save($DestImage);

                $model->image = $filename;
                $model->save();

                
            }
        }

        return response()->json([
                'status' => true,
                'message' => 'service added succed'
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
         $service = Service::find($id);
        if($service==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'service not found'
            ]);
        }

        return response()->json(
            [
                'status' => true,
                'data' => $service
            ]
            );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id )
    {
        $service = Service::find($id);

        if ($service==null){
        return response()->json(
          [  'status ' => false,
            'message' => 'service not found'
          ] 
        );}
        
         $request->merge(['slug'=>Str::slug($request->slug)]);
         $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug,'.$id.',id'
        ]);

        if($validator-> fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $service->title = $request->title;
        $service->short_desc = $request->short_desc;
        $service->slug = Str::slug($request->slug);
        $service->content = $request->content;
        $service->status = $request->status;
        $service->save();

        //Save temp images here
        if($request->imageId>0){
            $oldImage = $service->image;
            $tempImg = TempImage::find($request->imageId);
            if($tempImg !=null){
               $extarray = explode('.',$tempImg->name);
               $ext = last($extarray);

                $filename = strtotime('now').$service->id.'.'.$ext;

                // create small thumbnail
                $source = public_path('Uploads/Temp/'.$tempImg->name);
                $DestImage = public_path('Uploads/Services/Small/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->coverDown(500, 600);
                $image->save($DestImage);


                // create Large thumbnail
                $DestImage = public_path('Uploads/Services/Large/'.$filename);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($source);
                $image->scaleDown(1200);
                $image->save($DestImage);

                $service->image = $filename;
                $service->save();

                if($oldImage != ''){
                    File::delete(public_path('Uploads/Services/Large/'.$oldImage));
                    File::delete(public_path('Uploads/Services/Small/'.$oldImage));
                }
            }
        }

        return response()->json([
                'status' => true,
                'message' => 'service updated succed'
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Service::find($id);

        if($service==null){
            return response()->json([
                'status' => false,
                'mesaage' => 'service not found'
            ]);
        }
           File::delete(public_path('Uploads/Projects/Large/'.$service->image));
            File::delete(public_path('Uploads/Projects/Small/'.$service->image));
            $service->delete();

        return response()->json(
            [
                'status' => true,
                'message' => 'services data deleted'
            ]
            );
    }
}
