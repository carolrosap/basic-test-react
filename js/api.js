function fillCard(plant) {
    var photoGrid = document.getElementById('photo-grid');

    var html = "<div class='photo-grid__card'>";
    html += "<img class='card-image' src='images/plants/lucky-bamboo.jpg'>";
    html += '<div class="card-info"><span class="card-info__plant-name">Lucky Bamboo</span>';
    html += '<img class="card-image" src="images/plants/lucky-bamboo.jpg">';
    html += '<div class="card-info__price-option"><span class="card-info__price">$50</span>';
    html += '<div class="card-info__options-images"><img src="images/icons/pet.svg">';
    html += '<img src="images/icons/no-sun.svg"><img src="images/icons/2-drops.svg"></div>';
    html += '</div></div></div'

    photoGrid.innerHTML += html;

    
            

}

function getData() {
    console.log("oi");
    const WATER = document.getElementById('water').value;
    const SUN = document.getElementById('sunlight').value;
    const PETS = document.getElementById('pets').value;
    var plants = [];

    if (WATER && SUN && PETS) {
        const URL_TO_FETCH = 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun=' + SUN + '&water=' + WATER + '&pets=' + PETS;
        console.log(URL_TO_FETCH)
        fetch(URL_TO_FETCH).then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                plants = data;

                data.forEach(function(plant){
                    fillCard(plant);    
                });

                var contentNoResults = document.getElementById('content-no-results');
                var contentResults = document.getElementById('content-results');
                if(data.length > 0 ) {
                    contentNoResults.style.display = 'none'; 
                    contentResults.style.display = 'grid';
                }else {
                    contentNoResults.style.display = 'grid';
                    contentResults.style.display = 'none';
                }
                    
            });
        }).catch(function (err) {
            console.error('Failed retrieving information', err);
        });

        console.log(plants.length);

        

    }
}

const selectWater = document.querySelector('#water');
const selectSun = document.querySelector('#sunlight');
const selectPets = document.querySelector('#pets');

selectSun.onchange = getData;
selectWater.onchange = getData;
selectPets.onchange = getData;
