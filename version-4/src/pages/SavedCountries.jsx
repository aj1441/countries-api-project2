/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserForm from "../customComponents/UserForm";
import { useNavigate } from "react-router-dom";
import CountryCard from "../customComponents/CountryCard";
// import { getDatabase, ref, child, get} from "firebase/database";
import base from "../config/airtable";


function SavedCountries({ favorites, countries }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showForm, setShowForm] = useState(true); // Show the form by default if no user is found
  // const dbRef = ref(getDatabase());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
        // Fetch user profile from Airtable
        base(import.meta.env.VITE_AIRTABLE_USER_PROFILE_TABLE)
        .select({
          maxRecords: 1,
          view: "Grid view"
        })
        .firstPage()
        .then(records => {
          if (records.length > 0) {
            setUser(records[0].fields.full_name);
            setShowForm(false);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user profile:', err);
          setError(err.message);
          setLoading(false);
        });
    }, []);
  //   get(child(dbRef, `users/${1}`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       console.log(snapshot.val().name);
  //       setUser(snapshot.val().name);
  //       setShowForm(false);
  //     } else {
  //       setShowForm(true);
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }, [dbRef]);

  const handleFormSubmit = async (userData) => {
    try {
      // Create user profile in Airtable
      await base(import.meta.env.VITE_AIRTABLE_USER_PROFILE_TABLE).create([
        {
          fields: {
            full_name: userData.name,
            email: userData.email,
            country: userData.country,
            bio: userData.bio
          }
        }
      ]);

      setUser(userData.name);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving user profile:', error);
      alert('Failed to save user profile');
    }
  };

  // const handleFormSubmit = (formData) => {
  //   setUser(formData.fullName); // Update user name
  //   setShowForm(false); // Hide the form after submission
  // };


  const handleHomeClick = () => {
    navigate('/'); // Navigate back to the previous page
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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


