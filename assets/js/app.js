document.addEventListener("deviceready", init, false);
alert('Init');
function init() {
	//getAccurateCurrentPosition
	navigator.geolocation.getCurrentPosition(success, error);
	alert('Init');
}

function success(position){
	var map = new GMaps({
        div: '#map',
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
	
	$('#coords').append('Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: '  + position.coords.longitude);
}

function error(error) {
	alert(error.message);
}

// Ripple plugin is looking for config.xml file