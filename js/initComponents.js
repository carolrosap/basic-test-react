import {getData, drawCard} from '/js/loadApiData.js';
async function requireComponents() {
    // Function to create "components" and let the project cleaner with less code in each html    
    // Only way I've found, which really works, using only pure JS and Html
    let header =  require("/components/top-header.html");
    let options =  require("/components/options.html");
    let noResults =  require("/components/no-results.html");
    let results =  require("/components/results.html");
    document.getElementById("content-top").innerHTML = header;
    document.getElementById("content-options").innerHTML = options;
    document.getElementById("content-no-results").innerHTML = noResults;
    document.getElementById("content-results").innerHTML = results;
}

async function init() {
    let test = await requireComponents();
    
    const selectWater = document.querySelector('#water');
    const selectSun = document.querySelector('#sunlight');
    const selectPets = document.querySelector('#pets');

    selectSun.onchange = getData;
    selectWater.onchange = getData;
    selectPets.onchange = getData;
    
} 

init();