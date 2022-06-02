import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils.js';

const createNewFilterTemplate = (movies) => {
  const inWatchlist = movies.filter((movie) => movie['userDetails']['watchlist']);
  const inHistory = movies.filter((movie) => movie['userDetails']['alreadyWatched']);
  const inFavorites = movies.filter((movie) => movie['userDetails']['favorite']);

  return (`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type="${FilterType.FILTER_ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item" data-filter-type="${FilterType.FILTER_WATCHLIST}">Watchlist <span class="main-navigation__item-count">${inWatchlist.length}</span></a>
    <a href="#history" class="main-navigation__item" data-filter-type="${FilterType.FILTER_HISTORY}">History <span class="main-navigation__item-count">${inHistory.length}</span></a>
    <a href="#favorites" class="main-navigation__item" data-filter-type="${FilterType.FILTER_FAVORITES}">Favorites <span class="main-navigation__item-count">${inFavorites.length}</span></a>
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

  setClickFilterHandler = (callback) => {
    this._callback.clickFilterButton = callback;
    this.element.querySelectorAll('a').forEach( (el) => el.addEventListener('click', this.#clickFilterHandler));
  };

  #clickFilterHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFilterButton(evt.currentTarget.dataset.filterType);
  };

}
