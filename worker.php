<?php





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