//State
let currentCity = "Japan";
let units = "metric";

//Selector
let city = document.querySelector(".weather_city");
let datetime = document.querySelector('.weather__datetime');
let weather_forecast = document.querySelector(".weather_forcast");
let weather_temperature = document.querySelector(".weather_temperture");
let weather_icon = document.querySelector('.weather_icon');
let weather_minmax = document.querySelector('.weather__minmax');
let weather_realfeel = document.querySelector('.weather_realFeel');
let weather_humidity = document.querySelector('.weather_humidity');
let weather_wind = document.querySelector('.weather_wind');
let weather_pressure = document.querySelector('.weather_pressure');

//Search
document.querySelector('.search_weather').addEventListener('submit', e=>{
   let search = document.querySelector('.weather_searchForm');
   //Prevent refresh
   e.preventDefault();

   //change city
   currentCity = search.value;

   //get weather
   getWeather()

   //clearFrom
   search.value = ""
})

document.querySelector('.weather_unit_celsius').addEventListener('click', ()=>{
   if(units !== "metric"){
      //change to metric
      units = 'metric';
      //get weather
      getWeather()
   }
});
document.querySelector('.weather_unit_farenhit').addEventListener('click', ()=>{
   if(units !== "imperial"){
      //change to imperial
      units = 'imperial';
      //get weather
      getWeather()
   }
})


function convertTimeStamp(timestamp, timezone){
   const convertTimezone = timezone / 3600; //convert seconds to hours

   const date = new Date(timestamp * 1000);
   const options = {
      weekday:"long",
      day: "numeric",
      month:"long",
      year:"numeric",
      hour:"numeric",
      minute:"numeric",
      timeZone:`Etc/GMT${convertTimezone >= 0 ? "-":"+"}${Math.abs(convertTimezone)}`,
      hour12:true,
   }
   return date.toLocaleString('en-US', options)
}

//Convert country code to name
function convertCountryCode(country){
   let regionName = new Intl.DisplayNames(['en'], {type: 'region'});
   return regionName.of(country)
}
function getWeather() {
   const API_KEY = 'c67165bf1c681601dd9b4a92935ee8f1'
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weather_forecast.innerHTML = `<p>${data.weather[0].main}`;
      weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
      weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
      `;
      weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
      <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
      weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weather_humidity.innerHTML = `${data.main.humidity}%`;
      weather_wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}`;
      weather_pressure.innerHTML = `${data.main.pressure} hPa`
   })
}

document.addEventListener('load', getWeather())