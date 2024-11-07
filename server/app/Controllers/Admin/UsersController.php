<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class UsersController extends BaseController
{
    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function Index()
    {
        $data['users'] = $this->userModel
            ->select('users.*, roles.role_name_eng, roles.role_name_thai')
            ->join('roles', 'roles.role_id = users.role_id', 'left')
            ->findAll();
    
        return $this->response->setJSON($data);
    }

    public function create() {
        $userModel = new UserModel();
        $data['users'] = $userModel
        ->select('users.*, roles.role_name_eng, roles.role_name_thai')
        ->join('roles', 'roles.role_id = users.role_id', 'left')
        ->findAll();

        return $this->response->setJSON([
            'users' => $data['users'],
        ]);
    }

    public function store() {
        // Attempt to get the JSON input
        $input = json_decode($this->request->getBody());
    
        // Log the raw input for debugging
        log_message('info', 'Raw input: ' . $this->request->getBody());
    
        // Check if input is null or if JSON decoding failed
        if (json_last_error() !== JSON_ERROR_NONE || !$input) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ได้รับ JSON ที่ไม่ถูกต้อง']);
        }
    
        // Extract values with null coalescing
        $username = $input->username ?? null;
        $email = $input->email ?? null;
        $password = $input->password ?? null;
        $role_name_eng = $input->role_name_eng ?? null;
    
        // Log the values for debugging
        log_message('info', 'Received username: ' . $username);
        log_message('info', 'Received email: ' . $email);
        log_message('info', 'Received password: ' . $password);
        log_message('info', 'Received role_name_eng: ' . $role_name_eng);
    
        // Check if any values are null or empty
        if (empty($username) || empty($email) || empty($password) || empty($role_name_eng)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ทุกฟิลด์ต้องกรอก']);
        }
    
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
        // Map role_name_eng to role_id
        $role_id = $this->getRoleId($role_name_eng);
    
        if (is_null($role_id)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Role is invalid.']);
        }
    
        // Save the user
        $this->userModel->save([
            'username' => $username,
            'email' => $email,
            'password' => $hashedPassword,
            'role_id' => $role_id,
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    
        return $this->response->setJSON(['status' => 'success']);
    }
    
    private function getRoleId($role_name_eng) {
        // Role mapping
        $roles = [
            'admin' => 1,
            'hr' => 2,
            'user' => 3,
        ];
    
        return $roles[$role_name_eng] ?? null; // Return role ID or null if not found
    }
        
    public function edit($user_id) {
        $user = $this->userModel
            ->select('users.username, users.email, users.password, roles.role_name_eng')
            ->join('roles', 'roles.role_id = users.role_id', 'left')
            ->find($user_id);
        
        if (!$user) {
            return $this->response->setJSON(['error' => 'User not found.']);
        }
    
        return $this->response->setJSON(['user' => $user]);
    }
            
    public function delete($user_id) {
        $this->userModel->delete($user_id);
        return $this->response->setJSON(['status' => 'success']);
    }

}
