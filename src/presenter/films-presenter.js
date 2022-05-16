import {render} from '../framework/render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewButtonShowMoreView from '../view/new-button-show-more-view.js';
import NewEmptyListView from '../view/new-empty-view.js';
import NewMenuView from '../view/new-menu-view.js';
import NewFilterView from '../view/new-filter-view.js';
import MoviePresenter from './movie-presenter.js';
import ShowMorePresenter from "./show-more-presenter.js";

const FILM_PER_PAGE = 5;

export default class FilmsPresenter {
  #moviesModel = null;
  #FilmsContainer = null;
  #boardMovies = [];
  #comments = null;
  #renderedFilmCount = FILM_PER_PAGE;
  #newMenuView = null;

  constructor(FilmsContainer, MoviesModel) {
    this.#moviesModel = MoviesModel;
    this.#FilmsContainer = FilmsContainer;
  }

  init() {
    this.#boardMovies = [...this.#moviesModel.movies];
    this.#comments = [...this.#moviesModel.comments];
    this.#renderBoard();
  }

  #newFilmsView = new NewFilmsView;
  #newFilmListView = new NewFilmListView;
  #newFilmListContainerView = new NewFilmListContainerView;
  #showMorePresenter = new ShowMorePresenter(this.#newFilmsView.element);
  #newEmptyListView = new NewEmptyListView;
  #newFilterView = new NewFilterView;

  #renderMovie = (movie, comments) => {
    const moviePresenter = new MoviePresenter(this.#newFilmListContainerView.element);
    moviePresenter.init(movie, comments);
  };

  #renderMovies = (movies, from, to) => {
    let moviesData = movies.slice(from, to);
    moviesData.forEach((movie) => this.#renderMovie(movie, this.#comments));
  };

  #handleShowMoreButtonClick = () => {
    this.#renderMovies(this.#boardMovies, this.#renderedFilmCount, this.#renderedFilmCount + FILM_PER_PAGE);
    this.#renderedFilmCount += FILM_PER_PAGE;

    if (this.#boardMovies.length <= this.#renderedFilmCount) {
      this.#showMorePresenter.newButtonShowMoreView.element.remove();
      this.#showMorePresenter.newButtonShowMoreView.removeElement();
    }
  };

  #renderButtonShowMore = () => {
    this.#showMorePresenter.init(this.#handleShowMoreButtonClick);
  };

  #renderMenu = () => {
    this.#newMenuView = new NewMenuView(this.#boardMovies);
    render(this.#newMenuView, this.#FilmsContainer);
  };

  #renderEmptyList = () => {
    render(this.#newEmptyListView, this.#newFilmListContainerView.element);
  };

  #renderFilmList = () => {
    this.#renderMovies(this.#boardMovies, 0, Math.min(this.#boardMovies.length, FILM_PER_PAGE));
  };

  #renderBoard() {
    this.#renderMenu();

    render(this.#newFilterView, this.#FilmsContainer);
    render(this.#newFilmsView, this.#FilmsContainer);
    render(this.#newFilmListView, this.#newFilmsView.element);
    render(this.#newFilmListContainerView, this.#newFilmListView.element);

    if (this.#boardMovies.length <= 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmList();

    if (this.#boardMovies.length > FILM_PER_PAGE) {
      this.#renderButtonShowMore();
    }
  };
}
