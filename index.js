/* ae485f1b-b69c-41b6-af94-f0a1cddff8b5 api-key */

/* const API_TOKEN = 'pk.eyJ1Ijoiam9oYW5raXZpIiwiYSI6ImNrcnl6M25xMDA4aWUyd3BqY3EzYnA1NTEifQ.ve5rEn8ZDwUGKvphMkEdpw'; */

const API_TOKEN = 'ae485f1b-b69c-41b6-af94-f0a1cddff8b5';

const buttonElem = document.querySelector("#position-button");
let stopList = document.getElementById("stopLista");
let derpList = document.getElementById("derpLista");

async function getNearby(position) {
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let link = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${lat}&originCoordLong=${lon}&format=json&accessId=${API_TOKEN}`;

let data = await fetch(link);
let json = await data.json(); 
let stops = json.stopLocationOrCoordLocation;
  stopList.innerHTML = ""; 
stops.forEach(stop => {
    showStop(stop.StopLocation);
})  
/* console.log(json); */
}

async function getTimeTables (stop) {
    let link = `https://api.resrobot.se/v2.1/departureBoard?id=${stop.extId}&duration=15&format=json&accessId=${API_TOKEN}`
    let data = await fetch(link);
    let json = await data.json(); 
    let departures = json.Departure;

    derpList.innerHTML = "";
    departures.forEach(departure => {
        showDeparture(departure);
        console.log(departure);
    })
}

 /* fixa bättre med vad som kommer i fetchet */

function showDeparture(departure) {
   

   let li = document.createElement("li");

   li.classList.add('derp-item');

   li.innerHTML = departure.Product[0].line + " " + departure.time;
   derpList.append(li);
   
}

function showStop(stop) {
    let li = document.createElement("li");
    
    li.classList.add('menu-item');

    li.innerHTML = stop.name;
    li.addEventListener("click", () => {
    getTimeTables(stop);
    })
    stopList.append(li);
    /* console.log(stop); */
}

buttonElem.addEventListener("click", () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
   getNearby(position);
   /* console.log(position); */
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

/* för kamera */

const cameraButton = document.querySelector("#start-camera");
const videoElem = document.querySelector("#camera");
const takePictureButton = document.querySelector("#take-picture");
const canvas = document.querySelector("#picture");
const galleryElem = document.querySelector("#gallery");

const ctx = canvas.getContext("2d");
let stream;
const images = [];

/* kommer fråga om kameran, user säger okej, får en ström att slänga ut i videotagen */
cameraButton.addEventListener("click", async () => {
    console.log("cameraButton");
    if ("mediaDevices" in navigator) {
        stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        console.log(stream)
        videoElem.srcObject = stream;
    }
});

takePictureButton.addEventListener("click", () => {
    console.log("takePictureButton");
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height); /* clientWidth */
    const imageData = canvas.toDataURL("image/png");  /* gör om det till en png-bild */
    console.log(imageData);
    
    images.push({
        id: images.length,
        image: imageData
    });

    localStorage.setItem("cameraApp", JSON.stringify(images));
});

 function createImage(image) {
    const imageElem = document.createElement("img");
    imageElem.setAttribute("src", image.image);

    galleryElem.append(imageElem);
} 

 function getImages() {
    const images = JSON.parse(localStorage.getItem("cameraApp"));

    for (const image of images) {
        createImage(image);
    }
}

getImages(); 
/* göra tillbaka till ett vanligt javscript object */