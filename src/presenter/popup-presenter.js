import PopupView from '../view/popup-view.js';
import {ActionType, UserAction} from '../utils.js';

export default class PopupPresenter {

  #popupView = null;
  #movie = null;
  #commentsModel = null;
  #movieCard = null;
  #changeData = null;
  #moviesModel = null;
  #comments = [];


  constructor(movie, commentsModel, moviesModel, cardView, changeData) {
    this.#movie = movie;
    this.#commentsModel = commentsModel;
    this.#movieCard = cardView;
    this.#changeData = changeData;
    this.#moviesModel = moviesModel;
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#moviesModel.addObserver(this.#handleModelEvent);

  }

  init() {
    this.#popupView = new PopupView(this.#movie);
    this.#renderPopup();
    this.loadComments();
  }

  #renderPopup = () => {
    this.#popupView.setWatchListClickHandler(this.#handleWatchListClick);
    this.#popupView.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupView.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#popupView.setFormStateToDataSubmit(this.#handleFormSubmit);
    this.#popupView.setClickDeleteHandler(this.#handleDeleteComment);
    this.#popupView.setAddCommentHandlers(this.#handleAddNewComment);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case ActionType.PATCH_COMMENT:
        this.#popupView._setState({
          comments: data.comments,
        });
        break;
      case ActionType.MINOR:
        this.#popupView._setState({
          userDetails: data.userDetails,
        });
        break;
    }
  };

  loadComments = async () => {
    this.#comments = await this.#commentsModel.getComments(this.#movie.id);

    this.#popupView.updateElement({
      comments: this.#comments,
    });
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
      ActionType.DELETE_COMMENT,
      data
    );
  };

  #handleAddNewComment = (data) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      ActionType.PATCH_COMMENT,
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
