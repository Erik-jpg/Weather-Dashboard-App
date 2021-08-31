const cityInputBar = document.querySelector("#cityInputBar");
const searchBtn = document.querySelector("#searchBtn");
const clearHistBtn = document.querySelector("#clearHistBtn");
const statusMessage = document.querySelector("#statusMessage");
const searchHistory = document.querySelector("search-history");
const historySearch = JSON.parse(localStorage.getItem("history")) || [];
const timeZoneOffSet = 0;
let todayUV = document.createElement("h6");

const APIKey = "d888e695283db928ef9b9fd7d40936fc";

const generateMeteorologist = () => {
  // e.preventDefault()
  console.log(cityInputBar.value);
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputBar.value}&appid=${APIKey}`;
  fetch(requestUrl)
    .then((response) => {
      if (response.status === 404) {
        const errorMessage = document.createElement("h1");
        errorMessage.id = "errorMessage";
        errorMessage.textContent =
          "There seems to have been an error, please re-enter a city.";
        statusMessage.appendChild(errorMessage);
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const coordinates = data.coord;
      const Latitude = coordinates.lat;
      const Longitude = coordinates.lon;
      fiveDayForcast(Latitude, Longitude);

      let today = document.querySelector("#currentDay");
      today.innerHTML = "";

      let todayCard = document.createElement("div");
      let todayBody = document.createElement("div");
      let todayImg = document.createElement("img");
      let todayTemp = document.createElement("h6");
      let todayHum = document.createElement("h6");
      let todayWind = document.createElement("h6");
      
      let todayTitle = document.createElement("h2");
      let todayWeatherNow = document.createElement("h3");

      todayCard.classList = "card";
      todayBody.classList = "card-body";
      todayTemp.classList = "card-text";
      todayWind.classList = "card-text";
      todayHum.classList = "card-text";
      todayUV.classList = "card-text";
      console.log("card-text", todayTitle);
      todayTitle.classList = "card-text";
      todayWeatherNow.classList = "card-text";

      todayTitle.textContent = data.name;
      todayWeatherNow.textContent = data.weather[0].description;
      todayTemp.textContent = data.main.temp;
      todayHum.textContent = data.main.humidity;
      todayWind.textContent = data.wind.speed + "MPH" + "windspeed";
      
      
      //have to figure out a way to add UV index, Mac said something about second access, using lat & long to get UV
      //fetches weather icon

      todayImg.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      
      console.log("error");
      
      todayBody.append(todayImg);
      todayBody.append(todayTitle);
      todayBody.append(todayWeatherNow);
      todayBody.append(todayTemp);
      todayBody.append(todayHum);
      todayBody.append(todayWind);
      todayBody.append(todayUV);
      todayCard.append(todayBody);
      today.append(todayCard);

      if (historySearch.indexOf(cityInputBar.value) === -1) {
        historySearch.push(cityInputBar.value);
        localStorage.setItem(historySearch, JSON.stringify(historySearch));
        console.log("history saved");
      }
    });
};

function fiveDayForcast(latitude, longitude) {
  const weeklyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=imperial`;
  fetch(weeklyUrl)
    .then(function (response) {
      console.log("ok");
return response.json();
    })
    .then(function (data) {
      console.log(data);
      
      for (let i = 0; i < data.daily.length; i++) {
        let fiveDay = document.querySelector("#dayOne");
        let fiveDayCard = document.createElement("div");
        let fiveDayBody = document.createElement("div");
        let fiveDayImg = document.createElement("img");
        let fiveDayTemp = document.createElement("h6");
        let fiveDayHum = document.createElement("h6");
        let fiveDayWind = document.createElement("h6");
        let fiveDayUV = document.createElement("h6");
        let fiveDayTitle = document.createElement("h2");
        let fiveDayWeatherNow = document.createElement("h3");
        let currentDateAndTime = document.createElement("h4");

        fiveDayCard.classList = "card";
        fiveDayBody.classList = "card-body";
        fiveDayTemp.classList = "card-text";
        fiveDayWind.classList = "card-text";
        fiveDayHum.classList = "card-text";
        fiveDayUV.classList = "card-text";
        fiveDayTitle.classList = "card-text";
        fiveDayWeatherNow.classList = "card-text";
        currentDateAndTime.classList = "card-text";

        // fiveDayTitle.textContent = data.city.cityName;
        fiveDayTemp.textContent = data.daily[i].temp.day;
        fiveDayHum.textContent = data.daily[i].humidity;
        fiveDayWind.textContent = data.daily[i].wind_speed;
        todayUV.textContent = data.current.uvi;

        fiveDayImg.setAttribute(
          "src",
          `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
          
        );
        console.log("fiveDayImg");

        // todayBody.appendChild(today);
        fiveDayCard.append(fiveDayBody);
        fiveDay.append(fiveDayTitle);
        fiveDay.append(currentDateAndTime);
        fiveDayTitle.append(fiveDayImg);
        fiveDay.append(fiveDayTemp);
        fiveDay.append(fiveDayHum);
        fiveDay.append(fiveDayWind);
        fiveDay.append(fiveDayUV);
      }
    });
}

function addToSearchHistory() {
  for (let i = 0; i < historySearch.length; i++) {
    const weatherCards = document.querySelector("#weatherCards");
    const searchHistory = document.querySelector("#searchHistory");
    const li = document.createElement("li");
    const historyBtn = document.createElement("button");
    li.classList = "searchedCities";
    historyBtn.setAttribute("searchedHistory", historySearch[i]);
    historyBtn.textContent = "searchedCities";
    historyBtn.classList = "button is-primary";
    historyBtn.addEventListener("click", function (e) {
      console.log(e.target.getAttribute("searchedHistory"));
      searchText.value = e.target.getAttribute("searchedHistory");
      generateMeteorologist(e);
      fiveDayForcast(e);
    });
    li.textContent = historySearch[i];
    weatherCards.append(li);
    searchHistory.append(historyBtn);
  }
  console.log(historySearch);
}

addToSearchHistory();
searchBtn.addEventListener("click", generateMeteorologist);

// searchBtn.addEventListener('click', fiveDayForcast)
