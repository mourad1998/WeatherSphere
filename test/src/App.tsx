import React, { useState } from "react";
import TokenInput from "./components/TokenInput";
import CitySearch from "./components/CitySearch";
import CityList from "./components/CityList";
import WeatherDisplay from "./components/WeatherDisplay";
import Loader from "./components/Loader";
import type { Location, Weather } from "./types";
import { fetchLocations, fetchWeatherData } from "./apis/openWeather";
import "./App.css";

const App: React.FC = () => {
  const [token, setToken] = useState("");
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCity = async () => {
    if (!token || !city) {
      setError(
        token ? "Please enter a city name" : "Please enter your API key"
      );
      return;
    }

    setLoading(true);
    setError("");
    setLocations([]);
    setSelectedLocation(null);
    setWeather(null);

    try {
      const data = await fetchLocations(city, token);
      if (!data.length)
        setError("No locations found. Try a different city name.");
      else setLocations(data);
    } catch (err) {
      setError("Error fetching locations. Check your API key or try again.");
    }

    setLoading(false);
  };

  const getWeather = async (loc: Location) => {
    setSelectedLocation(loc);
    setLoading(true);
    setWeather(null);

    try {
      const weatherData = await fetchWeatherData(loc, token);
      setWeather(weatherData);
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="container max-w-4xl mx-auto">
        <div
          className="bg-gradient-to-br from-white/15 to-white/05 backdrop-blur-lg rounded-3xl shadow-xl shadow-indigo-100/10 border border-white/10 p-6 md:p-8 w-full"
        >
          {" "}
          <h1 className="text-3xl font-light text-gray-800 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              WeatherSphere
            </span>
            <span className="ml-2 text-indigo-400">🌤️</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TokenInput token={token} setToken={setToken} />
            <CitySearch city={city} setCity={setCity} searchCity={searchCity} />

            {error && (
              <div className="text-red-500 text-sm mt-1 h-5 col-span-1 md:col-span-2">
                {error}
              </div>
            )}

            {loading && <Loader />}

            {locations.length > 0 && !selectedLocation && (
              <CityList locations={locations} onSelect={getWeather} />
            )}

            {weather && selectedLocation && (
              <WeatherDisplay location={selectedLocation} weather={weather} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
