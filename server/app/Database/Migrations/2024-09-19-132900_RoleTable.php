<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RoleTable extends Migration
{
    public function up()
    {
        // สร้างตาราง roles
        $this->forge->addField([
            'role_id' => [
            'type'               => 'INT',
            'constraint'         => 11,
            'unsigned'           => true,
            'auto_increment'     => true,
            ],
            'role_name_eng' => [
                'type'               => 'VARCHAR',
                'constraint'         => '100',
            ],
            'role_name_thai' => [
                'type'               => 'VARCHAR',
                'constraint'         => '100',
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
        $this->forge->addKey('role_id', true);

        // สร้างตาราง
        $this->forge->createTable('roles');
    }

    public function down()
    {
        // ลบตาราง roles เมื่อย้อนการ migration
        $this->forge->dropTable('roles');
    }
}
