<?php
$id = (int)$_GET['id'];
$file = str_replace('/', '', $_GET['file']);

$im = new imagick();
$im->readImage('attachments/' . $id . '/' . $file);
$n  = $im->getNumberImages();
for($i=0;$i<$n;$i++):
?>
<img src="pdfimage.php?id=<?=$id?>&file=<?=rawurlencode($file . '[' . $i . ']')?>" onload="$(this).next('i').remove()"><i class='icon-refresh icon-spin'></i><br>
<?endfor;?>