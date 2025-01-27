/* eslint-disable react/prop-types */
import { useState } from 'react';
import CountrySearch from '../customComponents/CountrySearchBar';
import '../App.css';
import CountryCard from '../customComponents/CountryCard';

function Home({ countries, timesClicked, setTimesClicked  }) {
    // State to store the search term
    const [searchTerm, setSearchTerm] = useState('');
    // State to store the selected region option
    const [selectedOption, setSelectedOption] = useState('');

    const filteredCountries = countries.filter((country) => {
        const matchesSearchTerm = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedOption ? country.region === selectedOption : true;
        return matchesSearchTerm && matchesRegion;
    });

    return (
        <>
            {/* Render the CountrySearch component and pass the necessary props */}
            <CountrySearch
                countries={countries}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <main>
                {/* Render the CountryCard component and pass the search term and selected option as props */}
                <CountryCard countries={filteredCountries} timesClicked={timesClicked} setTimesClicked={setTimesClicked} />
            </main>
        </>
    );
}


export default Home;