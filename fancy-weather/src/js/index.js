import './../css/style.scss';
import { UnsplashKey, IpInfoKey, WeatherApiKey } from './ApiKeys';
import { IpInfoUrl } from './IpInfoRoute';
import * as Unsplash from './UnsplashRoute';
import * as WeatherApi from './WeatherApiRoute';

const body = document.querySelector('body');
const temperatureType = 'celsius';

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
      //Oops...
    })
  return data;
}

function combineParametersForRequest(...parameters) {
  return parameters.reduce((acc, parameter) => {
    return acc += `${parameter}&`;
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

function getWeekDayOnString(dayNumber) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
    filteredType = filtered[0];
  } else {
    filteredType = weatherIcons[0];
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

  updateWeatherIcon(currentWeather.current.condition.text);
  locationTitleOnPage.textContent = `${city}, ${country}`;
  if (temperatureType === 'celsius') {
    temperatureOnPage.textContent = `${Math.round(currentWeather.current.temp_c)}°`;
  } else {
    temperatureOnPage.textContent = `${Math.round(currentWeather.current.temp_f)}°`;
  }
}

async function generateWeatherData(query) {
  let locationOfUser = await getLocationOfUser();
  let city;
  if (query) {
    city = query;
  } else {
    city = locationOfUser.city;
  }

  const currentWeather = await getCurrentWeather(city);
  let country = currentWeather.location.country;

  updateCurrentWeather(currentWeather, city, country);
}

findBackgroundImage('sunny');
setInterval(updateDate, 1000);
generateWeatherData();