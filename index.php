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
    <title>Achievethecore.org :: Instructional Practice Guide: Lesson Planning</title>
    <meta name="description" content="This guide is a practical tool that teachers, and teacher-trainers, can use (and re-use!) in order to build fluency with the Common Core State Standards (CCSS).">
    <meta property="og:description" content="This guide is a practical tool that teachers, and teacher-trainers, can use (and re-use!) in order to build fluency with the Common Core State Standards (CCSS).">
    <meta property="og:url" content="//achievethecore.org/lesson-planner/">
    <meta property="og:site_name" content="Achievethecore.org">
    <meta property="og:type" content="website">
    <meta property="og:image" content="//achievethecore.org/img/fbshare.jpg">

    <meta name="viewport" content="width=1088, maximum-scale=0.70">

    <link href='//fonts.googleapis.com/css?family=Just+Me+Again+Down+Here' rel='stylesheet' type='text/css'>
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="assets/css/main.css" />

    <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
    <script src="https://cdn.tiny.cloud/1/<?=$GLOBALS['tiny-api-key']?>/tinymce/5/tinymce.min.js"></script>
    <script src="//achievethecore.org/_standards-select.php"></script>
</head>
<body class="<?php echo (isset($user['name'])) ? 'loggedin' : ''; ?> first-section">
    <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
<!-- Begin Inspectlet Embed Code -->
<script type="text/javascript" id="inspectletjs">
window.__insp = window.__insp || [];
__insp.push(['wid', 874386827]);
(function() {
function ldinsp()
{var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); }
;
document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
})();
</script>
<!-- End Inspectlet Embed Code -->
    <div class="landing">
        <div class="atf">
            <div class="header">
                <div class="atc"><a href="." class="logo-atc"></a><img src="assets/imgs/LPT_Icons_SVG_atc_lessonplanning_logo_grey.svg" class="logo-grey"><img src="assets/imgs/LPT_Icons_SVG_atc_lessonplanning_logo_white.svg" class="logo-white"></div>
                <div class="lr">
                    <a href="#loginModal" class="btn-login">LOGIN -</a>
                    <a data-toggle="modal" href="#registerModal" class="btn-register registerbtn">REGISTER</a>
                    <a href="#" class="btn-account">ACCOUNT INFORMATION -</a>
                    <a data-toggle="modal" href="#savedModal" class="btn-saved"> SAVED LESSONS</a>
                    <a data-toggle="modal" href="#loginModal" class="loginbtn" style="display: none;">SAVED</a>
                    <a data-toggle="modal" href="#emailModal" id="emailbtn" style="display: none;">EMAIL</a>
                </div>
            </div>
            <div class="middle">
                <div class="landing-main">
                    <h1>Lesson Planning<span>Plan with the Shifts in mind</span></h1>
<h1 class="blocker" style="display:none">Welcome<span>This tool is best viewed on a desktop or tablet device</span>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="243 380 110 85" width=110 height=85 xml:space="preserve">
<g>
	<path fill="#FFFFFF" d="M314.8,462.9c0,0-1.9-1.6-3-2.7c-1-1-1.3-2.3-1.3-2.3l-0.8-8.9h-23.1l-0.8,8.9c0,0-0.3,1.4-1.3,2.4
		c-1,1-3,2.6-3,2.6s-1.7,1.2,0.9,1.6c1.5,0.2,8,0.4,13.3,0.4h5c5.4,0,11.8-0.2,13.3-0.4C316.5,464.1,314.8,462.9,314.8,462.9"/>
	<path fill="#FFFFFF" d="M348.4,442.5H247.2v-57.4h101.2V442.5z M350.3,380.2H245.8c-1.5,0-2.8,1.4-2.8,2.9v61.4
		c0,1.5,1.3,2.9,2.8,2.9h38.7h2.2h22.8h2.3h38.5c1.5,0,2.6-1.4,2.6-2.9v-61.4C353,381.6,351.8,380.2,350.3,380.2"/>
</g>
</svg>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="266 374 64 94" width=64 height=94 xml:space="preserve">
<g>
	<path fill="#FFFFFF" d="M326.7,460.5h-57.8v-76.6h57.8V460.5z M297.8,467.3c-1.4,0-2.6-1.2-2.6-2.6c0-1.4,1.2-2.6,2.6-2.6
		c1.4,0,2.6,1.2,2.6,2.6C300.4,466.2,299.3,467.3,297.8,467.3 M329.6,379.4c0-2.6-2.1-4.6-4.6-4.6h-54.3c-2.6,0-4.6,2.1-4.6,4.6
		v84.8c0,2.6,2.1,4.6,4.6,4.6H325c2.6,0,4.6-2.1,4.6-4.6V379.4z"/>
