<?php

namespace App\Repositories;

use App\Models\GeneralSettings;
use App\Interfaces\GeneralSettingInterface;

class GeneralSettingRepository implements GeneralSettingInterface
{
    /**
     * @var GeneralSettings
     */
    protected GeneralSettings $model;

    /**
     * GeneralSettingsRepository constructor.
     * @param GeneralSettings $generalSettings
     */
    public function __construct(GeneralSettings $generalSettings)
    {
        $this->model = $generalSettings;
    }

    /**
     * @return mixed
     */
    public function getAboutUsPageContent(): mixed
    {
        return $this->model->where('key', 'aboutUsPageContent')->first();
    }

    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreateData($key, $data): mixed
    {
        $data['value'] = $data['value'] === null ? '' : $data['value'];
        if($this->ifExist($key)) {
            if($key === 'aboutUsPageContent') {
                return $this->model->where('key', $key)->update([
                    'value' => $data['value'] ?: '',
                    'json_value' => $data['json_value'] ?: ''
                ]);
            } else {
                return $this->model->where('key', $key)->update([
                    'value' => $data['value'] ?: '',
                ]);
            }
        } else {
            if($key === 'aboutUsPageContent') {
                $myData = [
                    'key' => $key,
                    'value' => $data['value'] ?: '',
                    'json_value' => $data['json_value'] ?: ''
                ];
                return $this->model->create($myData);
            } else {
                $myData = [
                    'key' => $key,
                    'value' => $data['value'] ?: '',
                ];
                return $this->model->create($myData);
            }

        }
    }

    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreatePageData($key, $data): mixed
    {
        if($this->ifExist($key)) {
            return $this->model->where('key', $key)->update($data);
        } else {
            return $this->model->create($data);
        }
    }

    /**
     * @param $key
     * @return mixed
     */
    public function ifExist($key): mixed
    {
        return $this->model->where('key', $key)->exists();
    }

    /**
     * @return mixed
     */
    public function getGeneralSettings(): mixed
    {
        return $this->model->get();
    }
}
