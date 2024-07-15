<?php

namespace App\Interfaces;

interface PostInterface
{
    /**
     * @param $data
     * @return mixed
     *
     */
    public function store($data) : mixed;

    /**
     * @param $postId
     * @return mixed
     */
    public function getPost($postId): mixed;

    /**
     * @param $postType
     * @return mixed
     */
    public function getTotalCount($postType): mixed;

    /**
     * @param $postType
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function getPosts($postType, $skip, $take): mixed;

    /**
     * @param $postId
     * @param $data
     * @return mixed
     */
    public function update($postId, $data) : mixed;

    /**
     * @param $postId
     * @return mixed
     */
    public function  delete($postId): mixed;
}
