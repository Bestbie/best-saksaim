<?= $this->extend('admin/layouts/app') ?>

<?= $this->section('title') ?>
Dashboard
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="content">
  <div class="container-fluid">
    <!-- Example content -->
    <div class="row">
      <div class="col-12">
        <div class="card">
            <div class="card-header">
            <h3 class="card-title">Dashboard Overview</h3>
          </div>
          <div class="card-body">
            <p>ยินดีต้อนรับสู่ Dashboard ของ <h4><?= is_array($username) ? $username['username'] : $username; ?></h4>! ที่นี่คุณสามารถดูข้อมูลต่างๆ และจัดการแอปพลิเคชันของคุณได้อย่างง่ายดาย.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</section>
<?= $this->endSection() ?>
