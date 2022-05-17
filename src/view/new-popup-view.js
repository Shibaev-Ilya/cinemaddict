import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTaskDueDate, getRuntime} from '../utils.js';

const createPopupTemplate = (movie, commentData) => {

  const filmInfo = movie['film_info'];
  const comments = movie['comments'];

  const userDetails = movie['user_details'];
  const isWatchlist = userDetails['watchlist'];
  const isHistory = userDetails['already_watched'];
  const isFavorite = userDetails['favorite'];

  const setActive = (data) => {
    if (data) {
      return 'film-details__control-button--active';
    }
    return '';
  };

  const getGenres = (genres) => {
    const container = {
      'title': '',
      'list': ''
    };
    genres.forEach((genre) => {
      container.list += `<span class="film-details__genre">${genre}</span>`;
    });
    if (genres.length > 1) {
      container.title = 'Genres';
    } else {
      container.title = 'Genre';
    }
    return container;
  };

  const getList = (list) => list.join(', ');

  const getComments = () => {
    let commentsData = '';
    for(const comment of comments) {
      if (commentData[comment] === undefined) {
        continue;
      }
      commentsData += `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${commentData[comment]['emotion']}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${commentData[comment]['comment']}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentData[comment]['author']}</span>
                <span class="film-details__comment-day">${humanizeTaskDueDate(commentData[comment]['date'], 'YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    }
    return commentsData;
  };

  const genresData = getGenres(filmInfo['genre']);
  const genersTitle = genresData['title'];
  const genersList = genresData['list'];

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo['poster']}" alt="">

          <p class="film-details__age">${filmInfo['age_rating']}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo['title']}</h3>
              <p class="film-details__title-original">${filmInfo['alternative_title']}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo['total_rating']}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo['director']}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${getList(filmInfo['writers'])}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${getList(filmInfo['actors'])}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeTaskDueDate(filmInfo['release']['date'], 'DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getRuntime(filmInfo['runtime'])}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo['release']['release_country']}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genersTitle}</td>
              <td class="film-details__cell">
                ${genersList}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${filmInfo['description']}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${setActive(isWatchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${setActive(isHistory)}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${setActive(isFavorite)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${getComments()}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class NewPopupView extends AbstractView {
  #movie = null;
  #comments = null;

  constructor(movie, comments) {
    super();
    this.#movie = movie;
    this.#comments = comments;
  }

  get template() {
    return createPopupTemplate(this.#movie, this.#comments);
  }

  setClickHandler = (callback) => {
    this._callback.clickAddPopup = callback;
    this.element.addEventListener('click', this.#clickAddPopupHandler);
  };

  #clickAddPopupHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickAddPopup();
  };

  setClickCloseHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setClickControlsHandler = () => {
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#clickControlsHandler);
  };

  #clickControlsHandler = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('film-details__control-button--active');
  };

}
