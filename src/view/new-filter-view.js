import AbstractView from '../framework/view/abstract-view.js';

const createNewFilterTemplate = (movies) => {
  const inWatchlist = movies.filter((movie) => movie['userDetails']['watchlist']);
  const inHistory = movies.filter((movie) => movie['userDetails']['alreadyWatched']);
  const inFavorites = movies.filter((movie) => movie['userDetails']['favorite']);

  return (`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${inWatchlist.length}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${inHistory.length}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${inFavorites.length}</span></a>
  </nav>`);
};

export default class NewFilterView extends AbstractView {

  constructor(movies) {
    super();
    this.movies = movies;
  }

  get template() {
    return createNewFilterTemplate(this.movies);
  }

}
