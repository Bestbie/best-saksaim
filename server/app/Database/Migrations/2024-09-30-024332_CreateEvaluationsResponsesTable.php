<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateEvaluationsResponsesTable extends Migration
{
    public function up() {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'evaluation_id' => [
                'type' => 'INT',
                'constraint'     => 11,
                'unsigned' => true,
            ],
            'user_id' => [
                'type' => 'INT',
                'constraint'     => 11,
                'unsigned' => true,
            ],
            'response' => [
                'type' => 'INT',
                'constraint' => 1, // Rating 1-5
            ],
            'created_at' => [
                'type' => 'DATETIME',
            ],
            'updated_at' => [
                'type' => 'DATETIME',
            ]
        ]);
        $this->forge->addKey('id', true); // PK
        $this->forge->addForeignKey('evaluation_id', 'evaluation', 'id', 'CASCADE', 'CASCADE'); // FK
        $this->forge->addForeignKey('user_id', 'users', 'user_id', 'CASCADE', 'CASCADE'); // FK
        $this->forge->addUniqueKey(['evaluation_id', 'user_id']); // UQ: Unique entry for each user per evaluation
        $this->forge->createTable('evaluations_responses');
    }

    public function down() {
        $this->forge->dropTable('evaluations_responses');
    }
}
