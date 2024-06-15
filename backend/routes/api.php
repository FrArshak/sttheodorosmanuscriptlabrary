<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['middleware' => 'api'], function() {

    //auth routes
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/logout',  [AuthController::class, 'logOut']);
        Route::get('/check-auth',  [AuthController::class, 'checkAuth']);
        Route::post('/create-user',  [AuthController::class, 'register']);
    });
});
