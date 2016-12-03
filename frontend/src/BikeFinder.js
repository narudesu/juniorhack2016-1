
const server_url = 'http://192.168.133.192:3000/'

let current_location = {lat: 55.2, lng: 16.63}
let init_done = false
let map
let collapsed = true
let current_location_marker
let dock_markers

let directionsService
let directionsDisplay

let ordered_magic = []

let total_directions
let calculated_directions

function calculateRoute(locA, locB) {
  console.log('locab', locA, locB)
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

function calculateRoutes(locA, locs) {
  console.log(locs)
  return new Promise((resolve, reject) => {
    Promise.all(locs.map(loc => calculateRoute(locA, loc)))
      .then(distances => {
        console.log('distances', distances)
        resolve(distances)
      })

  })
}

function refillDistancesData(distances) {
  console.log('ddd', distances)
  distances.forEach((distance, i) => {
    $(`tr[data-dock-id=${ordered_magic[i]}]`).find('.distance-column').html(distance.text)
  })
}

function refillSlotsData() {
  $.getJSON(server_url + 'docks/')
    .done(docks => {
      docks.forEach(dock => {
        let free_spots = dock.slots.reduce((s, n) => {
          if (n.state === 'available') s+=1
          // console.log(n, s)
          return s
        }, 0)
        // console.log('should render', free_spots)
        $(`tr[data-dock-id=${dock.dockID}]`).find('.free-spots-column').html(free_spots)
      })
    })
  setTimeout(refillSlotsData, 2000)
}

function renderTable() {
  if (calculated_directions === total_directions) {
    let rows = dock_markers.map(marker => {
      ordered_magic.push(marker.dockID)
      let free_spots = marker.slots.reduce((s, n) => {
        if (n.state === 'available') s+=1
        // console.log(n, s)
        return s
      }, 0)
      return `<tr data-dock-id="${marker.dockID}"><td>${marker.dockID}</td><td class="distance-column">${marker.dist.text}</td><td class="free-spots-column">${free_spots}</td></tr>`
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

$.getJSON(server_url + 'docks/')
  .done(docks => {
    console.log('docks', docks)
    total_directions = docks.length
    calculated_directions = 0
    dock_markers = docks.map(dock => {
      let marker = new google.maps.Marker({
        position: dock.location,
        map: map,
        label: dock.dockID,
        icon: 'Icon.png'
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
                <ul class="X500">

      console.log(map)
      directionsDisplay.setMap(map)

      init_done = true
      setCurrentLocationOnMap(current_location)
    }
  }
}

function setCurrentLocationOnMap(location, move) {
  if (!current_location_marker) {
    current_location_marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "You are here",
      draggable: true,
      icon: 'IconHuman.png'
    })
    google.maps.event.addListener(current_location_marker, 'dragend', (e) => {
      console.log('dragend', e)
      current_location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      calculateRoutes(current_location, dock_markers.map(marker => marker.position))
        .then(distances => {
          refillDistancesData(distances)
        })
      console.log(current_location)
    })
  }
  else
    current_location_marker.setPosition(
      location
    )

  // google.maps.event.trigger(map, "resize");
  map.panTo(location)
  // map.setZoom(14);
}
