<?php

namespace App\Repositories;

use App\Interfaces\CatalogInterface;
use App\Models\Catalog;

class CatalogRepository implements CatalogInterface
{
    /**
     * @var Catalog
     */
    protected Catalog $model;

    public function __construct(Catalog $catalog)
    {
        $this->model = $catalog;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function storeCatalogData($data): mixed
    {
        return $this->model->create($data);
    }

    /**
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function getCatalogs($skip, $take): mixed
    {
        return  $this->model->skip($skip)->take($take)->get();
    }

    /**
     * @return mixed
     */
    public function totalCatalogs(): mixed
    {
        return $this->model->count();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getCatalog($id): mixed
    {
        return $this->model->where('id', $id)->get();
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateCatalog($id, $data): mixed
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id): mixed
    {
        return $this->model->where('id', $id)->delete();
    }
}
