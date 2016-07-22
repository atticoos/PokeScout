import Pokemon from './pokemon';

function summarizeNearbyMessage (summary) {
  var message = [':oak: Hey, there\'s some Pokemon nearby!'];
  var summarized = Object.keys(summary).map(pokemonId => {
    var pokemon = Pokemon[pokemonId];
    return `- ${summary[pokemonId].count} ${pokemon}`;
  });
  return message.concat(summarized).join('\n');
}

export function sendNearbyAlert (summary) {
  var message = summarizeNearbyMessage(summary);
}
