<?php
    header('Content-type: application/json');

    $GLOBALS['env'] = 'live';
    if($_SERVER['SERVER_NAME'] == 'dev.achievethecore.org'){
        $GLOBALS['env'] = 'devatc';
    }else if($_SERVER['SERVER_NAME'] == 'localhost'){
        $GLOBALS['env'] = "lcl";
    }

    if($GLOBALS['env'] != 'lcl'){
        session_start();
        include_once '../admin/db.php';
        require_once '../util.php';
        require '../Slim/Slim.php';
        \Slim\Slim::registerAutoloader();
        $app = new \Slim\Slim();
        $app->config('debug', true);

        $user = null;
        if(isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
        }

            $jsonarray = $_SESSION;
            unset($jsonarray['user']['reset_token']);
            unset($jsonarray['user']['password']);
            //unset($jsonarray['user']['email']);
            echo json_encode($jsonarray);
    }else{
        require_once '../util.php';
    }
?>