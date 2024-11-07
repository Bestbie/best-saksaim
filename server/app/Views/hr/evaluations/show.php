<?= $this->extend('hr/layouts/app') ?>

<?= $this->section('title') ?>
Dashboard
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<h1>HR: Evaluation Response</h1>
<p>Evaluation ID: <?= $response['evaluation_id']; ?></p>
<p>User ID: <?= $response['user_id']; ?></p>
<p>Response: <?= $response['response']; ?></p>

<!-- ตรวจสอบสถานะการตรวจสอบ -->
<?php if (isset($response['status']) && $response['status'] === 'checked'): ?>
    <!-- ถ้าตรวจสอบแล้ว -->
    <p>ตรวจสอบเสร็จแล้ว</p>
<?php else: ?>
    <!-- แสดงปุ่มถ้ายังไม่ได้ตรวจสอบ -->
    <form action="/hr/evaluations/check" method="post">
        <input type="hidden" name="evaluation_response_id" value="<?= $response['id']; ?>">
        <button type="submit">Mark as Checked</button>
    </form>
<?php endif; ?>

<?= $this->endSection() ?>
