<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\EvaluationModel;
use App\Models\UserModel;

class AdminEvaluationController extends BaseController
{
    protected $evaluationModel;

    public function __construct() {
        $this->evaluationModel = new EvaluationModel();
    }

    public function Index() {
        $userModel = new UserModel();
        $data['users'] = $userModel->findAll();
        
        // ดึงข้อมูลการประเมิน
        $perPage = 10;
        $page = $this->request->getVar('page') ? $this->request->getVar('page') : 1;

        $evaluation = $this->evaluationModel->paginate($perPage);
        $pager = $this->evaluationModel->pager;

        return $this->response->setJSON([
            'evaluation' => $evaluation,
            'pager' => [
                'hasMore' => $pager->hasMore(),
                'currentPage' => $page,
                'totalPages' => $pager->getPageCount(),
            ],
            'users' => $data['users'],
        ]);
    }
    
    public function create() {
        $userModel = new UserModel();
        $data['users'] = $userModel->findAll();

        return $this->response->setJSON([
            'users' => $data['users'],
        ]);
    }

    public function store() {
        $input = $this->request->getJSON();
    
        // Log the entire input for debugging
        log_message('info', 'Received input: ' . json_encode($input));
        
        // Check if input is null or not valid JSON
        if (!$input) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ได้รับ JSON ที่ไม่ถูกต้อง']);
        }
    
        $title = $input->title ?? null;
        $description = $input->description ?? null;
    
        // Log the values for debugging
        log_message('info', 'Received title: ' . $title);
        log_message('info', 'Received description: ' . $description);
    
        // Check if values are null or empty
        if (empty($title) || empty($description)) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ชื่อเรื่องและคำอธิบายไม่สามารถว่างเปล่าได้']);
        }
    
        $this->evaluationModel->save([
            'title' => $title,
            'description' => $description,
            'created_at' => date('Y-m-d H:i:s'), // Uncomment if needed
        ]);
    
        return $this->response->setJSON(['status' => 'success']);
    }
                                
    public function edit($id) {
        $userModel = new UserModel();
        $data['users'] = $userModel->findAll();
        
        $evaluation = $this->evaluationModel->find($id);
        
        if (!$evaluation) {
            return $this->response->setJSON(['error' => 'ไม่พบการประเมิน']);
        }
    
        return $this->response->setJSON([
            'evaluation' => $evaluation,
            'users' => $data['users'],
        ]);
    }
    
    public function update($id)
    {
        // Retrieve JSON data from the request body
        $input = $this->request->getJSON();
    
        // Prepare the data for update
        $data = [
            'title' => $input->title, // Access title from JSON input
            'description' => $input->description, // Access description from JSON input
            'updated_at' => date('Y-m-d H:i:s'),
        ];
    
        // Perform the update
        if ($this->evaluationModel->update($id, $data)) {
            return $this->response->setJSON(['status' => 'success']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'ไม่สามารถอัปเดตข้อมูลได้'], 400);
        }
    }
            
    public function delete($id) {
        $this->evaluationModel->delete($id);
        return $this->response->setJSON(['status' => 'success']);
    }
}
