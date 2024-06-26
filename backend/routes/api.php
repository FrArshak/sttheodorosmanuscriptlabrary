<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ContactUsController;

Route::group(['middleware' => 'api'], function() {

    //auth routes
    Route::post('/login', [AuthController::class, 'login']);

    //posts routs
    Route::get('/get-post/{postId}', [PostController::class, 'getPost']);
    Route::get('/get-posts', [PostController::class, 'getPosts']);

    //email routs
    Route::post('/contact-us', [ContactUsController::class, 'contactUs']);

    //statistics
    Route::post('/count-visitor', 'App\Http\Controllers\StatisticsController@countVisitors');

    Route::group(['middleware' => 'auth:api'], function () {
        //auth routs
        Route::post('/logout',  [AuthController::class, 'logOut']);
        Route::get('/check-auth',  [AuthController::class, 'checkAuth']);
        Route::post('/create-user',  [AuthController::class, 'register']);
        Route::put('/change-current-user-data/{user}', [AuthController::class, 'changeUserData']);

        //posts routs
        Route::post('/store-post', [PostController::class, 'storePost']);
        Route::put('/update-post/{postId}', [PostController::class, 'updatePost']);
        Route::put('/delete-post/{postId}', [PostController::class, 'deletePost']);

        //image routes
        Route::post('/upload-image', [ImageController::class, 'uploadImage']);
        Route::delete('/delete-image/{image}', [ImageController::class, 'deleteImage']);
        Route::delete('/delete-image-from-db/{image}', [ImageController::class, 'deleteImageFromDB']);

        //statistics
        Route::get('/get-statistics-data', 'App\Http\Controllers\StatisticsController@getStatisticsData');
    });
});