</g>
</svg>

					</h1>
                    <a href="#" class="landing-btn btn-new"><span></span>START A NEW LESSON</a>
                    <a href="#" class="landing-btn btn-continue"><span></span>CONTINUE A LESSON</a>
                </div>
                <div class="landing-info">
                    <h1>Choose your subject &amp; grade level.</h1>
                    <div class="dropdown landing-dropdown" id="dropdown-subject">
                        <a href="#" data-toggle="dropdown" class="toggle">SELECT SUBJECT<span>&#8217;</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#ela">English Language Arts / Literacy</a></li>
                            <li><a href="#math">Mathematics</a></li>
                        </ul>
                    </div>
                    <div class="dropdown landing-dropdown" id="dropdown-grade">
                        <a href="#" data-toggle="dropdown" class="toggle">SELECT GRADE<span>&#8217;</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#k">K</a></li>
                            <li><a href="#1">1</a></li>
                            <li><a href="#2">2</a></li>
                            <li><a href="#3">3</a></li>
                            <li><a href="#4">4</a></li>
                            <li><a href="#5">5</a></li>
                            <li><a href="#6">6</a></li>
                            <li><a href="#7">7</a></li>
                            <li><a href="#8">8</a></li>
                            <li class="dd-ela"><a href="#9">9</a></li>
                            <li class="dd-ela"><a href="#10">10</a></li>
                            <li class="dd-ela"><a href="#11">11</a></li>
                            <li class="dd-ela"><a href="#12">12</a></li>
                            <li class="dd-hs"><a href="#9">HS</a></li>
                        </ul>
                    </div>
                </div>
                <div class="landing-login">
                    <h1>Log In</h1>
                    <form id="landing-login-form">
                    <div class="em">
                        <input type="email" value="" placeholder="Email" name="email" id="email">
                    </div>
                    <div class="pw">
                        <input type="password" name="password" id="password" placeholder="Password">
                        <a href="#" class="btn-forgot">?</a>
                    </div>
                    </form>
                    <a href="#" class="btn-submit">SUBMIT</a>
                    <span>Not a member? <a href="#">Register Here</a></span>
                </div>
            </div>
            <div class="bottom">
                Scroll to learn more
                <div>&#8217;</div>
            </div>
        </div>
        <div class="btf">
        	<div class="section-1">

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="101px" height="64px" viewBox="0 0 101 64" enable-background="new 0 0 101 64" xml:space="preserve">
<g>
	<path fill="#B1AEA3" d="M100.437,23.752c0-1-0.029-0.441-0.069-0.55c-0.011-0.029-0.021-0.159-0.034-0.187
		c-0.049-0.102-0.108-0.25-0.188-0.331c-0.002-0.002-0.004-0.029-0.006-0.031c-0.06-0.059-0.127-0.125-0.202-0.168L62.977,1.141
		c-0.31-0.18-0.692-0.182-1.003-0.002L36.662,15.847c-0.478,0.278-0.64,0.889-0.362,1.366c0.277,0.477,0.889,0.639,1.367,0.362
		L62.479,3.156l34.963,20.185L51.735,49.904l-11.295-6.522c-0.481-0.277-1.09-0.112-1.366,0.366
		c-0.276,0.479-0.083,1.09,0.395,1.366l11.326,6.523v9.397l-16.562-9.547c-0.48-0.277-1.104-0.112-1.381,0.366
		c-0.276,0.479-0.12,1.09,0.359,1.366l18.03,10.412c0.023,0.013,0.048,0.019,0.072,0.03c0.027,0.013,0.053,0.023,0.082,0.034
		c0.111,0.041,0.226,0.069,0.343,0.069c0.117,0,0.231-0.028,0.343-0.069c0.029-0.011,0.057-0.022,0.085-0.035
		c0.025-0.012,0.051-0.017,0.075-0.031l47.879-27.721c0.308-0.179,0.676-0.508,0.676-0.864V23.752h-0.179H100.437z M52.794,61.027
		v-9.393l46-26.557v9.392L52.794,61.027z"></path>
	<path fill="#B1AEA3" d="M75.699,24.891c0.157,0.091,0.329,0.134,0.499,0.134c0.346,0,0.682-0.179,0.867-0.5
		c0.276-0.479,0.112-1.09-0.366-1.366l-16.622-9.597c-0.478-0.277-1.09-0.113-1.366,0.366c-0.276,0.479-0.112,1.09,0.366,1.366
		L75.699,24.891z"></path>
	<path fill="#B1AEA3" d="M50.4,19.427c-0.276,0.479-0.112,1.09,0.366,1.366l16.622,9.597c0.157,0.091,0.329,0.134,0.499,0.134
		c0.346,0,0.682-0.179,0.867-0.5c0.276-0.479,0.112-1.09-0.366-1.366L51.766,19.06C51.289,18.783,50.676,18.947,50.4,19.427z"></path>
	<path fill="#B1AEA3" d="M47.249,27.983c-0.276,0.478-0.112,1.09,0.366,1.366l11.462,6.618c0.157,0.091,0.329,0.134,0.499,0.134
		c0.346,0,0.682-0.179,0.867-0.5c0.276-0.479,0.112-1.09-0.366-1.366l-11.462-6.618C48.135,27.34,47.525,27.504,47.249,27.983z"></path>
	<path fill="#B1AEA3" d="M17.907,12.511C8.033,12.511,0,20.544,0,30.418s8.033,17.907,17.907,17.907s17.907-8.033,17.907-17.907
		S27.781,12.511,17.907,12.511z M17.907,46.325C9.136,46.325,2,39.19,2,30.418c0-8.771,7.136-15.907,15.907-15.907
		c8.771,0,15.907,7.136,15.907,15.907C33.814,39.19,26.678,46.325,17.907,46.325z"></path>
	<path fill="#B1AEA3" d="M24.957,29.752h-6.163v-6.384c0-0.552-0.448-1-1-1s-1,0.448-1,1v6.384h-5.938c-0.552,0-1,0.448-1,1
		s0.448,1,1,1h5.938v5.717c0,0.553,0.448,1,1,1s1-0.447,1-1v-5.717h6.163c0.552,0,1-0.448,1-1S25.509,29.752,24.957,29.752z"></path>
