import * as Scanner from './scanner';
import * as Slack from './slack';
import * as Utils from './utils';

const SCAN_INTERVAL = 2000;
const OfficeCoordinates = {
  latitude: '42.353948',
  longitude: '-71.058545'
};
var nearbyInterval;

function scanNearby () {
  console.log('scanning nearby');
  Scanner.getPokemonByLatLng([16, 19], OfficeCoordinates.latitude, OfficeCoordinates.longitude)
    .then(pokemon => {
      if (pokemon.length > 0) {
        return Slack.sendNearbyAlert(Utils.summarizeScan(pokemon));
      }
    })
    .catch(console.warn)
    .finally(() => {
      console.log('scan complete\n');
      nearbyInterval = setTimeout(scanNearby, SCAN_INTERVAL);
    });
}

scanNearby();
