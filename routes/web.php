<?php

use App\Http\Controllers\LikeController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;


Route::get('/', [ChirpController::class, 'index'])->name('chirps.index	');
Route::get('/chirps/{chirp}/comments', [CommentController::class, 'index'])->name('comments.index');

// auth middleware
Route::middleware(['auth','verified'])->group(function() {

	Route::post('/chirps', [ChirpController::class, 'store'])->name('chirps.store');
	Route::get('/chirps/{chirp}/edit', [ChirpController::class, 'edit'])->name('chirps.edit');
	Route::put('/chirps/{chirp}', [ChirpController::class, 'update'])->name(('chirps.update'));
	Route::delete('/chirps/{chirp}', [ChirpController::class, 'destroy'])->name('chirps.destroy');

	//comments
	Route::post('/chirps/{chirp}/comment', [CommentController::class, 'store'])->name('comments.store');

	//likes
	Route::post('/chirps/{chirp}/like', [LikeController::class, 'toggle'])->name('chirps.like');
	Route::post('/logout', Logout::class)
		->middleware('auth')
		->name('logout')->name('logout');

});

Route::post('/register', Register::class)
	->middleware('guest');

Route::get('/login', fn ()=> Inertia::render('Auth/Login'))
	->name('login');

Route::middleware('guest')->group(function() {
	Route::get('/register', fn () => Inertia::render('Auth/Register'))
		->name('register');

	Route::post('/login', Login::class)
		->middleware('guest');
});

