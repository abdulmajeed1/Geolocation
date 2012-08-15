var map, lat, lng;

window.addEventListener('load', function () {
    document.addEventListener('deviceready', init, false);
}, false);

function init() {
	//getAccurateCurrentPosition
	navigator.geolocation.getCurrentPosition(success, error);
}

function success(position){
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	
	map = new GMaps({
        div: '#map',
        lat: lat,
        lng: lng
      });
	
	$('#coords').append('Latitude: ' + lat + '<br />' + 'Longitude: '  + lng);
}

function error(error) {
	alert(error.message);
}
