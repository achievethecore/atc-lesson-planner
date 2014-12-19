<?php
$id = (int)$_GET['id'];
$file = str_replace('/', '', $_GET['file']);
ini_set('memory_limit', '512M');
$im = new Imagick();
$im->setResolution( 150, 150 );
$im->readImage('attachments/' . $id . '/' . $file);
$im->thumbnailImage(1200, 0);
$im->setImageFormat('png');
header('Content-Type: image/png');
echo $im;
?>