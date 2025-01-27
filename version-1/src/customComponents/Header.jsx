/* eslint-disable react/prop-types */
import {  Link } from 'react-router-dom';// import Home from '../pages/Home';
import * as FaIcons from 'react-icons/fa';
import { LuMoon, LuSun } from "react-icons/lu";




function Header({ toggleTheme, theme }) {

  return (
    <>
      <header className="header">
        <h1>Where in the world?</h1>
        <ul className="navContainter">
          <li>

            <Link className="linkToSaved" to="/SavedCountries">
              <FaIcons.FaHeart strokeWidth={25} stroke="black" size={15} fill="white" /> Saved Countries
            </Link>
          </li>
          <li>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? (
                <>
                  <LuMoon /> Dark Mode
                </>
              ) : (
                <>
                  <LuSun /> Light Mode
                </>
              )}
            </button>
          </li>
        </ul>
      </header>
    </>
  )
};


export default Header;