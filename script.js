const url = 'https://api.openweathermap.org/data/2.5/';
const key = '40d8d60ca773d44f874725fcd0f4de55';
const lang = 'tr';
const x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition);
    } else {
x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Konum bilgisini kullanarak hava durumu bilgilerini al
    getResultByCoordinates(latitude, longitude);
}

const getResultByCoordinates = (latitude, longitude) => {
    let query = `${url}weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=${lang}&units=metric`;
    fetch(query)
.then(weather => {
    return weather.json();
})
.then(displayResult);
};

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)} °C`;

    let desc = document.querySelector('.desc');
    let description = result.weather[0].description;
    let capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    desc.innerText = capitalizedDescription;

    let feel = document.querySelector('.feel');
    feel.innerText = `${Math.round(result.main.feels_like)} °C`;

    let humidity = document.querySelector('.humidity');
    humidity.innerText = `%${Math.round(result.main.humidity)}`;

    let speed = document.querySelector('.speed');
    speed.innerText = `${Math.round(result.wind.speed)}km/s`;
};

const searchWeather = () => {
    const cityName = document.getElementById('search').value;
    getResult(cityName);
};
