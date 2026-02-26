"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-btn").addEventListener("click", findAdress);
});

    /** 
     * Hämtar förslag på adresser utifrån sökning. Skapar en array med alternativ och skickar med funktionen findOnMap. 
     * @async
     */

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

    /** 
     * Plockar ut kordinaterna för första platsen i listan och visar kordinaterna på karta i DOM. 
     * @param - Array med förslag på platser utifrån sökning
     */

function findOnMap(location) {

    // Omvandlar latitud till decimaltal och sätter värden för min/max latitud
    const lat = parseFloat(location[0].lat);
    const lat1 = lat - 0.05;
    const lat2 = lat + 0.05;

    // Omvandlar longitud till decimaltal och sätter värden för min/max longitud
    const long = parseFloat(location[0].lon);
    const long1 = long - 0.05;
    const long2 = long + 0.05;
  
    // Ersätter karta med uppdaterad vy
    const mapEl = document.getElementById("map");
    mapEl.innerHTML = `
    <iframe width="425" height="350" class="map" src="https://www.openstreetmap.org/export/embed.html?bbox=${long1}%2C${lat1}%2C${long2}%2C${lat2}&layer=mapnik&marker=${lat}%2C${long}" style="border: 1px solid black"></iframe>
    `;
}