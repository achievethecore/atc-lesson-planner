<?php

$ds = DIRECTORY_SEPARATOR;
if (!empty($_FILES))
{
	$dir = 'attachments/'.$_POST['id'];
	if (!is_dir($dir)) {
    	mkdir($dir);         
	} 
	$storeFolder = $dir;
    $tempFile = $_FILES['file']['tmp_name'];         
    $targetPath = dirname( __FILE__ ) . $ds . $storeFolder . $ds;
    $targetFile =  $targetPath . $_FILES['file']['name'];
    move_uploaded_file($tempFile,$targetFile);
}

?> 