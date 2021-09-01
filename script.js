const cityInputBar = document.querySelector("#cityInputBar");
const searchBtn = document.querySelector("#searchBtn");
const clearHistBtn = document.querySelector("#clearHistBtn");
const statusMessage = document.querySelector("#statusMessage");
const searchHistory = document.querySelector("search-history");

let todayTitle = document.createElement("h2");
let todayUV = document.createElement("h6");
let toDayTemp = document.createElement("h6");

const APIKey = "d888e695283db928ef9b9fd7d40936fc";

const generateMeteorologist = (data) => {
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputBar.value}&appid=${APIKey}`;
  fetch(requestUrl)
    .then((response) => {
      if (response.status === 400 || 404) {
        alert("There seems to have been an error, please re-enter a city.");
        // const error = document.createElement("h1");
        // errorMessage = "errorMessage";
        // errorMessage.textContent =
        //   ;
        // error.append(errorMessage);console.log("ok");
        // return;
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
      todayHum.textContent = data.main.humidity;
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
        );console.log("fiveDayImg");
        

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

function addToStorage() {
if(localStorage.getItem('cachedHistory') || []) {
  const historyArr = [cityInputBar.value];
  localStorage.setItem('cachedHistory', JSON.stringify(historyArr));
  console.log(localStorage.getItem('cachedHistory'));
  const h2History = document.createElement('li');
  h2History.classList.add('button');
  h2History.textContent = historyArr;
  h2History.append('historyKey');
  // historyKey.push(historyArr);
  h2History.addEventListener('click', (event) => {
  // cityInputBar = event.target.textContent;
  //should I change the name of this request, so it doesn't fire when original search is clicked?
  const weatherHistory = `https://api.openweathermap.org/data/2.5/weather?q=${h2History.value}&appid=${APIKey}`;
  generateMeteorologist(weatherHistory);
});
}

}
function checkHistory(){
 historyArr = JSON.parse(localStorage.getItem('cachedHistory'));
 console.log(localStorage);
 while (historyArr[historyArr.length - 1] !== todayTitle && historyArr.length) 
 if (!historyArr.length) {
   const newHistoryArr = JSON.parse(localStorage.getItem('cachedHistory'));
   localStorage.setItem('cachedHistory', JSON.stringify(newHistoryArr));
   newHistoryArr.push(historyArr)
 } else {
  return; 
}
}

// addToStorage();

// const addToHistory = () => {
//   if (localStorage.getItem('cachedHistory')) {

//   }
// }

function deleteHistory() {
  localStorage.clear(todayTitle);
  
} 

searchBtn.addEventListener("click", everythingToDo);

clearHistBtn.addEventListener('click', deleteHistory);

function everythingToDo() {
  generateMeteorologist();
  
  // console.log(localStorage.getItem('cachedHistory'));
  addToStorage
  checkHistory
}