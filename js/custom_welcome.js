INTENT_LOGIN = "login";
INTENT_SIGNUP = "signup";
MASTER_URL = "http://localhost/tellkanju/worker.php";

window.onload = function(){
	
	 setValue('id_signup_input_fullname','Victor Mwenda');
	setValue('id_signup_input_email','vmwenda.vm@gmail.com');
	setValue('id_signup_input_phonenumber','0718034449');
	setValue('id_signup_input_id_number','32361839');
	
	setEventListeners();
}


function setEventListeners(){
	$('id_button_signup').addEventListener('click',signup,false);
	$('id_button_login').addEventListener('click',login,false);
}


function signup(){
	
	 
	var fullname = getValue('id_signup_input_fullname');
	var email = getValue('id_signup_input_email');
	var phonenumber = getValue('id_signup_input_phonenumber');
	var id_number = getValue('id_signup_input_id_number');
	
	
	if(is_valid_signup(fullname,email,phonenumber,id_number)){
		params = "intent="+INTENT_SIGNUP+"&action="+ACTION_INSERT+"&fullname="+fullname+"&id_number="+id_number+"&phonenumber="+phonenumber+"&email="+email;
		ajaxCommit(ACTION_INSERT, METHOD_POST, MASTER_URL, params, INTENT_SIGNUP);
	}
	
}


function is_valid_signup(fullname,email,phonenumber,id_number){
	
	var valid = true;
	var toast_length = 4000;
	var error_message = "";
	var error_count = 0;
	
	if( fullname == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing fullname <br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}
	
	if( email == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing email<br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}
	
	if( phonenumber == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing phonenumber<br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}else{
		if(isNaN(phonenumber)){
			valid = false;
			error_count++;
			error_message = error_count +" Invalid phonenumber characters -> '" +phonenumber +"'<br />";
			toast_length = 4000;
			
			Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		}
		if(phonenumber.length != 10){
			valid = false;
			error_count++;
			error_message = error_count +" Invalid phonenumber length -> (" +phonenumber.length +")<br />";
			toast_length = 4000;
			
			Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		}
		
		
	}
	
	if( id_number == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing ID Number<br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}else{
		if(isNaN(id_number)){
			valid = false;
			error_count++;
			error_message = error_count +" Invalid ID Number characters -> '" +id_number +"'<br />";
			toast_length = 4000;
			
			Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		}
		if(id_number.length < 8 ||id_number.length > 8 ){
			valid = false;
			error_count++;
			error_message = error_count +" Invalid ID Number length -> (" +id_number.length +")<br />";
			toast_length = 4000;
			
			Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		}
	
		
	}
	
	return valid;
	
}
function login(){
	
	var username = getValue('id_login_input_username');
	var id_number = getValue('id_login_input_id_number');

	if(is_valid_login(username,id_number)){
		params = "intent="+INTENT_LOGIN+"&action="+ACTION_QUERY+"&username="+username+"&id_number="+id_number;
		ajaxCommit(ACTION_QUERY, METHOD_POST, MASTER_URL, params, INTENT_LOGIN);
	}
}


function is_valid_login(username,id_number){
	var valid = true;
	var toast_length = 4000;
	var error_message = "";
	var error_count = 0;
	
	if( username == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing Email or Phonenumber <br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}
	
	
	if( id_number == ""){
		valid = false;
		error_count++;
		error_message = error_count +" Missing ID Number<br />";
		toast_length = 4000;
		
		Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
	}else{
		if(isNaN(id_number)){
			valid = false;
			error_count++;
			error_message = error_count +" Invalid ID Number characters -> '" +id_number +"'<br />";
			toast_length = 4000;
			
			Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		}
		if(id_number.length < 8 ||id_number.length > 8){
			valid = false;
			error_count++;
			error_message = error_count +" Invalid ID Number length -> (" +id_number.length +")<br />";
			toast_length = 4000;
			
			Materialize.toast('<div style="color:#FF0000;">'+error_message +"</div>",toast_length);
		}
	
		
	}
	
	return valid;
	
}
function onReadyStateChange(action,method,url,params,request,intent){
	
	if(request.readyState==4 && request.status==200){
		
		if(action==ACTION_INSERT){
			
			if(intent==INTENT_SIGNUP){
				Materialize.toast("sign upuser id "+request.responseText,3000);
			}
		}
		if(action==ACTION_QUERY){
			if(intent==INTENT_LOGIN){ 
				Materialize.toast("login user id "+request.responseText,3000);
			}
			
		}
	}
}