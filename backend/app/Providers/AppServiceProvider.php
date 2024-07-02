<?php

namespace App\Providers;

use App\Interfaces\CatalogInterface;
use App\Interfaces\GeneralSettingInterface;
use App\Interfaces\PostInterface;
use App\Interfaces\StatisticsInterface;
use App\Repositories\CatalogRepository;
use App\Repositories\GeneralSettingRepository;
use App\Repositories\PostRepository;
use App\Repositories\StatisticsRepository;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;
use App\Interfaces\ImageInterface;
use App\Repositories\ImageRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));

        $this->app->bind(
            ImageInterface::class,
            ImageRepository::class
        );

        $this->app->bind(
            PostInterface::class,
            PostRepository::class
        );

        $this->app->bind(
            StatisticsInterface::class,
            StatisticsRepository::class
        );

        $this->app->bind(
            CatalogInterface::class,
            CatalogRepository::class
        );

        $this->app->bind(
            GeneralSettingInterface::class,
            GeneralSettingRepository::class
        );
    }
}
