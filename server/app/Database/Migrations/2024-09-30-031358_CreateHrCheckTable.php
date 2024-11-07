<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateHrCheckTable extends Migration
{
    public function up() {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint'     => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'evaluation_response_id' => [
                'type' => 'INT',
                'constraint'     => 11,
                'unsigned' => true,
            ],
            'checked_at' => [
                'type' => 'DATETIME',
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['checked', 'pending'],
                'default' => 'pending',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true, // ทำให้สามารถเก็บค่า null ได้ในกรณีสร้างข้อมูลโดยไม่ระบุ
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true, // ทำให้สามารถเก็บค่า null ได้ในกรณีสร้างข้อมูลโดยไม่ระบุ
            ],
        ]);

        $this->forge->addKey('id', true); // Primary Key
        $this->forge->addForeignKey('evaluation_response_id', 'evaluations_responses', 'id', 'CASCADE', 'CASCADE'); // Foreign Key
        $this->forge->addUniqueKey('evaluation_response_id'); // Unique Key ไม่ต้องซ้ำกับ Foreign Key
        $this->forge->createTable('hr_check');
    }

    public function down() {
        $this->forge->dropTable('hr_check');
    }
}
