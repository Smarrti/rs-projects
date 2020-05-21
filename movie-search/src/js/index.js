import '../css/style.scss';
import './swiper.min';
import { mySwiper as swiper } from './Swiper';
import './KeyboardDictionary';
import './Keyboard';
import { apiKeyOMDB, apiKeyTranslate } from './ApiKey';

const textInput = document.querySelector('.search__input');
const urlApiOMDB = 'https://www.omdbapi.com/';
const urlApiYandex = 'https://translate.yandex.net/api/v1.5/tr.json/';
const urlIMDB = 'https://www.imdb.com/';
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

function showMessage(headMessage, textMessage, type) {
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
  switch (type) {
    case 'notify':
      messageIcon.classList.add('message__icon_notify');
      break;
    case 'error':
      messageIcon.classList.add('message__icon_error');
      break;
    default:
      break;
  }

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

function showClearButton(show) {
  const clearButton = document.querySelector('.search__clear');
  if (show) {
    clearButton.classList.add('search__clear_active');
  } else {
    clearButton.classList.remove('search__clear_active');
  }
}

function createFilmCard(idFilm, nameFilm, image, year, stars) {
  const slide = document.createElement('div');
  const card = document.createElement('div');
  const filmName = document.createElement('a');
  const filmImage = document.createElement('img');
  const filmYear = document.createElement('p');
  const filmRate = document.createElement('p');

  slide.classList.add('swiper-slide');
  card.classList.add('card__wrapper');
  filmName.classList.add('film__name');
  filmImage.classList.add('film__image');
  filmYear.classList.add('film__year');
  filmRate.classList.add('film__rate');

  filmName.setAttribute('href', `${urlIMDB}title/${idFilm}/mediaindex?ref_=tt_pv_mi_sm`);
  filmName.setAttribute('target', '_blank');
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
    .then(json => {data = json})
    .catch(() => {
      showMessage('Oops', 'An error has occurred. Please retry request later', 'error');
    });
  return data;
}

async function detectLanguage(text) {
  const url = `${urlApiYandex}detect?key=${apiKeyTranslate}&text=${encodeURI(text)}`;
  const request = await sendRequest(url);
  return request.lang;
}

async function translateText(text, language) {
  const url = `${urlApiYandex}translate?key=${apiKeyTranslate}&text=${encodeURI(text)}&lang=${encodeURI(language)}-en`;
  const request = await sendRequest(url);
  return request.text[0];
}

function getData(search, page) {
  if (page) {
    return sendRequest(`${urlApiOMDB}?s=${search}&apikey=${apiKeyOMDB}&page=${page}`);
  } 
  return sendRequest(`${urlApiOMDB}?s=${search}&apikey=${apiKeyOMDB}`);
}

async function getStars(idFilm) {
  const response = await sendRequest(`${urlApiOMDB}?i=${idFilm}&apikey=${apiKeyOMDB}`);
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
    preloadPages = 1;
  }
  const languageRequest = await detectLanguage(lastSearchRequest);
  if (languageRequest !== 'en') {
    lastSearchRequest = await translateText(lastSearchRequest, languageRequest);
    showMessage('Search request changed', `Showing results for ${lastSearchRequest}`, 'notify');
  }
  let filmList = await getData(lastSearchRequest, page);
  if (filmList) {
    if (filmList.Error === 'Movie not found!') {
      showMessage('Not found!', `No results were found for "${lastSearchRequest}". Please change your request`, 'notify');
    } else {
      filmList = filmList.Search;
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < filmList.length; i += 1) {
        const film = filmList[i];
        let star = await getStars(film.imdbID);
        star = star.imdbRating;
        createFilmCard(film.imdbID, film.Title, film.Poster, film.Year, star);
      }
      if (!page) {
        swiper.slideTo(0);
      }
    }
  }
  showSpinner(false);
}

function showMessageForCrossCheck() {
  let countMessage = sessionStorage.getItem('crossCheckMessage');
  if (!countMessage) {
    countMessage = 0;
  }
  if (countMessage < 2) {
    showMessage('Cross Check', 'Во время проверки сайта на адаптиноcть (не респонсив), перезагружайте страницу', 'notify');
  }
  sessionStorage.setItem('crossCheckMessage', countMessage + 1);
}

function nightTheme() {
  const body = document.querySelector('body');
  const buttonSwitchTheme = document.querySelector('.switch__theme');
  const header = document.querySelector('.header');
  const inputSearch = document.querySelector('.search__input');
  const searchSubmit = document.querySelector('.search__submit');
  const searchKeyboard = document.querySelector('.search__keyboard');
  const searchClear = document.querySelector('.search__clear');
  const cardWrapper = document.querySelector('.cards');
  const footer = document.querySelector('.footer')

  body.classList.toggle('body_dark');
  header.classList.toggle('header_dark');
  inputSearch.classList.toggle('search__input_dark');
  searchSubmit.classList.toggle('search__submit_dark');
  searchKeyboard.classList.toggle('search__keyboard_dark');
  searchClear.classList.toggle('search__clear_dark');
  cardWrapper.classList.toggle('cards_dark');
  footer.classList.toggle('footer_dark');

  if (buttonSwitchTheme.classList.contains('switch_moon')) {
    buttonSwitchTheme.classList.remove('switch_moon');
    buttonSwitchTheme.classList.add('switch_sun');
  } else {
    buttonSwitchTheme.classList.add('switch_moon');
    buttonSwitchTheme.classList.remove('switch_sun');
  }
}

document.querySelector('body').addEventListener('click', (event) => {
  const { target } = event;
  const hasClassList = target.classList;
  if (hasClassList.contains('search__keyboard') || hasClassList.contains('keyboard__close')) {
    const keyboardWrapper = document.querySelector('.keyboard__wrapper');
    keyboardWrapper.classList.toggle('keyboard__wrapper_active');
  } else if (hasClassList.contains('search__submit')) {
    event.preventDefault();
    searchFilm(textInput.value);
  } else if (hasClassList.contains('k13')) {
    searchFilm(textInput.value);
  } else if (hasClassList.contains('message__close')) {
    deleteMessage();
  } else if (hasClassList.contains('search__clear')) {
    textInput.value = '';
    showClearButton(false);
  } else if (hasClassList.contains('switch__theme')) {
    nightTheme();
  }
})

document.querySelector('body').addEventListener('keyup', (key) => {
 if (textInput.value.length === 0 && key.code === 'Backspace') {
    showClearButton(false);
  } else if (textInput.value.length !== 0) {
    showClearButton(true);
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

searchFilm('Harry');
textInput.focus();
showMessageForCrossCheck();