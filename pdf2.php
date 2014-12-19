<?php

$contents = file_get_contents('http://23.253.224.127/pdf/pdf.cgi?url=' . rawurlencode($_REQUEST['url']) . '&status=ready' );

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="'. $_REQUEST['filename'] .'"');
header('Content-Length: ' . strlen($contents));

echo $contents;