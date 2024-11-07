<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class User_Table extends Migration
{
    public function up()
    {
        // สร้างตาราง users
        $this->forge->addField([
            'user_id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'username' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'email' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
                'unique'     => true,
            ],
            'password' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'role_id' => [
                'type'       => 'INT',
                'constraint' => 11,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        // กำหนด primary key
        $this->forge->addKey('user_id', true);

        // สร้างตาราง
        $this->forge->createTable('users');
    }

    public function down()
    {
        // ลบตาราง users เมื่อย้อนการ migration
        $this->forge->dropTable('users');
    }
}
