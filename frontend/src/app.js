const bike_finder = require('./BikeFinder')({
  show_button: '#btn-kolo',
  element: '#bike-finder',
  map: '#bike-finder-map'
})

window.initMap = () => {
  bike_finder.initMap()
}
