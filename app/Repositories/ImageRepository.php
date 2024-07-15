<?php

namespace App\Repositories;

use App\Interfaces\ImageInterface;
use App\Models\Image;
use Carbon\Carbon;

class ImageRepository implements ImageInterface
{
    /**
     * @var Image
     */
    protected Image $model;

    /**
     * ImageRepository constructor.
     * @param Image $image
     */
    public function __construct(Image $image)
    {
        $this->model = $image;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed
    {
        return $this->model->insert($data);
    }

    /**
     * @param $imageableId
     * @param $imageableType
     * @return mixed
     */
    public function getImages($imageableId, $imageableType): mixed
    {
        return $this->model->where('imageable_id', $imageableId)->where('imageable_type', $imageableType)->get();
    }

    /**
     * @param $image
     * @param $widgetContent
     * @return mixed
     */
    public function checkIfNotExistCreate($image, $widgetContent): mixed
    {
        $exist = $this->model->where('image', $image)->where('imageable_id', $widgetContent->id)->exists();
        if(!$exist) {
            $data = [
                'image' => $image,
                'imageable_id' => $widgetContent->id,
                'imageable_type' => $widgetContent->type,
                'user_id' => auth()->user()->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];

            return $this->model->create($data);
        } else {
            return false;
        }
    }

    /**
     * @param $imageableId
     * @param $imageableType
     * @return mixed
     */
    public function deleteMany($imageableId, $imageableType): mixed
    {
        return $this->model->where('imageable_id', $imageableId)->where('imageable_type', $imageableType)->delete();
    }

    /**
     * @param $id
     * @param $imageableId
     * @param $imageableType
     * @return mixed
     */
    public function destroy($id, $imageableId, $imageableType): mixed
    {
        return $this->model->where('id', $id)->where('imageable_id', $imageableId)->where('imageable_type', $imageableType)->delete();
    }

    /**
     * @param $image
     * @return mixed
     */
    public function deleteByImageName($image): mixed
    {
        $image = $image . '.webp';
        return $this->model->where('image', $image)->delete();
    }
}
