import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, getRuntime} from '../utils.js';

const createNewFilmCardTemplate = (movie) => {
  const filmInfo = movie['film_info'];
  const userDetails = movie['userDetails'];
  const comments = movie['comments'];
  const isWatchlist = userDetails['watchlist'];
  const isHistory = userDetails['alreadyWatched'];
  const isFavorite = userDetails['favorite'];

  const setActive = (data) => {
    if (data) {
      return 'film-card__controls-item--active';
    }
    return '';
  };

  const getGenres = (genre) => genre.join(', ');
  const commentsAmount = comments.length > 1 ? `${comments.length} comments` : `${comments.length} comment`;

  return `<article class="film-card" data-id="${movie.id}">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo['title']}</h3>
            <p class="film-card__rating">${filmInfo['total_rating']}</p>
            <p class="film-card__info">
              <span class="film-card__year">${humanizeDate(filmInfo['release']['date'], 'YYYY')}</span>
              <span class="film-card__duration">${getRuntime(filmInfo['runtime'])}</span>
              <span class="film-card__genre">${getGenres(filmInfo['genre'])}</span>
            </p>
            <img src="${filmInfo['poster']}" alt="${filmInfo['title']}" class="film-card__poster">
            <p class="film-card__description">${filmInfo['description'].substring(0, 139)}...</p>
            <span class="film-card__comments">${commentsAmount}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${setActive(isWatchlist)}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${setActive(isHistory)}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${setActive(isFavorite)}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {

  constructor(movie) {
    super();
    this.movie = movie;
  }

  get template() {
    return createNewFilmCardTemplate(this.movie);
  }

  setClickAddPopupHandler = (callback) => {
    this._callback.clickAddPopup = callback;
    this.element.addEventListener('click', this.#clickAddPopupHandler);
  };

  #clickAddPopupHandler = (evt) => {
    evt.preventDefault();
    const buttons = evt.target.closest('.film-card__controls');
    if (buttons) {
      return;
    }

    this._callback.clickAddPopup(this.movie);

  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteHandler);
  };

  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
    evt.target.classList.toggle('film-card__controls-item--active');
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListHandler);
  };

  #watchListHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
    evt.target.classList.toggle('film-card__controls-item--active');
  };


  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedHandler);
  };

  #watchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
    evt.target.classList.toggle('film-card__controls-item--active');
  };

}
