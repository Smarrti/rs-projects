import { MapBoxKey } from './ApiKeys';
console.log('1');
mapboxgl.accessToken = MapBoxKey;
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [12.550343, 55.665957],
  zoom: 8
});

var marker = new mapboxgl.Marker()
  .setLngLat([12.550343, 55.665957])
  .addTo(map);
