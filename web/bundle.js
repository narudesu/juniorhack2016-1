/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bike_finder = __webpack_require__(1)({
	  show_button: '#btn-kolo',
	  element: '#bike-finder',
	  map: '#bike-finder-map'
	});

	window.initMap = function () {
	  bike_finder.initMap();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var server_url = 'http://192.168.133.192:3000/';

	var current_location = { lat: 55.2, lng: 16.63 };
	var init_done = false;
	var map = void 0;
	var collapsed = true;
	var current_location_marker = void 0;
	var dock_markers = void 0;

	var directionsService = void 0;
	var directionsDisplay = void 0;

	var ordered_magic = [];

	var total_directions = void 0;
	var calculated_directions = void 0;

	function calculateRoute(locA, locB) {
	  console.log('locab', locA, locB);
	  return new Promise(function (resolve, reject) {
	    directionsService.route({
	      origin: locA,
	      destination: locB,
	      travelMode: 'DRIVING'
	    }, function (res, status) {
	      calculated_directions += 1;
	      if (status === 'OK') resolve(res.routes[0].legs[0].distance);
	      // directionsDisplay.setDirections(res)
	      else reject('status ' + status);
	    });
	  });
	}

	function calculateRoutes(locA, locs) {
	  console.log(locs);
	  return new Promise(function (resolve, reject) {
	    Promise.all(locs.map(function (loc) {
	      return calculateRoute(locA, loc);
	    })).then(function (distances) {
	      console.log('distances', distances);
	      resolve(distances);
	    });
	  });
	}

	function refillDistancesData(distances) {
	  console.log('ddd', distances);
	  distances.forEach(function (distance, i) {
	    $('tr[data-dock-id=' + ordered_magic[i] + ']').find('.distance-column').html(distance.text);
	  });
	}

	function refillSlotsData() {
	  $.getJSON(server_url + 'docks/').done(function (docks) {
	    docks.forEach(function (dock) {
	      var free_spots = dock.slots.reduce(function (s, n) {
	        if (n.state === 'available') s += 1;
	        // console.log(n, s)
	        return s;
	      }, 0);
	      // console.log('should render', free_spots)
	      $('tr[data-dock-id=' + dock.dockID + ']').find('.free-spots-column').html(free_spots);
	    });
	  });
	  setTimeout(refillSlotsData, 2000);
	}

	function renderTable() {
	  if (calculated_directions === total_directions) {
	    var rows = dock_markers.map(function (marker) {
	      ordered_magic.push(marker.dockID);
	      var free_spots = marker.slots.reduce(function (s, n) {
	        if (n.state === 'available') s += 1;
	        // console.log(n, s)
	        return s;
	      }, 0);
	      return '<tr data-dock-id="' + marker.dockID + '"><td>' + marker.dockID + '</td><td class="distance-column">' + marker.dist.text + '</td><td class="free-spots-column">' + free_spots + '</td></tr>';
	    });
	    console.log(rows);
	    rows.forEach(function (row) {
	      $('#bike-finder-table').append(row);
	    });
	    refillSlotsData();
	  }
	}

	$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?').done(function (location) {
	  handlePosition(location);
	});

	$.getJSON(server_url + 'docks/').done(function (docks) {
	  console.log('docks', docks);
	  total_directions = docks.length;
	  calculated_directions = 0;
	  dock_markers = docks.map(function (dock) {
	    var marker = new google.maps.Marker({
	      position: dock.location,
	      map: map,
	      label: dock.dockID,
	      icon: 'Icon.png'
	    });
	    calculateRoute(current_location, dock.location).then(function (dist) {
	      console.log(dist);
	      marker.dist = dist;
	      marker.slots = dock.slots;
	      marker.dockID = dock.dockID;
	      renderTable();
	    });

	    var $modal = $('#modal-info');
	    google.maps.event.addListener(marker, 'click', function () {
	      // alert(dock.dockID)
	      $modal.modal('show');
	      $modal.find('.modal-title').html('Dock ' + dock.dockID);
	      $content = $modal.find('.modal-body > p');
	    });
	    return marker;
	  });
	});

	function handlePosition(pos) {
	  console.log('got pos', pos);
	  current_location.lat = pos.latitude;
	  current_location.lng = pos.longitude;

	  if (init_done) setCurrentLocationOnMap(current_location, true);
	}

	module.exports = function (els) {
	  var $container = $(els.element);
	  $(els.show_button).click(function (e) {
	    if (collapsed) $container.removeClass('collapsed').removeClass('absrender');else {
	      $container.addClass('collapsed');
	      setTimeout(function () {
	        $container.addClass('absrender');
	      }, 1000);
	    }
	    collapsed = !collapsed;
	    // $container.toggleClass('collapsed').delay(1000)
	    google.maps.event.trigger(map, 'resize');
	  });

	  return {
	    initMap: function initMap() {
	      console.log('location', current_location);
	      var $map = $(els.map);
	      map = new google.maps.Map($map[0], {
	        zoom: 8,
	        center: current_location
	      });

	      directionsService = new google.maps.DirectionsService();
	      directionsDisplay = new google.maps.DirectionsRenderer();

	      console.log(map);
	      directionsDisplay.setMap(map);

	      init_done = true;
	      setCurrentLocationOnMap(current_location);
	    }
	  };
	};

	function setCurrentLocationOnMap(location, move) {
	  if (!current_location_marker) {
	    current_location_marker = new google.maps.Marker({
	      position: location,
	      map: map,
	      title: "You are here",
	      draggable: true,
	      icon: 'IconHuman.png'
	    });
	    google.maps.event.addListener(current_location_marker, 'dragend', function (e) {
	      console.log('dragend', e);
	      current_location = {
	        lat: e.latLng.lat(),
	        lng: e.latLng.lng()
	      };
	      calculateRoutes(current_location, dock_markers.map(function (marker) {
	        return marker.position;
	      })).then(function (distances) {
	        refillDistancesData(distances);
	      });
	      console.log(current_location);
	    });
	  } else current_location_marker.setPosition(location);

	  // google.maps.event.trigger(map, "resize");
	  map.panTo(location);
	  // map.setZoom(14);
	}

/***/ }
/******/ ]);