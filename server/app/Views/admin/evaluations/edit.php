<?= $this->extend('admin/layouts/app') ?>

<?= $this->section('title') ?>
Edit Evaluation
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<h1>Edit Evaluation</h1>

<form action="/admin/evaluations/update/<?= $evaluation['id']; ?>" method="post">
    <?= csrf_field(); ?> <!-- สำหรับป้องกัน CSRF Attack -->
    
    <div>
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" value="<?= old('title', $evaluation['title']); ?>" required>
    </div>

    <div>
        <label for="description">Description:</label>
        <textarea name="description" id="description" required><?= old('description', $evaluation['description']); ?></textarea>
    </div>

    <div>
        <button type="submit">Update Evaluation</button>
        <a href="/admin/evaluations">Cancel</a>
    </div>
</form>

<?= $this->endSection() ?>
