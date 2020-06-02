export const source = 'https://api.unsplash.com/';
export const numberPhotosToSearch = 20;
export function methods(type) {
  let url;
  switch (type) {
    case 'findPhotos':
      url = 'search/photos/'
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
    default:
      break;
  }
  return parameter;
}