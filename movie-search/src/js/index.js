import '../css/style.scss';
import './swiper.min';
import { mySwiper as swiper } from './Swiper';
import './KeyboardDictionary';
import './Keyboard';
import { apiKey } from './ApiKey';

const textInput = document.querySelector('.search__input');

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
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function getData(textInput, page) {
  if (page) {
    return sendRequest(`http://www.omdbapi.com/?s=${textInput}&apikey=${apiKey}&page=${page}`);
  } else {
    return sendRequest(`http://www.omdbapi.com/?s=${textInput}&apikey=${apiKey}`);
  }
}

async function getStars(idFilm) {
  return await sendRequest(`https://www.omdbapi.com/?i=${idFilm}&apikey=${apiKey}`);
}

function deleteFilmsOfSlider() {
  swiper.removeAllSlides();
}
async function searchFilm(nameFilm) {
  deleteFilmsOfSlider();
  let filmList = await getData(nameFilm);
  filmList = filmList.Search;
  for (const film of filmList) {
    let star = await getStars(film.imdbID);
    star = star.imdbRating;
    createFilmCard(film.Title, film.Poster, film.Year, star);
  }
  swiper.slideTo(0);
}

document.querySelector('body').addEventListener('click', (event) => {
  event.preventDefault();
  const { target } = event;
  const hasClassList = target.classList;
  if (hasClassList.contains('search__keyboard') || hasClassList.contains('keyboard__close')) {
    const keyboardWrapper = document.querySelector('.keyboard__wrapper');
    keyboardWrapper.classList.toggle('keyboard__wrapper_active');
  } else if (hasClassList.contains('search__submit')) {
    searchFilm(textInput.value);
  }
})

//http://www.omdbapi.com/?s=harry&plot=full&apikey=90596ce5

searchFilm('Harry');
// deleteFilmsOfSlider();