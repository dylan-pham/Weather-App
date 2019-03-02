var request = require('request')

var tempInF = 0
function getTemp(url) {
    request(url, { json: true }, (err, res, body) => {
        var tempInK = body.main.temp
        
        var convertKelvinToFahrenheit = (tempInK) => Math.round((tempInK - 273.15) * (9/5) + 32)
        
        var tempInF = convertKelvinToFahrenheit(tempInK)
    })
}