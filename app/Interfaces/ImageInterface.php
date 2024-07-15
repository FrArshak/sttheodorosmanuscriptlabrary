<?php

namespace App\Interfaces;

interface ImageInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed;

    /**
     * @param $imageableId
     * @param $imageableType
     * @return mixed
     */
    public function deleteMany($imageableId, $imageableType): mixed;

    /**
     * @param $imageableId
     * @param $imageableType
     * @return mixed
     */
    public function getImages($imageableId, $imageableType): mixed;

    /**
     * @param $image
     * @param $widgetContent
     * @return mixed
     */
    public function checkIfNotExistCreate($image, $widgetContent): mixed;

    /**
     * @param $id
     * @param $imageableId
     * @param $imageableType
     * @return mixed
     */
    public function destroy($id, $imageableId, $imageableType): mixed;

    /**
     * @param $image
     * @return mixed
     */
    public function deleteByImageName($image): mixed;
}
