<?= $this->extend('admin/layouts/app') ?>

<?= $this->section('title') ?>
Evaluations List
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<div class="col-md-12">
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Admin: List of Evaluations</h3>
            <div class="card-tools">
                <a href="/admin/evaluations/create" class="btn btn-success mb-3">Create New Evaluation</a>
            </div>
        </div>
        <div class="card-body p-0">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($evaluations as $evaluation): ?>
                    <tr>
                        <td><?= $evaluation['id']; ?></td>
                        <td><?= $evaluation['title']; ?></td>
                        <td><?= $evaluation['description']; ?></td>
                        <td>
                            <a href="/admin/evaluations/edit/<?= $evaluation['id']; ?>" class="btn btn-warning btn-sm">Edit</a>
                            <a href="/admin/evaluations/delete/<?= $evaluation['id']; ?>" class="btn btn-danger btn-sm">Delete</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <div class="mt-3">
                <?= $pager->links() ?> <!-- เรียกใช้ links() โดยไม่ส่ง argument -->
            </div>        
        </div>
    </div>
</div>

<?= $this->endSection() ?>
