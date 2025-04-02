/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserForm from "../customComponents/UserForm";
import { useNavigate } from "react-router-dom";
import CountryCard from "../customComponents/CountryCard";


function SavedCountries({ userId = 1, favorites = [], countries }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showForm, setShowForm] = useState(true); // Show the form by default if no user is found
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let userId = 1;
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get-user-data/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();

        if (userData.length > 0) {
          setUser(userData[0].user_name);
          setShowForm(true);
        } else {
          setShowForm(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
        setShowForm(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);


  const handleFormSubmit = (formData) => {
    setUser(formData.fullName); // Update user name
    setShowForm(false); // Hide the form after submission
  };


  const handleHomeClick = () => {
    navigate('/'); // Navigate back to the previous page
  };

  const favoriteCountryObjects = favorites.map(favCode =>
    countries.find(c => c.cca3 === favCode)
  ).filter(Boolean);
  

  return (
    <>
      <div>
        <button className="HomeButton" onClick={handleHomeClick}>
          Home
        </button>
      </div>
      {error && <p className="errorMessage">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {user && (
            <div className="welcomeMessage">
              <p>Welcome {user}!</p>
            </div>
          )}
          <div>
            <h1 className="SavedCountriesTitle">My Saved Countries</h1>
            <UserForm countries={countries} onSubmit={handleFormSubmit} />
            <CountryCard countries={favoriteCountryObjects} />

            {/* {showForm ? (
              <UserForm countries={countries} onSubmit={handleFormSubmit} />
            ) : (
              <CountryCard countries={favorites} />

            )} */}
          </div>
        </>
      )}
    </>
  );
}


export default SavedCountries;


