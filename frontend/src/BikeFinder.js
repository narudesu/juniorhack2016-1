
let current_location = {lat: 55.2, lng: 16.63}
let init_done = false
let map
let collapsed = true
let current_location_marker
let dock_markers

$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
  .done(location => {
    handlePosition(location)
  })

$.getJSON('http://localhost:3000/docks/')
  .done(docks => {
    console.log('docks', docks)
    dock_markers = docks.map(dock => {
      let marker = new google.maps.Marker({
        position: dock.location,
        map: map,
        label: dock.dockID
      })
      const $modal = $('#modal-info')
      google.maps.event.addListener(marker, 'click', () => {
        // alert(dock.dockID)
        $modal.modal('show')
        $modal.find('.modal-title').html('Dock ' + dock.dockID)
        $content = $modal.find('.modal-body > p')
      })
      return marker
    })
  })

function handlePosition(pos) {
  console.log('got pos', pos)
  current_location.lat = pos.latitude
  current_location.lng = pos.longitude
  if (init_done) setCurrentLocationOnMap(current_location, true)
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

function setCurrentLocationOnMap(location, move) {
  if (!current_location_marker)
    current_location_marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "You are here",
      label: 'you',
      draggable: true
    });
  else
    current_location_marker.setPosition(
      location
    )

  // google.maps.event.trigger(map, "resize");
  map.panTo(location)
  // map.setZoom(14);
}
