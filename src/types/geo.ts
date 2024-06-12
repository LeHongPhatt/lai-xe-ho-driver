export interface IDirectionData {
  geocoded_waypoints: GeocodedWaypoint[];
  routes: Route[];
}

export interface GeocodedWaypoint {
  geocoder_status: string;
  place_id: string;
}

export interface Route {
  bounds: Bounds;
  legs: Leg[];
  overview_polyline: Polyline;
  summary: string;
  warnings: any[];
  waypoint_order: any[];
}

export interface Bounds {}

export interface Leg {
  distance: Distance;
  duration: Distance;
  end_address: string;
  end_location: Location;
  start_address: string;
  start_location: Location;
  steps: Step[];
}

export interface Distance {
  text: string;
  value: number;
}

interface Location {
  lat: number;
  lng: number;
}

interface Step {
  distance: Distance;
  duration: Distance;
  end_location: Location;
  html_instructions: string;
  maneuver: string;
  polyline: Polyline;
  start_location: Location;
  travel_mode: TravelMode;
}

interface Polyline {
  points: string;
}

enum TravelMode {
  Driving = 'DRIVING',
}
