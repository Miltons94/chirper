<?php

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\ChirpController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ChirpController::class, 'index']);
// auth middleware
Route::middleware(['auth','verified'])->group(function(){
	Route::post('/chirps', [ChirpController::class, 'store']);
	Route::get('/chirps/{chirp}/edit', [ChirpController::class, 'edit']);
	Route::put('/chirps/{chirp}', [ChirpController::class, 'update']);
	Route::delete('/chirps/{chirp}', [ChirpController::class, 'destroy']);
});

// Route::resource('/chirps', ChirpController::class)
// ->only(['store', 'edit', 'update', 'destroy']);
// The above route can be used in place of the other four routes for CRUD

Route::view('/register', 'auth.register')
->middleware('guest')
->name('register');

Route::post('/register', Register::class)
->middleware('guest');

Route::view('/login', 'auth.login')
->name('login');
Route::post('/login', Login::class)
->middleware('guest')
->name('login.authenticate');

Route::post('/logout', Logout::class)
->middleware('auth')
->name('logout');





