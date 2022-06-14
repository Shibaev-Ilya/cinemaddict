import {render, remove} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import EmptyListView from '../view/empty-view.js';
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
  #filterView = null;
  #sortView = null;
  #moviePresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.FILTER_ALL;
  #emptyListView = null;

  #filmsView = new FilmsView;
  #filmListView = new FilmListView;
  #filmListContainerView = new FilmListContainerView;
  #showMorePresenter = new ShowMorePresenter(this.#filmsView.element);
  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(filmsContainer, moviesModel, commentsModel, filterModel) {
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filmsContainer = filmsContainer;
    this.#filterModel = filterModel;

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
      case ActionType.PATCH_COMMENT:
        this.#moviePresenters.get(data.movie.id).init(data.movie);
        break;
      case ActionType.DELETE_COMMENT:
        this.#moviePresenters.get(data.movie.id).init(data.movie);
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
    render(this.#loadingComponent, this.#filmListContainerView.element);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#filmListContainerView.element,  this.#commentsModel, this.#moviesModel, this.#handleViewAction);
    moviePresenter.init(movie);

    this.#moviePresenters.set(movie.id, moviePresenter);
  };

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie));
  };

  #handleShowMoreButtonClick = () => {
    const moviesCount = this.movies.length;
    const renderedMovieCount = Math.min(moviesCount, this.#renderedFilmCount + FILM_PER_PAGE);
    const movies = this.movies.slice(this.#renderedFilmCount, renderedMovieCount);
    this.#renderMovies(movies);
    this.#renderedFilmCount += FILM_PER_PAGE;

    if (moviesCount <= this.#renderedFilmCount) {
      this.#showMorePresenter.buttonShowMoreView.element.remove();
      this.#showMorePresenter.buttonShowMoreView.removeElement();
    }
  };

  #renderButtonShowMore = () => {
    this.#showMorePresenter.init(this.#handleShowMoreButtonClick);
  };

  #renderEmptyList = () => {
    this.#emptyListView = new EmptyListView(this.#filterType);
    render(this.#emptyListView, this.#filmListContainerView.element);
  };

  #renderFilmList = (movies) => {
    const moviesCount = movies.length;
    this.#renderMovies(movies.slice(0, Math.min(moviesCount, this.#renderedFilmCount)));

    if (moviesCount > this.#renderedFilmCount) {
      this.#renderButtonShowMore();
    }
  };

  #renderSort = () => {
    this.#sortView = new SortView(this.#currentSortType);
    this.#sortView.setClickSortHandler(this.#sortMovies);
    render(this.#sortView, this.#filmsContainer);
  };

  #sortMovies = (data) => {
    this.#currentSortType = data;
    this.#clearBoard({resetRenderedMovieCount: true, resetSortType: false});
    this.#renderBoard();
  };

  #clearBoard = ({resetRenderedMovieCount = false, resetSortType = false} = {}) => {

    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();

    remove(this.#filterView);
    remove(this.#sortView);
    remove(this.#loadingComponent);
    remove(this.#emptyListView);
    remove(this.#loadingComponent);
    remove(this.#showMorePresenter.buttonShowMoreView);

    if (resetRenderedMovieCount) {
      this.#renderedFilmCount = FILM_PER_PAGE;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard() {

    if (this.#isLoading) {
      render(this.#filmsView, this.#filmsContainer);
      render(this.#filmListView, this.#filmsView.element);
      render(this.#filmListContainerView, this.#filmListView.element);
      this.#renderLoading();
      return;
    }

    const movies = this.movies;
    const moviesCount = movies.length;

    if (moviesCount > 0) {
      this.#renderSort();
    }

    render(this.#filmsView, this.#filmsContainer);
    render(this.#filmListView, this.#filmsView.element);
    render(this.#filmListContainerView, this.#filmListView.element);

    if (moviesCount === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmList(movies);

  }
}
