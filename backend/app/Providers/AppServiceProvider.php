<?php

namespace App\Providers;

use App\Interfaces\PostInterface;
use App\Repositories\PostRepository;
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
    }
}
