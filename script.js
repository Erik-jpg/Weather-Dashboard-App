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

const generateMeteorologist = (data) => {
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputBar.value}&appid=${APIKey}`;
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
      const currentDate = new Date(data.getDate);
      console.log(currentDate);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      cityName.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") "; 
      
      let todayCard = document.createElement("div");
      let todayBody = document.createElement("div");
      let todayImg = document.createElement("img");
      let todayHum = document.createElement("h6");
      let todayWind = document.createElement("h6");
      let todayWeatherNow = document.createElement("h3");

      todayCard.classList = "card";
      todayBody.classList = "card-body";
      toDayTemp.classList = "card-text";
      todayWind.classList = "card-text";
      todayHum.classList = "card-text";
      todayUV.classList = "card-text";
      todayTitle.classList = "container card-text";
      todayWeatherNow.classList = "card-text";

      todayTitle.textContent = data.name;
      todayWeatherNow.textContent = data.weather[0].description;
      todayHum.textContent = data.main.humidity + "Humidity";
      todayWind.textContent = data.wind.speed + "MPH" + "windspeed";
      
      todayImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      
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

function fiveDayForcast(latitude, longitude) {
  const weeklyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=imperial`;
  fetch(weeklyUrl)
    .then(function (response) {
      
return response.json();
    })
    .then(function (data) {
      console.log(data);
      const fiveDayCard = document.querySelector('.fiveDayForecast');
      for (let i = 0; i < fiveDayCard.length; i++) {
        fiveDayCard[i].innerHTML = "";
        console.log(data);
        const fiveDayIndex = i*8 + 4;
        const fiveDayDate = new Date(response.data.list[fiveDayIndex]);
        const fiveDayDay = fiveDayDate.getDate();
        const fiveDayMonth = fiveDayDate.getMonth();
        const fiveDayYear = fiveDayDate.getFullYear();
        const fiveDayDateEL = document.createElement("p");
        fiveDayDateEL.setAttribute("class", "fiveDayDate");
        fiveDayDateEL.innerHTML = fiveDayMonth + '/' + fiveDayDay + '/' + fiveDayYear;
        fiveDayCard[i].append(fiveDayDateEL);
        const fiveDayImg = document.createElement('img');
        fiveDayImg.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
        fiveDayImg.setAttribute("alt", response.data.list[fiveDayIndex].weather[0].description);
        fiveDayCard[i].append(fiveDayDateEL);
        const fiveDayTemp = document.createElement("p");
        fiveDayTemp.innerHTML = 'Temperature: ' + data.daily[i].temp.day;
        fiveDayCard[i].append(fiveDayTemp);
        const fiveDayHum = document.createElement("p");
        fiveDayHum.innerHTML = "Humidity: " + data.daily[i].hum.day;
        const fiveDayWind = document.createElement("p");
        fiveDayWind.innerHTML = "wind Speed: " + data.daily[i].wind.speed;
        // let fiveDay = document.querySelector("#dayOne");
        // let fiveDayCard = document.createElement("div");
        // let fiveDayBody = document.createElement("div");
        // let fiveDayImg = document.createElement("img");
        // let fiveDayTemp = document.createElement("h6");
        // let fiveDayHum = document.createElement("h6");
        // let fiveDayWind = document.createElement("h6");
        // let fiveDayUV = document.createElement("h6");
        // let fiveDayTitle = document.createElement("h2");
        // let fiveDayWeatherNow = document.createElement("h3");
        // let currentDateAndTime = document.createElement("h4");

        // fiveDayCard.classList = "card";
        // fiveDayBody.classList = "card-body";
        // fiveDayTemp.classList = "card-text";
        // fiveDayWind.classList = "card-text";
        // fiveDayHum.classList = "card-text";
        // fiveDayUV.classList = "card-text";
        // fiveDayTitle.classList = "card-text";
        // fiveDayWeatherNow.classList = "card-text";
        // currentDateAndTime.classList = "card-text";

        // fiveDayTitle.textContent = data.city.cityName;
        // fiveDayTemp.textContent = data.daily[i].temp.day + "Temperature";
        // fiveDayHum.textContent = data.daily[i].humidity + "Humidity";
        // fiveDayWind.textContent = data.daily[i].wind_speed + "Wind Speed";
        todayUV.textContent = data.current.uvi + "UVIndex";
        toDayTemp.textContent = data.daily[0].temp.day + "Today's Current Temperature";

        // fiveDayImg.setAttribute(
        //   "src",
          
        // );console.log("fiveDayImg");
        

        // todayBody.appendChild(today);
        // fiveDayCard.append(fiveDayBody);
        // fiveDay.append(fiveDayTitle);
        // fiveDay.append(currentDateAndTime);
        // fiveDayTitle.append(fiveDayImg);
        // fiveDay.append(fiveDayTemp);
        // fiveDay.append(fiveDayHum);
        // fiveDay.append(fiveDayWind);
        // fiveDay.append(fiveDayUV);
      }
    });
}

function addToStorage() {
  historyEl.innerText="";
  for (var i = 0; i < searchHistory.length; i++) {
    const historyKey = document.querySelector("#cityInputBar");
    historyKey.setAttribute("value", searchHistory[i]);
    historyKey.addEventListener("click", function(){
      generateMeteorologist(historyKey.value);
      console.log(localStorage.getItem('historyKey'));
    })
    historyEl.append(historyKey);
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
  
});

clearHistBtn.addEventListener('click', function(){
  localStorage.clear();
  searchHistory = [];

});

// function everythingToDo() {
  
  
//   // 
//   addToStorage
//   checkHistory
// }