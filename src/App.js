import React from 'react';
import logo from './logo.svg';
import FilmGrid from './FilmGrid.js';
import './App.css';

function MontageApp() {
  return (
    <div className="app">
      <header className="app-header">
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
        <div class="search-container">
          <form action="/search" method="get">
            <input class="search expandright" id="searchright" type="search" name="q" placeholder="Search"/>
            <label class="button searchbutton" for="searchright"><span class="mglass">&#9906;</span></label>
          </form>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div className="film-grid">
        <FilmGrid/>
      </div>
    </div>
  );
}

export default MontageApp;

