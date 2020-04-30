import '../css/style.scss';
import './Swiper';
import './KeyboardDictionary';
import { createKeyboard } from "./Keyboard";

document.querySelector('body').addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('search__keyboard')) {
    createKeyboard();
  }
})