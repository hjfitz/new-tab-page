const time = document.getElementById("time");
const timeTime = document.getElementById("time-time");
const timeDate = document.getElementById("time-date");

const links = document.getElementById("links");
const linksInner = document.getElementById("links-inner");

const weather = document.getElementById("weather");
const weatherInner = document.getElementById("weather-inner");

const weatherCanvas = document.getElementById("weather-canvas");

/**
 * Weather API stuff
 */

const owmLookup = {
  "01": "CLEAR_DAY",
  "02": "PARTLY_CLOUDY_DAY",
  "03": "CLOUDY",
  "04": "CLOUDY",
  "09": "RAIN",
  "10": "SLEET",
  "11": "SLEET",
  "13": "SNOW",
  "50": "FOG"
};

const portsmouthURI =
  "http://api.openweathermap.org/data/2.5/weather?lat=70.8&lon=-1.1&appid=bbc67f01cffb0e40951dbab4a4e69a87";

const toCelsius = weather => {
  return (weather - 273.15).toFixed();
};

const getWeather = () => {
  fetch(portsmouthURI)
    .then(data => {
      return data.json();
    })
    .then(json => {
      // setup the icon
      const skyCons = new Skycons({ color: "white" });
      // use some parsing magic to convert the response from api to something skycons can use
      const icon = owmLookup[json.weather[0].icon.replace(/[a-zA-z]/gi, "")];
      // stick the icons on the page
      skyCons.add(weatherCanvas, icon);
      skyCons.play();

      // populate the section
      const temperature = toCelsius(json.main.temp);
      const min = toCelsius(json.main.temp_min);
      const tempPara = document.createElement("p");
      const suffix = document.createElement("sup");
      suffix.innerHTML = "ºC";
      tempPara.innerHTML = temperature;
      tempPara.id = "temperature-para";
      tempPara.appendChild(suffix);
      tempPara.classList.add("weather");
      weather.appendChild(tempPara);
    });
};

getWeather();

/**
 * Time stuff
 */

timeTime.innerHTML = moment(new Date()).format("LT");
timeDate.innerHTML = moment(new Date()).format("MMMM Do YYYY");

window.setInterval(() => {
  timeTime.innerHTML = moment(new Date()).format("LT");
  timeDate.innerHTML = moment(new Date()).format("MMMM Do YYYY");
}, 5000);
