<?php

namespace App\Controllers\User;

use App\Controllers\BaseController;
use App\Models\UserModel;

class UserController extends BaseController
{
    public function index()
    {
        // Create an instance of UserModel
        $userModel = new UserModel();
        
        // Get all users
        $users = $userModel->findAll(); // Fetch all data from the users table

        // Get the username from the session
        $username = session()->get('username') ?? 'Guest'; // Default to 'Guest' if not set

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
