<?php

namespace App\Controllers\HR;

use App\Controllers\BaseController;
use App\Models\UserModel;

class HRController extends BaseController
{
    public function index()
    {
        $userModel = new UserModel();
        // ดึงข้อมูลผู้ใช้ทั้งหมด
        $data['users'] = $userModel->findAll();
        
        // ดึงชื่อผู้ใช้จาก session
        $data['username'] = session()->get('username'); // ดึงชื่อผู้ใช้จาก session
        
        // ตรวจสอบให้แน่ใจว่ามีการตั้งค่าชื่อผู้ใช้
        if (!$data['username']) {
            $data['username'] = 'Guest'; // ตั้งค่าชื่อเริ่มต้นหากไม่มี
        }

        // Set the active menu variable
        $data['activeMenu'] = 'dashboard'; // Set this for the dashboard view

        return view('hr/dashboard', $data);// ส่งข้อมูลไปยัง view
    }
}
