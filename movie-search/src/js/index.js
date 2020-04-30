import '../css/style.scss';
import './swiper.min';
import './Swiper';
import './KeyboardDictionary';
import './Keyboard';
import { apiKey } from './ApiKey';

const textInput = document.querySelector('.search__input');

function getData(textInput) {
  fetch(`http://www.omdbapi.com/?s=${textInput}&apikey=${apiKey}`)
  .then(response => response.json())
  .then(response => {
    console.log(response)
  });
}

document.querySelector('body').addEventListener('click', (event) => {
  event.preventDefault();
  const { target } = event;
  const hasClassList = target.classList;
  if (hasClassList.contains('search__keyboard') || hasClassList.contains('keyboard__close')) {
    const keyboardWrapper = document.querySelector('.keyboard__wrapper');
    keyboardWrapper.classList.toggle('keyboard__wrapper_active');
  } else if (hasClassList.contains('search__submit')) {
    getData(textInput.value);
  }
})

//http://www.omdbapi.com/?s=harry&plot=full&apikey=90596ce5