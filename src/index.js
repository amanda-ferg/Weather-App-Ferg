function formatDate() {
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h2 = document.querySelector("h2");
h2.innerHTML = `${day}  ${hours}:${minutes}`;
}


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    let forecast = response.data.list[index];
    console.log(response.data.list[index]);
    forecastElement.innerHTML += `
    <div class="col">
      <ul id="forecast">
        <li class="day">${formatDate(day)}</li>
        <li>${Math.round(forecast.main.temp_max)}°</li>
        <img 
          src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
          }@2x.png" 
         />
        <li>L:${Math.round(forecast.main.temp_min)}°</li>
      </ul>
    </div>
     `;
  }
}

function searchCity(city) {
  let apiKey = "523153ffc9ade9361b141e46da936c85";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input-text");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  searchCity(city.value);
}

function showTemperature(response) {
  let iconElement = document.querySelector("#weatherIcon");
  
celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let apiKey = "523153ffc9ade9361b141e46da936c85";
  let units = "metric";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

window.onload = formatDate;

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocation = document.querySelector("#locationButton");
currentLocation.addEventListener("click", getPosition);

let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsiusLink");
celsius.addEventListener("click", displayCelsius);