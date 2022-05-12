/* ae485f1b-b69c-41b6-af94-f0a1cddff8b5 api-key */

/* const API_TOKEN = 'pk.eyJ1Ijoiam9oYW5raXZpIiwiYSI6ImNrcnl6M25xMDA4aWUyd3BqY3EzYnA1NTEifQ.ve5rEn8ZDwUGKvphMkEdpw'; */

const API_TOKEN = 'ae485f1b-b69c-41b6-af94-f0a1cddff8b5';

const buttonElem = document.querySelector("#position-button");
let stopList = document.getElementById("stopList");

async function getNearby(position) {
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let link = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${lat}&originCoordLong=${lon}&format=json&accessId=${API_TOKEN}`;

let data = await fetch(link);
let json = data.json(); 
let stops = json.stopLocationOrCoordLocation;
 stopList.innerHTML = ""; 
stops.forEach(stop => {
    showStop(stop.StopLocation);
}) 
}

buttonElem.addEventListener("click", () => {
    if (navigator.geolocation) {
   const position = navigator.geolocation.getCurrentPosition( position => {
   getNearby(position);
   });
}
});



/* 
function showOnMap(position) {
    mapboxgl.accessToken = API_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 13
    });
    new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).
    addTo(map);
}

buttonElem.addEventListener("click", () => {
     if (navigator.geolocation) {
    const position = navigator.geolocation.getCurrentPosition( position => {
    console.log(position);

    showOnMap(position);
});
}
}); */