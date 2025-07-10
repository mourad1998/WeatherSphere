import type { Location } from "../types";

interface CityListProps {
  locations: Location[];
  onSelect: (loc: Location) => void;
}

const CityList: React.FC<CityListProps> = ({ locations, onSelect }) =>
  locations.length > 0 && (
    <div className="col-span-1 md:col-span-2 fade-in">
      <div
        className="max-h-[300px] overflow-y-auto mt-2 bg-white/50 rounded-lg"
      >
        <ul className="divide-y divide-gray-200 divide-opacity-30">
          {locations.map((location, index) => (
            <li
              key={index}
              className="px-4 py-3 hover:bg-indigo-50 hover:bg-opacity-50 cursor-pointer transition-colors"
              onClick={() => onSelect(location)}
            >
              <div className="font-medium text-gray-800">{location.name}</div>
              <div className="text-xs text-gray-500">
                {location.state && `${location.state}, `}
                {location.country}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

export default CityList;
