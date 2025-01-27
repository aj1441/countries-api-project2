/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserForm from "../customComponents/UserForm";
import { useNavigate } from "react-router-dom";
// import { Card, Image } from "@chakra-ui/react";
// import PropTypes from "prop-types";
import CountryCard from "../customComponents/CountryCard";
// import Country from "./country";

function SavedCountries({ favorites = [], countries, timesClicked, setTimesClicked }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showForm, setShowForm] = useState(true); // Show the form by default if no user is found

  useEffect(() => {
    // Check local storage for user data
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profileInfo = JSON.parse(storedProfile);
      setUser(profileInfo.fullName); // Set the user's name
      setShowForm(false); // Hide the form if user data exists
    }
  }, []);

  const handleFormSubmit = (formData) => {
    // Save form data to local storage and update state
    localStorage.setItem("profile", JSON.stringify(formData));
    setUser(formData.fullName); // Update user name
    setShowForm(false); // Hide the form after submission
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate back to the previous page
  };

  return (
    <>
      <div>
        <button className="HomeButton" onClick={handleHomeClick}>
          Home
        </button>
      </div>
      {user && (
        <div className="welcomeMessage">
          <p >Welcome {user}!</p>
        </div>
      )}
      <div>
        <h1 className="SavedCountriesTitle">My Saved Countries</h1>
        {showForm ? (
          <UserForm countries={countries} onSubmit={handleFormSubmit} />
        ) : (
            <CountryCard countries={favorites} timesClicked={timesClicked} setTimesClicked={setTimesClicked} />

        )}
      </div>
    </>
  );
}

// SavedCountries.propTypes = {
//   favorites: PropTypes.array,
//   countries: PropTypes.array.isRequired,
// };

export default SavedCountries;



   
