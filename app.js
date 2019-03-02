const request = require('request');
const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use('/styles', express.static('styles'))

let zip

const getWeather = () => {
    return new Promise((resolve, reject) => {
        request(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&APPID=9e904a130a7d52ba29f785a711800d8b`, { json: true }, (err, res, body) => { 
            try {
                const temp = body.main.temp
                resolve(temp)
            } catch(err) {
                reject()
            }
        })
    })
}

app.get('/:zip', (req, res) => {
    zip = req.params.zip
    getWeather()
    .then((temp) => {
        res.render('index', {temp: temp, zip: zip})
    }).catch(() => {
    })
})

app.listen(3000)