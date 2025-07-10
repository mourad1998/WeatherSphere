import type { Location, Weather } from "../types";
import {
  faMapMarkerAlt,
  faWind,
  faTint,
  faThermometerHalf,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

const getWeatherColor = (iconCode: string) => {
  const id = parseInt(iconCode.substring(0, 2));

  if (id === 1) return "text-yellow-300"; // Clear
  if (id >= 2 && id <= 4) return "text-gray-300"; // Clouds
  if (id >= 9 && id <= 10) return "text-indigo-300"; // Rain
  if (id === 11) return "text-yellow-300"; // Thunderstorm
  if (id >= 13 && id <= 14) return "text-blue-300"; // Snow
  if (id >= 50) return "text-gray-400"; // Mist

  return "text-gray-300";
};

interface WeatherDisplayProps {
  location: Location;
  weather: Weather;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  location,
  weather,
}) => {
  console.log(weather, "weather");
  return (
    <div className="col-span-1 md:col-span-2 fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Temperature */}
        <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div
            className={`absolute -right-2 -top-5 opacity- text-7xl ${getWeatherColor(
              weather.icon
            )}`}
          >
            <img
              src={getWeatherIcon(weather.icon)}
              alt="Weather icon"
              className="w-32 h-32"
            />
            
          </div>
          <div className="flex items-center">
            <span className="temperature-display text-gray-800">
              {Math.round(weather.temp)}
            </span>
            <span className="text-3xl text-gray-600 ml-1">°C</span>
          </div>
          <div className="text-gray-500 mt-2 text-lg capitalize">
            {weather.description}
          </div>
          <div className="text-indigo-500 text-sm mt-1 flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
            <span>
              {location.name}
              {location.state && `, ${location.state}`}, {location.country}
            </span>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex items-center">
            <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faWind} className="text-indigo-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Wind Speed</div>
              <div className="font-medium text-gray-700">
                {weather.wind} km/h
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex items-center">
            <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faTint} className="text-indigo-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="font-medium text-gray-700">
                {weather.humidity}%
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex items-center">
            <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <FontAwesomeIcon
                icon={faThermometerHalf}
                className="text-indigo-500"
              />
            </div>
            <div>
              <div className="text-xs text-gray-500">Feels Like</div>
              <div className="font-medium text-gray-700">
                {Math.round(weather.feels_like)}°C
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex items-center">
            <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faEye} className="text-indigo-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Visibility</div>
              <div className="font-medium text-gray-700">
                {weather.visibility} km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
