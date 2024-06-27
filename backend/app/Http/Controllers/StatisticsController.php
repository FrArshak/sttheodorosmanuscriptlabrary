<?php

namespace App\Http\Controllers;

use App\Interfaces\StatisticsInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Services\StatisticsService;

class StatisticsController extends Controller
{
    private StatisticsInterface $statisticsRepo;

    private StatisticsService $statisticsService;

    public function __construct(StatisticsInterface $statisticsRepo, StatisticsService $statisticsService)
    {
        $this->statisticsRepo = $statisticsRepo;
        $this->statisticsService = $statisticsService;
    }

    /**
     * @return JsonResponse
     */
    public function countVisitors() : JsonResponse
    {
        try {
            $currentDay = now()->format('Y-m-d');
            if(!isset($_COOKIE['visited'])){
                setcookie('visited', 1, time() + (86400), '/');

                $this->statisticsRepo->visitCounter('visitor', $currentDay);
            }

            $this->statisticsRepo->visitCounter('page-refresh', $currentDay);

            return response()->json([
                'success' => 1,
                'type' => 'success',
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getStatisticsData(Request $request): JsonResponse
    {
        try {
            $intervalType = $request['filterType'];
            $endDate =  Carbon::now()->format('Y-m-d h:m:s');

            if($intervalType === 'week') {
                $startDate = Carbon::now()->subWeek()->format('Y-m-d 00:00:00');
            } elseif ($intervalType === 'month') {
                $startDate = Carbon::now()->subMonth()->format('Y-m-d 00:00:00');
            } elseif ($intervalType === 'year') {
                $startDate = Carbon::now()->subYear()->format('Y-m-d 00:00:00');
            } else {
                $firstData = $this->statisticsRepo->getFirstDate();
                $startDate = Carbon::parse($firstData->statistics_date)->format('Y-m-d 00:00:00');
            }

            $visitorsData = $this->statisticsRepo->getVisitorsData($startDate, $endDate, 'visitor');
            $visitorsCount = 0;
            $visitorsStatistics =  $this->statisticsService->generateStatisticsData($startDate, $endDate, $visitorsData, $intervalType);

            foreach ($visitorsData as $visitor) {
                $visitorsCount += $visitor['statistics_count'];
            }


            $pageReloadsData = $this->statisticsRepo->getVisitorsData($startDate, $endDate, 'page-refresh');
            $pageReloadsCount = 0;
            $pageReloadsStatistics = $this->statisticsService->generateStatisticsData($startDate, $endDate, $pageReloadsData, $intervalType);

            foreach ($pageReloadsData as $pageReload) {
                $pageReloadsCount += $pageReload['statistics_count'];
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'visitors' => $visitorsStatistics,
                'visitorsCount' => $visitorsCount,
                'pageReloads' => $pageReloadsStatistics,
                'pageReloadsCount' => $pageReloadsCount,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }
}
