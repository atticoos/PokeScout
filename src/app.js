import * as Scanner from './scanner';

const OfficeCoordinates = {
  latitude: '42.353948',
  longitude: '-71.058545'
};

Scanner.getAllPokemonByLatLng(OfficeCoordinates.latitude, OfficeCoordinates.longitude)
  .then(console.log)
  .catch(console.warn)
