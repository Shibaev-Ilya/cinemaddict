import {render} from '../framework/render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewFilmCardView from '../view/new-film-card-view.js';
import NewButtonShowMoreView from '../view/new-button-show-more-view.js';
import NewPopupView from '../view/new-popup-view.js';
import NewEmptyListView from '../view/new-empty-view.js';
import NewMenuView from '../view/new-menu-view.js';
import NewFilterView from '../view/new-filter-view.js';

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
  #newButtonShowMoreView = new NewButtonShowMoreView;
  #newEmptyListView = new NewEmptyListView;
  #newFilterView = new NewFilterView;

  #handleShowMoreButtonClick = () => {
    this.#boardMovies
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_PER_PAGE)
      .forEach((movie) => this.#renderFilm(movie['id']));

    this.#renderedFilmCount += FILM_PER_PAGE;

    if (this.#boardMovies.length <= this.#renderedFilmCount) {
      this.#newButtonShowMoreView.element.remove();
      this.#newButtonShowMoreView.removeElement();
    }
  };

  #renderPopup = (movie, popup, card) => {
    const body = document.querySelector('body');
    const popupView = new NewPopupView(movie, popup);

    const removePopup = () => {
      body.classList.remove('hide-overflow');
      popupView.element.remove();
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
      body.classList.add('hide-overflow');
      body.append(popupView.element);
      popupView.setClickCloseHandler(removePopup);
      document.addEventListener('keydown', onEscKeyDown);
    };

    card.setClickHandler(addPopup);

  };

  #renderFilm = (id) => {
    const filmCard = new NewFilmCardView(this.#boardMovies[id]);
    render(filmCard, this.#newFilmListContainerView.element);
    this.#renderPopup(this.#boardMovies[id], this.#comments, filmCard);
  };

  #renderMenu = () => {
    this.#newMenuView = new NewMenuView(this.#boardMovies);
    render(this.#newMenuView, this.#FilmsContainer);
  };

  #renderBoard() {
    this.#renderMenu();
    render(this.#newFilterView, this.#FilmsContainer);
    render(this.#newFilmsView, this.#FilmsContainer);
    render(this.#newFilmListView, this.#newFilmsView.element);
    render(this.#newFilmListContainerView, this.#newFilmListView.element);

    if (this.#boardMovies.length > 0) {
      for (let i = 0; i < Math.min(this.#boardMovies.length, FILM_PER_PAGE); i++) {
        this.#renderFilm(i);
      }
    } else {
      render(this.#newEmptyListView, this.#newFilmListContainerView.element);
    }

    if (this.#boardMovies.length > FILM_PER_PAGE) {
      render(this.#newButtonShowMoreView, this.#newFilmsView.element);

      this.#newButtonShowMoreView.setClickHandler(this.#handleShowMoreButtonClick);
    }
  }
}
