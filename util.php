<?php


define('PAGETYPE_LIST', 0);
define('PAGETYPE_LISTSECTION', 1);
define('PAGETYPE_DETAIL', 2);


function search_matches($search, $item, $itemextra) {
	$m_grade = false;
	foreach($search['grades'] as $grade) {
		if(in_array('grades' . $grade, $itemextra)!==FALSE) $m_grade = true;
	}
	if(in_array('roles' . $search['roles'], $itemextra)===FALSE) return false;
	if($search['roles'] != 3)
		if(in_array('subjects' . $search['subjects'], $itemextra)===FALSE) return false;
	return $m_grade;
}


function slugify($text, $type=-1)
{
    // replace non letter or digits by -
    $text = preg_replace('~[^\\pL\d]+~u', '-', $text);
 
    // trim
    $text = trim($text, '-');
 
    // transliterate
    if (function_exists('iconv'))
    {
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    }
 
    // lowercase
    $text = strtolower($text);
 
    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);
 
    if (empty($text))
    {
        return 'n-a';
    }
    
    if($type == PAGETYPE_DETAIL) $text .= '-detail-pg';
    if($type == PAGETYPE_LIST || $type == PAGETYPE_LISTSECTION) $text .= '-list-pg';
 
    return $text;
}

function is_dash_or_page() {
	return (strpos(resource_uri(), 'dashboard')!==FALSE) || (strpos(resource_uri(), 'page')!==FALSE);
}

function ht($s) {
	return htmlspecialchars($s);
}
 
function resource_uri() {
	return \Slim\Slim::getInstance()->request->getResourceUri();
}

function root_uri() {
	return \Slim\Slim::getInstance()->request->getRootUri();
}

function http_domain() {
	return \Slim\Slim::getInstance()->request->getUrl();
}

function page_uri($page) {
	if($page['type'] != PAGETYPE_DETAIL && strpos(resource_uri(), 'dashboard') !== FALSE) {
		$uri = explode('/page/',resource_uri());
		return root_uri() . $uri[0] . '/page/' . $page['id'] . '/' . slugify($page['name'], $page['type']);
	}
	return root_uri() . '/page/' . $page['id'] . '/' . slugify($page['name'], $page['type']);
}
function page_file_uri($page) {
	return page_uri($page) . '#download';
}

function upload_uri() {
	return '/content/';
}

function default_img() {
	return 'upload/default.png';
}

function role_params() {
	$uri = resource_uri();
	$parts = explode('search/', $uri);
	return $parts[1];
}


function check_role($name, $value) {
	if(!isset($_SESSION['user'])) return false;
	if(!isset($_SESSION['user']['search'])) return false;
	if(!isset($_SESSION['user']['search'][$name])) return false;
	return $_SESSION['user']['search'][$name] == $value;
}

function all_grades() {
	return array(0,1,2,3,4,5,6,7,8,9,10,11,12);
}

function subject_id($label) {
	if($label == "ELA / Literacy") return 1;
	if($label == "Mathematics") return 2;
	return 1; // nope 
}
function role_id($label) {
	if($label == "Teacher/Coach") return 1;
	if($label == "Schl/Dist Leader") return 3;
	return 1; // nope 
}

function subject_label($id) {
	if($id == 1) return "ELA / Literacy";
	/*if($id == 2)*/ return "Mathematics";
}
function role_label($id) {
	if($id == 1) return "Teacher/Coach";
	/*if($id == 3)*/ return "Schl/Dist Leader";
}

function load_saved_search($user) {
	if(!isset($user['saved_grades']) || !isset($user['saved_role']) || !isset($user['saved_subject'])) return $user;
	if($user['saved_grades']) $user['grades'] = $user['saved_grades'];
	if($user['saved_role']) $user['role'] = $user['saved_role'];
	if($user['saved_subject']) $user['subject'] = $user['saved_subject'];
	return $user;
}

function default_search() {
	if(current_user()) {
		$user = current_user();
		$role = 6;
		$grades = array();
		if(isset($user['search'])) return json_encode($user['search']);
		$user = load_saved_search($user);
		if(!$user['grades']) $grades = all_grades();
		else $grades = explode(',', $user['grades']);
		if($user['role'] == role_label(3)) { $role = 3; /*$grades = all_grades();*/ }
		if($user['role'] == role_label(1)) { $role = 1; }
		$subject = 1;
		if($user['subject'] == 'Mathematics') { $subject = subject_id('Mathematics'); }
		return json_encode( array('roles'=>$role,'subjects'=>$subject,'grades'=>$grades) );
	}
	return json_encode( array('roles'=>6,'subjects'=>1,'grades'=>all_grades(),'needsave'=>1,'loggedout'=>1) );
}

function current_user() {
	if(isset($_SESSION['user'])) return $_SESSION['user'];
	return null;
}

function is_video_page($page) {
	return ( count($page['content']) && is_video($page['content'][0]) ); 
}
function is_video($node) {
	if($node['link'] && strpos($node['link'],'vimeo.com')!==FALSE) return TRUE;
	return strpos($node['file'],'.mp4')!==FALSE;
}

function icon_type($node) {
	if(is_video($node) || $node['videoicon'])
		return 'mp4-icon';
	return 'doc-icon';
}


function profile_search() {
	$user = current_user();
	$track = 300;
	$role = 1;
	$grades = array();
	$user = load_saved_search($user);
	if(!$user['grades']) $grades = all_grades();
	else $grades = explode(',', $user['grades']);
	if($user['role'] == role_label(3)) { $track = 408; $role = 3; /*$grades = all_grades();*/ }
	$subject = 1;
	if($user['subject'] == 'Mathematics') { $subject = 2; }
	return root_uri() . '/dashboard/' . $track . '/search/' . $role . '/' . $subject . '/' . implode('/', $grades);
}

function ordinal($number) {
    $ends = array('th','st','nd','rd','th','th','th','th','th','th');
    $mod100 = $number % 100;
    return $number . ($mod100 >= 11 && $mod100 <= 13 ? 'th' :  $ends[$number % 10]);
}

						function textbox($id, $label, $values, $req="", $type="text") {
							?>
								<div class="form-group">
									<label for="<?= $id ?>"><?= $label . $req ?></label>
								 	<input type="<?= $type ?>" class="form-control" id="<?= $id ?>" name="<?= $id ?>" placeholder="<?= $label ?>" value="<?= isset($values[$id])?$values[$id]:'' ?>">
								</div>
							<?php
						} 