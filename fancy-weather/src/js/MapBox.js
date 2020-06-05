import { MapBoxKey } from './ApiKeys';
/* eslint-disable */

mapboxgl.accessToken = MapBoxKey;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/smarrti/ckb2c5kxc05761ioczmhi1rzg',
  center: [1, 1],
  zoom: 11
});

export function changeCoordinatesOnMap(x, y) {
  map.jumpTo({
    center: [y, x],
    essential: true
  });
  const marker = new mapboxgl.Marker()
    .setLngLat([y, x])
    .addTo(map);
}