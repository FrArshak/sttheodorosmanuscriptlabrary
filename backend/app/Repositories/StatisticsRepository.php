<?php

namespace App\Repositories;

use App\Interfaces\StatisticsInterface;
use App\Models\Statistics;


class StatisticsRepository implements StatisticsInterface
{
    private Statistics $model;

    public function __construct(Statistics $model)
    {
        $this->model = $model;
    }

    public function visitCounter($key, $date): mixed
    {
        $visitExists = $this->checkIfVisitExist($key, $date);
        if(isset($visitExists['id'])) {
            $visitsCount = $visitExists['statistics_count'];
            return $this->model->where('id', $visitExists['id'])->update([
                'statistics_count' => ++$visitsCount
            ]);
        } else {
            $data = [
                'key' => $key,
                'statistics_date' => $date,
                'statistics_count' => 1,
            ];

            return $this->model->create($data);
        }
    }

    /**
     * @param $key
     * @param $date
     * @return mixed
     */
    public function checkIfVisitExist($key, $date): mixed
    {
        return $this->model->where('key', $key)->whereDate('statistics_date', $date)->first();
    }

    /**
     * @param $startDate
     * @param $endDate
     * @param $key
     * @return mixed
     */
    public function getVisitorsData($startDate, $endDate, $key): array
    {
        return $this->model->where('key', $key)->whereBetween('statistics_date', [$startDate, $endDate])->get()->toArray();
    }

    /**
     * @return string
     */
    public function getFirstDate(): mixed
    {
        return $this->model->orderBy('statistics_date', 'asc')->first();
    }
}
