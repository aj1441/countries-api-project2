/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserForm from "../customComponents/UserForm";
import { useNavigate } from "react-router-dom";
import CountryCard from "../customComponents/CountryCard";
import { getDatabase, ref, child, get} from "firebase/database";


function SavedCountries({ favorites = [], countries }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showForm, setShowForm] = useState(true); // Show the form by default if no user is found
  const dbRef = ref(getDatabase());

  
  useEffect(() => {
    get(child(dbRef, `users/${1}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        console.log(snapshot.val().name);
        setUser(snapshot.val().name);
        setShowForm(false);
      } else {
        setShowForm(true);
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [dbRef]);

  
  const handleFormSubmit = (formData) => {
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
          <CountryCard countries={favorites} />

        )}
      </div>
    </>
  );
}


export default SavedCountries;


