import React from 'react';
import FilmGrid from './FilmGrid.js';
import './App.css';

function MontageApp() {
  return (
    <div className="app">
      <header className="montage-header">
        <span className="header-text"><span className="start">mon</span><span className="end">tage.</span></span>
        <nav className="main-nav">
          <ul>
            <li><a>Home</a></li>
            <li className="active">
              <div className="arrow"></div>
              <a>Watch Movies</a>
            </li>
            <li><a>Film Crew</a></li>
          </ul>
        </nav>
        <div className="search-container">
          <form action="/search" method="get">
            <input className="search expandright" id="searchright" type="search" name="q" placeholder="Search"/>
            <label className="button searchbutton" htmlFor="searchright"><span className="mglass">&#9906;</span></label>
          </form>
        </div>
      </header>
      <div className="film-grid-container">
        <FilmGrid/>
      </div>
    </div>
  );
}

export default MontageApp;

