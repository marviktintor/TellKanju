<?php
	include 'dbapi/db_utils.php';
	$dbutils = new db_utils();
	
	if(session_status()==1){session_start();}
	
	if(isset($_POST['upload'] )){
		
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
		}
	}else{ echo "not set";}
?>

<html>
	<body>
		<div>
			<?php ?>
		</div>
		
		<form action="upload.php" method="post" enctype="multipart/form-data">
			<input name="media_file" type="file" />
			<input type="submit" name="upload"/> 
		
		</form>
	</body>

</html>