function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

var watchID = null;
var lng,lat,deviceID;

function onDeviceReady() {
	
	deviceID = device.uuid;
	
	watchID = navigator.geolocation.watchPosition(setLatLng, onFail, {enableHighAccuracy: true});

	$( document ).delegate("#plant", "pageinit", function() {
		plantFlag();
	});
	
	$( document ).delegate("#map", "pageinit", function() {
		
		/*var data = [
		  ['Person 1', 30.268167, -97.768839, 4],
		  ['Person 2', 30.268093, -97.767444, 5],
		  ['Chase', 30.267148, -97.76826, 3],
		  ['Isaac', 30.267129, -97.764269, 2],
		  ['Ashley', 30.267833, -97.769161, 1]
		];
		
		mapAllLoc(data);
		*/
		
		$.ajax({
		  type: "GET",
		  dataType: "JSON",
		  url: "http://api.chasemoody.com/acl/flags",
		  success: function(data){
		  	mapAllLoc(data);
		  }
		});
		
	});
	
	$( document ).delegate("#info", "pageinit", function() {
		$('.latlng').empty().append('<p>Lat: ' + lat + '</p><p>Lng: ' + lng + '</p>');
		$('.device').empty().append(deviceID);
	});
	
	$( document ).delegate("#feedback", "pageinit", function() {
		$('.submit_comment').click(function(){
			
			$.ajax({
			  type: "POST",
			  contentType: 'application/json',
			  dataType: "json",
        	  data: formToJSONComment(),
			  url: "http://api.chasemoody.com/acl/comment",
			  beforeSend: function() {
			    $('#comment_form').empty().append('<center><img src="assets/img/ajax-loader.gif"/></center>');
			  },
			  success: function(){
			  	$('#comment_form').empty().append('<p>Thank you for your feedback.');
			  }
			});
			
		});
	});
}

function setLatLng(position){
	lng = position.coords.longitude;
	lat = position.coords.latitude;
}

/* Initialize Map */
function mapAllLoc(data){
	var myLatlng = new google.maps.LatLng(lat, lng);
	var aclCenter = new google.maps.LatLng(30.268167, -97.768839);
	
	var mapOptions = {
      center: aclCenter,
      zoom: 14, //Change zoom for more of city to test out this week
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById('map_holder'),mapOptions);
	
    for (var i = 0; i < data.length; i++) {
    	var loc = data[i];
    	var myLatLng = new google.maps.LatLng(loc["Lat"], loc["Lng"]);
	    var marker = new google.maps.Marker({
	        position: myLatLng,
	        animation: google.maps.Animation.DROP,
	        map: map,
	        title: loc["name"]
	    });
	}
}

function plantFlag(){

	$.ajax({
	  type: "POST",
	  contentType: 'application/json',
	  dataType: "json",
      data: formToJSONLatLng(),
	  url: "http://api.chasemoody.com/acl/plant",
	  success: function(){
	  	$('#flag_container').empty().append('<p>Flag Planted</p>');
	  }
	});
	
}

// clear the watch that was started earlier
function clearWatch() {
    if (watchID != null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

// Called if something bad happens.
function onFail(message) {
  alert('Failed because: ' + message);
}

// Helper function to serialize all the form fields into a JSON string
function formToJSONComment() {
    return JSON.stringify({
        "UDID": deviceID,
        "comment": $('#comment').val()
        });
}

function formToJSONLatLng() {
	/*console.log('UDID: '+deviceID);
	console.log('Lat: '+lat);
	console.log('Lng: '+lng);*/
    return JSON.stringify({
        "UDID": deviceID,
        "Lat": lat,
        "Lng": lng
        });
}