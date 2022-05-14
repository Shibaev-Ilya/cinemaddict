import AbstractView from '../framework/view/abstract-view.js';

const createNewMenuTemplate = (movies) => {
  const inWatchlist = movies.filter((movie) => movie['user_details']['watchlist']);
  const inHistory = movies.filter((movie) => movie['user_details']['already_watched']);
  const inFavorites = movies.filter((movie) => movie['user_details']['favorite']);

  return (`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${inWatchlist.length}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${inHistory.length}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${inFavorites.length}</span></a>
  </nav>`);
};

export default class NewMenuView extends AbstractView {

  constructor(movies) {
    super();
    this.movies = movies;
  }

  get template() {
    return createNewMenuTemplate(this.movies);
  }

}
