<?php

namespace Config;

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes = Services::routes();

// เส้นทางทั่วไป
$routes->get('/', 'Home::index');

$routes->group('login', ['filter' => 'cors'], function ($routes) {
    $routes->get('/', 'Login::index');
    $routes->post('auth', 'Login::auth');
    $routes->get('logout', 'Login::logout'); // Adjusted route for logout
    $routes->post('logout', 'Login::logout');
});

// กลุ่มเส้นทางสำหรับ admin
$routes->group('admin', ['filter' => 'cors'], function($routes) {
    $routes->get('dashboard', 'Admin\AdminController::index');

    // Evaluation routes
    $routes->get('user/index', 'Admin\UsersController::Index');
    $routes->get('user/create', 'Admin\UsersController::create');
    $routes->post('user/store', 'Admin\UsersController::store');
    $routes->get('user/edit/(:num)', 'Admin\UsersController::edit/$1');  
    $routes->post('user/update/(:num)', 'Admin\UsersController::update/$1');
    $routes->get('user/delete/(:num)', 'Admin\UsersController::delete/$1');


    // Evaluation routes
    $routes->get('evaluations/Index', 'Admin\AdminEvaluationController::Index');
    $routes->get('evaluations/create', 'Admin\AdminEvaluationController::create');
    $routes->post('evaluations/store', 'Admin\AdminEvaluationController::store');
    $routes->get('evaluations/edit/(:num)', 'Admin\AdminEvaluationController::edit/$1');    
    $routes->post('evaluations/update/(:num)', 'Admin\AdminEvaluationController::update/$1');
    $routes->get('evaluations/delete/(:num)', 'Admin\AdminEvaluationController::delete/$1');

    $routes->get('/api/dataformcheckpremiums', 'DataformCheckPremiumsController::dataFormcheckPremiums');

});


// กลุ่มเส้นทางสำหรับ user
$routes->group('user', ['filter' => 'cors'], function($routes) {
    $routes->get('dashboard', 'User\UserController::index');

    //การประเมิน
    $routes->get('evaluations/index', 'User\UserEvaluationController::index');
    $routes->get('evaluations/show/(:num)', 'User\UserEvaluationController::show/$1');
    $routes->post('evaluations/submit', 'User\UserEvaluationController::submit');

});


// กลุ่มเส้นทางสำหรับ HR
$routes->group('hr', ['filter' => 'cors'], function($routes) {
    $routes->get('dashboard', 'HR\HRController::index');

    //การประเมิน
    $routes->get('evaluations/index', 'Hr\HrEvaluationController::Index');
    $routes->get('evaluations/show/(:num)', 'HR\HrEvaluationController::show/$1');
    $routes->post('evaluations/check', 'HR\HrEvaluationController::check');
});

