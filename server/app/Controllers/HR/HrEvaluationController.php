<?php

namespace App\Controllers\Hr;

use App\Controllers\BaseController;
use App\Models\EvaluationResponseModel;
use App\Models\HrCheckModel;
use App\Models\UserModel;
use Config\Database; // Ensure this is included to access the Database class

class HrEvaluationController extends BaseController
{
    protected $responseModel;
    protected $hrCheckModel;
    protected $db; // Declare the db property

    public function __construct() {
        $this->responseModel = new EvaluationResponseModel();
        $this->hrCheckModel = new HrCheckModel();
        $this->db = Database::connect(); // Initialize the database connection
    }

    public function index() {
        $userModel = new UserModel();
        
        // Get the username from the session
        $data['username'] = session()->get('username') ?? 'Guest'; // Default to 'Guest' if not set
    
        // Fetch evaluation responses with joins
        $data['responses'] = $this->responseModel
            ->select('evaluations_responses.*, hr_check.status, users.username, evaluation.title, evaluation.description')
            ->join('hr_check', 'hr_check.evaluation_response_id = evaluations_responses.id', 'left')
            ->join('users', 'users.user_id = evaluations_responses.user_id', 'left')
            ->join('evaluation', 'evaluation.id = evaluations_responses.evaluation_id', 'left')
            ->findAll();
    
        // Modify status based on whether it has been checked or not
        foreach ($data['responses'] as &$response) {
            // Check if the status is null or empty, assign "Pending"
            // Otherwise, assign "Checked" if status is present
            if (empty($response['status'])) {
                $response['status'] = 'Pending';
            } else {
                $response['status'] = 'Checked'; // Or you can retain the original status if needed
            }
        }
    
        return $this->response->setJSON($data); // Send data as JSON
    }
                        
    public function show($id) {
        $userModel = new UserModel();
        // Get all users
        $data['users'] = $userModel->findAll();
        // Get the username from the session
        $data['username'] = session()->get('username') ?? 'Guest'; // Default to 'Guest' if not set
    
        $data['response'] = $this->responseModel
            ->select('evaluations_responses.*, hr_check.status, users.username, evaluation.title, evaluation.description') // Single string with comma-separated fields
            ->join('hr_check', 'hr_check.evaluation_response_id = evaluations_responses.id', 'left')
            ->join('users', 'users.user_id = evaluations_responses.user_id', 'left')
            ->join('evaluation', 'evaluation.id = evaluations_responses.evaluation_id', 'left')
            ->find($id);
            
        if (!$data['response']) {
            return $this->response->setJSON(['error' => 'ไม่พบการตอบกลับ'], 404); // ส่งข้อผิดพลาดถ้าไม่พบ
        }
    
        return $this->response->setJSON($data); // ส่งข้อมูลเป็น JSON
    }
    
    public function check() {
        // Log incoming request
        $postData = json_decode($this->request->getBody(), true); // Decode JSON body
        log_message('info', 'Incoming check request: ' . json_encode($postData));
        
        // Retrieve evaluation response ID and status directly from request
        $evaluationResponseId = $postData['evaluation_response_id'] ?? null;
        $status = $postData['status'] ?? null;
        log_message('info', 'Evaluation Response ID: ' . json_encode($evaluationResponseId));
        log_message('info', 'Status from request: ' . json_encode($status));
        
        // Check if evaluation response ID or status is empty
        if (empty($evaluationResponseId) || empty($status)) {
            log_message('error', 'Missing evaluation_response_id or status');
            return $this->response->setJSON([
                'error' => 'ต้องมีรหัสตอบกลับการประเมินและสถานะ',
                'message' => 'กรุณาตรวจสอบว่าคุณได้ส่งข้อมูลรหัสตอบกลับการประเมินและสถานะในคำขอของคุณแล้ว'
            ], 400); // Return error response with additional message
        }
        
        // Check if the evaluation response ID exists
        $existingCheck = $this->hrCheckModel->where('evaluation_response_id', $evaluationResponseId)->first();
        if ($existingCheck) {
            return $this->response->setJSON(['error' => 'การตรวจสอบนี้ถูกบันทึกแล้ว'], 400); // Already exists error
        }
    
        // Attempt to save the HR check data
        $saved = $this->hrCheckModel->save([
            'evaluation_response_id' => $evaluationResponseId,
            'checked_at' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'status' => $status, // Use the provided status
        ]);
        
        // Check if the save operation was successful
        if (!$saved) {
            log_message('error', 'Failed to save HR check data for ID: ' . $evaluationResponseId);
            return $this->response->setJSON(['error' => 'ไม่สามารถบันทึกการตรวจสอบได้'], 500); // Return failure response
        }
    
        // Return success response if everything went well
        return $this->response->setJSON(['status' => 'success']);
    }
}
