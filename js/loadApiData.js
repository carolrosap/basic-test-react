export function drawCard(plant) {
    var photoGrid = document.getElementById('photo-grid');
    var petsImg, sunImg, waterImg, html;

    if (plant.toxicity)
        petsImg = require("/images/icons/toxic.svg");
    else
        petsImg = require("/images/icons/pet.svg");

    if (plant.sun == 'high')
        sunImg = require("/images/icons/high-sun.svg");
    else if (plant.sun == 'no')
        sunImg = require("/images/icons/no-sun.svg");
    else
        sunImg = require("/images/icons/low-sun.svg");

    if (plant.water == 'regularly')
        waterImg = require("/images/icons/2-drops.svg");
    else if (plant.water == 'daily')
        waterImg = require("/images/icons/3-drops.svg");
    else
        waterImg = require("/images/icons/1-drop.svg");

    if (plant.staff_favorite)
        html = "<div class='photo-grid__card staff-favorite'>";
    else
        html = "<div class='photo-grid__card'>";

    html += '<img class="card-image" src="' + plant.url + '">';
    html += '<div class="card-info"><span class="card-info__plant-name">' + plant.name + '</span>';
    html += '<div class="card-info__price-option"><span class="card-info__price">$' + plant.price + '</span>';
    html += '<div class="card-info__options-images"><img src="' + petsImg + '">';
    html += '<img src="' + sunImg + '"><img src="' + waterImg + '"></div>';
    html += '</div></div></div>';

    photoGrid.innerHTML += html;

}

export function getData() {
    const WATER = document.getElementById('water').value;
    const SUN = document.getElementById('sunlight').value;
    const PETS = document.getElementById('pets').value;
    if (WATER && SUN && PETS) {
        const URL_TO_FETCH = 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun=' + SUN + '&water=' + WATER + '&pets=' + PETS;
        fetch(URL_TO_FETCH).then(function (response) {
            response.json().then(function (data) {
                document.getElementById('photo-grid').innerHTML = '';

                if (data.length > 0) {
                    data.forEach(function (plant) {
                        drawCard(plant);
                    });

                    var contentNoResults = document.getElementById('content-no-results');
                    var contentResults = document.getElementById('content-results');
                    contentNoResults.style.display = 'none';
                    contentResults.style.display = 'grid';
                } else {
                    contentNoResults.style.display = 'grid';
                    contentResults.style.display = 'none';
                }

            });
        }).catch(function (err) {
            console.error('Failed retrieving information', err);
        });

    }
}
