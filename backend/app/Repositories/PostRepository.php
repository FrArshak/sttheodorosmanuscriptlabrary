<?php

namespace App\Repositories;

use App\Interfaces\PostInterface;
use App\Models\Post;


class PostRepository implements PostInterface
{

    protected Post $model;

    public function __construct(Post $model)
    {
        $this->model = $model;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed
    {
        return $this->model->create($data);
    }

    /**
     * @param $postId
     * @return mixed
     */
    public function getPost($postId): mixed
    {
        return $this->model->where('id',$postId)->first();
    }

    /**
     * @param $postType
     * @return mixed
     */
    public function getTotalCount($postType): mixed
    {
        return $this->model->where('post_type', $postType)->count();
    }

    /**
     * @param $postType
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function getPosts($postType, $skip, $take):mixed
    {
        return $this->model->where('post_type', $postType)->orderBy('created_at', 'desc')->skip($skip)->take($take)->get();
    }

    /**
     * @param $postId
     * @param $data
     * @return mixed
     */
    public function update($postId, $data) : mixed
    {
        return $this->model->where('id', $postId)->update($data);
    }

    /**
     * @param $postId
     * @return mixed
     */
    public function  delete($postId): mixed
    {
        return $this->model->where('id', $postId)->delete();
    }
}
