import * as API from './api';
import * as PokemonUtils from './utils/pokemon';

const SCAN_INTERVAL = 10 * 60 * 1000;

const withDistance = (latitude, longitude) => pokemon => PokemonUtils.withDistance(
  pokemon,
  latitude,
  longitude
);

/**
 * Scans for nearby specified Pokemon and alerts a Slack channel when discovered.
 *
 * @param  {Array} pokemonIds Collection of Pokemon to scan for.
 * @param  {Float} latitude   The latitude position to search.
 * @param  {Float} longitude  The longitude position to search.
 * @return {Object}           The promise.
 */
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

/**
 * Creates a scanner instance.
 *
 * @param  {Array}  pokemonIds Collection of Pokemon to scan for.
 * @param  {Object} coordinate The coordinate position to search.
 * @return {Object}            The scanner API.
 *                             - start(): void
 *                             - stop(): void
 */
export function createScanner (pokemonIds, {latitude, longitude}) {
  var scanning = false;
  var timeout;

  /**
   * Runs a scan, and upon completion, queue's up the next scan.
   *
   * @return {void}
   */
  function scan () {
    scanning = true;
    scanNearby(pokemonIds, latitude, longitude).then(() => {
      if (scanning) {
        timeout = setTimeout(scan, SCAN_INTERVAL);
      }
    });
  }

  return {
    /**
     * Starts the scanner.
     *
     * @return {void}
     */
    start: () => scan(),

    /**
     * Stops the scanner.
     *
     * @return {void}
     */
    stop: () => {
      clearTimeout(timeout);
      scanning = false;
    }
  };
}
