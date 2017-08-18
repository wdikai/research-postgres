const EARTH_RADIUS = 6371000; //Radius of the earth in m

export interface LocationData {
  latitude: number;
  longitude: number;
}

export class Location implements LocationData {
  latitude: number;
  longitude: number;

  constructor(location: LocationData) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  static getSphereDistance(location1: Location, location2: Location, radius: number = EARTH_RADIUS) {
    if (!location) {
      return 0;
    }

    const dLat = toRadian(location1.latitude - location2.latitude); // deg2rad below
    const dLon = toRadian(location1.longitude - location2.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(location2.latitude)) * Math.cos(toRadian(location1.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Distance in m
  }
}

function toRadian(angle) {
  return angle * (Math.PI / 180);
}
