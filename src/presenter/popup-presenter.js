import NewPopupView from '../view/new-popup-view.js';
import {ActionType, UserAction} from '../utils.js';

export default class PopupPresenter {

  #newPopupView = null;
  #movie = null;
  #movieCard = null;
  #changeData = null;


  constructor(movie, cardView, changeData) {
    this.#movie = movie;
    this.#movieCard = cardView;
    this.#changeData = changeData;
    this.#newPopupView = new NewPopupView(movie);
  }

  init() {
    this.#renderPopup();
  }

  #renderPopup = () => {
    this.#newPopupView.setWatchListClickHandler(this.#handleWatchListClick);
    this.#newPopupView.setWatchedClickHandler(this.#handleWatchedClick);
    this.#newPopupView.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#newPopupView.setFormStateToDataSubmit(this.#handleFormSubmit);
    this.#newPopupView.setClickDeleteHandler(this.#handleDeleteComment);
    this.#newPopupView.setAddCommentHandlers(this.#handleAddNewComment);
    this.#movieCard.setClickAddPopupHandler(this.#handleGetComments);
  };

  #handleFormSubmit = (movie) => {
    this.#changeData(
      UserAction.UPDATE_DETAILS,
      ActionType.MINOR,
      movie
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

  #handleGetComments = (movieId) => {
    this.#newPopupView.addPopup();
    this.#changeData(
      UserAction.GET_COMMENTS,
      ActionType.COMMENTS_INIT,
      movieId
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
