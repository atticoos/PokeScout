import * as API from './api';
import * as PokemonUtils from './utils/pokemon';

const SCAN_INTERVAL = 10 * 60 * 1000;

const withDistance = (latitude, longitude) => pokemon => PokemonUtils.withDistance(
  pokemon,
  latitude,
  longitude
);

function scanNearby (pokemonIds, latitude, longitude) {
  console.log('scanning nearby pokemon')

  return API.getPokemonByLatLng(pokemonIds, latitude, longitude)
    .then(withDistance(latitude, longitude))
    .then(PokemonUtils.toDistanceGroups)
    .then(groups => {
      if (groups.NEARBY.length > 0) {
        console.log('Found nearby pokemon', groups.NEARBY);
        // @TODO - notify slack channel
      }
    })
    .catch(console.warn);
}

export function createScanner (pokemonIds, {latitude, longitude}) {
  var scanning = false;
  var timeout;

  function scan () {
    scanning = true;
    return scanNearby(pokemonIds, latitude, longitude).then(() => {
      if (scanning) {
        timeout = setTimeout(scan, SCAN_INTERVAL);
      }
    });
  }

  return {
    start: () => scan(),
    stop: () => {
      clearTimeout(timeout);
      scanning = false;
    }
  };
}
