import {createElement} from '../render.js';
import {humanizeTaskDueDate, getRuntime} from '../utils.js'

const createNewFilmCardTemplate = (movie, commentData) => {

  const {id, comments, film_info, user_details} = movie;
  const getGenres = (genre) => genre.join(", ");
  const commentsAmount = commentData[id].length > 1 ? `${commentData[id].length} comments` : `${commentData[id].length} comment`;

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${film_info["title"]}</h3>
            <p class="film-card__rating">${film_info["total_rating"]}</p>
            <p class="film-card__info">
              <span class="film-card__year">${humanizeTaskDueDate(film_info["release"]["date"], 'YYYY')}</span>
              <span class="film-card__duration">${getRuntime(film_info["runtime"])}</span>
              <span class="film-card__genre">${getGenres(film_info["genre"])}</span>
            </p>
            <img src="${film_info["poster"]}" alt="${film_info["title"]}" class="film-card__poster">
            <p class="film-card__description">${film_info["description"].substring(0, 70)}...</p>
            <span class="film-card__comments">${commentsAmount}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`
};

export default class NewFilmCardView {

  constructor(movie, comments) {
    this.movie = movie;
    this.comments = comments;
  }

  getTemplate() {
    return createNewFilmCardTemplate(this.movie, this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}
