<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\FileManagerService;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
use App\Interfaces\GeneralSettingInterface;
use Illuminate\Support\Facades\DB;

class GeneralSettingsController extends Controller
{
    /**
     * @var FileManagerService
     */
    protected FileManagerService $fileMenager;

    /**
     * @var GeneralSettingInterface
     */
    protected GeneralSettingInterface $generalSettingsRepo;

    /**
     * GeneralSettingsController constructor.
     * @param FileManagerService $fileManagerService
     * @param GeneralSettingInterface $generalSettings
     */
    public function __construct(FileManagerService $fileManagerService, GeneralSettingInterface $generalSettings)
    {
        $this->fileMenager = $fileManagerService;
        $this->generalSettingsRepo = $generalSettings;
    }

    /**
     * @return JsonResponse
     */
    public function getGeneralSettings(): JsonResponse
    {
        try {
            $generalSettings =  $this->generalSettingsRepo->getGeneralSettings();

            // Initialize settings array with default values
            $settings = [];

            // Map setting values to corresponding keys
            foreach ($generalSettings as $setting) {
                $settings[$setting->setting_key] = [
                    'setting_value' => $setting->setting_value,
                    'setting_json' => json_decode($setting->setting_json),
                ];
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'settings' => $settings
            ], 200);
        }  catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $key
     * @return JsonResponse
     */
    public function getSpecificSetting($key): JsonResponse
    {
        try {
            $data = $this->generalSettingsRepo->getSpecificSetting($key);
            if($data) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'aboutUs' => $data
                ], 200);
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'No data has been found'
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
     * @return JsonResponse
     */
    public function updateGeneralSettings(Request $request): JsonResponse
    {
        try {
            $settingsData = $request->all();
            DB::beginTransaction();
            foreach ($settingsData as $data) {
                if(is_array($data)) {
                    $this->generalSettingsRepo->updateOrCreateData($data['setting_key'], $data);
                } else {
                    $this->generalSettingsRepo->updateOrCreateData($settingsData['setting_key'], $settingsData);
                    break;
                }
            }
            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Settings have been updated',
            ], 200);
        }  catch (\Exception $exception) {
            DB::rollBack();
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
     * @return JsonResponse
     */
    public function updateSpecificSetting(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $data = $request->all();

            $this->generalSettingsRepo->updateOrCreateSpecificSetting($data['setting_key'], $data);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Setting has been updated'
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param ImageRequest $request
     * @return JsonResponse
     */
    public function uploadLogo(ImageRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $file = $request->file('image');
            $filePath = $file->path();
            $fileExtension = 'png';
            $uniqueName = time() . '_' . str_shuffle('local_project_image') . '_' . time();
            $newImageName = $uniqueName . '.' . $fileExtension;


            $newImage = Image::make($filePath)->encode('png');

            if (preg_match("/.(jpg|jpeg|webp|png)$/i", $newImageName)) {
                $this->fileMenager->fixImageOrientation($newImage);
            }

            $newImage = $this->fileMenager->imageSizeLimit($newImage);
            $this->fileMenager->uploadImage($newImage, $newImageName);



            $this->generalSettingsRepo->updateOrCreateData('logo', ["setting_value" => $newImageName]);


            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Logo has been uploaded',
                'logo' => $newImageName
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $logo
     * @return JsonResponse
     */
    public function deleteLogo($logo): JsonResponse
    {
        try {

            $this->fileMenager->delete($logo);

            $this->generalSettingsRepo->updateOrCreateData('logo', ["setting_value" => ""]);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Logo has been deleted',
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
}
