function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {

	$( document ).delegate("#map", "pageinit", function() {
		
		var data = [
		  ['Person 1', 30.268167, -97.768839, 4],
		  ['Person 2', 30.268093, -97.767444, 5],
		  ['Chase', 30.267148, -97.76826, 3],
		  ['Isaac', 30.267129, -97.764269, 2],
		  ['Ashley', 30.267833, -97.769161, 1]
		];
		
		mapAllLoc(data);
		/*
		$.ajax({
		  type: "GET",
		  dataType: "JSON",
		  url: "http://api.chasemoody.com",
		  success: mapAllLoc(data)
		});*/
	});
	
}

//navigator.geolocation.watchPosition(buildMap, onError, { enableHighAccuracy: true });

/* Initialize Map */
function mapAllLoc(data){
	var myLatlng = new google.maps.LatLng(30.267129, -97.764269);

	var mapOptions = {
      center: myLatlng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById('map_holder'),mapOptions);
	
    for (var i = 0; i < data.length; i++) {
    	var loc = data[i];
    	var myLatLng = new google.maps.LatLng(loc[1], loc[2]);
	    var marker = new google.maps.Marker({
	        position: myLatLng,
	        animation: google.maps.Animation.DROP,
	        map: map,
	        title: loc[0],
	        zIndex: loc[3]
	    });
	}
}

// Called if something bad happens.
function onFail(message) {
  alert('Failed because: ' + message);
}