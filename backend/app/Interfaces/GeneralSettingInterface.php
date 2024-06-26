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
     * @param $page_setting
     * @return mixed
     */
    public function getGeneralSettings($page_setting): mixed;
}
