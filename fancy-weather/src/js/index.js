import './../css/style.scss';
import { UnsplashKey } from './ApiKeys';
import * as Unsplash from './UnsplashRoute';

const body = document.querySelector('body');

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

async function findBackgroundImage(query) {
  const sourceApi = Unsplash.source;
  const method = Unsplash.methods('findPhotos');
  const find = `${Unsplash.parameters('searchPhoto')}=${query}`;
  const orientation = `${Unsplash.parameters('orientation')}=landscape`;
  const apiKey = `${Unsplash.parameters('apiKey')}=${UnsplashKey}`;
  const parameters = combineParametersForRequest(find, orientation, apiKey);
  const url = sourceApi + method + parameters;
  const response = await sendRequest(url);
  body.style = `background-image: url("${response.results[0].urls.regular}")`;
}

findBackgroundImage('sunny');