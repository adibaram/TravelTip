console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'

locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => locService.getPosition())
        .then(pos => {
            mapService.panTo(({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
            mapService.addMarker(({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
            console.log('User position is:', pos.coords);
            return pos;
        })
        .then(pos => {
            mapService.getAddressByCoords(pos.coords.latitude, pos.coords.longitude);
            return pos;
        })
        .then(pos => {
            weatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            return pos;
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


document.querySelector('.my-location-btn').addEventListener('click', (ev) => {
    if (navigator.geolocation) {
        mapService.initMap()
        .then(() => locService.getPosition())
        .then(pos => {
            mapService.panTo(({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
            mapService.addMarker(({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
            console.log('User position is:', pos.coords);
            return pos;
        })
        .then(pos => {
            mapService.getAddressByCoords(pos.coords.latitude, pos.coords.longitude);
            return pos;
        })
        .then(pos => {
            weatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            return pos;
        })
        .catch(err => {
            console.log('err!!!', err);
        })

    } else mapService.panTo(35.6895, 139.6917);
})

document.querySelector('.search-btn').addEventListener('click', (ev) => {
    var location = document.querySelector('input').value;
    // console.log(location);
    mapService.getLocByCoords(location)
        .then(
            pos => {
                // console.log(res);
                mapService.addMarker({ lat: pos.lat, lng: pos.lng });
                return pos;
            }
        )
        .then(pos => {
            mapService.panTo(({ lat: pos.lat, lng: pos.lng }))
            mapService.addMarker(({ lat: pos.lat, lng: pos.lng }))
            console.log('User position is:', pos);
            return pos;
        })
        .then(
            pos => {
                mapService.getAddressByCoords(pos.lat, pos.lng);
                return pos;
            }
        )
        .then(pos => weatherService.getWeatherByCoords(pos.lat, pos.lng))
        .catch(err => {
            console.log('err!!!', err);
        })

})

