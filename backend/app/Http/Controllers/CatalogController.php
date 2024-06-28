<?php

namespace App\Http\Controllers;

use App\Http\Requests\CatalogRequest;
use App\Http\Requests\PDFRequest;
use App\Models\Catalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Interfaces\CatalogInterface;
use App\Services\FileManagerService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CatalogController extends Controller
{
    /**
     * @var CatalogInterface
     */
    protected CatalogInterface $catalogRepo;

    /**
     * @var FileManagerService
     */
    protected FileManagerService $fileService;

    /**
     * @param CatalogInterface $catalogRepo
     * @param FileManagerService $fileService
     */
    public function __construct(CatalogInterface $catalogRepo, FileManagerService $fileService)
    {
        $this->catalogRepo = $catalogRepo;
        $this->fileService = $fileService;
    }

    /**
     * @param PDFRequest $request
     * @return JsonResponse
     */
    public function uploadPDF(PDFRequest $request): JsonResponse
    {
        try {
            $pdf = $request->file('pdf');

            $fileContent = file_get_contents($pdf->getPathname());

            $fileExtension = 'pdf';

            $uniqueName = time() . '_' . str_shuffle('local_project_pdf') . '_' . time();
            $newPDFPath = $uniqueName . '.' . $fileExtension;

            $this->fileService->uploadPDF($newPDFPath, $fileContent);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'PDF has been uploaded',
                'path' => $newPDFPath,
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
     * @param CatalogRequest $request
     * @return JsonResponse
     */
    public function storeCatalog(CatalogRequest $request): JsonResponse
    {
        try {

            DB::beginTransaction();
            $data = $request->all();

            $this->catalogRepo->storeCatalogData($data);

            DB::commit();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Catalog has been stored',
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            DB::rollBack();
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $id
     * @param CatalogRequest $request
     * @return JsonResponse
     */
    public function updateCatalog($id, CatalogRequest $request): JsonResponse
    {
        try {

            DB::beginTransaction();
            $data = $request->all();

            $this->catalogRepo->updateCatalog($id, $data);

            DB::commit();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Catalog has been updated',
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            DB::rollBack();
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $skip
     * @param $take
     * @return JsonResponse
     */
    public function getCatalogs($skip, $take): JsonResponse
    {
        try {
            $catalogs = $this->catalogRepo->getCatalogs($skip, $take);
            $totalCatalogs  = $this->catalogRepo->totalCatalogs();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'catalogs' => $catalogs,
                'totalCatalogs' => $totalCatalogs
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
     * @param $id
     * @return JsonResponse
     */
    public function getCatalog($id): JsonResponse
    {
        try {
            $catalog = $this->catalogRepo->getCatalog($id);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'catalog' => $catalog
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
     * @param $pdf
     * @return JsonResponse
     */
    public function deletePDF($pdf): JsonResponse
    {
        try {
            $res = $this->fileService->delete($pdf);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'PDF has been deleted',
                'res' => $res
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
     * @param Catalog $catalog
     * @return JsonResponse
     */
    public function deleteCatalog(Catalog $catalog): JsonResponse
    {
        try {
            DB::beginTransaction();

            if($this->fileService->checkIfExists($catalog->pdf_path)) {
                $this->fileService->delete($catalog->pdf_path);
            }

            if($this->fileService->checkIfExists($catalog->image)) {
                $this->fileService->delete($catalog->image);
            }

            $this->catalogRepo->destroy($catalog->id);

            Db::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Catalog has been deleted'
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            DB::rollBack();
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }
}
