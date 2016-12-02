const bike_finder = require('./BikeFinder')({
  show_button: '#btn-kolo',
  element: '#bike-finder'
})

window.initMap = () => {
  bike_finder.initMap()
}
