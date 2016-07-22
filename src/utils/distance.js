// The radius of our wonderful home.
const R = 6371;

// Converts a degree to a radian
const d2r = d => d * (Math.PI / 180);

/**
 * Distance types.
 */
export const DistanceTypes = {
  NEARBY: 'NEARBY',
  FAR: 'FAR'
};

/**
 * Evaluates a distance for a distance type.
 */
export const DistanceUnitConverter = {
  [DistanceTypes.NEARBY]: (km) => km <= 0.3,
  [DistanceTypes.FAR]: (km) => km > 0.3
};

/**
 * Calculates the distance between two coordinates.
 *
 * @param  {Float} latA The first coordinate's latitude.
 * @param  {Float} lngA The first coordinate's longitude.
 * @param  {Float} latB The second coordinate's latitude.
 * @param  {Float} lngB The second coordinate's longitude.
 * @return {Float}      The distance between the two coordinates.
 */
export function distanceBetweenPoints (latA, lngA, latB, lngB) {
  const d2r = d => d * (Math.PI / 180);

  var dLat = d2r(latB - latA);
  var dLng = d2r(lngB - lngA);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(d2r(latA)) * Math.cos(d2r(latB)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
