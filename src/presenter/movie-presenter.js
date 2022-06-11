import NewFilmCardView from '../view/new-film-card-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, ActionType} from '../utils.js';
import PopupPresenter from './popup-presenter.js';

export default class MoviePresenter {
  #filmListContainer = null;
  #movieCard = null;
  #changeData = null;
  #popupPresenter = null;
  #commentsModel = null;
  #comments = null;

  constructor(filmListContainer, changeData, commentsModel) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#commentsModel = commentsModel;
  }

  init(movie) {
    const movieComponent = this.#movieCard;

    this.#movieCard = new NewFilmCardView(movie);

    this.#movieCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#movieCard.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCard.setWatchListClickHandler(this.#handleWatchListClick);
    this.#movieCard.setClickAddPopupHandler(this.#handleGetComments);

    this.#popupPresenter = new PopupPresenter(movie, this.#movieCard, this.#changeData);

    if (movieComponent === null) {
      render(this.#movieCard, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(movieComponent.element)) {
      replace(this.#movieCard, movieComponent);
    }

  }

  #handleModelEvent = (updateType, comments) => {

    switch (updateType) {
      case ActionType.COMMENTS_INIT:
        this.#comments = comments;
        break;
    }
    this.#popupPresenter.init(this.#comments);
  };

  get movieCard() {
    return this.#movieCard;
  }

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

  #handleGetComments = (movieId) => {
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#changeData(
      UserAction.GET_COMMENTS,
      ActionType.COMMENTS_INIT,
      movieId
    );
  };

  destroy = () => {
    remove(this.#movieCard);
  };

}
