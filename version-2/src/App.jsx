import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './customComponents/Header';
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import Country from './pages/Country';
import './App.css';
import { fetchCountries } from './helperFunctions/FetchCountriesApi';

function App() {
  const [theme, setTheme] = useState('light'); // State to track theme (light/dark)
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });



  const [timesClicked, setTimesClicked] = useState(() => {
    const stored = localStorage.getItem('timesClicked');
    return stored ? JSON.parse(stored) : {};
  });

  // Update localStorage whenever timesClicked changes
  useEffect(() => {
    localStorage.setItem('timesClicked', JSON.stringify(timesClicked));
  }, [timesClicked]);

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
        <Route path="/" element={<Home countries={fetchedCountries} timesClicked={timesClicked} setTimesClicked={setTimesClicked} />} />
        <Route path="/savedcountries" element={<SavedCountries favorites={favorites} countries={fetchedCountries} timesClicked={timesClicked} setTimesClicked={setTimesClicked}  />} />
        <Route path="/country/:id" element={<Country countries={fetchedCountries} setFavorites={setFavorites} favorites={favorites} timesClicked={timesClicked} setTimesClicked={setTimesClicked} />} />

      </Routes>
    </>
  );
}

export default App;
