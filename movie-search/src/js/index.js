import '../css/style.scss';
import './swiper.min';
import { mySwiper as swiper } from './Swiper';
import './KeyboardDictionary';
import './Keyboard';
import { apiKey } from './ApiKey';

const textInput = document.querySelector('.search__input');
let lastSearchRequest;
let preloadPages = 1;

function showSpinner(show) {
  const spinnerWrapper = document.querySelector('.spinner');
  if (show) {
    spinnerWrapper.classList.add('spinner_active');
  } else {
    spinnerWrapper.classList.remove('spinner_active');
  }
}

function showMessage(headMessage, textMessage) {
  const body = document.querySelector('body');
  const messageWrapper = document.createElement('div');
  const messageIcon = document.createElement('div');
  const messageLetter = document.createElement('div');
  const messageClose = document.createElement('div');
  const messageHead = document.createElement('p');
  const messageText = document.createElement('p');

  messageWrapper.classList.add('message__wrapper');
  messageIcon.classList.add('message__icon');
  messageLetter.classList.add('message__letter');
  messageClose.classList.add('message__close');
  messageHead.classList.add('message__head');
  messageText.classList.add('message__text');

  messageHead.textContent = headMessage;
  messageText.textContent = textMessage;

  messageLetter.append(messageClose, messageHead, messageText);
  messageWrapper.append(messageIcon, messageLetter);
  body.append(messageWrapper);
}

function deleteMessage() {
  const body = document.querySelector('body');
  const messages = document.querySelectorAll('.message__wrapper');
  messages.forEach((message) => {
    body.removeChild(message);
  })
}

function createFilmCard(nameFilm, image, year, stars) {
  const slide = document.createElement('div');
  const card = document.createElement('div');
  const filmName = document.createElement('p');
  const filmImage = document.createElement('img');
  const filmYear = document.createElement('p');
  const filmRate = document.createElement('p');

  slide.classList.add('swiper-slide');
  card.classList.add('card__wrapper');
  filmName.classList.add('film__name');
  filmImage.classList.add('film__image');
  filmYear.classList.add('film__year');
  filmRate.classList.add('film__rate');

  filmImage.setAttribute('src', image);

  filmName.textContent = nameFilm;
  filmYear.textContent = year;
  filmRate.textContent = stars;

  card.append(filmName, filmImage, filmYear, filmRate);
  slide.append(card);
  swiper.appendSlide(slide.outerHTML);
}

async function sendRequest(url) {
  let data;
  await fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject(new Error(res.statusText))
      }
      return Promise.resolve(res);
    })
    .then((res) => res.json())
    .then(res => {data = res})
    .catch((e) => {
      console.log(e);
    });
  return data;
}

function getData(search, page) {
  if (page) {
    return sendRequest(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}&page=${page}`);
  } 
  return sendRequest(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`);
}

async function getStars(idFilm) {
  const response = await sendRequest(`https://www.omdbapi.com/?i=${idFilm}&apikey=${apiKey}`)
  return response;
}

function deleteFilmsOfSlider() {
  swiper.removeAllSlides();
}

async function searchFilm(nameFilm, page) {
  showSpinner(true);
  lastSearchRequest = nameFilm;
  if (!page) {
    deleteFilmsOfSlider();
  }
  let filmList = await getData(nameFilm, page);
  filmList = filmList.Search;
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < filmList.length; i += 1) {
    const film = filmList[i];
    let star = await getStars(film.imdbID);
    star = star.imdbRating;
    createFilmCard(film.Title, film.Poster, film.Year, star);
  }
  if (!page) {
    swiper.slideTo(0);
  }
  showSpinner(false);
}

document.querySelector('body').addEventListener('click', (event) => {
  event.preventDefault();
  const { target } = event;
  const hasClassList = target.classList;
  if (hasClassList.contains('search__keyboard') || hasClassList.contains('keyboard__close')) {
    const keyboardWrapper = document.querySelector('.keyboard__wrapper');
    keyboardWrapper.classList.toggle('keyboard__wrapper_active');
  } else if (hasClassList.contains('search__submit')) {
    preloadPages = 1;
    searchFilm(textInput.value);
  } else if (hasClassList.contains('message__close')) {
    deleteMessage();
  }
})

swiper.on('slideChange', () => {
  const slideButtons = document.querySelectorAll('.swiper-pagination-bullet');
  const lastButtonClass = slideButtons[slideButtons.length - 2].classList;
  const activeSpinner = document.querySelector('.spinner_active');
  if (lastButtonClass.contains('swiper-pagination-bullet-active') && !activeSpinner) {
    preloadPages += 1;
    searchFilm(lastSearchRequest, preloadPages);
  }
})

// http://www.omdbapi.com/?s=harry&plot=full&apikey=90596ce5

searchFilm('Harry');