</g>
</svg>

			<h1>What is the Lesson Planning Tool?</h1>
			<p class="subhed">The Lesson Planning Tool guides teachers through a series of prompts about the lesson content, structure, and activities to ensure the Shifts required by college- and career-ready standards are central to the lesson. English Language Arts teachers will be guided through the process of creating a close-reading lesson. Math teachers will focus on grade or course-level standards while developing lessons.</p>
			</div>
			<div class="section-2">
			<h2>What are the Shifts?</h2>
			<p>The Shifts represent the fundamental principles of the Common Core State Standards and other college- and career-ready standards.</p>
<p><a href="http://achievethecore.org/content/upload/122113_Shifts.pdf" target="_blank" class="btn">Learn more about the Shifts</a></p>
			</div>
			<div class="section-3">
			<h2>How do I use it?</h2>
<img src="assets/imgs/splash_laptop.png">
<h3>Planning a Standards-Aligned Lesson</h3>

							<p>Start with “Planning a Standards-Aligned Lesson” to
tackle the most critical aspects of alignment. Once
you’ve completed this section, explore the other modules to deepen the alignment of your lesson. Don’t
worry - all of your work will save automatically!</p>

<hr>
<h3>Need Help?</h3>
							<p>If you need support answering a question, you can always click on the “Examples & Support” link to find background
information, sample answers, and the related Core Actions and Indicators (from the complementary Instructional Practice Guide).</p>
<hr>
<table>

					<tr>
						<td>
						<h3><span class="splash-icon">t</span> LEARNING GOAL</h3>
							<p>Math Teachers - your learning goal will be accessible throughout the process</p>

						</td>

						<td>
						<h3><span class="splash-icon">t</span> BIG IDEA</h3>
							<p>ELA Teachers - your Big Idea will be accessible throughout the process</p>

						</td>
					</tr>
</table>
<hr>
<h3>Email, Share and Print</h3>
							<p>From the "Home" page, you can print and share your
lesson, start a new lesson, or access previous lessons.</p>

<p><span class="splash-icon">&</span>
<span class="splash-icon">%</span>
<span class="splash-icon">$</span>
</p>

<hr>

<h3>When sharing your work, you’ll be asked to choose from one of two formats:</h3>
<table>
					<tr>
					<td>
					<h3><span class="splash-icon">D</span> PLANNING VIEW</h3>
					</td>
					<td>
					<h3><span class="splash-icon">E</span> COACHING VIEW</h3>
					</td>
					</tr>
					<tr>
						<td>

<p>This format presents your answers in the order the questions appeared in the Lesson Planning Tool.</p>
						</td>

						<td>

<p>This format presents your answers in the order of the Core Actions and Indicators of the Instructional Practice Guide (IPG). This layout was created to help facilitate discussion with a peer, coach, or supervisor using the IPG for non-evaluative observation.</p>

						</td>
					</tr>
</table>


</div>
<div class="section-4">
			<h2>How will I know if the lesson I plan is aligned?</h2>
			<p>Ask a coach or peer to use the Instructional Practice Guide while observing your class. The Instructional Practice Guide gives the observer specific “Core Actions” to look for to see if the content and instruction incorporate the Shifts. Throughout the Lesson Planning Tool you can see the related Core Action and Indicator for every question.</p>
			<img src="assets/imgs/splash_device_group.png" class="devices" style="margin-bottom: -320px;">

