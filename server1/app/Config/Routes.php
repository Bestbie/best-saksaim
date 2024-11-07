<?php

namespace Config;

use CodeIgniter\Router\RouteCollection;
/**
 * @var RouteCollection $routes
    */           
$routes = Services::routes();
    
                //Ctrl::function
$routes->get('/', 'Home::index');

$routes->get('/login', 'AuthController::login');
$routes->post('/login', 'AuthController::login');
$routes->get('/logout', 'AuthController::logout');

$routes->group('admin', function($routes) {
    $routes->get('dashboard', 'AdminController::dashboard');
    // กำหนดเส้นทางอื่นๆ ตามต้องการ
});

$routes->get('/hr/dashboard', 'HRController::index', ['filter' => 'auth']);
// $routes->get('/user/dashboard', 'UserController::index', ['filter' => 'auth']);

$routes->get('/user/dashboard', 'UserController::index');
