import {render, remove} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import NewEmptyListView from '../view/empty-view.js';
import SortView from '../view/sort-view.js';
import MoviePresenter from './movie-presenter.js';
import ShowMorePresenter from './show-more-presenter.js';
import {sortRatingUp, sortMovieDate, SortType, UserAction, ActionType, filter, FilterType} from '../utils.js';
import LoadingView from '../view/loading-view.js';

const FILM_PER_PAGE = 5;

export default class FilmsPresenter {
  #moviesModel = null;
  #filterModel = null;
  #commentsModel = null;
  #filmsContainer = null;
  #renderedFilmCount = FILM_PER_PAGE;
  #newFilterView = null;
  #newSortView = null;
  #moviePresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.FILTER_ALL;
  #newEmptyListView = null;

  #newFilmsView = new FilmsView;
  #newFilmListView = new FilmListView;
  #newFilmListContainerView = new FilmListContainerView;
  #showMorePresenter = new ShowMorePresenter(this.#newFilmsView.element);
  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(FilmsContainer, MoviesModel, CommentsModel, FilterModel) {
    this.#moviesModel = MoviesModel;
    this.#commentsModel = CommentsModel;
    this.#filmsContainer = FilmsContainer;
    this.#filterModel = FilterModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    this.#filterType = this.#filterModel.filter;
    const movies = this.#moviesModel.movies;
    const filteredMovies = filter[this.#filterType](movies);

    switch (this.#currentSortType) {
      case SortType.SORT_RATING:
        return filteredMovies.slice().sort(sortRatingUp);
      case SortType.SORT_DATE:
        return filteredMovies.slice().sort(sortMovieDate);
    }

    return filteredMovies;
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {

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
      case UserAction.GET_COMMENTS:
        this.#commentsModel.getComments(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case ActionType.PATCH:
        this.#moviePresenters.get(data.id).init(data);
        break;
      case ActionType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case ActionType.MAJOR:
        this.#clearBoard({resetRenderedMovieCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case ActionType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#newFilmListContainerView.element);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#newFilmListContainerView.element,  this.#commentsModel, this.#handleViewAction);
    moviePresenter.init(movie);

    this.#moviePresenters.set(movie.id, moviePresenter);
  };

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie));
  };

  #handleShowMoreButtonClick = () => {
    const moviesCount = this.movies.length;
    const newRenderedMovieCount = Math.min(moviesCount, this.#renderedFilmCount + FILM_PER_PAGE);
    const movies = this.movies.slice(this.#renderedFilmCount, newRenderedMovieCount);
    this.#renderMovies(movies);
    this.#renderedFilmCount += FILM_PER_PAGE;

    if (moviesCount <= this.#renderedFilmCount) {
      this.#showMorePresenter.newButtonShowMoreView.element.remove();
      this.#showMorePresenter.newButtonShowMoreView.removeElement();
    }
  };

  #renderButtonShowMore = () => {
    this.#showMorePresenter.init(this.#handleShowMoreButtonClick);
  };

  #renderEmptyList = () => {
    this.#newEmptyListView = new NewEmptyListView(this.#filterType);
    render(this.#newEmptyListView, this.#newFilmListContainerView.element);
  };

  #renderFilmList = (movies) => {
    const moviesCount = movies.length;
    this.#renderMovies(movies.slice(0, Math.min(moviesCount, this.#renderedFilmCount)));

    if (moviesCount > this.#renderedFilmCount) {
      this.#renderButtonShowMore();
    }
  };

  #renderSort = () => {
    this.#newSortView = new SortView(this.#currentSortType);
    this.#newSortView.setClickSortHandler(this.#sortMovies);
    render(this.#newSortView, this.#filmsContainer);
  };

  #sortMovies = (data) => {
    this.#currentSortType = data;
    this.#clearBoard({resetRenderedMovieCount: true, resetSortType: false});
    this.#renderBoard();
  };

  #clearBoard = ({resetRenderedMovieCount = false, resetSortType = false} = {}) => {

    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();

    remove(this.#newFilterView);
    remove(this.#newSortView);
    remove(this.#loadingComponent);
    remove(this.#newEmptyListView);
    remove(this.#loadingComponent);
    remove(this.#showMorePresenter.newButtonShowMoreView);

    if (resetRenderedMovieCount) {
      this.#renderedFilmCount = FILM_PER_PAGE;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard() {

    if (this.#isLoading) {
      render(this.#newFilmsView, this.#filmsContainer);
      render(this.#newFilmListView, this.#newFilmsView.element);
      render(this.#newFilmListContainerView, this.#newFilmListView.element);
      this.#renderLoading();
      return;
    }

    const movies = this.movies;
    const moviesCount = movies.length;

    if (moviesCount > 0) {
      this.#renderSort();
    }

    render(this.#newFilmsView, this.#filmsContainer);
    render(this.#newFilmListView, this.#newFilmsView.element);
    render(this.#newFilmListContainerView, this.#newFilmListView.element);

    if (moviesCount === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmList(movies);

  }
}
