import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTaskDueDate, getRuntime} from '../utils.js';

const createNewFilmCardTemplate = (movie) => {

  const filmInfo = movie['film_info'];
  const userDetails = movie['user_details'];
  const comments = movie['comments'];
  const isWatchlist = userDetails['watchlist'];
  const isHistory = userDetails['already_watched'];
  const isFavorite = userDetails['favorite'];

  const setActive = (data) => {
    if (data) {
      return 'film-card__controls-item--active';
    }
  };

  const getGenres = (genre) => genre.join(', ');
  const commentsAmount = comments.length > 1 ? `${comments.length} comments` : `${comments.length} comment`;

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo['title']}</h3>
            <p class="film-card__rating">${filmInfo['total_rating']}</p>
            <p class="film-card__info">
              <span class="film-card__year">${humanizeTaskDueDate(filmInfo['release']['date'], 'YYYY')}</span>
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

export default class NewFilmCardView extends AbstractView {

  constructor(movie) {
    super();
    this.movie = movie;
  }

  get template() {
    return createNewFilmCardTemplate(this.movie);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

}
