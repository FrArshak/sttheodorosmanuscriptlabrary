<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');


//Route::any('/{any}', function () {
//    return view('welcome');
//})->where('any', '^(?!api).*$');

//Route::get('/sent-mail', function () {
//
//    $data = [
//        'name' => 'shav',
//        'email' => 'shav@shav.com',
//        'phone' => '446546464131313',
//        'message' => 'required|max:2500',
//    ];
//
//    return new App\Mail\ContactUs($data);
//});
