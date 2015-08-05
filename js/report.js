INTENT_REPORT_PROBLEM = "report_problem";


window.onload = function(){
	
	
	setEventListeners();
}


function setEventListeners(){
	$('id_button_attach_media').addEventListener('click',attachMedia,false);
	$('id_button_report_problem').addEventListener('click',reportProblem,false);
	$('id_button_select_location').addEventListener('click',selectLocation,false);
}

function reportProblem(){
	
	var tags = getValue('id_input_problem_tags');
	var desc = getValue('id_input_description');
	
	selectLocation();
	
	if(is_valid_problem_report(tags,desc)){
		
		var latitude = localStorage.getItem("latitude");
		var longitude = localStorage.getItem("longitude");
		
		params = "action="+ACTION_INSERT +"&intent=" +INTENT_REPORT_PROBLEM+"&tags="+tags+"&desc="+desc+"&media="+localStorage.getItem("problem_media")
		+"&latitude="+latitude +"&longitude="+longitude;
		ajaxCommit(ACTION_INSERT, METHOD_POST, MASTER_URL, params, INTENT_REPORT_PROBLEM);
	}
}


function is_valid_problem_report(tags,desc){
	var valid = true;
	var toast_length = 4000;
	var error_message = "";
	var error_count = 0;
	
	if( tags == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing problem Tags <br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}
	
	
	if( desc == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing Problem Description<br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		
	}
	
	return valid;
	
}

function selectLocation(){
	/*window.open("map.html","_blank","height=200;width=200;");*/
	 if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        toast("Your Browser does not support Locations");
	    }
}
function showPosition(position) {
	localStorage.setItem("latitude",position.coords.latitude);
	localStorage.setItem("longitude",position.coords.longitude);
	
}
function toast(message){ return Materialize.toast(message,4000);}
function attachMedia(){
	/*localStorage.setItem("problem_media", generateKeys());
	window.open("upload.php?action=upload_media&problem="+localStorage.getItem("problem_media"),"_blank","height=200;width=200;");*/
	toast("Oops ! Looks like your have a faulty webcam!");
}
function onReadyStateChange(action,method,url,params,request,intent){
	
	if(request.readyState==4 && request.status==200){
		
		if(action==ACTION_INSERT){
			
			if(intent == INTENT_REPORT_PROBLEM){
				/*Materialize.toast("Problem Reported",4000);
				window.close();*/
				alert(request.responseText);
			}
		}
		if(action==ACTION_QUERY){
			
			
		}
	}
}