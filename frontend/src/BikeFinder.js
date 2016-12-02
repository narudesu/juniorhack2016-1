const $ = require('jquery')

let current_location = {lat: 49.2, lng: 16.63} // TODO: implement getting location from server
let init_done = false
let map

function handlePosition(pos) {
  console.log('got pos', pos)
  current_location.lat = pos.coords.latitude
  current_location.lng = pos.coords.longitude
  if (init_done) setCurrentLocationOnMap(current_location)
}

navigator.geolocation.getCurrentPosition(handlePosition)
navigator.geolocation.watchPosition(handlePosition)

module.exports = (els) => {
  const $container = $(els.element)
  $(els.show_button).click(e => {
    $container.toggleClass('collapsed')
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

}
