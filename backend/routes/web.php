<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sent-mail', function () {

    $data = [
        'name' => 'shav',
        'email' => 'shav@shav.com',
        'phone' => '446546464131313',
        'message' => 'required|max:2500',
    ];

    return new App\Mail\ContactUs($data);
});
