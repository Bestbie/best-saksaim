<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use App\Models\UserModel;

class Login extends Controller
{
    public function index()
    {
        helper(['form']);
        return view('login'); // Load the login view
    }

    public function auth()
    {
        $model = new UserModel();
        $session = session();

        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $data = $model->where('email', $email)->first();

        if ($data) {
            $pass = $data['password'];
            $verify_password = password_verify($password, $pass);

            if ($verify_password) {
                $ses_data = [
                    'user_id' => $data['user_id'],
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'role_id' => (int)$data['role_id'],
                    'logged_in' => TRUE
                ];
                $session->set($ses_data);

                // Return role-specific response
                $roleId = (int)$data['role_id'];
                return $this->response->setJSON([
                    'status' => 'success',
                    'role_id' => $roleId,
                    'redirect_url' => $this->getRedirectUrl($roleId) // Get redirect URL based on role
                ]);
            } else {
                return $this->response->setJSON([
                    'status' => 'error',
                    'message' => 'รหัสผ่านไม่ถูกต้อง' // Invalid password message
                ]);
            }
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'อีเมลไม่ถูกต้อง' // Invalid email message
            ]);
        }
    }

    private function getRedirectUrl($roleId)
    {
        switch ($roleId) {

            case 1: // Admin
                return '/admin/dashboard';
            case 2: // HR
                return '/hr/dashboard';
            case 3: // User
            default:
                return '/user/dashboard'; // Default for user role
        }
    }

    public function logout()
    {
        // Destroy the session
        session()->destroy();
        // Return a JSON response
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Logout successful.'
        ]);
    }
        
}
