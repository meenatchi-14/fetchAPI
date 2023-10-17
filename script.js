const mainDiv = document.querySelector(".container");
 
// Fetch data from the API
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const countryObject = {
        name: element.name.common,
        flags: element.flags.png,
        capital: element.capital ? element.capital[0] : element.capital,
        region: element.region,
        countryCodes: element.cca3,
        latlng: element.latlng,
      };
      createCountryCard(countryObject);
    });
  })
  .catch((err) => console.log("error : ", err));
 
// Fetch weather
async function getWeather(latlng) {
  try {
    let apiKey = "38072ffea4c9c4bf2cbe0d6d45913be8";
    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`;
    let weatherObj = await fetch(weatherApi);
    let response = await weatherObj.json();
    return response;
  } catch (err) {
    console.log("error : ", err);
  }
}
 //create Cards
function createCountryCard(element) {
  const divCreate = document.createElement("div");
  divCreate.className = "row";
  divCreate.innerHTML = `
      <div class="col-lg-4 col-sm-12 card">
        <H1 id="title" class="text-center">${element.name}</H1> 
        <div class=" card-header"> 
          <img id="flag" class="card-img-top" src="${element.flags}" alt="${element.name}">
        </div>
        <div class= "card-body">
          <p ><span class="card-text"> Capital : ${element.capital}</span></p>
          <p ><span class="card-text" > Region : ${element.region}</span></p>
          <p ><span class="card-text"> Country Codes: ${element.countryCodes}</span></p>
          <div>
            <button id="btn" class="btn-primary">Get weather</button>
        </div>
        <div class="weather-display" style="display: none;"></div>
        </div>
      </div>
  `;
  mainDiv.appendChild(divCreate);
 
  // Button click event 
  const weatherButton = divCreate.querySelector("#btn");
  const weatherDisplay = divCreate.querySelector(".weather-display");
  weatherButton.addEventListener("click", async () => {
    const weatherData = await getWeather(element.latlng);
    console.log("Weather data:", weatherData);
if (weatherData) {
      const weatherInfo = `
        <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
        <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
      `;
      weatherDisplay.innerHTML = weatherInfo;
      weatherDisplay.style.display = "block";
    }
  });
}
 