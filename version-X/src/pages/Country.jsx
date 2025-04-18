/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Box, Card, HStack, Image, Text } from "@chakra-ui/react";
// import { getDatabase, ref, onValue, update } from "firebase/database";
import base from '../config/airtable';




function Country({ countries, setFavorites, favorites }) {
  // Get the country ID from the URL parameters
  const { countryId } = useParams(); // Get country ID from URL
  // Hook to navigate programmatically
  const navigate = useNavigate();
  const country = countries.find((c) => c.cca3 === countryId);
  const [borderCountries, setBorderCountries] = useState([]);
  const [clickCount, setClickCount] = useState(0); // Only store Firebase data


  useEffect(() => {
    if (!countryId) return; //  Prevent errors if countryId is missing
    // const db = getDatabase();
    // const dbRef = ref(db, `countryCard/${countryId}/clickCount`);
    // const unsubscribe = onValue(dbRef, (snapshot) => {
    //   if (snapshot.exists()) {
    //     setClickCount(snapshot.val()); //  Update state in real-time
    //   } else {
    //     setClickCount(0); //  Default to 0 if not found
    //   }
    // });
       // Fetch click count from Airtable
       base(import.meta.env.VITE_AIRTABLE_TIMES_CLICKED)
       .select({
         filterByFormula: `{country_code} = '${countryId}'`
       })
       .firstPage()
       .then(records => {
         if (records.length > 0) {
           setClickCount(records[0].fields.click_count || 0);
         } else {
           setClickCount(0);
         }
       })
       .catch(error => {
         console.error('Error fetching click count:', error);
         setClickCount(0);
       });
       
      }, [countryId]);

  //      base(import.meta.env.VITE_AIRTABLE_COUNTRIES_TABLE)
  //      .select({
  //        filterByFormula: `{cca3} = '${countryId}'`
  //      })
  //      .firstPage()
  //      .then(records => {
  //        if (records.length > 0) {
  //          setClickCount(records[0].fields.clickCount || 0);
  //        } else {
  //          setClickCount(0);
  //        }
  //      })
  //      .catch(error => {
  //        console.error('Error fetching click count:', error);
  //        setClickCount(0);
  //      });
  //   // return () => unsubscribe(); //  Cleanup on unmount
  // }, [countryId]);
 
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
    const storedProfile = localStorage.getItem('profile');
    if (!storedProfile) {
      alert('Please log in to save countries.');
      return;
    }
  
    try {
      // Check if country already exists in Airtable
      const existingRecords = await base(import.meta.env.VITE_AIRTABLE_USER_COUNTRY_DATA)
        .select({
          filterByFormula: `AND(country_id} = '${country.id}', {userId} = '${storedProfile}')`
        })
        .firstPage();
  
      if (existingRecords.length > 0) {
        alert('This country is already in your favorites!');
        return;
      }
  
      // Create new record in Airtable
      await base(import.meta.env.VITE_AIRTABLE_USER_COUNTRY_DATA).create([
        {
          fields: {
            saved_country_id: country.id,
            User_ID: [storedProfile], // Link to user profile
            country_id: [country.id] // Link to country
          }
        }
      ]);
  
      // Update local state
      const updatedFavorites = [...favorites, country];
      setFavorites(updatedFavorites);
      
      alert('Country saved to favorites!');
    } catch (error) {
      console.error('Error saving to Airtable:', error);
      alert('Failed to save country to favorites');
    }
  };

  // const handleSaveClick = () => {
  //   const storedProfile = localStorage.getItem('profile');
  //   if (!storedProfile) {
  //     alert('You are not logged in. Please log in on the Saved Countries page to save your countries.');
  //     return;
  //   }
  //   try {
  //     const db = getDatabase();
  //     const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  //     // Check if country already exists
  //     if (existingFavorites.some(fav => fav.cca3 === country.cca3)) {
  //       alert('This country is already in your favorites!');
  //       return;
  //     }

  //     // Add new country to favorites
  //     const updatedFavorites = [...existingFavorites, country];

  //     // Update Firebase
  //     const updates = {};
  //     updates['/users/1/favorites'] = updatedFavorites;
      
  //     update(ref(db), updates)
  //       .then(() => {
  //         // Update localStorage as fallback
  //         localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          
  //         // Update UI state
  //         setFavorites(updatedFavorites);
          
  //         alert('Country saved to favorites!');
  //       })
  //       .catch((error) => {
  //         console.error('Error saving to Firebase:', error);
  //         alert('Failed to save country to favorites');
  //       });

  //   } catch (error) {
  //     console.error('Error saving to favorites:', error);
  //     alert('Failed to save country to favorites');
  //   }
  // };


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