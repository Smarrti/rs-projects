export const source = 'https://api.unsplash.com/';
export function methods(type) {
  let url;
  switch (type) {
    case 'findPhotos':
      url = 'photos/random'
      break;
  
    default:
      break;
  }
  return url
}
export function parameters(type) {
  let parameter;
  switch (type) {
    case 'searchPhoto':
      parameter = 'query';
      break;
    case 'orientation':
      parameter = 'orientation';
      break;
    case 'perPage':
      parameter = 'per_page';
      break;
    case 'apiKey':
      parameter = 'client_id';
      break;
    default:
      break;
  }
  return parameter;
}