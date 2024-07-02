<?php

namespace App\Interfaces;

interface CatalogInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function storeCatalogData($data): mixed;

    /**
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function getCatalogs($skip, $take): mixed;

    /**
     * @return mixed
     */
    public function totalCatalogs(): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function getCatalog($id): mixed;

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateCatalog($id, $data): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id): mixed;

}
