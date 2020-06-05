import { MapBoxKey } from './ApiKeys';
mapboxgl.accessToken = MapBoxKey;

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/smarrti/ckb2c5kxc05761ioczmhi1rzg',
  center: [1, 1],
  zoom: 11
});

export function changeCoordinatesOnMap(x, y) {
  console.log(map);
  map.jumpTo({
    center: [y, x],
    essential: true
  });
}