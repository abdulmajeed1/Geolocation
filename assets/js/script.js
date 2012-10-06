var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {

	$( document ).delegate("#map", "pageinit", function() {
		
		var data = [
		  ['Person 1', -33.890542, 151.274856, 4],
		  ['Person 2', -33.923036, 151.259052, 5],
		  ['Chase', -34.028249, 151.157507, 3],
		  ['Isaac', -33.80010128657071, 151.28747820854187, 2],
		  ['Ashley', -33.950198, 151.259302, 1]
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
function buildMap(data){
	var myLatlng = new google.maps.LatLng(30.26756, -97.76716);

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