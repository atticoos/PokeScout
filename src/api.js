import fetch from 'node-fetch';
import Promise from 'bluebird';
fetch.Promise = Promise;

const BASE_URL = 'https://pokevision.com'
const toJson = response => response.json();

/**
 * Fetch a collection of all pokemon nearby a given coordinate.
 *
 * @param  {Float} latitude  The coordinate's latitude.
 * @param  {Float} longitude The coordinate's longitude.
 * @return {Object}          The promise of the request.
 */
export function getAllPokemonByLatLng(latitude, longitude) {
  // mock for now to avoid abusive requests
  // return Promise.resolve(require('../test/mocks/response.json'))
  return fetch(`${BASE_URL}/map/data/${latitude}/${longitude}`)
    .then(toJson)
    .then(response => response.pokemon)
    .then(pokemon => pokemon.map(item => ({
      ...item,
      pokemonId: parseInt(item.pokemonId)
    })));
}

/**
 * Fetch a collection of specific pokemon nearby a given coordinate.
 *
 * @param  {Float} latitude  The coordinate's latitude.
 * @param  {Float} longitude The coordinate's longitude.
 * @return {Object}          The promise of the request.
 */
export function getPokemonByLatLng(pokemonIds, latitude, longitude) {
  var idMap = pokemonIds.reduce((map, id) => ({...map, [id]: true}), {});
  return getAllPokemonByLatLng(latitude, longitude)
    .then(discoveredPokemon => discoveredPokemon.filter(({pokemonId}) => idMap[pokemonId]));
}
