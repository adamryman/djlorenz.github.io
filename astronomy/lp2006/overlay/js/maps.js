var map, overlay;
var initialOpacity = 0.5;
var OPACITY_MAX_PIXELS = 57; // Width of opacity control image

function HomeControl(controlDiv, map) {

	// Set CSS styles for the DIV containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map
	controlDiv.style.padding = '5px';

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click for more Information';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '14px';
	controlText.style.color = 'blue';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<b>More Information</b>';
	controlUI.appendChild(controlText);

	// Setup the click event listeners
	google.maps.event.addDomListener(controlUI, 'click', function () {
		var url = "http://djlorenz.github.io/astronomy/lp2006/";
		window.open(url);
	});

}

function setUpSearchBox(map){
	var markers = [];

	var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */(input));

	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		for (var i = 0, marker; marker = markers[i]; i++) {
			marker.setMap(null);
	 	}

	 	// For each place, get the icon, place name, and location.
	 	markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0, place; place = places[i]; i++) {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			});

			markers.push(marker);

			bounds.extend(place.geometry.location);
		}
		map.fitBounds(bounds);
		console.log("test");
	});

	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});

}

function initialize() {
	//Getting encoded location from url if available
	var lat = 5;
	var lng = 0;
	var startingZoom = 3;
	if (window.location.hash) {
		var state = window.location.hash.substring(1);
		var keyVals = state.split("&");
		for (var i = 0; i < keyVals.length; i++) {
			var keyVal = keyVals[i].split("=");
			if (keyVal[0] == "gps") {
				lat = keyVal[1].split(',')[0];
				lng = keyVal[1].split(',')[1];
			} else if (keyVal[0] == "zoom") {
				startingZoom = parseInt(keyVal[1]);
			}
		}
	}

	var mapOptions = {
		zoom: startingZoom,
		maxZoom: 17,
		center: new google.maps.LatLng(lat, lng),
		scaleControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	
	setUpSearchBox(map);

	var bounds = {
		0: [[0,  0], [0, 0]],
		1: [[0,  1], [0, 1]],
		2: [[0,  3], [0, 2]],
		3: [[0,  7], [1, 5]],
		4: [[0, 15], [2, 11]],
		5: [[0, 31], [5, 23]],
		6: [[0, 63], [11,47]]
	};

	var zoomLevel = 1;
	var first = 1;


	var overlayfull = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 2;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(1024, 1024)
	});

	var overlay9 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 3;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(2048, 2048)
	});

	var overlay10 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 4;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(4096, 4096)
	});

	var overlay11 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 5;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(8192, 8192)
	});

	var overlay12 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 6;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(16384, 16384)
	});

	var overlay13 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 7;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(32768, 32768)
	});

	var overlay14 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 8;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(65536, 65536)
	});

	var overlay15 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 9;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(131072, 131072)
	});

	var overlay16 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 10;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(262144, 262144)
	});

	var overlay17 = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var zoom2 = zoom - 11;
			var x = coord.x % Math.pow(2, zoom2);
			if (x < 0) {
				x = x + Math.pow(2, zoom2);
			}
			if (zoom2 < 0 ||
				bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
				bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
				return null;
			}
			return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(524288, 524288)
	});

	google.maps.event.addListener(map, 'zoom_changed', function () {
		changeZoom();
	});

	function changeZoom(){
		var prevZoomLevel;
		prevZoomLevel = zoomLevel;
		var z = map.getZoom();
		z < 9 ? zoomLevel = 1 : zoomLevel = 2;
		console.log(z);
		if (prevZoomLevel !== zoomLevel || zoomLevel == 2) {
			switch (z) {
			case 9:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay9);
				overlay = overlay9
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 10:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay10);
				overlay = overlay10
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 11:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay11);
				overlay = overlay11
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 12:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay12);
				overlay = overlay12
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 13:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay13);
				overlay = overlay13
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 14:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay14);
				overlay = overlay14
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 15:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay15);
				overlay = overlay15
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 16:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay16);
				overlay = overlay16
				setOpacity(opacityCtrlKnob.valueX());
				break;
			case 17:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlay17);
				overlay = overlay17
				setOpacity(opacityCtrlKnob.valueX());
				break;
			default:
				map.overlayMapTypes.removeAt(0);
				map.overlayMapTypes.insertAt(0, overlayfull);
				overlay = overlayfull
				setOpacity(opacityCtrlKnob.valueX());
				break;
			}

		}
	}

	google.maps.event.addListener(map, 'bounds_changed', function () {
		var state = "#";
		state += "gps=" + map.getCenter().toUrlValue();
		state += "&zoom=" + map.getZoom();

		window.location = state;

	});


	overlay = overlayfull
	createOpacityControl(map);
	map.overlayMapTypes.insertAt(0, overlayfull);

	var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map);

	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);

	//This is called at the end of the initialize function 
	//to figure out what zoom level we are in and change the overlays accordingly
	changeZoom();

}

function createOpacityControl(map) {
	var sliderImageUrl = "opacity-slider3d7.png";

	// Create main div to hold the control.
	var opacityDiv = document.createElement('DIV');
	opacityDiv.setAttribute("style", "margin:5px;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat;width:71px;height:21px;cursor:pointer;");

	// Create knob
	var opacityKnobDiv = document.createElement('DIV');
	opacityKnobDiv.setAttribute("style", "padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat -71px 0;width:14px;height:21px;");
	opacityDiv.appendChild(opacityKnobDiv);

	// no var => global variable
	opacityCtrlKnob = new ExtDraggableObject(opacityKnobDiv, {
		restrictY: true,
		container: opacityDiv
	});

	google.maps.event.addListener(opacityCtrlKnob, "dragend", function () {
		setOpacity(opacityCtrlKnob.valueX());
	});

	google.maps.event.addDomListener(opacityDiv, "click", function (e) {
		var left = findPosLeft(this);
		var x = e.pageX - left - 5; // - 5 as we're using a margin of 5px on the div
		opacityCtrlKnob.setValueX(x);
		setOpacity(x);
	});

	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(opacityDiv);

	// Set initial value
	var initialValue = OPACITY_MAX_PIXELS * initialOpacity;
	opacityCtrlKnob.setValueX(initialValue);
	setOpacity(initialValue);
}

function setOpacity(pixelX) {
	// Range = 0 to OPACITY_MAX_PIXELS
	var value = pixelX / OPACITY_MAX_PIXELS;
	if (value < 0) value = 0;
	if (value > 1) value = 1;
	overlay.setOpacity(value);
}

function findPosLeft(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
		} while (obj = obj.offsetParent);
		return curleft;
	}
	return undefined;
}

google.maps.event.addDomListener(window, 'load', initialize);