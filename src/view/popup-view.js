import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getRuntime, humanizeDate} from '../utils.js';
import he from 'he';

const createPopupTemplate = (state) => {
  const filmInfo = state.movie['film_info'];
  const comments = state['comments'];

  const userDetails = state.movie['userDetails'];
  const isWatchlist = userDetails['watchlist'];
  const isHistory = userDetails['alreadyWatched'];
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

    container.title = genres.length > 1 ? 'Genres': 'Genre';

    return container;
  };

  const getList = (list) => list.join(', ');

  const getComments = () => {
    let commentsData = '';
    if (comments.length !== 0) {
      for (const comment of comments) {
        if (comment === undefined) {
          continue;
        }
        commentsData += `<li class="film-details__comment js-comment" data-comment-id="${comment.id}">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment['emotion']}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment['comment'])}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment['author']}</span>
                <span class="film-details__comment-day">${humanizeDate(comment['date'], 'YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete js-delete-comment">Delete</button>
              </p>
            </div>
          </li>`;
      }
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
              <td class="film-details__cell">${humanizeDate(filmInfo['release']['date'], 'DD MMMM YYYY')}</td>
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
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${setActive(isWatchlist)}" id="watchlist" name="watchlist">
        Add to watchlist
        </button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${setActive(isHistory)}" id="watched" name="watched">
        Already watched
        </button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${setActive(isFavorite)}" id="favorite" name="favorite">
        Add to favorites
        </button>
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

export default class PopupView extends AbstractStatefulView {
  #newComment = null;
  #emoji = 'smile';
  #movieId = null;

  constructor(movie) {
    super();
    this.#movieId = movie.id;
    this._state = PopupView.parseDataToState({
      movie: {...movie},
      comments: [],
      scrollPosition: {
        'x': 0,
        'y': 0,
        'height': 0,}
    });
    this.addPopup();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.element.scrollTo(this._state.scrollPosition.x, this._state.scrollPosition.y);

    this.setAddCommentHandlers(this._callback.addNewComment);
    this.setClickCloseHandler(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setClickDeleteHandler(this._callback.deleteClick);
  };

  #updateStateElement = () => {
    this.#saveScrollPositionHandler();
    this.updateElement(this._state);
    const offset = this.element.scrollHeight - this._state.scrollPosition.height;
    this.element.scrollTo(this._state.scrollPosition.x, this._state.scrollPosition.y + offset);
  };

  #saveScrollPositionHandler = () => {
    this._setState({scrollPosition: {
      'x': this.element.scrollLeft,
      'y': this.element.scrollTop,
      'height': this.element.scrollHeight,
    }});
  };

  setClickDeleteHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelectorAll('.js-comment').forEach((el) => el.addEventListener('click', this.#clickDeleteHandler));
  };

  #clickDeleteHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('js-delete-comment')) {

      const commentId = evt.currentTarget.dataset.commentId;

      evt.currentTarget.remove();

      const index = this._state['comments'].findIndex((comment) => comment.id === commentId);

      this._state['comments'] = [
        ...this._state['comments'].slice(0, index),
        ...this._state['comments'].slice(index + 1),
      ];

      this._state['movie']['comments'] = [
        ...this._state['movie']['comments'].slice(0, index),
        ...this._state['movie']['comments'].slice(index + 1),
      ];

      this._callback.deleteClick({id: commentId, ...this._state});

      this.#updateStateElement();

    }
  };

  setAddCommentHandlers = (callback) => {
    this._callback.addNewComment = callback;
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#clickEmojiHandler);
    this.element.querySelector('.film-details__comment-label').addEventListener('keydown', this.#addCommentHandler);
  };

  #clickEmojiHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'IMG') {
      return;
    }

    const imgContainer = this.element.querySelector('.film-details__add-emoji-label');

    if (imgContainer.hasChildNodes()) {
      imgContainer.innerHTML = '';
    }

    const inputId = evt.target.parentElement.getAttribute('for');

    this.#emoji = this.element.querySelector(`#${inputId}`).value;

    imgContainer.append(evt.target.cloneNode());
  };

  #addCommentHandler = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();
      this.#newComment = {
        'comment': evt.target.value,
        'emotion': this.#emoji
      };

      this.#updateStateElement();

      this._callback.addNewComment({...this.#newComment, filmId: this.#movieId});
      this.#emoji = 'smile';
    }
  };

  setClickCloseHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteHandler);
  };

  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this._state['movie']['userDetails']['favorite'] = !this._state['movie']['userDetails']['favorite'];
    this._callback.favoriteClick();
    this.#updateStateElement();
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListHandler);
  };

  #watchListHandler = (evt) => {
    evt.preventDefault();
    this._state['movie']['userDetails']['watchlist'] = !this._state['movie']['userDetails']['watchlist'];
    this._callback.watchListClick();
    this.#updateStateElement();
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedHandler);
  };

  #watchedHandler = (evt) => {
    evt.preventDefault();
    this._state['movie']['userDetails']['alreadyWatched'] = !this._state['movie']['userDetails']['alreadyWatched'];
    this._callback.watchedClick();
    this.#updateStateElement();
  };

  setFormStateToDataSubmit = (callback) => {
    this._callback.setFormStateToDataSubmit = callback;
  };

  static parseDataToState = (data) => ({...data, scrollPosition: null});

  #removePopup = (cb) => {
    const body = document.querySelector('body');
    body.classList.remove('hide-overflow');
    const imgContainer = this.element.querySelector('.film-details__add-emoji-label');
    if (imgContainer.hasChildNodes()) {
      imgContainer.innerHTML = '';
    }
    this.element.querySelector('form').reset();
    this.element.remove();
    document.removeEventListener('keydown', cb);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #closeOpenedPopup = () => {
    const popup = document.querySelector('.film-details');
    if(popup !== null) {
      popup.remove();
    }
  };

  addPopup = () => {
    const body = document.querySelector('body');
    this.#closeOpenedPopup();
    body.classList.add('hide-overflow');
    body.append(this.element);
    this.setClickCloseHandler(this.#removePopup);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#saveScrollPositionHandler();
  };

}
