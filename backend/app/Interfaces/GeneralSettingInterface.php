<?php

namespace App\Interfaces;

interface GeneralSettingInterface
{
    /**
     * @return mixed
     */
    public function getAboutUsPageContent(): mixed;

    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreateData($key, $data): mixed;

    /**
     * @param $key
     * @param $data
     */
    public function updateOrCreatePageData($key, $data);

    /**
     * @param $key
     * @return mixed
     */
    public function ifExist($key): mixed;

    /**
     * @return mixed
     */
    public function getGeneralSettings(): mixed;
}
