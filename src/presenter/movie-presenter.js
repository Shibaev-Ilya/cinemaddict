import NewFilmCardView from '../view/new-film-card-view.js';
import {render, replace, remove} from '../framework/render.js';
import NewPopupView from '../view/new-popup-view.js';
import {UserAction, ActionType} from '../utils.js';

export default class MoviePresenter {
  #filmListContainer = null;
  #movieCard = null;
  #changeData = null;
  #comments = null;
  #closePopup = null;

  constructor(filmListContainer, comments, closePopup, changeData) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#comments = comments;
    this.#closePopup = closePopup;
  }

  init(movie) {
    const movieComponent = this.#movieCard;

    this.#movieCard = new NewFilmCardView(movie);
    this.#renderPopup(movie, this.#comments, this.#movieCard, this.#closePopup);

    this.#movieCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#movieCard.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCard.setWatchListClickHandler(this.#handleWatchListClick);

    if (movieComponent === null) {
      render(this.#movieCard, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(movieComponent.element)) {
      replace(this.#movieCard, movieComponent);
    }

  }

  destroy = () => {
    remove(this.#movieCard);
  };

  #renderPopup = (movie, comments, card, callback) => {
    const body = document.querySelector('body');
    const popupView = new NewPopupView(movie, comments);

    popupView.setWatchListClickHandler(this.#handleWatchListClick);
    popupView.setWatchedClickHandler(this.#handleWatchedClick);
    popupView.setFavoriteClickHandler(this.#handleFavoriteClick);
    popupView.setFormSubmit(this.#handleFormSubmit);

    const removePopup = () => {
      body.classList.remove('hide-overflow');
      popupView.element.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    const addPopup = () => {
      callback();

      body.classList.add('hide-overflow');
      body.append(popupView.element);
      popupView.setClickCloseHandler(removePopup);
      document.addEventListener('keydown', onEscKeyDown);
    };

    card.setClickAddPopupHandler(addPopup);
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_DETAILS,
      ActionType.MINOR,
      {...this.#movieCard.movie, userDetails: {...this.#movieCard.movie.userDetails, favorite: !this.#movieCard.movie.userDetails.favorite}}
    );
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_DETAILS,
      ActionType.MINOR,
      {...this.#movieCard.movie, userDetails: { ...this.#movieCard.movie.userDetails, alreadyWatched: !this.#movieCard.movie.userDetails.alreadyWatched}}
    );
  };

  #handleWatchListClick = () => {
    this.#changeData(
      UserAction.UPDATE_DETAILS,
      ActionType.MINOR,
      {...this.#movieCard.movie, userDetails: { ...this.#movieCard.movie.userDetails, watchlist: !this.#movieCard.movie.userDetails.watchlist}}
    );
  };

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.UPDATE_DETAILS,
      ActionType.MINOR,
      task
    );
  };
}
