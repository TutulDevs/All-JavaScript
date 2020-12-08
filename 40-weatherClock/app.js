// Elements
const $ = x => document.querySelector(x);
const cityList = $('#cityList');

let cities = JSON.parse(localStorage.getItem('cities')) || [];

// Delete City
function deleteCity(e) {
    const [el,
        id] = [e.target,
        e.target.dataset.id];

    if (el.classList.contains('delete')) {
        cities.splice(id, 1);

        // Display on UI
        displayCity(cityList, cities);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

// main function
async function showTime(e) {
    e.preventDefault();

    const value = this.querySelector('input').value.trim();

    // values from City
    const m = await getCity(value);
    const cityKey = m.cityKey;
    const cityName = m.cityName;
    const country = m.country;

    // Values from Weather ;
    const w = await getWeather(cityKey);
    const cityTime = w.cityTime;
    const cityIsDay = w.cityIsDay;
    const cityTemp = Math.round(w.cityTemp);
    const cityTempText = w.cityTempText;

    // Create an Object
    const obj = {
        cityKey,
        cityName,
        country,
        cityTime,
        cityIsDay,
        cityTemp,
        cityTempText
    };

    // Push the Object in the Arr
    cities.push(obj);

    // Display on UI
    displayCity(cityList, cities);

    // Add on localStorage
    localStorage.setItem('cities', JSON.stringify(cities));

    // Reset the form
    this.reset();
}




// event
$('.form').addEventListener('submit', showTime);
cityList.addEventListener('click', deleteCity);


// on load
displayCity(cityList, cities);