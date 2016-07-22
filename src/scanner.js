import fetch from 'node-fetch';

const BASE_URL = 'https://pokevision.com'

const toJson = response => response.json();

export function getAllPokemonByLatLng(latitude, longitude) {
  // mock for now to avoid abusive requests
  return Promise.resolve(require('../test/mocks/pokemon.json'));

  return fetch(`${BASE_URL}/map/data/${latitude}/${longitude}`)
    .then(toJson)
    .then(response => response.pokemon);
}

export function getPokemonByLatLng(pokemon, latitude, longitude) {
  return getAllPokemonByLatLng(latitude, longitude)
    .then(discoveredPokemon => discoveredPokemon.filter(({id}) => id === pokemon.id));
}
