'use strict'; 


function getWeatherByCoords (lat, lng) {
axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=05bdeacbf3a725100db67894a8ef1f79`)
    .then(res => {
        let icon = `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
        document.querySelector('.weather-container').innerHTML = `<p>${res.data.weather[0].description}<p>`
        document.querySelector('.weather-container').innerHTML += `<img src=${icon}>`
        document.querySelector('.weather-container').innerHTML += `<p>${Math.round(res.data.main.temp-272.15)}° C<p>`
    })
}



export default {
    getWeatherByCoords
}