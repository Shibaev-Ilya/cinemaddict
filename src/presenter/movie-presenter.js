import NewFilmCardView from '../view/new-film-card-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, ActionType} from '../utils.js';

export default class MoviePresenter {
  #filmListContainer = null;
  #movieCard = null;
  #changeData = null;
  #comments = null;

  constructor(filmListContainer, comments, changeData) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#comments = comments;
  }

  init(movie) {
    const movieComponent = this.#movieCard;

    this.#movieCard = new NewFilmCardView(movie);

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

  destroy = () => {
    remove(this.#movieCard);
  };

}
