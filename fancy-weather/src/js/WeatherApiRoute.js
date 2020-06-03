export const source = 'https://api.weatherapi.com/v1/';
export function methods(type) {
  let url;
  switch (type) {
    case 'current':
      url = 'current.json';
      break;
    case 'days':
      url = 'forecast.json';
      break;
    default:
      break;
  }
  return url;
}
export function parameters(type) {
  let parameter;
  switch (type) {
    case 'key':
      parameter = 'key';
      break;
    case 'query':
      parameter = 'q';
      break;
    case 'days':
      parameter = 'days';
      break;
    default:
      break;
  }
  return parameter;
}