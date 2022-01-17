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
