import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './customComponents/Header';
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import Country from './pages/Country';
import './App.css';
import { fetchCountries } from './helperFunctions/FetchCountriesApi';
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get } from "firebase/database";
import base from './config/airtable';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID


// };


function App() {

  // eslint-disable-next-line no-unused-vars
  // const app = initializeApp(firebaseConfig);

  const [theme, setTheme] = useState('light'); // State to track theme (light/dark)
  const [fetchedCountries, setFetchedCountries] = useState([]);

  // const dbRef = ref(getDatabase());
  const [favorites, setFavorites] = useState([]); //(() => {
    // Initially load from localStorage as fallback
    // const stored = localStorage.getItem('favorites');
    // const initial = stored ? JSON.parse(stored) : [];
    
    // Then try to fetch from Firebase
  //   get(child(dbRef, `users/1/favorites`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       setFavorites(snapshot.val());
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });

  //   return initial;
  // });


  // Update the body class whenever the theme changes
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light' : 'dark';
  }, [theme]);

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetchCountries();
      setFetchedCountries(countries);
    };
    getCountries();

      // Fetch favorites from Airtable
      base('Favorites')
      .select({ view: 'Grid view' })
      .firstPage()
      .then(records => {
        const favorites = records.map(record => record.fields);
        setFavorites(favorites);
      })
      .catch(error => {
        console.error('Error fetching favorites from Airtable:', error);
      });
  }, []);



  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Theme toggled to:', newTheme); // Debug log
      return newTheme;
    });
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />

      <Routes>
        <Route path="/" element={<Home countries={fetchedCountries} />} />
        <Route path="/savedcountries" element={<SavedCountries favorites={favorites} countries={fetchedCountries} />} />
        <Route path="/country/:countryId" element={<Country countries={fetchedCountries} setFavorites={setFavorites} favorites={favorites} />} />

      </Routes>
    </>
  );
}

export default App;