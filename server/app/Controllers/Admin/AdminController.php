<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\UserModel;

class AdminController extends BaseController
{
    public function index()
    {
        // Create an instance of UserModel
        $userModel = new UserModel();
        
        // Get all users
        $users = $userModel->findAll();
        
        // Get the username from the session
        $username = session()->get('username') ?? 'Guest';

        // Prepare the response data
        $response = [
            'users' => $users,
            'username' => $username,
            'activeMenu' => 'dashboard'
        ];
        
        // Return JSON response
        return $this->response->setJSON($response);
    }
}
