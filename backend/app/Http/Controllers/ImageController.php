<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\FileManagerService;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
use App\Interfaces\ImageInterface;

class ImageController extends Controller
{
    /**
     * @var FileManagerService
     */
    protected FileManagerService $filemenager;

    /**
     * @var ImageInterface
     */
    protected ImageInterface $imageRepo;

    /**
     * ImageController constructor.
     * @param FileManagerService $fileManagerService
     * @param ImageInterface $imageRepo
     */
    public function __construct(FileManagerService $fileManagerService,ImageInterface $imageRepo)
    {
        $this->filemenager = $fileManagerService;
        $this->imageRepo = $imageRepo;
    }

    /**
     * @param ImageRequest $request
     * @return JsonResponse
     */
    public function uploadImage(ImageRequest $request): JsonResponse
    {
        try {
            $file = $request->file('image');
            $filePath = $file->path();
            $fileExtension = 'webp';
            $uniqueName = time() . '_' . str_shuffle('local_project_image') . '_' . time();
            $newImageName = $uniqueName . '.' . $fileExtension;

            $newImage = Image::make($filePath);

            if (preg_match("/.(jpg|jpeg|webp|png)$/i", $newImageName)) {
                $this->filemenager->fixImageOrientation($newImage);
            }

            $newImage = $this->filemenager->imageSizeLimit($newImage);
            $this->filemenager->uploadImage($newImage, $newImageName);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Image has been uploaded',
                'image' => $newImageName
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $image
     * @return JsonResponse
     */
    public function deleteImage($image): JsonResponse
    {
        try {
            $this->filemenager->delete($image);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Image has been deleted',
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param Request $request
     * @param $image
     * @return JsonResponse
     */
    public function deleteImageFromDB(Request $request,$image): JsonResponse
    {
        try {
            if($request['image']) {
                $this->imageRepo->deleteByImageName($image);
                $this->filemenager->delete($image);
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'Image has been deleted',
                ], 200);
            }
            else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Something went wrong',
                ], 200);
            }
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }
}
