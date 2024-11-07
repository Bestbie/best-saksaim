<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href="" class="brand-link d-flex justify-content-center align-items-center">
    <span class="brand-text font-weight-center" style="font-size: 1.25rem;"><?= esc($username) ?></span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
        <li class="nav-item">
          <a href="<?= base_url('hr/dashboard') ?>" class="nav-link <?= (isset($activeMenu) && $activeMenu === 'dashboard') ? 'active' : '' ?>">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>Overview</p>
          </a>
        </li>
        <!-- <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-chart-bar"></i>
            <p>Reports</p>
          </a>
        </li> -->
        <li class="nav-item">
            <a href="<?= base_url('hr/evaluations/index') ?>" class="nav-link <?= (isset($activeMenu) && $activeMenu === 'evaluations') ? 'active' : '' ?>">
                <i class="nav-icon fas fa-solid fa-check"></i>
            <p>ประเมิน</p>
          </a>
        </li>
        <!-- <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-cogs"></i>
            <p>Settings</p>
          </a>
        </li> -->

        <li class="nav-item">
          <a href="<?= base_url('auth/logout') ?>" class="nav-link">
            <i class="nav-icon fas fa-sign-out-alt"></i>
            <p>ออกจากระบบ</p>
          </a>
        </li>

      </ul>
    </nav>
  </div>
</aside>
