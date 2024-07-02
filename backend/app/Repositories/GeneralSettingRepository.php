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
        return $this->model->where('setting_key', 'aboutUsPageContent')->first();
    }

    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreateData($key, $data): mixed
    {
        $data['setting_value'] = $data['setting_value'] === null ? '' : $data['setting_value'];
        if($this->ifExist($key)) {
            if($key === 'aboutUsPageContent') {
                return $this->model->where('setting_key', $key)->update([
                    'setting_value' => $data['setting_value'] ?: '',
                    'setting_json' => $data['setting_json'] ?: ''
                ]);
            } else {
                return $this->model->where('setting_key', $key)->update([
                    'setting_value' => $data['setting_value'] ?: '',
                ]);
            }
        } else {
            if($key === 'aboutUsPageContent') {
                $myData = [
                    'setting_key' => $key,
                    'setting_value' => $data['setting_value'] ?: '',
                    'setting_json' => $data['setting_json'] ?: ''
                ];
                return $this->model->create($myData);
            } else {
                $myData = [
                    'setting_key' => $key,
                    'setting_value' => $data['setting_value'] ?: '',
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
            return $this->model->where('setting_key', $key)->update($data);
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
        return $this->model->where('setting_key', $key)->exists();
    }

    /**
     * @return mixed
     */
    public function getGeneralSettings(): mixed
    {
        return $this->model->get();
    }

    /**
     * @param $key
     * @return mixed
     */
    public function getAboutUsContent($key): mixed
    {
        return $this->model->where('setting_key', $key)->first();
    }
}
