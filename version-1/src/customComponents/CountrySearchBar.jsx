/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { fetchCountries } from '../helperFunctions/FetchCountriesApi';

const CountrySearchBar = ({ searchTerm, setSearchTerm, selectedOption, setSelectedOption }) => {
  // State to store the list of unique regions
  const [regions, setRegions] = useState([]);

  // Fetch the list of unique regions when the component mounts
  useEffect(() => {
    const getRegions = async () => {
      try {
        // Fetch the countries data from the API
        const data = await fetchCountries();
        // Extract unique regions from the data
        const uniqueRegions = [...new Set(data.map(country => country.region))].filter(Boolean);
        // Set the unique regions to state
        setRegions(uniqueRegions);
      } catch (error) {
        // Log any errors to the console
        console.error('Failed to fetch regions:', error);
      }
    };

    getRegions();
  }, []);

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