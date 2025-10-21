<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request){
        $Validator = Validator::make($request->all(),[
            'image' => 'required|mimes:jpg,png,gif,jpeg'     
        ]);

        if($Validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $Validator->errors('image')
            ]);
        }
        $image = $request->image;

        $exten = $image->getClientOriginalExtension();
        $imageName = strtotime('now').'.'. $exten;

        // saved data in temp images table
        $model = new TempImage();
        $model->name = $imageName;
        $model->save();

        $image->move(public_path('Uploads/Temp'),$imageName);

        //Create Small thumbnails here
        $source = public_path('Uploads/Temp/'.$imageName);
        $DestImage = public_path('Uploads/Temp/thumb/'.$imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($source);
        $image->coverDown(300, 300);
        $image->save($DestImage);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'image upload suceed'
        ]);

    }
}
