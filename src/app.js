import * as Scanner from './scanner';
import * as Utils from './utils';

const OfficeCoordinates = {
  latitude: '42.353948',
  longitude: '-71.058545'
};

Scanner.getPokemonByLatLng([16, 19], OfficeCoordinates.latitude, OfficeCoordinates.longitude)
  .then(Utils.summarizeScan)
  .then(console.log)
  .catch(console.warn)
