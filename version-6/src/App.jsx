import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Header from "./customComponents/Header";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import Country from "./pages/Country";
import "./App.css";
import { fetchCountries } from "./helperFunctions/FetchCountriesApi";

const supabase = createClient(
  "https://lfnwakbgvirwfefqsqco.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmbndha2Jndmlyd2ZlZnFzcWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTY1NTEsImV4cCI6MjA2MDIzMjU1MX0.w50fsvJK73TbmS0mATmGwM16G4WQIB2Pz0L1Q9hEvW4"
);

function App() {
  const [session, setSession] = useState(null);
  const [theme, setTheme] = useState("light"); // State to track theme (light/dark)
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Update the body class whenever the theme changes
  useEffect(() => {
    document.body.className = theme === "light" ? "light" : "dark";
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
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("Theme toggled to:", newTheme); // Debug log
      return newTheme;
    });
  };

  useEffect(() => {
    const fetchSavedCountries = async () => {
      try {
        const userId = 1; // Replace with dynamic user ID if needed
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/get-user-saved-countries/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved countries");
        }
        const data = await response.json();
        console.log("Fetched favorites:", data);
        setFavorites(data.map((item) => item.country_code));

        // setFavorites(data);
      } catch (error) {
        console.error("Error fetching saved countries:", error);
      }
    };

    fetchSavedCountries();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
    <div>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<Home countries={fetchedCountries} />} />
        <Route
          path="/savedcountries"
          element={
            <SavedCountries
              favorites={favorites}
              countries={fetchedCountries}
            />
          }
        />
        <Route
          path="/country/:countryId"
          element={
            <Country
              countries={fetchedCountries}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          }
        />
      </Routes>
    </div>);
  }
}

export default App;
