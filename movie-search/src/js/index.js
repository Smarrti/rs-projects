import '../css/style.scss';
import './swiper.min';
import './Swiper';
import './KeyboardDictionary';
import { createKeyboard } from "./Keyboard";

document.querySelector('body').addEventListener('click', (event) => {
  event.preventDefault();
  const { target } = event;
  const hasClassList = target.classList;
  if (hasClassList.contains('search__keyboard') || hasClassList.contains('keyboard__close')) {
    const keyboardWrapper = document.querySelector('.keyboard__wrapper');
    keyboardWrapper.classList.toggle('keyboard__wrapper_active');
  }
})