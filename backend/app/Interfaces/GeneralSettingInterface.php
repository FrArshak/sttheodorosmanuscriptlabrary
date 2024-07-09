<?php

namespace App\Interfaces;

interface GeneralSettingInterface
{
    /**
     * @param $key
     * @return mixed
     */
    public function ifExist($key): mixed;

    /**
     * @return mixed
     */
    public function getGeneralSettings(): mixed;

    /**
     * @param $key
     * @return mixed
     */
    public function getSpecificSetting($key): mixed;

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
    public function updateOrCreateSpecificSetting($key, $data);
}