</div>
<a href="/coaching-tool" target="_blank" class="btn final">Learn More about Instructional Practice Guide</a>
<a class="to-top active" href="#"></a>
        </div>
    </div>

    <div class="top-container">
        <div class="top-interior">
            <div class="logo-block">
                <img src="assets/imgs/top-logo-block.png" />
            </div>
            <div class="top-content" spellcheck="true">

            </div>
        </div>
    </div>

    <div class="col-container">
        <div class="col-middle">
            <div class="content" spellcheck="true">
                <ul class="top-nav">
                    <li class="btn1-ela-li"><a href="#" class="btn1-ela" data-view="the-big-idea"><span></span>THE BIG IDEA</a></li>
                    <li class="btn1-math-li"><a href="#" class="btn1-math" data-view="learning-goal"><span></span>LEARNING GOAL</a></li>
                    <li><a href="#" class="btn2" data-view="attach-document"><span></span>ATTACH DOCUMENT</a></li>
                    <!--<li><a href="#" class="btn3" data-view="notes"><span></span>NOTES</a></li>-->
                </ul>
                <div class="warnings">
					<div class="warning module-1">It is important to complete the <b>Planning a Standards-Aligned Lesson</b> module prior to moving into additional modules.  Return to <a href="#">Home</a> to continue Planning a Standards-Aligned Lesson.<a class="close">X</a></div>
				</div>
                <div class="data"></div>
            </div>
        </div>

        <div class="col-left">
            <div class="toggle">
                <a href="#"><span>[</span> HOME</a>
            </div>
            <div class="interior-content">
                <div class="expanded-content">
                    <div class="data"></div>
                    <div class="bottom">
                        <a href="#" class="btn-compile">COMPILE THIS LESSON</a>
                        <div class="bottom-menu-wrapper">
                            <ul class="bottom-menu">
                                <li><a href="#" class="btn1"><span></span>START A NEW LESSON</a></li>
                                <!--<li><a href="#" class="btn2"><span></span>HELP</a></li>-->
                                <li class="dropdown">
                                    <a href="#" class="btn3" data-toggle="dropdown" data-hover="dropdown" id="namebtn"><span></span>MELISSA K.</a>
                                    <div class="dropdown-menu">
                                        <ul>
                                            <li><a href="#" id="bottom-account">ACCOUNT INFORMATION</a></li>
                                            <li><a href="#" id="bottom-previous">PREVIOUS LESSONS</a></li>
                                            <li><a href="mailto:info@studentsachieve.net?subject=[Lesson%20Planning%20Tool]%20Feedback">SEND US FEEDBACK</a></li>
                                            <li><a href="#" id="bottom-logout">LOG OUT</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="collapsed-content">
                    <a href="#" class="view-prev"></a>
                    <a href="#" class="view-next"></a>
                </div>
            </div>
        </div>

        <div class="col-right">
            <div class="cai">
                <div class="header">
                    <span class="title">Related Core Action<br/>& Indicator(s)</span>
                    <a href="#">X</a>
                </div>
                <div class="wrapper">
                	<div class="help-nav"></div>
                	<div class="ca-explanation">Each question in the Lesson Planning Tool relates to a Core Action and Indicator from the Instructional Practice Guide: Instructional Practice Guide. In order to make that connection explicit, the related Core Action and Indicator is shown below.</div>
                	<br/>
                    <div class="ca">
                        <div class="title"></div>
                        <div class="body"></div>
                    </div>
                    <div class="title" id="indicator-title">Indicator(s)</div>
                    <div class="data" id="indicator-data"></div>
                </div>
            </div>
            <div class="standards">
                <div class="header">
                    <span class="title">Standard(s) Selected</span>
                    <a href="#">X</a>
                </div>
                <div class="data"></div>
            </div>
            <div class="help">
                <div class="header">
                    <span class="title">Examples and Support</span>
                    <a href="#">X</a>
                </div>
                <div class="data"></div>
            </div>
        </div>
    </div>

    <div class="dashboard">
    	<div class="fixednav">
		<div class="header">
			<div class="atc">
				<a href="." class="logo-atc"><img src="assets/imgs/LPT_Icons_SVG_atc_lessonplanning_logo_grey.svg" class="logo-grey"><img src="assets/imgs/LPT_Icons_SVG_atc_lessonplanning_logo_white.svg" class="logo-white"></a>
			</div>
			<div class="lr">
				<a data-toggle="modal" href="#aboutModal" className="btn-about">ABOUT</a>
				<div class="profile-dropdown dropdown"><a href="#" id="profilenamelink"></a>
					<ul class="dropdown-menu" aria-labelledby="profilenamelink" id="profilemenu">
						<li><a href="#">Start a New Lesson</a></li>
						<li><a href="#">Saved Lessons</a></li>
						<li><a href="#">Account Information</a></li>
						<li><a href="#">Log Out</a></li>
					</ul>
				</div>
			</div>
		</div>
		</div>
		
		<div class="actions">
    		<button class="btn iconbtn">&</button>
    		<button class="btn iconbtn">%</button>
    		<button class="btn iconbtn">$</button>
		</div>

		<div class="tiles">
		</div>

		<div class="bottom-actions"><div class="action-tile">
				<h3>Download the questions</h3>
				<a href="#" class="download-questions" target="_blank">Download<span>]</span></a>
			</div><div class="action-tile">
				<h3>Help us improve</h3>
				<a href="mailto:info@studentsachieve.net?subject=[Lesson%20Planning%20Tool]%20Feedback">Send Feedback<span>]</span></a>
			</div></div>

		<footer>
		    <div class="container">
		        <div class="row">
		            <div class="col-xs-4"><div id="footerlogo">Student Achievement Partners</div></div>
		            <div class="col-xs-8">
		                <nav>
		                    <a href="http://www.achievethecore.org/" target="_blank">Visit achievethecore.org</a>
		                    <a href="mailto:info@studentsachieve.net?subject=[Lesson Planning Tool] Feedback" class="feedback" style="

		    margin-right: 30px;

		"><i class="icon-comment-alt"></i> SEND US FEEDBACK</a>
		                    <a href="https://github.com/achievethecore/atc-lesson-planner" class="fordev" target="_blank" style="

		    margin-right: 30px;

		">FOR DEVELOPERS</a>
		                </nav>

		            </div>
		        </div>
		    </div>
		</footer>
    </div>


    <!-- Register Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content myacctArea"></div>

            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Register</h4>
                    <h4 class="modal-title editmode">Profile Edit</h4>
                </div>
                <div class="modal-body">
                    <form id="registerform" class="mainbox">
                        <div class="form-group">
                            <label for="firstname">First Name *</label>
                            <input type="text" value="" placeholder="First Name" name="firstname" id="firstname" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="lastname">Last Name *</label>
                            <input type="text" value="" placeholder="Last Name" name="lastname" id="lastname" class="form-control">
                        </div>
                        <br class="clearBoth" />

                        <div class="form-group grade-group">
                            <label for="grade">Grade(s) *</label>
                            <div id="grade" class="form-control">
                                <div class="container"><div class="row">
                                    <div class="col-md-6">
                                        <label style="display:block;"><input type="checkbox" value="0" name="grade[]"> Kindergarten</label>
                                        <label><input type="checkbox" value="1" name="grade[]"> 1st Grade</label>
                                        <label><input type="checkbox" value="2" name="grade[]"> 2nd Grade</label>
                                        <label><input type="checkbox" value="3" name="grade[]"> 3rd Grade</label>
                                        <label><input type="checkbox" value="4" name="grade[]"> 4th Grade</label>
                                        <label><input type="checkbox" value="5" name="grade[]"> 5th Grade</label>
                                        <label><input type="checkbox" value="6" name="grade[]"> 6th Grade</label>
                                        <label><input type="checkbox" value="7" name="grade[]"> 7th Grade</label>
                                        <label><input type="checkbox" value="8" name="grade[]"> 8th Grade</label>
                                        <label><input type="checkbox" value="9" name="grade[]"> 9th Grade</label>
                                        <label><input type="checkbox" value="10" name="grade[]"> 10th Grade</label>
                                        <label><input type="checkbox" value="11" name="grade[]"> 11th Grade</label>
                                        <label><input type="checkbox" value="12" name="grade[]"> 12th Grade</label>
                                    </div>
                                 <div class="col-md-6">
                                    <label style="display:block;"><input type="checkbox" value="100"> Elementary School</label>
                                    <label><input type="checkbox" value="101"> Middle School</label>
                                    <label><input type="checkbox" value="102"> High School</label>
                                    </div>
                                 </div></div>
                            </div>
                        </div>
                        <br class="clearBoth" />

                        <div class="form-group">
                            <label for="subject">Subject of Interest *</label>
                            <select id="subject" name="subject" class="form-control">
                                <option>ELA / Literacy</option>
                                <option>Mathematics</option>
                                <option>ELA / Literacy and Mathematics</option>
                            	<option>N/A</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="role">Role *</label>
                            <select id="role" name="role" class="form-control">
                            <option>Teacher</option>
                            <option>Coach/Trainer</option>
                            <option>Principal/School Leadership</option>
                            <option>District Leadership</option>
                            <option>Other</option>
                            </select>
                        </div>
                        <br class="clearBoth" />

                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" value="" placeholder="Email" name="email" id="email" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="school">School</label>
                            <input type="text" value="" placeholder="School" name="school" id="school" class="form-control">
                        </div>
                        <br class="clearBoth" />

                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" value="" placeholder="City" name="city" id="city" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="state">State</label>
                            <select name="state" id="state" class="form-control">
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <br class="clearBoth" />

                        <div class="form-group">
                            <label for="password">Password *</label>
                            <input type="password" value="" placeholder="Password" name="password" id="password" class="form-control" autocomplete=off>
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Confirm Password *</label>
                            <input type="password" value="" placeholder="Confirm Password" name="confirm-password" id="confirm-password" class="form-control" autocomplete=off>
                        </div>
                        <br class="clearBoth" />

                        <div class="form-group checkbox-group">
                            <div class="col-xs-1">
                                <input type="checkbox" id="newsletter" value="1" name="newsletter">
                            </div>
                            <div class="col-xs-11">
                                <div class="checkbox">
                                    <label for="newsletter">
                                     Sign up to receive email updates from us.
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group checkbox-group registermode">
                            <div class="col-xs-1">
                                <input type="checkbox" id="terms_reg" value="1" name="terms_reg">
                            </div>
                            <div class="col-xs-11">
                                <div class="checkbox">
                                    <label for="terms_reg">
                                     Agree to <a href="/privacy-policy-reg" target="_blank">Privacy Statement</a> &amp; <a href="/terms-of-use-reg" target="_blank">Terms of Use</a>.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br class="clearBoth" />


                        <a class="btn btn-go btn-goforward registermode" id="register-submit" href="#">Register</a>
                        <p class="alreadyTxt registermode">
                            Already registered? <a href="#">Sign in here</a>
                         </p>

                         <a id="profile-submit" class="btn btn-go editmode" href="#">Save Changes</a>
                         <a class="btn btn-go-inverse editmode" href="#">Cancel Edit</a>
                    </form>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Log In</h4>
                    <h4 class="modal-title forgotpass">Forgot Password</h4>
                    <h4 class="modal-title forgotsent">We've sent you an email.</h4>
                </div>
                <div class="modal-body mainbox">
                    <form id="loginform">
                        <p class="forgotpass">Enter your email and we'll send you a link to reset your password.</p>
                        <div class="form-group">
                            <label for="email" class="forgotpass">Email *</label>
                            <input type="email" value="" placeholder="Email" name="email" id="email" class="form-control">
                        </div>

                        <div class="form-group">
                            <input type="password" value="" placeholder="Password" name="password" id="password" class="form-control">
                            <a href="#" class="forgetpasswordBtn">Forgot Password?</a>
                        </div>
                        <a class="btn btn-go btn-goforward btn-wide" id="login-submit" href="javascript:void(0)">Submit</a>
                    </form>
                    <p class="forgotsent">You should receive instructions on how to reset your password in the email associated with your Achieve the Core account shortly.</p>
                </div>
                <div class="modal-footer">
                    Not a member? <a href="#" class="registerhere">Register Here</a>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <!-- Saved Modal -->
    <div class="modal fade" id="savedModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Saved Lessons</h4>
                </div>
                <div class="modal-body mainbox" id="saved-lesson-data">
                    <!--Handlebars Template-->
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <!-- Email Modal -->
    <div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Email</h4>
                    <p>Email this lesson plan/supplement.</p>
                </div>
                <div class="modal-body mainbox">
                    <form id="emailform">

						<div class="form-group view-type radio-btns">
                        	<div class="radio-btn-row">
                            	<button class="btn">Planning View</button>
                            	<button class="btn">Coaching View</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="text" value="" placeholder="Email Address" name="title" class="form-control" id="saveTitle">
                        </div>

                        <div class="form-group">
                            <textarea id="textarea-notes" class="form-control" placeholder="Comments"></textarea>
                        </div>

                        <? if(isset($_SESSION['user'])): ?>
                        <div class="form-group copyme">
                            <input type="checkbox" value="1" name="copyme" id="email_copyme"> Send copy to myself at <?= ht($user['email']) ?>
                        </div>
                        <? else: ?>
                        <div class="form-group copyme">
                            <input type="checkbox" value="1" name="copyme" id="email_copyme"> Send copy to myself
                        </div>
                        <? endif; ?>
                        <a class="btn btn-go" id="email-submit" href="#">Send</a>
                    </form>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <!-- Email Modal -->
    <div class="modal fade newmodal" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Export</h4>
                    <p>Export this lesson plan/supplement.</p>
                </div>
                <div class="modal-body mainbox">
                    <form id="exportform">
                        <div class="form-group file-format radio-btns">
                        	<div class="radio-btn-row">
                            	<button class="btn">PDF</button>
                            	<button class="btn">DOC</button>
                            </div>
                        </div>

                        <div class="form-group view-type radio-btns">
                        	<div class="radio-btn-row">
                            	<button class="btn">Planning View</button>
                            	<button class="btn">Coaching View</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="dropdown">
                            	<a href="#" data-toggle="dropdown" class="toggle"><data>Choose a section</data><span>’</span></a>
                            	<ul class="dropdown-menu">
                            	</ul>
                            </div>
                        </div>
                        
                        <a class="btn" id="export-submit" href="#">Export</a>
                    </form>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    
    
	  <!-- About Modal -->
	<div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	 <div class="modal-dialog">
	     <div class="modal-content">
	         <div class="modal-header">
	             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

	         </div>
	         <div class="modal-body">
