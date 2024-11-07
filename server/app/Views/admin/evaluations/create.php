<?= $this->extend('admin/layouts/app') ?>

<?= $this->section('title') ?>
Dashboard
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<h1>Create Evaluation</h1>
<form action="/admin/evaluations/store" method="post">
    <input type="text" name="title" placeholder="Title">
    <textarea name="description" placeholder="Description"></textarea>
    <button type="submit">Save</button>
</form>


<?= $this->endSection() ?>
