/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CountryCard({ countries }) {
  const [clickCounts, setClickCounts] = useState({}); // Store click counts in state  
  const navigate = useNavigate();

  // const db = getDatabase();



  // Handle click event for a country
  const handleClick = async (country) => {
    const countryKey = String(country.cca3);

    try {
      // Send a POST request to update the click count
      const response = await fetch(`http://localhost:3000/country-click/${countryKey}`, {
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




