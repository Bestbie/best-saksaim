<!-- setfunctions_helper.php -->
<!-- AGNG,AGUS  user ทั่วไป -->


<?php
function __checkExpTokentime($timeexptoken)
{
    return $timeexptoken > time() ? true : false;
}


function __checkPermissions($aguper, $wpper, $status)
{    // check permissions สำหรับ เจ้าหน้าที่
    // $PermissionsAgUArr = ['AGAD'];
    $PermissionsAgUArr = ['AGNU']; //ของระบบเก่า ไม่ได้ใช้แล้ว
    $PermissionsWPArr = ['WP0013' || 'WP0012' || 'WP1031'];
    return in_array($aguper, $PermissionsAgUArr) || in_array($wpper, $PermissionsWPArr) && $status == 1 ? true : false;
}


function __checkPermissionsUser($rgU, $status)
{
    $PermissionsRGArr = [1, 2, 3, 4, 5];
    return in_array($rgU, $PermissionsRGArr) && $status == 1 ? true : false;
}



function __checkPermissionsUserAndAdmin($wpper, $status)
{
    // check permissions สำหรับ หน.หน้าบ้าน
    $PermissionsWPArr = ['WP1031'];

    // ตรวจสอบเงื่อนไข
    if ($status == 1) {
        return true;
    } elseif (in_array($wpper, $PermissionsWPArr) && $status == 1) {
        return true;
    } else {
        return false;
    }
}