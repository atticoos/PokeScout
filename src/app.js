import {buildServer} from './server';
import {createScanner} from './scanner';

// The coordinates to discover Pokemon from.
const Coordinates = {
  latitude: parseFloat(process.env.POKESCOUT_LAT),
  longitude: parseFloat(process.env.POKESCOUT_LNG)
};

// The Pokemon IDs to scan for over time.
const ScanIds = [16, 19];

const server = buildServer(Coordinates);
const scanner = createScanner(ScanIds, Coordinates);

var instance = server.listen(process.env.POKESCAN_PORT || 4888, () => {
  console.log('server listening');
});

scanner.start();
