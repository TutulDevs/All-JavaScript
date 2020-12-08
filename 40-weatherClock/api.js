const input = document.querySelector('.search');

// API
const key = 'bN1D98JxidGC0h3gsKFT1DWjAHTVAqXi';

// async
// a. for current condition of weahter
async function getWeather (id) {
    const base = 'https://cors-anywhere.herokuapp.com/https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    try {
        const res = await fetch(base + query);
        const data = await res.json();
        input.style.borderColor = 'rgba(18, 103, 130, 0.75)';

        return {
            cityTime: data[0].LocalObservationDateTime.slice(11, 16),
            cityIsDay: data[0].IsDayTime,
            cityTemp: data[0].Temperature.Metric.Value,
            cityTempText: data[0].WeatherText,
        };
    }
    catch(err) {
        console.log(err);
        input.style.borderColor = 'salmon';
    }

}

// b. for the cities
async function getCity (city) {
    const base = 'https://cors-anywhere.herokuapp.com/https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    try {
        const res = await fetch(base + query);
        const data = await res.json();
        input.style.borderColor = 'rgba(18, 103, 130, 0.75)';

        return {
            cityKey: data[0].Key,
            cityName: data[0].EnglishName,
            country: data[0].Country.ID,
        };
    }
    catch (err) {
        console.log(err);
        input.style.borderColor = 'salmon';
    }
}


function displayCity(container, arr = []) {
    container.innerHTML = arr.map((x, i) => {
        return `<div class="city" title="${x.cityName}, ${x.country}" data-id="${i}">
        <div class="container ${x.cityIsDay ? 'day': 'night'}">
        <p class="cityName">${x.cityName}</p>
        <p class="cityTime">${x.cityTime}</p>
        <p class="cityTemp">${x.cityTemp}<sup>&deg;</sup>C </p>
        </div>
        <button class="delete" data-id="${i}">&#10006;</button>
        </div>`;
    })
    .join('');
}