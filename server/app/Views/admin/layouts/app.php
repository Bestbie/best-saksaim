<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $this->renderSection('title') ?></title>
    <!-- AdminLTE CSS -->
    <link rel="stylesheet" href="<?= base_url('dist/css/adminlte.min.css') ?>">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?= base_url('plugins/fontawesome-free/css/all.min.css') ?>">
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">

  <!-- Navbar -->
  <?= $this->include('admin/layouts/header') ?>

  <!-- /.navbar -->

  <!-- Sidebar -->
  <?= $this->include('admin/layouts/sidebar') ?>

  <!-- Content Wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <?= $this->renderSection('content') ?>
  </div>
  <!-- /.content-wrapper -->

  <!-- Footer -->
  <?= $this->include('admin/layouts/footer') ?>
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="<?= base_url('plugins/jquery/jquery.min.js') ?>"></script>
<!-- Bootstrap 4 -->
<script src="<?= base_url('plugins/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
<!-- AdminLTE App -->
<script src="<?= base_url('dist/js/adminlte.min.js') ?>"></script>
</body>
</html>
