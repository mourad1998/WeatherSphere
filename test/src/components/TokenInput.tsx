import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TokenInputProps {
  token: string;
  setToken: (token: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ token, setToken }) => (
  <div className="col-span-1 md:col-span-2">
    <label htmlFor="api-key" className="block text-sm font-medium text-gray-600 mb-1">
      OpenWeatherMap API Key
    </label>
    <div className="relative">
      <input
        type="text"
        id="api-key"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your API key..."
        className="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
      />
      <FontAwesomeIcon 
        icon={faKey} 
        className="absolute left-3 top-3.5 text-gray-400" 
      />
    </div>
  </div>
);

export default TokenInput;