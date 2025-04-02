/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CountryCard({ countries }) {
  const [clickCounts, setClickCounts] = useState({}); // Store click counts in state  
  const navigate = useNavigate();

  // const db = getDatabase();


//fetch click counts for countries on initial render
useEffect(() => {
  const fetchClickCounts = async () => {
    console.log("fetching click counts for countries..."); // Log to confirm this runs
    const counts = {};

    await Promise.all(
      countries.map(async (country) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/country-click/${country.cca3}`);
          if (response.ok) {
            const data = await response.json();
            console.log('fetched data', data); // Log the fetched data for debugging
            counts[country.cca3] = data.country_count;
          }
        } catch (error) {
          console.error(`Failed to fetch click count for ${country.cca3}:`, error);
        }
      })
    );

    setClickCounts(counts);
  };

  fetchClickCounts();
}, [countries]);



  // Handle click event for a country
  const handleClick = async (country) => {
    const countryKey = String(country.cca3);

    try {
      // Send a POST request to update the click count
      const response = await fetch(`${import.meta.env.VITE_API_URL}/country-click/${countryKey}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to update click count");
      }

      const data = await response.json();

      // Update the click count in state
      setClickCounts((prevCounts) => ({
        ...prevCounts,
        [countryKey]: data.country_count,
      }));

      // Navigate to the country details page
      navigate(`/country/${countryKey}`);
    } catch (error) {
      console.error("Error updating click count:", error);
    }
  };

  return (
    <div className="cardContainer">
      {countries.map((country) => (
        <Card.Root
          className="cardRoot"
          onClick={() => handleClick(country)}
          cursor="pointer"
          key={country.cca3}
        >
          <Image src={country.flags.png} alt={country.flags.alt} />
          <Card.Header className="cardHeader">{country.name.common}</Card.Header>
          <Card.Body className="cardBody">
            <ul>
              <li>Population: {country.population}</li>
              <li>Region: {country.region}</li>
              <li>Capital: {country.capital}</li>
              <li>Times Clicked: {clickCounts[country.cca3] || 0}</li> {/* Display Clicks */}
            </ul>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  );
}

export default CountryCard;




