<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="{{ asset('frontend/browser/styles-B3FPAJDJ.css') }}">
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
        <app-root></app-root> <!-- This is where your Angular app will be rendered -->
        <script src="{{ asset('frontend/browser/polyfills-6EAL64PA.js') }}"></script>
        <script src="{{ asset('frontend/browser/main-WK2ALEAJ.js') }}"></script>
    </body>
</html>
