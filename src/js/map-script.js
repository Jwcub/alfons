"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-btn").addEventListener("click", findAdress);
});

async function findAdress() {
    const inputValue = document.getElementById("search-input").value;
    let searchPhrase = inputValue.replace(" ", "+");
    const url = "https://nominatim.openstreetmap.org/search?q=";

    try {
        const response = await fetch(url + searchPhrase + "&format=jsonv2");
        const location = await response.json();

        findOnMap(location);

    } catch (error){
        console.error("Fel: " + error);
    }
}

function findOnMap(location) {

    const lat = location[0].lat;
    const long = location[0].lon;

    console.log(lat + long);

    


}