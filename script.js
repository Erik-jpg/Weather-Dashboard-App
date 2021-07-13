const requestApi = `api.openweathermap.org/data/2.5/weather?q=${city+Name}&appid=${APIKey}`

const responseText = document.getElementById('#responseText');

function getAPI(requestApi){
  fetch(requestApi)
  .then(function (responseText) {
console.log(responseText.status);
  })
}