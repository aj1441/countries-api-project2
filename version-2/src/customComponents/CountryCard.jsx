/* eslint-disable react/prop-types */
import { Card, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function CountryCard({ countries, timesClicked, setTimesClicked }) {

    const navigate = useNavigate();


    const handleClick = (country) => {

      
        const newTimesClicked = { ...timesClicked, [country.cca3]: (timesClicked[country.cca3] || 0) + 1 };
        setTimesClicked(newTimesClicked);
        navigate(`/country/${country.cca3}`);
      };

    return (
        <div className="cardContainer">
            {countries.map((country) => (
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
