/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { fetchCountries } from '../helperFunctions/FetchCountriesApi';

function CountryCard({ searchTerm, selectedOption }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getCountries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredCountries = countries.filter((country) => {
        const matchesSearchTerm = country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesRegion = selectedOption
            ? country.region === selectedOption
            : true;

        return matchesSearchTerm && matchesRegion;
    });

    const handleClick = (country) => {
        navigate(`/country/${country.cca3}`);
    };

    return (
        <div className="cardContainer">
            {filteredCountries.map((country) => (
                <Card.Root className="cardRoot" onClick={() => handleClick(country)} cursor="pointer" key={country.cca3}>
                    <Image src={country.flags.png} alt={country.flags.alt} />
                    <Card.Header className="cardHeader">{country.name.common}</Card.Header>
                    <Card.Body className="cardBody">
                        <ul>
                            <li>Population: {country.population}</li>
                            <li>Region: {country.region}</li>
                            <li>Capital: {country.capital}</li>
                        </ul>
                    </Card.Body>
                </Card.Root>
            ))}
        </div>
    );
}


export default CountryCard;
