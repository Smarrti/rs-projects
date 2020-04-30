export const keyboardRows = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'OSLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];
export const dictionary = {
  Backquote: {
    rus: 'ё', rusOnShift: 'Ё', eng: '`', engOnShift: '~', code: 192,
  },
  Digit1: {
    rus: '1', rusOnShift: '!', eng: '1', engOnShift: '!', code: 49,
  },
  Digit2: {
    rus: '2', rusOnShift: '"', eng: '2', engOnShift: '@', code: 50,
  },
  Digit3: {
    rus: '3', rusOnShift: '№', eng: '3', engOnShift: '#', code: 51,
  },
  Digit4: {
    rus: '4', rusOnShift: ';', eng: '4', engOnShift: '$', code: 52,
  },
  Digit5: {
    rus: '5', rusOnShift: '%', eng: '5', engOnShift: '%', code: 53,
  },
  Digit6: {
    rus: '6', rusOnShift: ':', eng: '6', engOnShift: '^', code: 54,
  },
  Digit7: {
    rus: '7', rusOnShift: '?', eng: '7', engOnShift: '&', code: 55,
  },
  Digit8: {
    rus: '8', rusOnShift: '*', eng: '8', engOnShift: '*', code: 56,
  },
  Digit9: {
    rus: '9', rusOnShift: '(', eng: '9', engOnShift: '(', code: 57,
  },
  Digit0: {
    rus: '0', rusOnShift: ')', eng: '0', engOnShift: ')', code: 48,
  },
  Minus: {
    rus: '-', rusOnShift: '_', eng: '-', engOnShift: '_', code: 189,
  },
  Equal: {
    rus: '=', rusOnShift: '+', eng: '=', engOnShift: '+', code: 187,
  },
  Backspace: {
    rus: 'Backspace', rusOnShift: 'Backspace', eng: 'Backspace', engOnShift: 'Backspace', code: 8, type: 'service',
  },
  Tab: {
    rus: 'Tab', rusOnShift: 'Tab', eng: 'Tab', engOnShift: 'Tab', code: 9, type: 'service',
  },
  KeyQ: {
    rus: 'й', rusOnShift: 'Й', eng: 'q', engOnShift: 'Q', code: 81,
  },
  KeyW: {
    rus: 'ц', rusOnShift: 'Ц', eng: 'w', engOnShift: 'W', code: 87,
  },
  KeyE: {
    rus: 'у', rusOnShift: 'У', eng: 'e', engOnShift: 'E', code: 69,
  },
  KeyR: {
    rus: 'к', rusOnShift: 'К', eng: 'r', engOnShift: 'R', code: 82,
  },
  KeyT: {
    rus: 'е', rusOnShift: 'Е', eng: 't', engOnShift: 'T', code: 84,
  },
  KeyY: {
    rus: 'н', rusOnShift: 'Н', eng: 'y', engOnShift: 'Y', code: 89,
  },
  KeyU: {
    rus: 'г', rusOnShift: 'Г', eng: 'u', engOnShift: 'U', code: 85,
  },
  KeyI: {
    rus: 'ш', rusOnShift: 'Ш', eng: 'i', engOnShift: 'I', code: 73,
  },
  KeyO: {
    rus: 'щ', rusOnShift: 'Щ', eng: 'o', engOnShift: 'O', code: 79,
  },
  KeyP: {
    rus: 'з', rusOnShift: 'З', eng: 'p', engOnShift: 'P', code: 80,
  },
  BracketLeft: {
    rus: 'х', rusOnShift: 'Х', eng: '[', engOnShift: '{', code: 219,
  },
  BracketRight: {
    rus: 'ъ', rusOnShift: 'Ъ', eng: ']', engOnShift: '}', code: 221,
  },
  Backslash: {
    rus: '\\', rusOnShift: '/', eng: '\\', engOnShift: '|', code: 220,
  },
  Delete: {
    rus: 'Delete', rusOnShift: 'Delete', eng: 'Delete', engOnShift: 'Delete', code: 46, type: 'service',
  },
  CapsLock: {
    rus: 'Caps Lock', rusOnShift: 'Caps Lock', eng: 'Caps Lock', engOnShift: 'Caps Lock', code: 20, type: 'service',
  },
  KeyA: {
    rus: 'ф', rusOnShift: 'Ф', eng: 'a', engOnShift: 'A', code: 65,
  },
  KeyS: {
    rus: 'ы', rusOnShift: 'Ы', eng: 's', engOnShift: 'S', code: 83,
  },
  KeyD: {
    rus: 'в', rusOnShift: 'В', eng: 'd', engOnShift: 'D', code: 68,
  },
  KeyF: {
    rus: 'а', rusOnShift: 'А', eng: 'f', engOnShift: 'F', code: 70,
  },
  KeyG: {
    rus: 'п', rusOnShift: 'П', eng: 'g', engOnShift: 'G', code: 71,
  },
  KeyH: {
    rus: 'р', rusOnShift: 'Р', eng: 'h', engOnShift: 'H', code: 72,
  },
  KeyJ: {
    rus: 'о', rusOnShift: 'О', eng: 'j', engOnShift: 'J', code: 74,
  },
  KeyK: {
    rus: 'л', rusOnShift: 'Л', eng: 'k', engOnShift: 'K', code: 75,
  },
  KeyL: {
    rus: 'д', rusOnShift: 'Д', eng: 'l', engOnShift: 'L', code: 76,
  },
  Semicolon: {
    rus: 'ж', rusOnShift: 'Ж', eng: ';', engOnShift: ':', code: 186,
  },
  Quote: {
    rus: 'э', rusOnShift: 'Э', eng: '\'', engOnShift: '"', code: 222,
  },
  Enter: {
    rus: 'Enter', rusOnShift: 'Enter', eng: 'Enter', engOnShift: 'Enter', code: 13, type: 'service',
  },
  ShiftLeft: {
    rus: 'Shift', rusOnShift: 'Shift', eng: 'Shift', engOnShift: 'Shift', code: 16, type: 'service',
  },
  KeyZ: {
    rus: 'я', rusOnShift: 'Я', eng: 'z', engOnShift: 'Z', code: 90,
  },
  KeyX: {
    rus: 'ч', rusOnShift: 'Ч', eng: 'x', engOnShift: 'X', code: 88,
  },
  KeyC: {
    rus: 'с', rusOnShift: 'С', eng: 'c', engOnShift: 'C', code: 67,
  },
  KeyV: {
    rus: 'м', rusOnShift: 'М', eng: 'v', engOnShift: 'V', code: 86,
  },
  KeyB: {
    rus: 'и', rusOnShift: 'И', eng: 'b', engOnShift: 'B', code: 66,
  },
  KeyN: {
    rus: 'ь', rusOnShift: 'Ь', eng: 'n', engOnShift: 'N', code: 78,
  },
  KeyM: {
    rus: 'т', rusOnShift: 'Т', eng: 'm', engOnShift: 'M', code: 77,
  },
  Comma: {
    rus: 'б', rusOnShift: 'Б', eng: ',', engOnShift: '<', code: 188,
  },
  Period: {
    rus: 'ю', rusOnShift: 'Ю', eng: '.', engOnShift: '>', code: 190,
  },
  Slash: {
    rus: '.', rusOnShift: ',', eng: '/', engOnShift: '?', code: 191,
  },
  ArrowUp: {
    rus: '▲', rusOnShift: '▲', eng: '▲', engOnShift: '▲', code: 38, type: 'notService',
  },
  ShiftRight: {
    rus: 'Shift', rusOnShift: 'Shift', eng: 'Shift', engOnShift: 'Shift', code: 16, type: 'service',
  },
  ControlLeft: {
    rus: 'Ctrl', rusOnShift: 'Ctrl', eng: 'Ctrl', engOnShift: 'Ctrl', code: 17, type: 'service',
  },
  OSLeft: {
    rus: 'Win', rusOnShift: 'Win', eng: 'Win', engOnShift: 'Win', code: 91, type: 'notService',
  },
  AltLeft: {
    rus: 'Alt', rusOnShift: 'Alt', eng: 'Alt', engOnShift: 'Alt', code: 18, type: 'notService',
  },
  Space: {
    rus: ' ', rusOnShift: ' ', eng: ' ', engOnShift: ' ', code: 32, type: 'space',
  },
  AltRight: {
    rus: 'Alt', rusOnShift: 'Alt', eng: 'Alt', engOnShift: 'Alt', code: 18, type: 'notService',
  },
  ArrowLeft: {
    rus: '◄', rusOnShift: '◄', eng: '◄', engOnShift: '◄', code: 37, type: 'notService',
  },
  ArrowDown: {
    rus: '▼', rusOnShift: '▼', eng: '▼', engOnShift: '▼', code: 40, type: 'notService',
  },
  ArrowRight: {
    rus: '►', rusOnShift: '►', eng: '►', engOnShift: '►', code: 39, type: 'notService',
  },
  ControlRight: {
    rus: 'Ctrl', rusOnShift: 'Ctrl', eng: 'Ctrl', engOnShift: 'Ctrl', code: 17, type: 'notService',
  },
};