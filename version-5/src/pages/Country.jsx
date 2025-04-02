/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Box, Card, HStack, Image, Text } from "@chakra-ui/react";




function Country({ countries, setFavorites }) {
  // Get the country ID from the URL parameters
  const { countryId } = useParams(); // Get country ID from URL
  // Hook to navigate programmatically
  const navigate = useNavigate();
  const country = countries.find((c) => c.cca3 === countryId);
  const [borderCountries, setBorderCountries] = useState([]);
  const [clickCount, setClickCount] = useState(0); // Only store Firebase data


  // Fetch click count from the local server
  useEffect(() => {
    if (!countryId) return;

    const fetchClickCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/country-click/${countryId}`);
        if (response.ok) {
          const data = await response.json();
          setClickCount(data.country_count || 0);
        } else {
          console.error('Failed to fetch click count');
        }
      } catch (error) {
        console.error('Error fetching click count:', error);
      }
    };

    fetchClickCount();
  }, [countryId]);
 
  //fetch border countries
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


  if (!country) return <p>Country not found.</p>;


  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSaveClick = async () => {
//eventually i want a function here to check to see if the user is logged in if not it should prompt to sign in similar to the firebase code
// const storedProfile = localStorage.getItem('profile');
// if (!storedProfile) {
//   alert('You are not logged in. Please log in on the Saved Countries page to save your countries.');
//   return;
// }


    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/add-user-saved-countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Replace with the actual user ID from your app's authentication system
          country_code: country.cca3,
        }),
      });

      if (response.ok) {
        alert('Country saved to favorites!');
      } else {
        alert('Failed to save country to favorites');
      }
    } catch (error) {
      console.error('Error saving country:', error);
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


export default Country;