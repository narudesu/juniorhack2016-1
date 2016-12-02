const $ = require('jquery')

let current_location

navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos)
  current_location
}, err => {console.log('xx', err)})

module.exports = (els) => {
  const $container = $(els.element).hide()
  $(els.show_button).click(e => {
    $container.toggle()
  })

  return {
    initMap: () => {

    }
  }
}
