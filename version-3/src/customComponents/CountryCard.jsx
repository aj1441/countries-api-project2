/* eslint-disable react/prop-types */
import { Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import { getDatabase, increment, ref, update } from "firebase/database";

function CountryCard({ countries }) {
  const navigate = useNavigate();

  // Load click counts from localStorage (only once)
//   const [timesClicked, setTimesClicked] = useState({}); 
    
//     () => {
//     return JSON.parse(localStorage.getItem("timesClicked")) || {};
//   });
const db = getDatabase();

  // Fetch initial click counts from Firebase----not using this, no need to show click count on countryCard
// useEffect(() => {
//     const dbRef = ref(db, "countryCard");
//     onValue(dbRef, (snapshot) => {
//       if (snapshot.exists()) {
//         console.log("Firebase data:", snapshot.val());
//         setTimesClicked(snapshot.val()); // Load data into state
//       } else {
//         setTimesClicked({});
//       }
//     });
//   }, [db]);

  // Function to update click count in Firebase
  const clickCount = (key) => {
    const updates = {};
    updates[`countryCard/${key}/clickCount`] = increment(1);

    update(ref(db), updates).catch((error) =>
      console.error("Firebase update error:", error)
    );
  };

  const handleClick = (country) => {
    let countryKey = String(country.cca3);
  
    clickCount(countryKey); // Update Firebase click count
  
    navigate(`/country/${countryKey}`); // No need to pass timesClicked
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
          {/* <li>Times Clicked: {timesClicked[country.cca3]?.clickCount || 0}</li> Display Clicks */}
            </ul>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  );
}

export default CountryCard;




