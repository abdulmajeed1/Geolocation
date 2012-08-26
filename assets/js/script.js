var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	$( document ).delegate("#coords", "pageinit", function() {
	  	navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
	});
	
	$( document ).delegate("#map", "pageinit", function() {
		navigator.geolocation.getCurrentPosition(buildMap, onError, { enableHighAccuracy: true });
	});
	
	$( document ).delegate("#watch", "pageinit", function() {
		navigator.geolocation.watchPosition(onWatch, onError, { timeout: 30000, enableHighAccuracy: true });
	});
	
	$( document ).delegate("#watch_map", "pageinit", function() {
		navigator.geolocation.watchPosition(buildMap, onError, { enableHighAccuracy: true });
	});
	
	$( document ).delegate("#success", "pageinit", function() {
		alert('Success!');
	});
	
	$( document ).delegate("#camera", "pageinit", function() {
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
	});
}

function onSuccess(position) {
	$('#coords_holder').html('<p>Latitude: ' + position.coords.latitude + '</p></p>Longitude: ' + position.coords.longitude + '</p><p>Accuracy: ' + position.coords.accuracy + '</p>');
}

function onWatch(position) {
	$('#watch_holder').html('<p>Latitude: ' + position.coords.latitude + '</p></p>Longitude: ' + position.coords.longitude + '</p><p>Accuracy: ' + position.coords.accuracy + '</p>');
}

function onError(error) {
	alert('code: '    + error.code    + '\n' +
	'message: ' + error.message + '\n');
}

function buildMap(position){
	var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)

	var mapOptions = {
      center: myLatlng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map_holder'),mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"You"
  });
}

 // Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64 encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}