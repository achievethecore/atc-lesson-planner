<?php
    $GLOBALS['env'] = 'live';
    if ($_SERVER['SERVER_NAME'] == 'dev.achievethecore.org'){
        $GLOBALS['env'] = 'devatc';
    }else {
        if (strpos($_SERVER['SERVER_NAME'], 'lessonplanner.tn') !== false) {
            $GLOBALS['env'] = "lcl";
        }
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
    }else{
        require_once 'util.php';
    }
?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Achievethecore.org :: Instructional Practice Guide: Lesson Planning (Beta)</title>
    <meta name="description" content="This guide is a practical tool that teachers, and teacher-trainers, can use (and re-use!) in order to build fluency with the Common Core State Standards (CCSS).">
    <meta property="og:description" content="This guide is a practical tool that teachers, and teacher-trainers, can use (and re-use!) in order to build fluency with the Common Core State Standards (CCSS).">
    <meta property="og:url" content="http://achievethecore.org/lesson-planner/">
    <meta property="og:site_name" content="Achievethecore.org">
    <meta property="og:type" content="website">
    <meta property="og:image" content="//achievethecore.org/img/fbshare.jpg">

    <meta name="viewport" content="width=1088, initial-scale=0.70, maximum-scale=0.70">

    <link href='//fonts.googleapis.com/css?family=Just+Me+Again+Down+Here' rel='stylesheet' type='text/css'>
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="assets/css/main.css" />

    <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
    <!--<script src="http://tinymce.cachefly.net/4/tinymce.min.js"></script>-->
    <script src="//achievethecore.org/_standards-select.php"></script>
    <script>window.tinyMCE = window.tinymce = {}</script>
</head>
<body class="plan compiled-lesson" data-id="<?= htmlspecialchars($_GET['id']) ?>" data-section="<?= !isset($_GET['section']) ? '-1' : htmlspecialchars($_GET['section']) ?>">
    <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
    <div class="data"></data>

    <script type="text/javascript" src="plan-bundle.js"></script>
    <script>
        var _gaq=[['_setAccount','UA-0']]; //'UA-28269694-6'
         if(window.trackprof) {
         var trnames = ['uid', 'role', 'subject', 'grades'];
         for(var i=1;i<=4;i++)
         _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
         _gaq.push(['_trackEvent', 'Account', trackprof[4]]);
         }
         _gaq.push(['_trackPageview']);
         (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
         g.src='//www.google-analytics.com/ga.js';
         s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
</body>
</html>
