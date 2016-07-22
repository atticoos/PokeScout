import Pokemon from '../pokemon.json';
import {DistanceUnitConverter, distanceBetweenPoints} from './distance';

/**
 * Gets the name of a Pokemon for a given Pokemon model.
 *
 * @param  {Object} pokemon The pokemon model.
 * @return {String}         The name of the Pokemon based on the ID of the Pokemon.
 */
export function pokemonToName ({pokemonId}) {
  return Pokemon[pokemonId];
}

/**
 * Reduces a collection of pokemon to a distinct subset. Duplicates are removed based on their closest proximity.
 *
 * @param  {Array} pokemonCollection The collection of pokemon.
 * @return {Array}                   The unique collection of nearest pokemon.
 */
export function closestUniquePokemon (pokemonCollection) {
  var asMap = pokemonCollection.reduce((map, pokemon) => {
    if (map[pokemon.pokemonId] && map[pokemon.pokemonId].distance < pokemon.distance) {
      return map;
    }
    map[pokemon.pokemonId] = pokemon;
    return map;
  }, {});
  return Object.keys(asMap).map(pokemonId => asMap[pokemonId]);
}

/**
 * Attaches a distance property to a Pokemon model.
 *
 * @param  {Array} results   The colllection of Pokemon to transform.
 * @param  {Float} latitude  The origin coordinate's latitude.
 * @param  {Float} longitude The origin coordinate's longitude.
 * @return {Array}           The transformed collection of Pokemon.
 */
export function withDistance (results, latitude, longitude) {
  return results.map(pokemon => ({
    ...pokemon,
    distance: distanceBetweenPoints(
      pokemon.latitude,
      pokemon.longitude,
      latitude,
      longitude
    )
  }));
}

/**
 * Attaches a name property to a Pokemon model.
 *
 * @param  {Array} results The collection of Pokemon to transform.
 * @return {Array}         The transformed collection of Pokemon.
 */
export function withName (results) {
  return results.map(pokemon => ({
    ...pokemon,
    name: pokemonToName(pokemon.pokemonId)
  }));
}

/**
 * Transforms a collection of Pokemon into an object grouping subsets of the collection based on proximity.
 *
 * @param  {Array} results   The collection of Pokemon.
 * @param  {Float} latitude  The origin coordinate's latitude.
 * @param  {Float} longitude The origin coordinate's longitude.
 * @return {Object}          The group of Pokemon collections.
 */
export function toDistanceGroups (results, latitude, longitude) {
  const initial = Object.keys(DistanceUnitConverter).reduce((groups, key) => ({
    ...groups,
    [key]: []
  }), {});
  return Object.keys(DistanceUnitConverter).reduce((groups, key) => {
    const unitConverter = DistanceUnitConverter[key];

    return {
      ...groups,
      [key]: results.filter(pokemon => unitConverter(pokemon.distance))
    }
  }, initial);
}

// @TODO - nah. :fire:
export function summarizeScan (results, latitude, longitude) {
  return results.reduce((summary, pokemon) => ({
    ...summary,
    [pokemon.pokemonId]: {
      count: summary[pokemon.pokemonId] ? summary[pokemon.pokemonId].count + 1 : 1,
      distance: distanceBetweenPoints(
        pokemon.latitude,
        pokemon.longitude,
        latitude,
        longitude
      )
    }
  }), {});
}
