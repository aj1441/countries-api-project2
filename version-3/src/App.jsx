import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './customComponents/Header';
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import Country from './pages/Country';
import './App.css';
import { fetchCountries } from './helperFunctions/FetchCountriesApi';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZYOYOE0oSmTmLgz4GgyMSVtpdo4MaeQQ", 
  authDomain: "aj-countries-api.firebaseapp.com",
  databaseURL: "https://aj-countries-api-default-rtdb.firebaseio.com",
  projectId: "aj-countries-api",
  storageBucket: "aj-countries-api.firebasestorage.app",
  messagingSenderId: "390998346076",
  appId: "1:390998346076:web:e707aac8959ec6b6211999",
  measurementId: "G-2ERGYW2M35"
};



function App() {
  // eslint-disable-next-line no-unused-vars
  const app = initializeApp(firebaseConfig);
   
  // const analytics = getAnalytics(app);
  const [theme, setTheme] = useState('light'); // State to track theme (light/dark)
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });


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
        <Route path="/savedcountries" element={<SavedCountries favorites={favorites} countries={fetchedCountries}  />} />
        <Route path="/country/:countryId" element={<Country countries={fetchedCountries} setFavorites={setFavorites} favorites={favorites} />} />

      </Routes>
    </>
  );
}

export default App;
