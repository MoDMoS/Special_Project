
function haversine(location1, location2, options = {}) {
  const earthRadius = options.unit === 'meter' ? 6371000 : 6371; // Radius of the earth in meters or kilometers
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.lat;
  const lon2 = location2.lon;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

export function isLocationInsideCircle(location, circleRadius) {
  const circleCenter = {lat: 13.82143854586279, lon: 100.51521981224853};
  // const circleCenter = {lat: 13.853913193936197, lon: 100.38877181554058};
  const distance = haversine(location, circleCenter, {unit: 'meter'});

  if (distance <= circleRadius) {
    return true;
  } else {
    return false;
  }
}
