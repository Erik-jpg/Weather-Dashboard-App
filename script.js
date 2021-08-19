function initPage() {
  const cityInputBar = document.querySelector('#cityInputBar');
  const searchBtn = document.querySelector('#searchBtn');
  const clearHistBtn = document.querySelector('#clearHistBtn');
  const cityName = document.querySelector('#cityName');
  const date = document.querySelector('#date');
  const today = document.querySelector('#currentDay');
  const todaysImg = document.querySelector('#weatherImg');
  const todaysTemp = document.querySelector('#temp');
  const todaysHumidity = document.querySelector('#hum');
  const todaysWind = document.querySelector('#wind');
  const todaysUV = document.querySelector('#UV');
  const searchHistory = document.querySelector('search-history');
  let historySearch = JSON.parse(localStorage.getItem('history')) || [];
  const timeZoneOffSet=0
  console.log(historySearch);
  const APIKey = 'd888e695283db928ef9b9fd7d40936fc';
}

function generateMeteorologist (e) {
  e.preventDefault()
  console.log(cityInputBar.value)
    const requestUrl = `https://api.openweathermap.org/data/a.5/weather?q=${cityInputBar}+&appid=${apiKey}&units=imperial`;
    fetch(requestUrl)
    .then(function(res) {      
      return res.json();
    })
    .then(function(data) {
      console.log(data)
      timeZoneOffSet = data.timeZone
      console.log(timeZoneOffSet)
      const coordinates= data.coordinates
      const Latitude = coordinates.Latitude
      const Longitude = coordinates.Longitude
    const today = document.querySelector('#currentDay')
    today.innerHTML=""
    todayTitle.textContent =data.cityName;
    todayWeather.textContent=data.weather;
    todaysTemp.textContent=data.main.temp;
    todaysHumidity.textContent=data.main.humidity;
    todaysWind.textContent=data.wind.speed + 'MPH'+ 'windspeed';
    todaysUV.textContent=data.UV //have to figure out a way to add UV index, Mac said something about second access, using lat & long to get UV
    //fetches weather icon
    todaysImg.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}png`);

    today.appendChild()
    
    })
}

