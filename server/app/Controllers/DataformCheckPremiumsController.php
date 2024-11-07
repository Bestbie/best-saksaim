<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Models\EvaluationModel;

class DataformCheckPremiumsController extends BaseController
{
    public function __construct()
    {
        helper('setfunctions'); // โหลด helper 'setfunctions'
        $this->ApiUserModel = new UserModel(); // สร้างตัวแปร UserModel
        $this->evaluationModel = new EvaluationModel(); // สร้างตัวแปร EvaluationModel
    }

    public function dataFormcheckPremiums()
    {
        // รับค่า Token จาก request
        $expToken = $this->request->getVar('_PerExp_Token');
        $perRGToken = $this->request->getVar('_PerRG_Token');
        $perSTToken = $this->request->getVar('_PerST_Token');
        $perDToken = $this->request->getVar('_PerD_Token');

        // ตรวจสอบว่ามี Token ทั้งหมดหรือไม่
        if ($expToken && $perRGToken && $perSTToken && $perDToken) {
            try {
                // Decode tokens
                $ExpTokenDecoded = base64_decode($expToken);
                $PerRGTokenDecoded = base64_decode($perRGToken);
                $PerSTTokenDecoded = base64_decode($perSTToken);
                $PerDTokenDecoded = base64_decode($perDToken);

                // ตรวจสอบว่าโทเค็นหมดอายุหรือไม่
                if (__checkExpTokentime($ExpTokenDecoded)) {
                    // ตรวจสอบสิทธิ์ของผู้ใช้และผู้ดูแลระบบ
                    if (__checkPermissionsUserAndAdmin($PerRGTokenDecoded, $PerSTTokenDecoded)) {
                        // ดึงข้อมูลจาก evaluationModel
                        $fetchRecord = $this->evaluationModel->getData();
                        
                        // ส่งกลับข้อมูลในรูปแบบ JSON
                        return $this->response->setJSON([
                            'status' => 200,
                            'data' => $fetchRecord
                        ]);
                    } else {
                        // สิทธิ์ไม่ถูกต้อง
                        return $this->response->setJSON([
                            'status' => 403,
                            'message' => 'สิทธิ์การเรียกข้อมูลไม่ถูกต้อง',
                        ])->setStatusCode(403);
                    }
                } else {
                    // โทเค็นหมดอายุ
                    return $this->response->setJSON([
                        'status' => 403,
                        'message' => 'Token หมดอายุการใช้งาน'
                    ])->setStatusCode(403);
                }
            } catch (\Exception $e) {
                // หากเกิดข้อผิดพลาดใด ๆ ในกระบวนการ
                log_message('error', $e->getMessage());
                return $this->response->setJSON([
                    'status' => 500,
                    'message' => 'เกิดข้อผิดพลาดในระบบ'
                ])->setStatusCode(500);
            }
        } else {
            // Token ไม่ครบถ้วน
            return $this->response->setJSON([
                'status' => 403,
                'message' => 'สิทธิ์การเข้าใช้งานไม่ถูกต้อง หรือข้อมูลไม่ครบถ้วน',
            ])->setStatusCode(403);
        }
    }
}
