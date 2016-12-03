const $ = require('jquery')

let current_location = {lat: 55.2, lng: 16.63} // TODO: implement getting location from server
let init_done = false
let map
let collapsed = true
let current_location_marker

$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
  .done(location => {
    handlePosition(location)
  })

function handlePosition(pos) {
  console.log('got pos', pos)
  current_location.lat = pos.latitude
  current_location.lng = pos.longitude
  if (init_done) setCurrentLocationOnMap(current_location)
}

module.exports = (els) => {
  const $container = $(els.element)
  $(els.show_button).click(e => {
    if (collapsed)
      $container.removeClass('collapsed').removeClass('absrender')
    else {
      $container.addClass('collapsed')
      setTimeout(() => {$container.addClass('absrender')}, 1000)
    }
    collapsed = !collapsed
    // $container.toggleClass('collapsed').delay(1000)
    google.maps.event.trigger(map, 'resize');
  })

  return {
    initMap: () => {
      console.log('location', current_location)
      const $map = $(els.map)
      map = new google.maps.Map($map[0], {
        zoom: 8,
        center: current_location
      });

      console.log(map)

      init_done = true
      setCurrentLocationOnMap(current_location)
    }
  }
}

function setCurrentLocationOnMap(location) {
  if (!current_location_marker)
    current_location_marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "You are here",
      draggable: false
    });
  else
    current_location_marker.setPosition(
      location
    )
}
