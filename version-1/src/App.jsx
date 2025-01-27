import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './customComponents/Header.jsx';
import Home from './pages/Home.jsx';
import SavedCountries from './pages/SavedCountries.jsx';
import Country from './pages/Country.jsx';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light'); // State to track theme (light/dark)

  // Update the body class whenever the theme changes
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light' : 'dark';
  }, [theme]);

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
        <Route path="/" element={<Home />} />
        <Route path="/savedcountries" element={<SavedCountries />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </>
  );
}

export default App;
