import pokemon from './pokemon.json';

export function summarizeScan (results) {
  return results.reduce((summary, {pokemonId}) => ({
    ...summary,
    [pokemonId]: {
      count: summary[pokemonId] ? summary[pokemonId].count + 1 : 1,
      distance: 'UNKNOWN' // @TODO - determine distance between the two points
    }
  }), {});
}
