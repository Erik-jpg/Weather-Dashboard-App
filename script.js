const cityInputBar = document.querySelector("#cityInputBar");
const searchBtn = document.querySelector("#searchBtn");
const clearHistBtn = document.querySelector("#clearHistBtn");
const statusMessage = document.querySelector("#statusMessage");
const searchHistory = document.querySelector("search-history");


let todayUV = document.createElement("h6");
let toDayTemp = document.createElement("h6");

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
      let todayHum = document.createElement("h6");
      let todayWind = document.createElement("h6");
      let todayTitle = document.createElement("h2");
      let todayWeatherNow = document.createElement("h3");

      todayCard.classList = "card";
      todayBody.classList = "card-body";
      toDayTemp.classList = "card-text";
      todayWind.classList = "card-text";
      todayHum.classList = "card-text";
      todayUV.classList = "card-text";
      console.log("card-text", todayTitle);
      todayTitle.classList = "container card-text";
      todayWeatherNow.classList = "card-text";

      todayTitle.textContent = data.name;
      todayWeatherNow.textContent = data.weather[0].description;
      todayHum.textContent = data.main.humidity;
      todayWind.textContent = data.wind.speed + "MPH" + "windspeed";
      
      
      //have to figure out a way to add UV index, Mac said something about second access, using lat & long to get UV
      //fetches weather icon

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

      // if (historySearch.indexOf(searchHistory) === -1) {
      //   let historySearch = JSON.parse(localStorage.getItem(city)) || [];
      //   const city = localStorage.getItem(city);
      //   historySearch.push(city);
      //   localStorage.setItem(historySearch, JSON.stringify(city));
      //   console.log("history saved");
      // }
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
        toDayTemp.textContent = data.daily[0].temp.day;

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

displayHistory();

function preventDefault() {};

//this is saving history of the searched cities
function handleHistory() {
  let searchHistory = JSON.parse(localStorage.getItem("historySearch")) || [];
  const cityName = document.querySelector('#cityInputBar').value;
  const historyObject = {city:cityName};
  searchHistory.push(historyObject);
  localStorage.setItem("historySearch", JSON.stringify(searchHistory));
  
  console.log('History saved');
};

//This is to view the searched cities
function displayHistory() {
  const retrieveHistory = JSON.parse(localStorage.getItem("historySearch")) || [];
  document.querySelector("#historyKey").innerHTML = "";
  for (let i =0; i < retrieveHistory.length; i++){
    const element = retrieveHistory[i];
    let li = document.createElement("li");
    li.textContent = element.retrieveHistory;
    document.querySelector("#historyKey").append(li);
    console.log('viewing history');
  }
}

// This is to check to see if the user has any previous history
function checkForHistory() {
  if (localStorage.getItem("historySearch")!== null) {
    const city = localStorage.getItem("cityName");
    historySearch.value = "your, " + city;
  }
}

function deleteHistory() {
  localStorage.clear();
}


searchBtn.addEventListener("click", everythingToDo);

clearHistBtn.addEventListener('click', deleteHistory);

function everythingToDo() {
  generateMeteorologist();
  handleHistory();
  displayHistory();
  // checkForHistory();
  preventDefault();
}