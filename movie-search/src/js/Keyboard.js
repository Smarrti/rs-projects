import { keyboardRows, dictionary } from './KeyboardDictionary';

let isCapsLock = false;

const searchInput = document.querySelector('.search__input');
const wrapper = document.querySelector('.keyboard__wrapper');

function getLanguage() {
  return localStorage.getItem('language');
}

function deleteKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  if (keyboard) {
    wrapper.removeChild(keyboard);
  }
}

const generateKeyboard = (toUpper, language) => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  keyboardRows.forEach((row) => {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    row.forEach((button) => {
      const keyboardButton = document.createElement('div');
      keyboardButton.classList.add('button', `k${dictionary[button].code}`);
      switch (dictionary[button].type) {
        case 'service':
          keyboardButton.classList.add('button_big', 'button_darken');
          break;
        case 'notService':
          keyboardButton.classList.add('button_darken');
          break;
        case 'space':
          keyboardButton.classList.add('button_space');
          break;
        default:
          break;
      }
      if (button === 'ShiftLeft' || button === 'ControlLeft' || button === 'AltLeft') {
        keyboardButton.classList.add('left');
      }
      switch (toUpper) {
        case 'Shift':
          keyboardButton.innerText = dictionary[button][`${language}OnShift`];
          break;
        case true:
          if (button.indexOf('Digit') !== -1) {
            keyboardButton.innerText = dictionary[button][language];
          } else {
            keyboardButton.innerText = dictionary[button][`${language}OnShift`];
          }
        break;
        case 'downAndShift':
          if (button.indexOf('Digit') !== -1) {
            keyboardButton.innerText = dictionary[button][`${language}OnShift`];
          } else {
            keyboardButton.innerText = dictionary[button][language];
          }
          break;
        case false:
        case undefined:
          keyboardButton.innerText = dictionary[button][`${language}`];
          break
        default:
          break;
      }
      keyboardRow.appendChild(keyboardButton);
    });
    keyboard.appendChild(keyboardRow);
  });
  wrapper.appendChild(keyboard);
};

const createKeyboard = (shift) => {
  deleteKeyboard();
  if (isCapsLock && !shift) {
    generateKeyboard(false, getLanguage() || 'rus');
  } else {
    generateKeyboard(shift || isCapsLock, getLanguage() || 'rus');
  }
};

const isValueShouldBeAddToText = (value) => value.length === 1 && value !== '◄' && value !== '►';

function handleSpecialButtons(key) {
  const selection = searchInput.selectionStart;
  switch (key) {
    case '': {
        searchInput.value += ' ';
      break;
    }
    case 'Backspace': {
        searchInput.value = searchInput.value.substring(0, searchInput.value.length - 1);
      break;
    }
    case 'Enter': {
        searchInput.value += '\n';
      break;
    }
    case 'Delete': {
      const { value } = searchInput;
      searchInput.value = value.slice(0, selection) + value.slice(selection + 1, value.length);
      searchInput.selectionStart = selection;
      searchInput.selectionEnd = selection;
      break;
    }
    case 'Tab': {
        searchInput.value += '    ';
      break;
    }
    case '◄': {
      searchInput.selectionStart = selection - 1;
      searchInput.selectionEnd = selection - 1;
      break;
    }
    case '►': {
      searchInput.selectionStart = selection + 1;
      searchInput.selectionEnd = selection + 1;
      break;
    }
    case 'Caps Lock': {
      document.querySelector('.k20').classList.add('button_active');
      if (isCapsLock) {
        isCapsLock = false;
        createKeyboard(isCapsLock);
      } else {
        isCapsLock = true;
        createKeyboard(isCapsLock);
      }
      break;
    }
    default: {
      break;
    }
  }
}

const isLanguageShouldBeChanged = () => {
  const pressedButtonsForChangeLanguage = document.querySelectorAll('.k16.button_active, .k18.button_active');
  return pressedButtonsForChangeLanguage.length >= 2;
};
const isCaseShouldBeLower = (key) => key.key === 'Shift' && !isCapsLock;
const isCaseShouldBeUpper = (key) => key.key === 'Shift' && isCapsLock;
const isKeyServiceRightButton = (key) => key.code === 'ShiftRight' || key.code === 'ControlRight' || key.code === 'AltRight';

function makeButtonActive(key) {
  const selectedButton = isKeyServiceRightButton(key)
    ? document.querySelector(`.k${key.which}:not(.left)`)
    : document.querySelector(`.k${key.which}`);
  if (selectedButton) {
    selectedButton.classList.add('button_active');
    selectedButton.click();
  }
}

function makeButtonInactive(key) {
  const selectedButton = document.querySelectorAll(`.k${key.which}`);
  selectedButton.forEach((element) => {
    element.classList.remove('button_active');
  });
}

function changeLanguage() {
  if (getLanguage() === 'rus') {
    localStorage.setItem('language', 'eng');
  } else {
    localStorage.setItem('language', 'rus');
  }
}

function onKeyUp(key) {
  key.preventDefault();
  if (isLanguageShouldBeChanged(key)) {
    changeLanguage();
    createKeyboard(false);
  } else if (isCaseShouldBeLower(key)) {
    createKeyboard(false);
  } else if (isCaseShouldBeUpper(key)) {
    createKeyboard(true);
  }
  makeButtonInactive(key);
}

function onKeyDown(key) {
  key.preventDefault();
  switch (key.which) {
    case dictionary.ShiftLeft.code:
    case dictionary.ShiftRight.code:
      if (!isCapsLock) {
        createKeyboard('Shift');
      } else {
        createKeyboard('downAndShift');
      }
      break;
    case dictionary.Backspace.code:
      document.querySelector('.k8').click();
      break;
    default:
      break;
  }
  makeButtonActive(key);
}

function onButtonClick(buttonEvent) {
  const targetButton = buttonEvent.target;
  const buttonText = targetButton.innerText;
  if (isValueShouldBeAddToText(buttonText)) {
    searchInput.value += buttonText;
  } else {
    handleSpecialButtons(buttonText, searchInput);
  }
  searchInput.focus();
}

function onMouseDown(buttonEvent) {
  buttonEvent.target.classList.add('button_active');
}

function onMouseUp(buttonEvent) {
  buttonEvent.target.classList.remove('button_active');
}

function delegationEvent(key, event) {
  const { target } = key;
  if (!target.classList.contains('button')) {
    return;
  }
  switch (event) {
    case 'mousedown':
      onMouseDown(key);
      break;
    case 'mouseup':
      onMouseUp(key);
      break;
    case 'click':
      onButtonClick(key);
      break;
    default:
      break;
  }
}

document.addEventListener('keyup', (e) => { onKeyUp(e); });
document.addEventListener('keydown', (e) => { onKeyDown(e); });
document.addEventListener('mousedown', (e) => { delegationEvent(e, 'mousedown'); });
document.addEventListener('mouseup', (e) => { delegationEvent(e, 'mouseup'); });
document.addEventListener('click', (e) => { delegationEvent(e, 'click'); });

createKeyboard();
