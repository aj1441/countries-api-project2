/* eslint-disable react/prop-types */
import { Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { getDatabase, increment, ref, update } from "firebase/database";
import base from '../config/airtable';

function CountryCard({ countries }) {
  const navigate = useNavigate();

  // const db = getDatabase();

  const updateClickCount = async (countryKey) => {
    try {
      // Find existing record
      const records = await base(import.meta.env.VITE_AIRTABLE_TIMES_CLICKED)
        .select({
          filterByFormula: `{country_code} = '${countryKey}'`
        })
        .firstPage();

      if (records.length > 0) {
        // Update existing record
        await base(import.meta.env.VITE_AIRTABLE_TIMES_CLICKED).update([
          {
            id: records[0].id,
            fields: {
              click_count: (records[0].fields.click_count || 0) + 1
            }
          }
        ]);
      } else {
        // Create new record
        await base(import.meta.env.VITE_AIRTABLE_TIMES_CLICKED).create([
          {
            fields: {
              country_code: countryKey,
              click_count: 1
            }
          }
        ]);
      }
    } catch (error) {
      console.error("Airtable update error:", error);
    }
  };

  const handleClick = async (country) => {
    const countryKey = String(country.cca3);
    await updateClickCount(countryKey);
    navigate(`/country/${countryKey}`);
  };

  // // Function to update click count in Firebase
  // const clickCount = (key) => {
  //   const updates = {};
  //   updates[`countryCard/${key}/clickCount`] = increment(1);

  //   update(ref(db), updates).catch((error) =>
  //     console.error("Firebase update error:", error)
  //   );
  // };

  // const handleClick = (country) => {
  //   let countryKey = String(country.cca3);

  //   clickCount(countryKey); // Update Firebase click count

  //   navigate(`/country/${countryKey}`); // No need to pass timesClicked
  // };



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
              {/* <li>Times Clicked: {timesClicked[country.cca3]?.clickCount || 0}</li> Display Clicks */}
            </ul>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  );
}

export default CountryCard;




