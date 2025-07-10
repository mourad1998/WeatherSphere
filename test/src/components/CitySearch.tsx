import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CitySearchProps {
  city: string;
  setCity: (city: string) => void;
  searchCity: () => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ city, setCity, searchCity }) => (
  <div className="col-span-1 md:col-span-2">
    <label htmlFor="city-search" className="block text-sm font-medium text-gray-600 mb-1">
      Search City
    </label>
    <div className="relative">
      <input
        type="text"
        id="city-search"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
        onKeyPress={(e) => e.key === 'Enter' && searchCity()}
      />
      <FontAwesomeIcon 
        icon={faSearch} 
        className="absolute left-3 top-3.5 text-gray-400" 
      />
      <button 
        onClick={searchCity}
        className="absolute right-3 top-3 text-indigo-500 hover:text-indigo-700 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  </div>
);

export default CitySearch;