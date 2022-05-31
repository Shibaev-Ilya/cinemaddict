import {render, remove} from '../framework/render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewEmptyListView from '../view/new-empty-view.js';
import NewMenuView from '../view/new-menu-view.js';
import NewFilterView from '../view/new-filter-view.js';
import MoviePresenter from './movie-presenter.js';
import ShowMorePresenter from './show-more-presenter.js';
import {sortRatingUp, sortMovieDate, SortType, UserAction, ActionType} from '../utils.js';

const FILM_PER_PAGE = 5;

export default class FilmsPresenter {
  #moviesModel = null;
  #commentsModel = null;
  #FilmsContainer = null;
  #comments = null;
  #renderedFilmCount = FILM_PER_PAGE;
  #newMenuView = null;
  #newFilterView = null;
  #moviePresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(FilmsContainer, MoviesModel, CommentsModel) {
    this.#moviesModel = MoviesModel;
    this.#commentsModel = CommentsModel;
    this.#FilmsContainer = FilmsContainer;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    switch (this.#currentSortType) {
      case SortType.SORT_RATING:
        return [...this.#moviesModel.movies].sort(sortRatingUp);
      case SortType.SORT_DATE:
        return [...this.#moviesModel.movies].sort(sortMovieDate);
    }

    return this.#moviesModel.movies;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {
    this.#comments = [...this.#commentsModel.comments];
    this.#renderBoard();
  }

  #newFilmsView = new NewFilmsView;
  #newFilmListView = new NewFilmListView;
  #newFilmListContainerView = new NewFilmListContainerView;
  #showMorePresenter = new ShowMorePresenter(this.#newFilmsView.element);
  #newEmptyListView = new NewEmptyListView;

  #closeOpenedPopup = () => {
    const popup = document.querySelector('.film-details');
    if(popup !== null) {
      popup.remove();
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_DETAILS:
        this.#moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    //console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case ActionType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#moviePresenters.get(data.id).init(data);
        break;
      case ActionType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#moviePresenters.get(data.id).init(data);
        break;
      case ActionType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#moviePresenters.get(data.id).init(data);
        break;
    }
  };

  #renderMovie = (movie, comments, callback) => {
    const moviePresenter = new MoviePresenter(this.#newFilmListContainerView.element, comments, callback, this.#handleViewAction);
    moviePresenter.init(movie);
    this.#moviePresenters.set(movie.id, moviePresenter);
  };

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie, this.#comments, this.#closeOpenedPopup));
  };

  #handleShowMoreButtonClick = () => {
    const moviesCount = this.movies.length;
    const newRenderedMovieCount = Math.min(moviesCount, this.#renderedFilmCount + FILM_PER_PAGE);
    const tasks = this.movies.slice(this.#renderedFilmCount, newRenderedMovieCount);
    this.#renderMovies(tasks);
    this.#renderedFilmCount += FILM_PER_PAGE;

    if (moviesCount <= this.#renderedFilmCount) {
      this.#showMorePresenter.newButtonShowMoreView.element.remove();
      this.#showMorePresenter.newButtonShowMoreView.removeElement();
    }
  };

  #renderButtonShowMore = () => {
    this.#showMorePresenter.init(this.#handleShowMoreButtonClick);
  };

  #clearMovieList = () => {
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();
    this.#renderedFilmCount = FILM_PER_PAGE;
    remove(this.#showMorePresenter.newButtonShowMoreView);
  };

  #renderMenu = () => {
    this.#newMenuView = new NewMenuView(this.movies);
    render(this.#newMenuView, this.#FilmsContainer);
  };

  #renderEmptyList = () => {
    render(this.#newEmptyListView, this.#newFilmListContainerView.element);
  };

  #renderFilmList = () => {
    const moviesCount = this.movies.length;
    const movies = this.movies.slice(0, Math.min(moviesCount,FILM_PER_PAGE));
    this.#renderMovies(movies);

    if (moviesCount > FILM_PER_PAGE) {
      this.#renderButtonShowMore();
    }
  };

  #renderFilter = (callback) => {
    this.#newFilterView = new NewFilterView;
    this.#newFilterView.setClickSortHandler(callback);
    render(this.#newFilterView, this.#FilmsContainer);
  };


  #filterMovies = (data) => {
    this.#currentSortType = data;
    this.#clearMovieList();
    this.#renderFilmList();
  };

  #renderBoard() {
    this.#renderMenu();

    if (this.movies.length > 0) {
      this.#renderFilter(this.#filterMovies);
    }

    render(this.#newFilmsView, this.#FilmsContainer);
    render(this.#newFilmListView, this.#newFilmsView.element);
    render(this.#newFilmListContainerView, this.#newFilmListView.element);

    if (this.movies.length <= 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmList();

  }
}
