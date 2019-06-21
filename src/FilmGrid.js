import React from 'react';
import './App.css';
import './filmnav.css'

import filmsjson from './films';

var films = require('./films.json'); // normally this would be fetched from db
/** Renders entire grid of film objects for display. */
const navOptions = {
  all: 'All',
  toprated: 'Top Rated',
  new: 'New Arrivals',
  alphabetical: 'Alphabetical',
  genre: 'Genre',
}

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Drama',
  'Fantasy',
  'History',
  'Musical',
  'Romance',
  'Thriller',
  'Sci-Fi',
  'Western',
]

/** Finishing  */
class FilmNavigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      clickedNav: navOptions.all,
      clickedGenre: null,
      showGenreDropdown: false,
    }

    this.showGenreDropdown = this.showGenreDropdown.bind(this);
    this.closeGenreDropdown = this.closeGenreDropdown.bind(this);
    this.filterFilms = this.updateFilmNav.bind(this);
    this.filterGenre = this.updateGenreNav.bind(this);
  }

  showGenreDropdown(event){
    event.preventDefault();
    this.setState({ showGenreDropdown: true, clickedNav: navOptions.genre },  () => {
      document.addEventListener('click', this.closeGenreDropdown);
    });
  }
  closeGenreDropdown(event){
    this.setState({ showGenreDropdown: false}, () => {
      document.removeEventListener('click', this.closeGenreDropdown);
    });
  }

  updateFilmNav(filter){
      this.setState({ clickedNav: filter, clickedGenre: null });
      this.props.updateFilter(filter);
  }
  updateGenreNav(genre){
    this.setState({ clickedGenre: genre});
    this.props.updateFilterGenre(genre);
  }

  update = (e) => {
    console.log(e.target.value);
    this.props.onUpdate(e.target.value);
    this.setState({fieldVal: e.target.value});
  };

  render() {
    return (
      <nav className="film-nav">
        <ul>
          <li className={this.state.clickedNav == navOptions.all ? 'active' : ''}>
            <a href="#" onClick={() => this.updateFilmNav(navOptions.all)}>{navOptions.all}</a>
          </li>
          <li className={this.state.clickedNav == navOptions.toprated ? 'active' : ''}>
            <a href="#" onClick={ () => this.updateFilmNav(navOptions.toprated)}>{navOptions.toprated}</a>
          </li>
          <li className={this.state.clickedNav == navOptions.new ? 'active' : ''}>
            <a href="#" onClick={ () => this.updateFilmNav(navOptions.new)}>{navOptions.new}</a>
          </li>
          <li className={this.state.clickedNav == navOptions.alphabetical ? 'active' : ''}>
            <a href="#" onClick={ () => this.updateFilmNav(navOptions.alphabetical)}>{navOptions.alphabetical}</a>
          </li>
          <li className={this.state.clickedNav == navOptions.genre ? 'active' : ''}>
            <a href="#" onClick={this.showGenreDropdown}>{navOptions.genre}  &#9660;</a>
            { this.state.showGenreDropdown ? (
              <ul class="nav-dropdown">
                  {
                    genres.map((genre) => {
                      return (
                        <li className={this.state.clickedGenre == genre ? 'active' : ''}>
                          <a href="#" onClick={ () => this.updateGenreNav(genre)}>{genre}</a>
                        </li>
                      )
                    }
                    )
                  }
              </ul>
            ) : ( null )
            }
          </li>
            
        </ul>
    </nav>
    );
  }
}


class FilmGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      filmData: films,
      filter: navOptions.all,
     };
    this.filterGenre = this.filterGenre.bind(this);
    this.filterNav = this.filterNav.bind(this);
  }  

  filterNav(filter){
    
    switch(filter) {
      case navOptions.all:
        {
          this.setState({ 
            filmData : films.sort(function(a, b){
              if(a.id > b.id){
                return 1;
              }else if(a.id < b.id){
                return -1;
              }else{
                return 0;
              }
            }) 
          });
        }
        break;
      case navOptions.toprated:
        {
          this.setState({ 
            filmData : films.sort(function(a, b){
              if(a.imdbRating < b.imdbRating){
                return 1;
              }else if(a.imdbRating > b.imdbRating){
                return -1;
              }else{
                return 0;
              }
            }) 
          });
        }
        break;
      case navOptions.new:
          {
            this.setState({ 
              filmData : films.sort(function(a, b){
                if(a.year < b.year){
                  return 1;
                }else if(a.year > b.year){
                  return -1;
                }else{
                  return 0;
                }
              }) 
            });
          }
          break;       
      case navOptions.alphabetical:
          {
            this.setState({ 
              filmData : films.sort(function(a, b){
                if(a.title > b.title){
                  return 1;
                }else if(a.title < b.title){
                  return -1;
                }else{
                  return 0;
                }
              }) 
            });
          }
          break;
    }

  }

  filterGenre(genre){
    this.setState({ 
      filmData : films.filter(function(film){
        return film.genres.includes(genre)
      }) 
    });
  }

  render() {
    return (
      <div>
        <FilmNavigation updateFilter={this.filterNav} updateFilterGenre={this.filterGenre}/>
      <div className="gallery-container">
        <h3>{this.state.filter} Independent Movies</h3>
        <div className="gallery-grid">
          {this.state.filmData.map(this.renderImageContent)}
        </div>
      </div>
      </div>

    )
  }

  renderImageContent(film, index) {
    return (
      <div className="film-container">
        <FilmContainer 
        id={film.id} 
        title={film.title} 
        rating={film.imdbRating} 
        year={film.year}  
        genres={film.genres}
        posterURL={film.posterurl} 
        storyline={film.storyline} 
        />
      </div>
    );
  }

}

/** Renders a single film object to the grid.
 * props: id, title, rating, genres, year, posterURL, storyline */
class FilmContainer extends React.Component {
    constructor(){
      super();
    }

    render () {
      const { id, title, rating, genres, year, posterURL, storyline } = this.props;
      return(
        <div className="film-tile">
          <div className="film-year">{year}</div>
          <div className="film-tag">
            <div className="film-title">{title}</div>
            <div className="film-genres">
              {genres.map((genre, i) => [ i > 0 && ", ", genre ])}
            </div>
            <div className="film-rating">{rating}</div>
          </div>
          <div className="film-info-cover">
            <div className="film-info-text">{storyline}</div>
          </div>
          <img className="film-img" src={posterURL} key={posterURL} />
        </div>
      );
    }
}

export default FilmGrid