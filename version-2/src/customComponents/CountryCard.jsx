/* eslint-disable react/prop-types */
import { Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CountryCard({ countries }) {
  const navigate = useNavigate();

  // Load click counts from localStorage (only once)
  const [timesClicked, setTimesClicked] = useState(() => {
    return JSON.parse(localStorage.getItem("timesClicked")) || {};
  });

  const handleClick = (country) => {
    const newTimesClicked = {
      ...timesClicked,
      [country.cca3]: (timesClicked[country.cca3] || 0) + 1,
    };

    setTimesClicked(newTimesClicked);
    localStorage.setItem("timesClicked", JSON.stringify(newTimesClicked)); // Save immediately

    navigate(`/country/${country.cca3}`);
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
              <li>Times Clicked: {timesClicked[country.cca3] || 0}</li> {/* Display Clicks */}
            </ul>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  );
}

export default CountryCard;


// /* eslint-disable react/prop-types */
// import { Card, Image } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// function CountryCard({ countries }) {

//     const navigate = useNavigate();
//     const [timesClicked, setTimesClicked] = useState(() => {
//         const stored = localStorage.getItem('timesClicked');
//         return stored ? JSON.parse(stored) : {};
//       });
    
//       useEffect(() => {
//         localStorage.setItem('timesClicked', JSON.stringify(timesClicked));
//       }, [timesClicked]);

//     const handleClick = ( uid, country) => {
      
//         const newTimesClicked = { ...timesClicked, [country.cca3]: (timesClicked[country.cca3] || 0) + 1 };
//         setTimesClicked(newTimesClicked);
//         navigate(`/country/${country.cca3}`);
//       };

//     return (
//         <div className="cardContainer">
//             {countries.map((country) => (
//                 <Card.Root className="cardRoot" onClick={() => handleClick(country)} cursor="pointer" key={country.cca3}>
//                     <Image src={country.flags.png} alt={country.flags.alt} />
//                     <Card.Header className="cardHeader">{country.name.common}</Card.Header>
//                     <Card.Body className="cardBody">
//                         <ul>
//                             <li>Population: {country.population}</li>
//                             <li>Region: {country.region}</li>
//                             <li>Capital: {country.capital}</li>
//                         </ul>
//                     </Card.Body>
//                 </Card.Root>
//             ))}
//         </div>
//     );
// }





// export default CountryCard;
