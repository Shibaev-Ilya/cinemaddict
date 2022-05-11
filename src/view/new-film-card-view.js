import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTaskDueDate, getRuntime} from '../utils.js';

const createNewFilmCardTemplate = (movie, commentData) => {

  const id = movie['id'];
  const filmInfo = movie['film_info'];

  const getGenres = (genre) => genre.join(', ');
  const commentsAmount = commentData[id].length > 1 ? `${commentData[id].length} comments` : `${commentData[id].length} comment`;

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
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class NewFilmCardView extends AbstractView {

  constructor(movie, comments) {
    super();
    this.movie = movie;
    this.comments = comments;
  }

  get template() {
    return createNewFilmCardTemplate(this.movie, this.comments);
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
