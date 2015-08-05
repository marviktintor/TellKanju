INTENT_FETCH_PROBLEMS = "fetch_problems";

window.onload = function(){
	fetch_problems();
}



function loadMap(latitude,longitude) {
	localStorage.setItem("map_latitude",latitude);
	localStorage.setItem("map_longitude",longitude);
	window.open ("view_on_maps.html","_blank","width=100;height=100");
	
	
  }


  
function fetch_problems(){
	params = "action="+ACTION_QUERY+"&intent="+INTENT_FETCH_PROBLEMS;
	
	ajaxCommit(ACTION_QUERY, METHOD_POST, MASTER_URL, params, INTENT_FETCH_PROBLEMS);
}

function onReadyStateChange(action,method,url,params,request,intent){
	
	if(request.readyState==4 && request.status==200){
		
		if(action==ACTION_QUERY){
			
			if(intent == INTENT_FETCH_PROBLEMS){
				setHtml('reported_problems', request.responseText)
			}
		}
		
	}
}