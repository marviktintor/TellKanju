<?php
	include 'dbapi/db_utils.php';
	$dbutils = new db_utils();
	
	 $_GET['problem'] = rand (0,999);
	
	if(isset($_GET['problem']) && $_GET['problem'] != ""){$_SESSION["problem_media"] = $_GET['problem'];}
	
	if(session_status()==1){session_start();}
	
	if(isset($_POST['upload'] )){
		
		echo "Problem " ;echo $_GET['problem']; 
		
		$filename = $_FILES['media_file']['name'];
		$tmp_file = $_FILES['media_file']['tmp_name'];
		$destination = "uploads/media/".$filename;
		
		if(move_uploaded_file($tmp_file, $destination)){
			
			$media_uri = $destination;
			$id_reporter = 1;
			
			$table = "media";
			$columns = array("media_uri", "id_reporter");
			$records = array($media_uri,$id_reporter);
			
			if($dbutils->is_exists($table, $columns, $records) == 0){
				$dbutils->insert_records($table, $columns, $records);
			}
			
			$media_infos = $dbutils->query($table, $columns, $records);
			$media_id = $media_infos[0]['id_media'];
			
			$_SESSION[$problem] .= $media_id.",";
			
			echo "<hr />Problem :".$problem." Media : ".$_SESSION[$problem]."<hr />";
		}
	}else{ if($_GET['problem'] != ""){$_SESSION["problem_media"] = $_GET['problem'];}}
?>

<html>
	<body>
		<div>
			<?php 
			
			echo '<form action="upload.php?.'.$_GET['problem'].'" method="post" enctype="multipart/form-data">
			<input name="media_file" type="file" />
			<input type="submit" name="upload"/> 
		
		</form>';
			
			?>
		</div>
		
		
	</body>

</html>