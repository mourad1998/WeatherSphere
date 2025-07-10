import type { Location, Weather } from '../types';

export async function fetchLocations(city: string, apiKey: string): Promise<Location[]> {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`
  );
  if (!res.ok) throw new Error('Failed to fetch locations');
  return await res.json();
}

export async function fetchWeatherData(loc: Location, apiKey: string): Promise<Weather> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${apiKey}`
  );
  if (!res.ok) throw new Error('Failed to fetch weather data');
  const data = await res.json();

  return {
    temp: data.main.temp,
    description: data.weather[0].description,
    wind: Math.round(data.wind.speed * 3.6), 
    humidity: data.main.humidity,
    feels_like: data.main.feels_like,
    visibility: +(data.visibility / 1000).toFixed(1), 
    icon: data.weather[0].icon
  };
}