import fetch from 'node-fetch';
import Promise from 'bluebird';

fetch.promise = Promise;

const BASE_URL = 'https://pokevision.com'

const toJson = response => response.json();

export function getAllPokemonByLatLng(latitude, longitude) {
  // mock for now to avoid abusive requests
  return Promise.resolve(require('../test/mocks/response.json'))
  // return fetch(`${BASE_URL}/map/data/${latitude}/${longitude}`)
    // .then(toJson)
    .then(response => response.pokemon);
}

export function getPokemonByLatLng(pokemonIds, latitude, longitude) {
  var idMap = pokemonIds.reduce((map, id) => ({...map, [id]: true}), {});
  return getAllPokemonByLatLng(latitude, longitude)
    .then(discoveredPokemon => discoveredPokemon.filter(({pokemonId}) => idMap[pokemonId]));
}
