/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
// import PropTypes from 'prop-types';
import { Box, Card, HStack, Image, Text } from "@chakra-ui/react"

function Country({ countries, setFavorites }) {
  // Get the country ID from the URL parameters
  const { id } = useParams();
  // Hook to navigate programmatically
  const navigate = useNavigate();
  const country = countries.find((c) => c.cca3 === id);
  const [borderCountries, setBorderCountries] = useState([]);
  const [clickCount, setClickCount] = useState(0);


  useEffect(() => {
    const fetchBorderCountries = () => {
      if (country && country.borders) {
        const borderData = country.borders.map(borderCode => {
          const borderCountry = countries.find(c => c.cca3 === borderCode);
          return borderCountry ? borderCountry.name.common : null;
        }).filter(Boolean);
        setBorderCountries(borderData);
      } else {
        setBorderCountries([]);
      }
    };

    fetchBorderCountries();
  }, [country, countries]);

  useEffect(() => {
    // Retrieve click count from local storage
    const storedClicks = JSON.parse(localStorage.getItem('timesClicked')) || {};
    setClickCount(storedClicks[id] || 0);
  }, [id]);

  if (!country) return <p>Country not found.</p>;


  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSaveClick = () => {
    const storedProfile = localStorage.getItem('profile');
    if (!storedProfile) {
      alert('You are not logged in. Please log in on the Saved Countries page to save your countries.');
      return;
    }
    try {
      const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

      // Check if country already exists
      if (existingFavorites.some(fav => fav.cca3 === country.cca3)) {
        alert('This country is already in your favorites!');
        return;
      }

      // Add new country to favorites
      const updatedFavorites = [...existingFavorites, country];

      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      // Update UI state
      setFavorites(updatedFavorites);

      alert('Country saved to favorites!');
    } catch (error) {
      console.error('Error saving to favorites:', error);
      alert('Failed to save country to favorites');
    }
  };


  return (
    <>
      <div>
        <Button className="BackButton" onClick={handleBackClick}>Back</Button>
      </div>
      <Card.Root flexDirection="row" overflow="hidden" maxW="80%" placeSelf="center">
        <Image
          objectFit="cover"
          maxW="50%"
          src={country.flags.png}
          alt="Image of {country.name.common}"
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between" p="4" flexWrap="wrap" >
          <Card.Body >
            <Card.Title mb="2">{country.name.common}</Card.Title>
            <HStack>
              <ul>
                <li>Population: {country.population}</li>
                <li>Region: {country.region}</li>
                <li>Capital: {country.capital}</li>
                <li className="numberTimesClicked">Search For: {clickCount} times</li>
              </ul>
            </HStack>
            <HStack mt="4" flexWrap="wrap">
              <Text fontWeight="semibold" textStyle="xl">
                Border Countries:
              </Text>
              {borderCountries.length > 0 ? (
                borderCountries.map((borderCountry, index) => (
                  <span key={index}>{borderCountry}</span>
                ))
              ) : (
                <span>None</span>
              )}
            </HStack>
          </Card.Body>
          <Card.Footer>
            <Button onClick={handleSaveClick}>Save</Button>
          </Card.Footer>
        </Box>
      </Card.Root>

    </>
  );
};

// Country.propTypes = {
//   countries: PropTypes.arrayOf(PropTypes.shape({
//     cca3: PropTypes.string.isRequired,
//     name: PropTypes.shape({
//       common: PropTypes.string.isRequired,
//     }).isRequired,
//     population: PropTypes.number.isRequired,
//     region: PropTypes.string.isRequired,
//     capital: PropTypes.arrayOf(PropTypes.string),
//     flags: PropTypes.shape({
//       png: PropTypes.string.isRequired,
//     }).isRequired,
//     borders: PropTypes.arrayOf(PropTypes.string),
//   })).isRequired,
//   setFavorites: PropTypes.func.isRequired,
// };




export default Country;