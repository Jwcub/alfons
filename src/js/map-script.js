"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-btn").addEventListener("click", findOnMap);
});

/** 
 * Hämtar förslag på adresser utifrån sökning. Skapar en array med alternativ.
 * @async
 * @return - returnerar array med objekt för adressförslag.
 */

async function findAdress() {
    const inputValue = document.getElementById("search-input").value;
    let searchPhrase = inputValue.replace(" ", "+");
    const url = "https://nominatim.openstreetmap.org/search?q=";

    try {
        const response = await fetch(url + searchPhrase + "&format=jsonv2");
        const locations = await response.json();

        return locations;

    } catch (error){
        console.error("Fel: " + error);
    }
}

/** 
 * Väljer första alternativet ur listan med adresser och genererar kordinater.
 * @async
 * @return - returnerar objekt med kordinater.
 */

async function generateCordinates() {
    let location = await findAdress();

    // Omvandlar latitud till decimaltal och sätter värden för min/max latitud
    const lat = parseFloat(location[0].lat);
    const long = parseFloat(location[0].lon);

    const cordinates = {
        latidude: lat,
        longitude: long,
        minLat: lat - 0.05,
        maxLat: lat + 0.05,
        minLong: long - 0.05,
        maxLong: long + 0.05
    }

    return cordinates;
}

/** 
 * Hämtar kordinater från generateCordinates() och uppdaterar kartan i DOM. 
 * @async
 */

async function findOnMap() {
    let cordinates = await generateCordinates();

    // Ersätter karta med uppdaterad vy
    const mapEl = document.getElementById("map");
    mapEl.innerHTML = `
    <iframe width="425" height="350" class="map" src="https://www.openstreetmap.org/export/embed.html?bbox=${cordinates.minLong}%2C${cordinates.minLat}%2C${cordinates.maxLong}%2C${cordinates.maxLat}&layer=mapnik&marker=${cordinates.latidude}%2C${cordinates.longitude}" style="border: 1px solid black"></iframe>
    `;

}