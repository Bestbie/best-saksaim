<?= $this->extend('user/layouts/app') ?>

<?= $this->section('title') ?>
Dashboard
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<h1><?= $evaluation['title']; ?></h1>
<p><?= $evaluation['description']; ?></p>
<form action="/user/evaluations/submit" method="post">
    <input type="hidden" name="evaluation_id" value="<?= $evaluation['id']; ?>">
    <label><input type="radio" name="response" value="1"> แย่มาก</label>
    <label><input type="radio" name="response" value="2"> แย่</label>
    <label><input type="radio" name="response" value="3"> ปานกลาง</label>
    <label><input type="radio" name="response" value="4"> ดี</label>
    <label><input type="radio" name="response" value="5"> ดีมาก</label>
    <button type="submit">Submit</button>
</form>



<?= $this->endSection() ?>
