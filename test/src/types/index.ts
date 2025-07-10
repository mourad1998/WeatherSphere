export interface Location {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface Weather {
  temp: number;
  description: string;
  wind: number;
  humidity: number;
  feels_like: number;
  visibility: number;
  icon: string;
}