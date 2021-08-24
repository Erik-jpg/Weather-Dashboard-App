  const cityInputBar = document.querySelector('#cityInputBar');
  const searchBtn = document.querySelector('#searchBtn');
  const clearHistBtn = document.querySelector('#clearHistBtn');
  // const todayCard = document.querySelector('#todayCard');
  // const cityName = document.querySelector('#cityName');
  // const date = document.querySelector('#date');
  // const today = document.querySelector('#currentDay');
  // const todayImg = document.querySelector('#weatherImg');
  // const todayTemp = document.querySelector('#temp');
  // const todayHum = document.querySelector('#hum');
  // const todayWind = document.querySelector('#wind');
  // const todayUV = document.querySelector('#UV');
  const statusMessage = document.querySelector('#statusMessage');
  const searchHistory = document.querySelector('search-history');
  const historySearch = JSON.parse(localStorage.getItem('history')) || [];
  const timeZoneOffSet=0
  console.log(historySearch);
  const APIKey = 'd888e695283db928ef9b9fd7d40936fc';


const generateMeteorologist = () => {
  // e.preventDefault()
  console.log(cityInputBar.value);
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputBar.value}&appid=${APIKey}`;
    fetch(requestUrl)
    .then((response) => {
    if (response.status === 404) {
      const errorMessage = document.createElement('h1');
      errorMessage.id = 'errorMessage';
      errorMessage.textContent = 'There seems to have been an error, please re-enter a city.';
      statusMessage.appendChild(errorMessage);
      return;
    }
    return response.jason();
  });

      console.log('error');
      // const coordinates= data.coordinates
      // const Latitude = coordinates.Latitude
      // const Longitude = coordinates.Longitude
    const today = document.querySelector('#currentDay')
    today.innerHTML=""

    const todayCard = document.createElement('div')
    const todayBody = document.createElement('div')
    const todayImg = document.createElement('img')
    const todayTemp = document.createElement('h6')
    const todayHum = document.createElement('h6')
    const todayWind = document.createElement('h6')
    const todayUV = document.createElement('h6')
    const todayTitle = document.createElement('h2')
    const todayWeatherNow = document.createElement('h3')

    todayCard.classList = 'card'
    todayBody.classList = 'card-body'
    todayTemp.classList = 'card-text'
    todayWind.classList = 'card-text'
    todayHum.classList = 'card-text'
    todayUV.classList = 'card-text'
    todayTitle = 'card-text'
    todayWeatherNow = 'card-text'
    

    todayTitle.textContent = data.cityName;
    todayWeatherNow.textContent= data.weather;
    todayTemp.textContent = data.main.temp;
    todayHum.textContent = data.main.humidity;
    todayWind.textContent = data.wind.speed + 'MPH'+ 'windspeed';
    todayUV.textContent = data.UV //have to figure out a way to add UV index, Mac said something about second access, using lat & long to get UV
    //fetches weather icon
    
    todayImg.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    console.log('todayImg');
    console.log('error');
    currentWeather.appendChild(todayCard)
    todayCard.appendChild(today)
    today.appendChild(todayTitle)
    today.appendChild(todayWeatherNow)
    todayTitle.appendChild(todayImg)
    today.appendChild(todayTemp)
    today.appendChild(todayHum)
    today.appendChild(todayWind)
    today.appendChild(todayUV)

    
    if(historySearch.indexOf(cityInputBar.value)=== -1) {
      historySearch.push(cityInputBar.value);
      localStorage.setItem(historySearch, JSON.stringify(historySearch));
      console.log('history saved');
    }
  };

function fiveDayForcast(e){
  e.preventDefault()
  const weeklyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
  fetch(weeklyUrl)
    .then(function (){
      console.log('ok');
    }).catch(function(){
      console.log('error');
    for (let i = 0; i < data.list.length; i++) {
      const today = document.querySelector('#currentDay');
      const todayCard = document.createElement('div')
      const todayBody = document.createElement('div')
      const todayImg = document.createElement('img')
      const todayTemp = document.createElement('h6')
      const todayHum = document.createElement('h6')
      const todayWind = document.createElement('h6')
      const todayUV = document.createElement('h6')
      const todayTitle = document.createElement('h2')
      const todayWeatherNow = document.createElement('h3')
      const currentDateAndTime = document.createElement('h4')

      todayCard.classList = 'card'
      todayBody.classList = 'card-body'
      todayTemp.classList = 'card-text'
      todayWind.classList = 'card-text'
      todayHum.classList = 'card-text'
      todayUV.classList = 'card-text'
      todayTitle = 'card-text'
      todayWeatherNow = 'card-text'
      currentDateAndTime = 'card-text'

      todayTitle.textContent = data.city.cityName;
      currentDateAndTime.textContent = cityTime(data.list[i].dt+adjustForTimeZone);
      todayTemp.textContent = data.list[i].main.temp
      todayHum.textContent = data.list[i].main.humidity
      todayWind.textContent = data.list[i].wind.speed

      todayImg.setAttribute("src", `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
    console.log('todayImg');

    currentWeather.appendChild(today)
    todayCard.appendChild(todayBody)
    today.appendChild(todayTitle)
    today.appendChild(currentDateAndTime)
    todayTitle.appendChild(todayImg)
    today.appendChild(todayTemp)
    today.appendChild(todayHum)
    today.appendChild(todayWind)
    today.appendChild(todayUV)
      
    }
  })
}

function addToSearchHistory(){
  for (let i = 0; i < historySearch.length; i++) {
    const weatherCards = document.querySelector('#weatherCards')
    const searchHistory = document.querySelector('#searchHistory')
    const li = document.createElement('li')
    const historyBtn = document.createElement('button')
    li.classList = "searchedCities"
    historyBtn.setAttribute('searchedHistory', historySearch[i])
    historyBtn.textContent = "searchedCities"
    historyBtn.classList = "button is-primary"
    historyBtn.addEventListener('click', function(e){
      console.log(e.target.getAttribute('searchedHistory'))
      searchText.value = e.target.getAttribute('searchedHistory')
      generateMeteorologist(e)
      fiveDayForcast(e)
    })
    li.textContent = historySearch[i]
    weatherCards.appendChild(li)
    searchHistory.appendChild(historyBtn)
  }
}

addToSearchHistory()
searchBtn.addEventListener('click', generateMeteorologist)

searchBtn.addEventListener('click', fiveDayForcast)
