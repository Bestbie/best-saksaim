<?php

namespace App\Controllers;

class Home extends BaseController
{


// อธิบายการแก้ไข:
// -password_hash('123456', PASSWORD_DEFAULT): ใช้ฟังก์ชันในตัวของ PHP เพื่อแฮชรหัสผ่าน ซึ่งเป็นวิธีการที่ปลอดภัยและง่ายในการแฮชรหัสผ่าน
// -dd($password): ใช้ในการพิมพ์ค่าออกมาดูในหน้าจอ (จากคำสั่ง dd() ใน CodeIgniter)


    public function index(): string
    {
        // ใช้ password_hash() ในการแฮชรหัสผ่าน
        // $password = password_hash('123456', PASSWORD_DEFAULT);
        // dd($password); // แสดงผลรหัสผ่านที่ถูกแฮช
        return view('login');
    }
}




