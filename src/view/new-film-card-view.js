import {createElement} from '../render.js';
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

export default class NewFilmCardView {
  #element = null;

  constructor(movie, comments) {
    this.movie = movie;
    this.comments = comments;
  }

  get template() {
    return createNewFilmCardTemplate(this.movie, this.comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
