<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;
use CodeIgniter\Controller;

class AuthController extends BaseController
{

    public function login()
    {
        $session = session();
        $userModel = new UserModel();
        
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
        
        // ตรวจสอบข้อมูลผู้ใช้และ password
        $user = $userModel->where('email', $email)->first();
        
        if ($user && password_verify($password, $user['password'])) {
            $sessionData = [
                'id' => $user['user_id'],
                'username' => $user['username'],
                'role_id' => $user['role_id'],
                'isLoggedIn' => true,
            ];
            $session->set($sessionData);
    
            // Redirect ตาม role
            if ($user['role_id'] == 1) {
                return redirect()->to('/admin/dashboard');
            } elseif ($user['role_id'] == 2) {
                return redirect()->to('/hr/dashboard');
            } else {
                return redirect()->to('/user/dashboard');
            }
        } else {
            $session->setFlashdata('error', 'Invalid login details');
            return redirect()->to('/login');
        }
    }
        
    // public function logout()
    // {
    //     session()->destroy();
    //     return redirect()->to('/login');
    // }
}
