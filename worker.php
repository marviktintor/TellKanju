<?php

include 'dbapi/db_utils.php';


if(isset($_POST['intent']) && isset($_POST['action']) ){
	
	$action = $_POST['action'];
	$intent = $_POST['intent'];
	
	if($action == "insert"){
		if($intent == "signup"){
				
			$fullname = $_POST['fullname'];
			$id_number =  $_POST['id_number'];
			$phonenumber =  $_POST['phonenumber'];
			$email =  $_POST['email'];
			
			signup($fullname,$id_number,$phonenumber,$email);
		}
		if($intent == "report_problem"){
				
			$tags = $_POST ['tags'];
			$desc = $_POST ['desc'];
			
			$media = 1; // $_POST['media'];
			$reporter = 1;
			$latitude = $_POST ['latitude'];
			$longitude = $_POST ['longitude'];
			
			reportProblem ( $desc, $tags, $media, $reporter, $latitude, $longitude );
		}
		
		
	}
	if($action == "query"){
		if($intent == "login"){
			$username = $_POST['username'];
			$id_number = $_POST['id_number'];
			
			login($username,$id_number);
		}
	}
	
}else{ echo "Can not determine your intentions"; } 


function signup($fullname,$id_number,$phonenumber,$email){
	$dbutils = new db_utils();
	
	$table = "reporters"; 
	$columns = array("full_name", "email", "phonenumber", "id_number");
	 $records = array($fullname,$email,$phonenumber,$id_number);
	 
	if($dbutils->is_exists($table, $columns, $records) == 0){
		$dbutils->insert_records($table, $columns, $records);
	}
	
	login($phonenumber, $id_number);
}
function login($username,$id_number){
	$dbutils = new db_utils();
	
	$table = "reporters";
	$columns = array("email", "id_number");
	$records = array($username,$id_number);
	
	if($dbutils->is_exists($table, $columns, $records)>0){
		$reporter = $dbutils->query($table, $columns, $records);
		echo $reporter[0]['id_reporter'];
		return;
	}
	
	$columns = array("phonenumber", "id_number");
	if($dbutils->is_exists($table, $columns, $records)>0){
		$reporter = $dbutils->query($table, $columns, $records);
		echo $reporter[0]['id_reporter'];
		return;
	}
	
	if($dbutils->is_exists($table, array("phonenumber", "id_number"), $records) == 0 && $dbutils->is_exists($table, array("email", "id_number"), $records)==0){
		echo "-1";
	}
	
	
}


function reportProblem ( $desc, $tags, $media, $reporter, $latitude, $longitude ){
	$dbutils = new db_utils();
	
	$table = "problems";
	$columns = array("problem_title", "problem_desc", "id_media", "id_reporter", "latitude", "longitude");
	$records = array($tags,$desc,$media, "1", $latitude, $longitude);
	
	if($dbutils->is_exists($table, $columns, $records) == 0){ 
		$dbutils->insert_records($table, $columns, $records,true);
	}
}
function print_problem($problem,$tags,$poster,$location,$time){
	echo '<div class="halign-wrapper hoverable card" style="width:700px;padding:10px; margin:10px">
			<h6 ><span  class="right-align " style="color:#eeeeee">' . $location . '</span>
			<span class="right " style="color:#00b8d4">' . $time . '</span></h6>
			<h5 style="color:#4acaa8;"><span style="font-size:18px;">' . $problem . '</span></h5>
			<div class="">
				<span class="left" style="color:#4dd0e1">' . $tags . '</span>
				<span class="right" style="color:#00897b">' . $poster . '</span>
			</div></div>';
}
?>