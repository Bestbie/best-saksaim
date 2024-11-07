<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class UserController extends BaseController
{
    public function index()
    {
        $userModel = new UserModel();
        $data['users'] = $userModel->findAll(); // ดึงข้อมูลทั้งหมดจากตาราง users

        return view('user.dashboard', $data); // ส่งข้อมูลไปยัง view
    }
}
