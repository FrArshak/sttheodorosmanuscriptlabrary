<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Filesystem\Filesystem;

class FileManagerService
{
    /**
     * @var Filesystem
     */
    protected Filesystem $disk;

    /**
     * @param Filesystem $filesystem
     */
    public function __construct(Filesystem $filesystem)
    {
        $this->disk = $filesystem;
        $this->disk = Storage::disk(config('filesystem.default'));
    }

    /**
     * @param $fileName
     * @return JsonResponse
     */
    public function getFile($fileName): JsonResponse
    {
        $prefix = $fileName[0] === '/' ? 'public_html' : 'public_html/';
        try {
            if($this->disk->exists($prefix . $fileName)) {
                $filePath = $this->disk->get($prefix . $fileName);

                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'File has been Uploaded',
                    'file_path' => $filePath
                ], 200);
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'File dosen\'t exist',
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

    /**
     * @param $filePath
     * @return bool
     */
    public function checkIfExists($filePath): bool
    {
        try {
            return $this->disk->exists('/public_html/' . $filePath);
        } catch (\Exception $exception) {
            Log::error($exception);
            return false;
        }
    }

    /**
     * @param $image
     * @param $name
     * @param bool $uploadPrefix
     * @return JsonResponse
     */
    public function uploadImage($image, $name, bool $uploadPrefix = true): JsonResponse
    {
        try {
            $image->encode();

            $prefix = $uploadPrefix ? ($name[0] === '/' ? 'public_html' : 'public_html/') : ($name[0] === '/' ? '' : '/');
            $this->disk->put($prefix .$name, $image, 'public_html');

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'File has been Uploaded',
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
     * @param $pdfPath
     * @param $pdfContent
     * @return JsonResponse
     */
    public function uploadPDF($pdfPath, $pdfContent): JsonResponse
    {
        try {

            $prefix = $pdfPath[0] === '/' ? 'public_html' : 'public_html/';

            $this->disk->put($prefix . $pdfPath, $pdfContent, 'public_html');

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'File has been Uploaded',
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
     * @return mixed
     */
    public function fixImageOrientation($image): mixed
    {
        $exif = $image->exif();

        if (empty($exif['Orientation'])) {
            return $image;
        }

        switch ($exif['Orientation']) {
            case 3:
                $image->rotate(180);
                break;
            case 6:
                $image->rotate(-90);
                break;
            case 8:
                $image->rotate(90);
                break;
        }

        return $image;
    }

    /**
     * @param $image
     * @param int $limit
     * @return mixed
     */
    public function imageSizeLimit($image, $limit = 2048): mixed
    {
        $width = $image->width();
        $height = $image->height();
        $dstWidth = $width >= $height ? $limit : null;
        $dstHeight = $height >= $width ? $limit : null;

        if ($width > $limit || $height > $limit) {
            $image->resize($dstWidth, $dstHeight, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        return $image;
    }

    /**
     * @param $path
     * @return JsonResponse
     */
    public function delete($path): JsonResponse
    {
        try {

            $prefix = $path[0] === '/' ? 'public_html' : 'public_html/';
            if($this->disk->exists($prefix . $path)) {

                $this->disk->delete($prefix . $path);

                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'File has been deleted',
                ], 200);
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'File dosen\'t exist',
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
