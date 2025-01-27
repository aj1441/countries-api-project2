/* eslint-disable react/prop-types */
import { LuSearch } from 'react-icons/lu';

const CountrySearchBar = ({ countries, searchTerm, setSearchTerm, selectedOption, setSelectedOption }) => {
  const regions = [...new Set(countries.map(country => country.region))].filter(Boolean);



  // Handle changes to the search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle changes to the region dropdown
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="countrySearch">
      <div className='searchContainer' id = 'searchContainer'>
        <LuSearch />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <select value={selectedOption} onChange={handleDropdownChange}>
        <option value="">Select A Region</option>
        <option value="">All</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};


export default CountrySearchBar;