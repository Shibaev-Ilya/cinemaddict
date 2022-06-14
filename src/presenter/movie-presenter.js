import FilmCardView from '../view/film-card-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, ActionType} from '../utils.js';
import PopupPresenter from './popup-presenter.js';


export default class MoviePresenter {
  #filmListContainer = null;
  #movieCard = null;
  #changeData = null;
  #commentsModel = null;

  constructor(filmListContainer, commentsModel, changeData) {

    this.#filmListContainer = filmListContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel = commentsModel;

  }

  init(movie) {
    const movieComponent = this.#movieCard;

    this.#movieCard = new FilmCardView(movie);

    this.#movieCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#movieCard.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCard.setWatchListClickHandler(this.#handleWatchListClick);

    this.#movieCard.setClickAddPopupHandler(this.#handleAddPopupClick);

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


  #handleAddPopupClick = (movie) => {
    const popupPresenter = new PopupPresenter(movie, this.#commentsModel, this.movieCard, this.#changeData);
    popupPresenter.init();
  };

}
