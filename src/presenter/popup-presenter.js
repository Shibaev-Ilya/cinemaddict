import NewPopupView from '../view/new-popup-view.js';
import {ActionType, UserAction} from '../utils.js';

export default class PopupPresenter {

  #newPopupView = null;
  #movie = null;
  #comments = null;
  #movieCard = null;
  #changeData = null;


  constructor(movie, comments, cardView, changeData) {
    this.#movie = movie;
    this.#comments = comments;
    this.#movieCard = cardView;
    this.#changeData = changeData;
    this.#newPopupView = new NewPopupView(movie, comments);
  }

  init() {
    this.#renderPopup();
  }

  #closeOpenedPopup = () => {
    const popup = document.querySelector('.film-details');
    if(popup !== null) {
      popup.remove();
    }
  };

  #renderPopup = () => {
    const body = document.querySelector('body');

    this.#newPopupView.setWatchListClickHandler(this.#handleWatchListClick);
    this.#newPopupView.setWatchedClickHandler(this.#handleWatchedClick);
    this.#newPopupView.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#newPopupView.setFormStateToDataSubmit(this.#handleFormSubmit);
    this.#newPopupView.setClickDeleteHandler(this.#handleDeleteComment);
    this.#newPopupView.setAddCommentHandlers(this.#handleAddNewComment);

    const removePopup = () => {
      body.classList.remove('hide-overflow');
      this.#newPopupView.element.remove();
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
      this.#closeOpenedPopup();
      body.classList.add('hide-overflow');
      body.append(this.#newPopupView.element);
      this.#newPopupView.setClickCloseHandler(removePopup);
      document.addEventListener('keydown', onEscKeyDown);
    };

    this.#movieCard.setClickAddPopupHandler(addPopup);
  };

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.UPDATE_DETAILS,
      ActionType.MINOR,
      task
    );
  };

  #handleDeleteComment = (data) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      ActionType.MINOR,
      data
    );
  };

  #handleAddNewComment = (data) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      ActionType.MINOR,
      data
    );
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

}
