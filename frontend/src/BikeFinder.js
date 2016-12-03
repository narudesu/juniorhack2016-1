
let current_location = {lat: 55.2, lng: 16.63}
let init_done = false
let map
let collapsed = true
let current_location_marker
let dock_markers

let directionsService
let directionsDisplay

let total_directions
let calculated_directions

function calculateRoute(locA, locB) {
  return new Promise((resolve, reject) => {
    directionsService.route({
      origin: locA,
      destination: locB,
      travelMode: 'DRIVING'
    }, (res, status) => {
      calculated_directions += 1
      if (status === 'OK')
      resolve(res.routes[0].legs[0].distance)
      // directionsDisplay.setDirections(res)
      else
      reject('status ' + status)
    })
  })
}

function refillSlotsData() {
  $.getJSON('http://localhost:3000/docks/')
    .done(docks => {
      docks.forEach(dock => {
        let free_spots = dock.slots.reduce((s, n) => {
          if (n.state === 'available') s+=1
          // console.log(n, s)
          return s
        }, 0)
        console.log('should render', free_spots)
        $(`td[data-dock-id=${dock.dockID}]`).html(free_spots)
      })
    })
  setTimeout(refillSlotsData, 2000)
}

function renderTable() {
  if (calculated_directions === total_directions) {
    let rows = dock_markers.map(marker => {
      let free_spots = marker.slots.reduce((s, n) => {
        if (n.state === 'available') s+=1
        // console.log(n, s)
        return s
      }, 0)
      return `<tr><td>${marker.dockID}</td><td>${marker.dist.text}</td><td class="free-spots-column" data-dock-id="${marker.dockID}">${free_spots}</td></tr>`
    })
    console.log(rows)
    rows.forEach(row => {
      $('#bike-finder-table').append(row)
    })
    refillSlotsData()
  }
}

$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
  .done(location => {
    handlePosition(location)
  })

$.getJSON('http://localhost:3000/docks/')
  .done(docks => {
    console.log('docks', docks)
    total_directions = docks.length
    calculated_directions = 0
    dock_markers = docks.map(dock => {
      let marker = new google.maps.Marker({
        position: dock.location,
        map: map,
        label: dock.dockID
      })
      calculateRoute(current_location, dock.location).then(dist => {
        console.log(dist)
        marker.dist = dist
        marker.slots = dock.slots
        marker.dockID = dock.dockID
        renderTable()
      });

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

      directionsService = new google.maps.DirectionsService
      directionsDisplay = new google.maps.DirectionsRenderer

      console.log(map)
      directionsDisplay.setMap(map)

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
