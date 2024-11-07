<?php

namespace App\Controllers\User;

use App\Controllers\BaseController;
use App\Models\EvaluationModel;
use App\Models\EvaluationResponseModel;
use App\Models\UserModel;
use Config\Database; // Ensure this is included to access the Database class

class UserEvaluationController extends BaseController
{
    protected $evaluationModel;
    protected $responseModel;
    protected $db; // Declare the db property

    public function __construct() {
        $this->evaluationModel = new EvaluationModel();
        $this->responseModel = new EvaluationResponseModel();
        $this->db = Database::connect(); // Initialize the database connection
    }

    public function index() {
        // Load the UserModel and EvaluationModel
        $userModel = new UserModel();
        $evaluationModel = new EvaluationModel();
    
        // Get all evaluations
        $data['evaluations'] = $evaluationModel->findAll(); // Ensure this returns an array of evaluations
    
        // Return the data as a JSON response
        return $this->response->setJSON($data);
    }
        
    public function show($id) {
        $userModel = new UserModel();
        
        // Get all users
        $data['users'] = $userModel->findAll();
        
        // Get the username from the session
        $data['username'] = session()->get('username') ?? 'Guest'; // Default to 'Guest' if not set
        $data['evaluation'] = $this->evaluationModel->find($id);
        
        if (!$data['evaluation']) {
            return $this->response->setJSON(['error' => 'ไม่พบการประเมิน'], 404); // Error if not found
        }
    
        return $this->response->setJSON($data); // Return evaluation data as JSON
    }
    
    public function submit() {
        // Log incoming request
        $postData = json_decode($this->request->getBody(), true); // Decode JSON body
        log_message('info', 'Incoming submit request: ' . json_encode($postData));
    
        // Retrieve user ID directly from request
        $userId = $postData['user_id'] ?? null; // Use null coalescing to avoid undefined index
        log_message('info', 'User ID from request: ' . json_encode($userId));
    
        // Check if userId is empty
        if (empty($userId)) {
            return $this->response->setJSON(['error' => 'ไม่พบรหัสผู้ใช้'], 400);
        }
    
        // Retrieve and log evaluation IDs and responses
        $evaluationIds = $postData['evaluation_id'] ?? [];
        $responses = $postData['response'] ?? [];
        log_message('info', 'User ID: ' . json_encode($userId) . ', Evaluation IDs: ' . json_encode($evaluationIds) . ', Responses: ' . json_encode($responses));
    
        // Validate if evaluation IDs and responses are arrays
        if (!is_array($evaluationIds) || !is_array($responses)) {
            return $this->response->setJSON(['error' => 'รหัสประเมินและการตอบกลับต้องเป็นอาร์เรย์'], 400);
        }
    
        // Validate data: check if evaluation IDs and responses are not empty and have the same count
        if (empty($evaluationIds) || empty($responses) || count($evaluationIds) !== count($responses)) {
            return $this->response->setJSON(['error' => 'ข้อมูลไม่ถูกต้องหรือจำนวนข้อมูลไม่ตรงกัน'], 400);
        }
    
        // Validate evaluation IDs
        foreach ($evaluationIds as $evaluationId) {
            if (!$this->db->table('evaluation')->where('id', $evaluationId)->countAllResults()) {
                return $this->response->setJSON(['error' => 'รหัสการประเมินผล ' . $evaluationId . ' ไม่มีอยู่จริง'], 400);
            }
        }
    
        // Save responses
        foreach ($evaluationIds as $index => $evaluationId) {
            $responseValue = $responses[$index] ?? null;
    
            if (is_array($responseValue)) {
                return $this->response->setJSON(['error' => 'การตอบกลับต้องเป็นค่าเดียว'], 400);
            }
    
            // Check if this user has already submitted a response for this evaluation
            $existingResponse = $this->responseModel
                ->where('evaluation_id', $evaluationId)
                ->where('user_id', $userId)
                ->first();
    
            if ($existingResponse) {
                // If a response already exists, return a specific error message
                return $this->response->setJSON(['error' => 'กรอกข้อมูลแล้ว ไม่สามารถกรอกข้อมูลได้อีก'], 400); // "You have already submitted, you cannot submit again."
            }
    
            // Insert new response if no existing entry is found
            $this->responseModel->save([
                'evaluation_id' => $evaluationId,
                'user_id' => $userId,
                'response' => $responseValue,
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }
    
        return $this->response->setJSON(['status' => 'success']);
    }
}
