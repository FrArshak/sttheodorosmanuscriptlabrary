<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['middleware' => 'api'], function() {

    //auth routes
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => 'auth:api'], function () {
        //auth routs
        Route::post('/logout',  [AuthController::class, 'logOut']);
        Route::get('/check-auth',  [AuthController::class, 'checkAuth']);
        Route::post('/create-user',  [AuthController::class, 'register']);
        Route::put('/change-current-user-data/{user}', 'App\Http\Controllers\AuthController@changeUserData');


        //image routes
        Route::post('/upload-image', 'App\Http\Controllers\ImageController@uploadImage');
        Route::delete('/delete-image/{image}', 'App\Http\Controllers\ImageController@deleteImage');
        Route::delete('/delete-image-from-db/{image}', 'App\Http\Controllers\ImageController@deleteImageFromDB');


    });
});