<div class="about-math"><h2>
  Welcome!
  </h2><p>
  The Lesson Planning Tool provides guiding questions and supports that help teachers create lessons that align to the Shifts required by college- and career-ready standards.
  </p><h2>
  How is the Lesson Planning Tool structured?
  </h2><p>
  The Lesson Planning Tool is made up of six
  modules; each module takes approximately one planning period to complete.
  &nbsp;
  The starting module, "Planning a
  Standards Aligned Lesson", serves as an umbrella to the other five
  modules. In this first module you are asked the highest leverage questions to
  consider from each of the other five modules.&nbsp; In exploring these high
  leverage questions, you will be sure you are considering the elements that
  are most critical to college- and career-ready standards.&nbsp; Once you complete the starting module,
  you may choose to go into more depth in any or all of the other five
  modules.&nbsp; You can access these modules in any order.
  </p><h2>
  How do I use
  it?
  </h2><p>
  1.&nbsp;&nbsp; Start with "Planning a Standards-Aligned
  Lesson" to tackle the most critical aspects of
  alignment.&nbsp; Once you've completed this section, explore the other modules to
  deepen the alignment of your lesson.&nbsp; Don't worry - all of your work will
  save automatically!
  </p><p>
  2.&nbsp; If you need support answering a
  question, you can always click on the "Examples and Support" link below each
  prompt to find background information, sample answers, and the related Core
  Actions and Indicators (from the complementary Instructional Practice Guide).
  </p><p>
  3.&nbsp; The learning goal you define in
  the starting module will be accessible from every other module, so you can
  keep this goal top of mind as you build your lesson.
  </p><p>
  4. From the "Home" page, you can
  print and share your lesson, start a new lesson, or access previous lessons.
  </p><p>
  5.&nbsp; When sharing your work, you'll be asked
  to choose from one of two formats:
  Lesson Planning Tool format presents your answers in the order the questions
  appeared in the tool.
  &nbsp;Instructional Practice Guide format presents your answers in the order of the Core Actions
  and Indicators, as they appear in the Instructional Practice Guide. This format was created
  to help to facilitate discussion with a peer, coach, or supervisor who is
  using the Instructional Practice Guide for non-evaluative observation.
  </p><h2>
  What is the Instructional Practice Guide, and how does it
  relate to the Lesson Planning Tool?
  </h2><p>
  The Instructional Practice Guide is a non-evaluative observation tool that helps coaches and teachers identify the evidence that will show whether the content of a lesson aligns to the Common Core or other college- and career-ready standards. References to Core Actions and indicators found in the Instructional Practice Guide can be found throughout the Lesson Planning Tool. Teachers using the Lesson Planning Tool with a coach or colleague can use these references to more easily make connections between what content and practice has been planned and what is to be observed during classroom instruction.  These lessons can be easily shared with a coach in advance of a non-evaluative observation focused on classroom instruction aligned to college- and career-ready standards, including the Common Core. The <a href="//achievethecore.org/category/1193/instructional-practice-toolkit-and-classroom-videos">Instructional Practice Toolkit</a> is a professional development experience that is designed to facilitate an understanding of these Core Actions and Indicators in a lesson plan, observation, and student work which will support ongoing coaching conversations.
  </p><h2>
  About Achievethecore.org
  </h2><p>
  achievethecore.org’s digital tools and
  resources for teachers have been made possible by contributions from teachers
  across the country as well as through generous support from the Leona M. and
  Harry B. Helmsley Charitable Trust and the GE Foundation.&nbsp; To learn more
  about Student Achievement Partners and for access to an array of free
  resources, please visit us at&nbsp;achievethecore.org.
  </p></div><div class="about-ela"><h2>
  Welcome!
  </h2><p>
  The Lesson Planning Tool provides guiding questions and supports that help teachers create lessons that align to the Shifts required by college- and career-ready standards.
  </p><h2>
  How is the Lesson Planning Tool structured?
  </h2><p>
  The Lesson Planning Tool is made up of six
  modules; each module takes approximately one planning period to complete.
  In ELA/Literacy, the tool focuses on
  supporting you through the process of creating a close-reading lesson plan.&nbsp;
  A close-reading lesson often spans multiple class sessions
  </p><h2></h2><p>
  The tool begins by asking you to determine
  your text and then to evaluate it for complexity.&nbsp; If you know that the text
  has already been evaluated, then you can move ahead to other modules.&nbsp; If
  not, we recommend you:


  <br>&bull;
  First evaluate the text quantitatively
  to determine the grade band
  <br>&bull;
  Second evaluate the text qualitatively,
  to determine the grade level
  <br>&bull;
  Third, evaluate the text for reader
  and task, to determine if the text is appropriate for your students<br>
  While this process can be time consuming,
  remember that a close-reading lesson will often take multiple class periods.
  </p><h2></h2><p></p><h2></h2><p>
  Once you have determined that the text is
  appropriate for your students, then you will be asked to determine the big
  idea of the text and the culminating activity that will assess if students'
  have mastered the concept(s).&nbsp; Then, you will create and sequence
  text-dependent questions and associated activities.&nbsp; You will add the
  Standards addressed.&nbsp;
  </p><h2></h2><p>
  You can move through these actions in any
  order, though we recommend the above flow.
  </p><h2></h2><p></p><h2>
  How do I use
  it?
  </h2><p>
  1.&nbsp;&nbsp; Start with Planning a Standards-Aligned Lesson.&nbsp; Once you've completed this section, we recommend you
  continue to the next module to continue to analyze your text.&nbsp; Don't worry -
  all of your work is saved automatically!
  </p><p>
  2.&nbsp; If you need support answering a
  question, you can always click on the "Examples and Support" link below each
  prompt to find background information, sample answers, and the related Core
  Actions and Indicators (from the complementary Instructional Practice Guide).
  </p><p>
  3.&nbsp; The big idea you define in the “Big
  Idea and Culminating Task” module will be accessible throughout the process,
  to help you focus all supports, questions, and tasks on this big idea.
  &nbsp;
  </p><p>
  4. From the "Home" page, you can
  print and share your lesson, start a new lesson, or access previous lessons.
  </p><p>
  5.&nbsp; When sharing your work, you'll be asked
  to choose from one of two formats:
  Lesson Planning Tool format presents your answers in the order the questions
  appeared in the tool.
  &nbsp;Instructional Practice Guide format presents your answers in the order of the Core Actions
  and Indicators, as they appear in the Instructional Practice Guide. This format was created
  to help to facilitate discussion with a peer, coach, or supervisor who is
  using the Instructional Practice Guide for non-evaluative observation.
  </p><h2>
  What is the Instructional Practice Guide, and how does it
  relate to the Lesson Planning Tool?
  </h2><p>
  The Instructional Practice Guide is a non-evaluative observation tool that helps coaches and teachers identify the evidence that will show whether the content of a lesson aligns to the Common Core or other college- and career-ready standards. References to Core Actions and indicators found in the Instructional Practice Guide can be found throughout the Lesson Planning Tool. Teachers using the Lesson Planning Tool with a coach or colleague can use these references to more easily make connections between what content and practice has been planned and what is to be observed during classroom instruction.  These lessons can be easily shared with a coach in advance of a non-evaluative observation focused on classroom instruction aligned to college- and career-ready standards, including the Common Core. The <a href="//achievethecore.org/category/1193/instructional-practice-toolkit-and-classroom-videos">Instructional Practice Toolkit</a> is a professional development experience that is designed to facilitate an understanding of these Core Actions and Indicators in a lesson plan, observation, and student work which will support ongoing coaching conversations.
  </p><h2>
  About Achievethecore.org
  </h2><p>
  achievethecore.org’s digital tools and
  resources for teachers have been made possible by contributions from teachers
  across the country as well as through generous support from the Leona M. and
  Harry B. Helmsley Charitable Trust and the GE Foundation.&nbsp; To learn more
  about Student Achievement Partners and for access to an array of free
  resources, please visit us at&nbsp;achievethecore.org.
  </p></div>
  
  
	         </div>
	         <div class="modal-footer"></div>
	     </div><!-- /.modal-content -->
	 </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

<div id="svgs" style="display:none">
<?php
	foreach(glob('assets/imgs/*.svg') as $file) {
		$base = basename($file, '.svg');
		echo "<div class='svg-preload $base'>" . preg_replace('/^.*<svg/s', '<svg', file_get_contents($file)) . "</div>";
	}
?>
</div>

	<script type="text/javascript" src="browser-bundle.js"></script>
    <!--<script type="text/javascript" data-main="assets/js/main<?= ($GLOBALS['env'] !== 'devatc') ? '-built': '' ?>" src="assets/js/lib/require.js"></script>-->
    <script>
        var _gaq=[['_setAccount','UA-28269694-7']];
         if(window.trackprof) {
         var trnames = ['uid', 'role', 'subject', 'grades'];
         for(var i=1;i<=4;i++)
         _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
         _gaq.push(['_trackEvent', 'Account', trackprof[4]]);
         }
         _gaq.push(['_trackPageview']);
         _gaq.push(['master._setAccount', '---'], ['master._trackPageview']);
         (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
         g.src='//www.google-analytics.com/ga.js';
         s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
</body>
</html>
