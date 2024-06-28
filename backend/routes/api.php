<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\GeneralSettingsController;
use App\Http\Controllers\StatisticsController;

Route::group(['middleware' => 'api'], function() {

    //auth routes
    Route::post('/login', [AuthController::class, 'login']);

    //posts routs
    Route::get('/get-post/{postId}', [PostController::class, 'getPost']);
    Route::get('/get-posts', [PostController::class, 'getPosts']);

    //email routs
    Route::post('/contact-us', [ContactUsController::class, 'contactUs']);

    //get general settings
    Route::get('/get-general-settings',  [GeneralSettingsController::class, 'getGeneralSettings']);

    //get page settings
    Route::get('/get-about-us-content', [GeneralSettingsController::class, 'getAboutUsContent']);

    //catalog routs
    Route::get('/get-catalogs', [CatalogController::class, 'getCatalogs']);
    Route::get('/get-catalog/{id}', [CatalogController::class, 'getCatalog']);

    //statistics
    Route::post('/count-visitor', [StatisticsController::class, 'countVisitors']);

    Route::group(['middleware' => 'auth:api'], function () {
        //auth routs
        Route::post('/logout',  [AuthController::class, 'logOut']);
        Route::get('/check-auth',  [AuthController::class, 'checkAuth']);
        Route::post('/create-user',  [AuthController::class, 'register']);
        Route::put('/change-current-user-data/{user}', [AuthController::class, 'changeUserData']);

        //catalog routs
        Route::post('/upload-pdf', [CatalogController::class, 'uploadPDF']);
        Route::delete('/delete-pdf/{pdf}', [CatalogController::class, 'deletePDF']);
        Route::post('/store-catalog', [CatalogController::class, 'storeCatalog']);
        Route::put('/update-catalog/{id}', [CatalogController::class, 'updateCatalog']);
        Route::delete('/delete-catalog/{catalog}', [CatalogController::class, 'deleteCatalog']);

        //posts routs
        Route::post('/store-post', [PostController::class, 'storePost']);
        Route::put('/update-post/{postId}', [PostController::class, 'updatePost']);
        Route::put('/delete-post/{postId}', [PostController::class, 'deletePost']);

        //General Settings
        Route::post('/upload-logo',  [GeneralSettingsController::class, 'uploadLogo']);
        Route::delete('/delete-logo/{logo}', [GeneralSettingsController::class, 'deleteLogo']);
        Route::post('/update-general-settings', [GeneralSettingsController::class, 'updateGeneralSettings']);

        //About Page Content
        Route::post('/update-about-us-content', [GeneralSettingsController::class, 'updateAboutUsContent']);

        //image routes
        Route::post('/upload-image', [ImageController::class, 'uploadImage']);
        Route::delete('/delete-image/{image}', [ImageController::class, 'deleteImage']);
        Route::delete('/delete-image-from-db/{image}', [ImageController::class, 'deleteImageFromDB']);

        //statistics
        Route::get('/get-statistics-data', [StatisticsController::class, 'getStatisticsData']);
    });
});
