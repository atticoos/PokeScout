import * as Scanner from './scanner';
import * as Slack from './slack';
import * as Utils from './utils';

const OfficeCoordinates = {
  latitude: '42.353948',
  longitude: '-71.058545'
};

Scanner.getPokemonByLatLng([16, 19], OfficeCoordinates.latitude, OfficeCoordinates.longitude)
  .then(pokemon => {
    console.log('poke', pokemon);
    if (pokemon.length > 0) {
      return Slack.sendNearbyAlert(Utils.summarizeScan(pokemon));
    }
  })
  .catch(console.warn)
