<?= $this->extend('hr/layouts/app') ?>

<?= $this->section('title') ?>
Dashboard
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<ul>
    <?php foreach ($responses as $response): ?>
        <li>
            <a href="/hr/evaluations/show/<?= $response['id']; ?>">View Response</a> 
            - 
            <?php if (isset($response['status']) && $response['status'] == 'checked'): ?>
                ตรวจสอบเสร็จแล้ว
            <?php else: ?>
                กำลังตรวจสอบ
            <?php endif; ?>
        </li>
    <?php endforeach; ?>
</ul>

<?= $this->endSection() ?>
