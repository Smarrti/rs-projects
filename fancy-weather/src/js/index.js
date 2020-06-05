import "../css/style.scss";
import { UnsplashKey, IpInfoKey, WeatherApiKey } from './ApiKeys';
import { IpInfoUrl } from './IpInfoRoute';
import * as Unsplash from './UnsplashRoute';
import * as WeatherApi from './WeatherApiRoute';
import './MapBox';
import { changeCoordinatesOnMap } from './MapBox';

const body = document.querySelector('body');
let temperatureType = 'celsius';
const numberDaysToGetAdditionalWeather = 3;

async function sendRequest(url) {
  let data;
  await fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject(new Error(res.statusText));
      }
      return Promise.resolve(res);
    })
    .then((res) => res.json())
    .then(json => {data = json})
    .catch(() => {
      // Oops...
    })
  return data;
}

function combineParametersForRequest(...parameters) {
  return parameters.reduce((acc, parameter) => {
    return `${acc}${parameter}&`;
  }, '?')
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function findBackgroundImage(query) {
  // const sourceApi = Unsplash.source;
  // const method = Unsplash.methods('findPhotos');
  // const find = `${Unsplash.parameters('searchPhoto')}=${query}`;
  // const orientation = `${Unsplash.parameters('orientation')}=landscape`;
  // const apiKey = `${Unsplash.parameters('apiKey')}=${UnsplashKey}`;
  // const numberPhotos = `${Unsplash.parameters('perPage')}=${Unsplash.numberPhotosToSearch}`;
  // const parameters = combineParametersForRequest(find, orientation, apiKey, numberPhotos);
  // const url = sourceApi + method + parameters;
  // const response = await sendRequest(url);
  // const randomPhoto = generateRandomNumber(0, Unsplash.numberPhotosToSearch);
  // body.style = `background-image: linear-gradient(rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)),
  //   url("${response.results[randomPhoto].urls.regular}")`;
  body.style = `background-image: linear-gradient(rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url("https://images.unsplash.com/photo-1465577512280-1c2d41a79862?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzOTAwNH0")`;
}

async function getLocationOfUser() {
  const token = `token=${IpInfoKey}`;
  const url = `${IpInfoUrl}${combineParametersForRequest(token)}`;
  const response = await sendRequest(url);
  return response;
}

async function getCurrentWeather(query) {
  const sourceApi = WeatherApi.source;
  const method = WeatherApi.methods('current');
  const apiKey = `${WeatherApi.parameters('key')}=${WeatherApiKey}`;
  const request = `${WeatherApi.parameters('query')}=${query}`;
  const parameters = combineParametersForRequest(apiKey, request);
  const url = sourceApi + method + parameters;
  const response = await sendRequest(url);
  return response;
}

async function getDaysWeather(query) {
  const sourceApi = WeatherApi.source;
  const method = WeatherApi.methods('days');
  const apiKey = `${WeatherApi.parameters('key')}=${WeatherApiKey}`;
  const request = `${WeatherApi.parameters('query')}=${query}`;
  const days = `${WeatherApi.parameters('days')}=${numberDaysToGetAdditionalWeather}`;
  const parameters = combineParametersForRequest(apiKey, request, days);
  const url = sourceApi + method + parameters;
  const response = await sendRequest(url);
  return response;
}

function getWeekDayOnString(dayNumber, isFull) {
  let days;
  if (isFull) {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  } else {
    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  return days[dayNumber];
}

function getMonthOnString(monthNumber) {
  const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  return months[monthNumber];
}

function updateDate() {
  const date = new Date();
  const dayOfTheWeek = getWeekDayOnString(date.getDay());
  const day = date.getDate();
  const month = getMonthOnString(date.getMonth());
  const dateString = `${dayOfTheWeek} ${day} ${month}`;

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeString = `${hour}:${minutes}:${seconds}`;

  const dateOnPage = document.querySelector('.date');
  const timeOnPage = document.querySelector('.time');

  dateOnPage.textContent = dateString;
  timeOnPage.textContent = timeString;
}

function detectWeatherIconClass(type) {
  let className = 'weather__icon_';
  switch (type) {
    case 'Cloudy':
      className += 'cloud';
      break;
    case 'Rain':
      className += 'rain';
      break;
    case 'Snow':
      className += 'snow';
      break;
    case 'Sunny':
      className += 'sun';
      break;
    case 'Partly':
      className += 'sun-cloud';
      break;
    case 'Thunder':
      className += 'thunder';
      break;
    default:
      break;
  }
  return className;
}

function detectWeatherIcon(weatherType) {
  const weatherIcons = ['Cloudy', 'Rain', 'Snow', 'Sunny', 'Partly', 'Thunder'];
  const filtered = weatherIcons.filter(type => weatherType.includes(type) || weatherType.includes(type.toLocaleLowerCase()));
  let filteredType;
  if (filtered.length) {
    [ filteredType ] = filtered;
  } else {
    [ filteredType ] = weatherIcons;
  }
  return detectWeatherIconClass(filteredType);
}

function updateWeatherIcon(weatherType) {
  const weatherIcon = document.querySelector('.weather__icon');
  weatherIcon.className = 'weather__icon';
  weatherIcon.classList.add(detectWeatherIcon(weatherType));
}

function updateCurrentWeather(currentWeather, city, country) {
  const locationTitleOnPage = document.querySelector('.weather__location');
  const temperatureOnPage = document.querySelector('.temperature span');
  const feelsTemperature = document.querySelector('.temperature__feels');
  const windTemperature = document.querySelector('.temperature__wind');
  const humidityTemperature = document.querySelector('.temperature__humidity');

  updateWeatherIcon(currentWeather.current.condition.text);
  locationTitleOnPage.textContent = `${city}, ${country}`;
  windTemperature.textContent = `Wind: ${Math.round(currentWeather.current.wind_kph)} km/h`;
  humidityTemperature.textContent = `Humidity: ${Math.round(currentWeather.current.humidity)}%`;
  if (temperatureType === 'celsius') {
    temperatureOnPage.textContent = `${Math.round(currentWeather.current.temp_c)}°`;
    feelsTemperature.textContent = `Feels like ${Math.round(currentWeather.current.feelslike_c)}°`;
  } else {
    temperatureOnPage.textContent = `${Math.round(currentWeather.current.temp_f)}°`;
    feelsTemperature.textContent = `Feels like ${Math.round(currentWeather.current.feelslike_f)}°`;
  }
}

function createDayWeatherCard(weather) {
  const dayWeather = document.createElement('div');
  const dayName = document.createElement('div');
  const dayTemperature = document.createElement('div');
  const dayIcon = document.createElement('div');

  dayWeather.classList.add('day__wrapper');
  dayName.classList.add('day__name');
  dayTemperature.classList.add('day__temperature');
  dayIcon.classList.add('day__icon', detectWeatherIcon(weather.day.condition.text));

  const dayDate = new Date(weather.date);
  dayName.textContent = getWeekDayOnString(dayDate.getDay(), true);
  if (temperatureType === 'celsius') {
    dayTemperature.textContent = `${Math.floor(weather.day.avgtemp_c)}°`;
  } else {
    dayTemperature.textContent = `${Math.floor(weather.day.avgtemp_f)}°`;
  }

  dayWeather.append(dayName, dayTemperature, dayIcon);
  return dayWeather;
}

function updateDaysWeather(daysWeather) {
  const dayWrapper = document.querySelector('.weather__days');
  dayWrapper.innerHTML = '';
  for (let i = 0; i < numberDaysToGetAdditionalWeather; i += 1) {
    dayWrapper.append(createDayWeatherCard(daysWeather.forecast.forecastday[i]));
  }
}
async function generateWeatherData(query) {
  const locationOfUser = await getLocationOfUser();
  let city;
  if (query) {
    city = query;
  } else {
    city = locationOfUser.city;
  }

  const currentWeather = await getCurrentWeather(city);
  const daysWeather = await getDaysWeather(city);
  city = currentWeather.location.name;
  const {country} = currentWeather.location;
  const coordinateX = currentWeather.location.lat;
  const coordinateY = currentWeather.location.lon;

  changeCoordinatesOnMap(coordinateX, coordinateY);
  updateCurrentWeather(currentWeather, city, country);
  updateDaysWeather(daysWeather);
}

function changBacklightOnButtons(activeButtonClass) {
  const buttons = document.querySelectorAll('.button');
  const willActiveButton = document.querySelector(`.${activeButtonClass}`);
  buttons.forEach(button => {
    button.classList.remove('button_active');
  });
  willActiveButton.classList.add('button_active');
}

findBackgroundImage('sunny');
setInterval(updateDate, 1000);
generateWeatherData();

body.addEventListener('click', (e) => {
  const {target} = e;
  e.preventDefault();
  switch (true) {
    case target.classList.contains('type-temperature__button_f'):
      temperatureType = 'fahrenheit';
      generateWeatherData();
      changBacklightOnButtons('type-temperature__button_f');
      break;
    case target.classList.contains('type-temperature__button_c'):
      temperatureType = 'celsius';
      generateWeatherData();
      changBacklightOnButtons('type-temperature__button_c');
      break;
    case target.classList.contains('search__find'): {
      const query = document.querySelector('.search__input');
      generateWeatherData(query.value);
      break;
    }
    default:
      break;
  }
})