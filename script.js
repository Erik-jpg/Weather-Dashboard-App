function initpage() {
  const cityInputBar = document.querySelector('cityInputBar');
  const searchBtn = document.querySelector('searchBtn');
  const clearHistBtn = document.querySelector('clearHistoryButton');
  const cityName = document.querySelector('city-name');
  const todaysImg = document.querySelector('weather-img');
  const todaysTemp = document.querySelector('temperature');
  const todaysHumidity = document.querySelector('humidity');
  const todaysWind = document.querySelector('wind');
  const todaysUV = document.querySelector('UV-index');
  const searchHistory = document.querySelector('search-history');
  let historySearch = JSON.parse(localStorage.getItem('history'))
  console.log(historySearch);

  const APIKey = 'd888e695283db928ef9b9fd7d40936fc';
  
}