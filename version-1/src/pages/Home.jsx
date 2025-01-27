import { useState } from 'react';
import CountrySearch from '../customComponents/CountrySearchBar.jsx';
import '../App.css';
import CountryCard from '../customComponents/CountryCard.jsx';

function Home() {
    // State to store the search term
    const [searchTerm, setSearchTerm] = useState('');
    // State to store the selected region option
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <>
            {/* Render the CountrySearch component and pass the necessary props */}
            <CountrySearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <main>
                {/* Render the CountryCard component and pass the search term and selected option as props */}
                <CountryCard searchTerm={searchTerm} selectedOption={selectedOption} />
            </main>
        </>
    );
}

// Export the Home component as the default export
export default Home;