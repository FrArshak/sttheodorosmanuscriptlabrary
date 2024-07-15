<?php

namespace App\Interfaces;

interface StatisticsInterface
{
    /**
     * @param $key
     * @param $date
     * @return mixed
     */
    public function visitCounter($key, $date): mixed;

    /**
     * @param $key
     * @param $date
     * @return mixed
     */
    public function checkIfVisitExist($key, $date): mixed;

    /**
     * @param $startDate
     * @param $endDate
     * @param $key
     * @return mixed
     */
    public function getVisitorsData($startDate, $endDate, $key): array;

    /**
     * @return string
     */
    public function getFirstDate(): mixed;

}
