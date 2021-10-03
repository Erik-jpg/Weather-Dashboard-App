const cityInputBar = document.querySelector("#cityInputBar");
const searchBtn = document.querySelector("#searchBtn");
const clearHistBtn = document.querySelector("#clearHistBtn");
const statusMessage = document.querySelector("#statusMessage");
const historyEl = document.querySelector("search-history");
const cityName = document.querySelector("#cityName");
let searchHistory = JSON.parse(localStorage.getItem('search')) || [];
console.log(searchHistory);
let todayTitle = document.createElement("h2");
let todayUV = document.createElement("h6");
let toDayTemp = document.createElement("h6");

const APIKey = "d888e695283db928ef9b9fd7d40936fc";

// window.onload = 
generateMeteorologist = (data) => {
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputBar.value}&appid=${APIKey}&units=imperial`;
  fetch(requestUrl)
    .then((response) => {
      if (!response.status === 200) {
        alert("There seems to have been an error, please re-enter a city.");
      }
      return response.json();
    })
    .then((data) => {
      const coordinates = data.coord;
      const Latitude = coordinates.lat;
      const Longitude = coordinates.lon;
      fiveDayForcast(Latitude, Longitude);
      console.log(data);
      let today = document.querySelector("#currentDay");
      today.innerHTML = "";

      let UTCTimeStamp = data.dt;
      const milliseconds = UTCTimeStamp * 1000;
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString();
      console.log(humanDateFormat);

      let todayCard = document.createElement("div");
      let todayBody = document.createElement("div");
      let todayDate = document.createElement("h3");
      let todayImg = document.createElement("img");
      let todayHum = document.createElement("h6");
      let todayWind = document.createElement("h6");
      let todayWeatherNow = document.createElement("h3");

      todayCard.classList = "card";
      todayBody.classList = "card-body";
      todayDate.classList = "card-text";
      toDayTemp.classList = "card-text";
      todayWind.classList = "card-text";
      todayHum.classList = "card-text";
      todayUV.classList = "card-text";
      todayTitle.classList = "container card-text";
      todayWeatherNow.classList = "card-text";

      todayTitle.textContent = data.name;
      todayDate.textContent = humanDateFormat;
      todayWeatherNow.textContent = data.weather[0].description;
      todayHum.textContent = data.main.humidity + "Humidity";
      todayWind.textContent = data.wind.speed + " MPH" + "windspeed";
      
      todayImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      todayBody.append(todayDate);
      todayBody.append(todayImg);
      todayBody.append(todayTitle);
      todayBody.append(todayWeatherNow);
      todayBody.append(toDayTemp);
      todayBody.append(todayHum);
      todayBody.append(todayWind);
      todayBody.append(todayUV);
      todayCard.append(todayBody);
      today.append(todayCard);
    });
};

// window.onload = 
function fiveDayForcast(latitude, longitude) {
  const weeklyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=imperial`;
  fetch(weeklyUrl)
    .then(function (response) {
      
return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < 5; i++) {
        const fiveDayForecast = document.createElement("div");
        fiveDayForecast.setAttribute("id", "weekCard");
        fiveDayForecast.setAttribute("class", "fiveDayForecast");
        data.daily.forEach(item => {
          document.createElement("div");
        });
        console.log(data);
        let UTCTimeStamp = data.daily[i].dt;
        const milliseconds = UTCTimeStamp * 1000;
        const dateObject = new Date(milliseconds);
        const fiveDateFormat = dateObject.toLocaleString();
        const fiveDayDateEl = document.createElement("p");
        fiveDayDateEl.setAttribute("class", "five-day");
        fiveDayDateEl.innerText = fiveDateFormat;
        fiveDayForecast.append(fiveDayDateEl);
        const fiveDayImg = document.createElement('img');
        fiveDayImg.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
        console.log(data.daily[i]); 
        fiveDayImg.setAttribute("alt", data.daily[i].weather[0].description);
        fiveDayForecast.append(fiveDayImg);
        const fiveDayTemp = document.createElement("p");
        fiveDayTemp.innerHTML = 'Temperature: ' + data.daily[i].temp.day;
        fiveDayForecast.append(fiveDayTemp);
        const fiveDayHum = document.createElement("p");
        fiveDayHum.innerHTML = "Humidity: " + data.daily[i].humidity;
        fiveDayForecast.append(fiveDayHum);
        const fiveDayWind = document.createElement("p");
        fiveDayWind.innerHTML = "wind Speed: " + data.daily[i].wind_speed;
        fiveDayForecast.append(fiveDayWind);
        document.body.appendChild(fiveDayForecast);
        todayUV.textContent = data.current.uvi + "UVIndex";
        toDayTemp.textContent = data.daily[0].temp.day + "Today's Current Temperature";
      }
    });
}

function addToFrontEnd() {
  if (searchHistory === []) {
  return;
  } else {
  for (var i = 0; i < searchHistory.length; i++) {
    const historyKey = document.createElement("button");
    historyKey.setAttribute("value", searchHistory[i]);
    historyKey.addEventListener("click", function(){
      generateMeteorologist(historyKey.value);
      console.log(localStorage.getItem('historyKey'));
      historyEl.append(historyKey);
    })
    
    }
  }
}

function checkHistory(){
if (searchHistory.length > 0){
  generateMeteorologist(searchedCity[searchHistory.length - 1]);
}
}

function deleteHistory() {
  localStorage.clear(searchedCity);
  
} 

searchBtn.addEventListener("click", function() {
  const searchedCity = cityInputBar.value;
  generateMeteorologist(searchedCity);
  searchHistory.push(searchedCity);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  addToFrontEnd()
});

clearHistBtn.addEventListener('click', function(){
  localStorage.clear();
  searchHistory = [];

});

addToFrontEnd();
