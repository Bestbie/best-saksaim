<?= $this->extend('user/layouts/app') ?>

<?= $this->section('title') ?>
Dashboard
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<h1>User: List of Evaluations</h1>
<ul>
    <?php foreach ($evaluations as $evaluation): ?>
        <li><a href="/user/evaluations/show/<?= $evaluation['id']; ?>"><?= $evaluation['title']; ?></a></li>
    <?php endforeach; ?>
</ul>

<?= $this->endSection() ?>
