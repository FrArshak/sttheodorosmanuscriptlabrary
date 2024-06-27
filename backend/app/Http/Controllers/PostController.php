<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Interfaces\PostInterface;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Services\FileManagerService;

class PostController extends Controller
{

    /**
     * @var PostInterface
     */
    protected PostInterface $postRepo;

    protected FileManagerService $fileManagerService;


    /**
     * @param PostInterface $postRepo
     * @param FileManagerService $fileManagerService
     */
    public function __construct(PostInterface $postRepo, FileManagerService $fileManagerService)
    {
        $this->postRepo = $postRepo;
        $this->fileManagerService = $fileManagerService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function storePost(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->all();

            $this->postRepo->store($data);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Your post has been created',
            ], 200);

        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $postId
     * @return JsonResponse
     */
    public function getPost($postId): JsonResponse
    {
        try {
            $post = $this->postRepo->getPost($postId);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'post'  => $post,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getPosts(Request $request): JsonResponse
    {
        try {

            $postType = $request['postType'];
            $skip = $request['skip'];
            $take = $request['take'];

            $posts = $this->postRepo->getPosts($postType, $skip, $take);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'posts'  => $posts,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param $postId
     * @param Request $request
     * @return JsonResponse
     */
    public function updatePost($postId,Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->all();

            $this->postRepo->update($data['id'], $data);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Post has been updated',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param Post $postId
     * @return JsonResponse
     */
    public function deletePost(Post $postId): JsonResponse
    {
        try {
            DB::beginTransaction();

            $this->fileManagerService->delete($postId->image_path);
            $this->postRepo->delete($postId->id);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Post has been deleted',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error' . $exception->getMessage(),
            ]);
        }
    }
}
