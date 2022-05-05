import {render} from '../render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewFilmCardView from '../view/new-film-card-view.js';
import NewButtonShowMoreView from '../view/new-button-show-more-view.js';
import NewPopupView from '../view/new-popup-view.js';
import NewEmptyListView from "../view/new-empty-view.js";

const FILM_PER_PAGE = 5;

export default class FilmsPresenter {
  moviesModel = null;

  #newFilmsView = new NewFilmsView();
  #newFilmListView = new NewFilmListView();
  #newFilmListContainerView = new NewFilmListContainerView();
  #newButtonShowMoreView = new NewButtonShowMoreView;
  #newEmptyListView = new NewEmptyListView;

  #renderedFilmCount = FILM_PER_PAGE;
  #boardMovies = [];
  #FilmsContainer = null;

  constructor(FilmsContainer, MoviesModel) {
    this.moviesModel = MoviesModel;
    this.#FilmsContainer = FilmsContainer;
  }

  init() {
    this.#boardMovies = [...this.moviesModel.movies];
    this.comments = [...this.moviesModel.comments];
    this.#renderBoard();
  }

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#boardMovies
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_PER_PAGE)
      .forEach((task, index) => this.#renderFilm(index));

    this.#renderedFilmCount += FILM_PER_PAGE;

    if (this.#boardMovies.length < this.#renderedFilmCount) {
      this.#newButtonShowMoreView.element.remove();
      this.#newButtonShowMoreView.removeElement();
    }
  };

  #renderFilm = (index) => {
    const filmCard = new NewFilmCardView(this.#boardMovies[index], this.comments[index]);
    render(filmCard, this.#newFilmListContainerView.element);
    this.#renderPopup(this.#boardMovies[index], this.comments[index], filmCard.element);
  };

  #renderPopup(movie, popup, card) {
    const body = document.querySelector('body');
    const popupView = new NewPopupView(movie, popup);
    const popupElement = popupView.element;

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup(popupElement);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    function addPopup() {
      body.classList.add('hide-overflow');
      body.append(popupElement);
      popupElement.querySelector('.film-details__close-btn').addEventListener('click', () => removePopup(popupElement));
      document.addEventListener('keydown', onEscKeyDown);
    }

    function removePopup(element) {
      body.classList.remove('hide-overflow');
      element.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }

    card.addEventListener('click', () => addPopup(movie, popup));

  }

  #renderBoard() {
    render(this.#newFilmsView,  this.#FilmsContainer);
    render(this.#newFilmListView, this.#newFilmsView.element);
    render(this.#newFilmListContainerView, this.#newFilmListView.element);

    if (this.#boardMovies.length > 0) {
      for (let i = 0; i < Math.min(this.#boardMovies.length, FILM_PER_PAGE); i++) {
        this.#renderFilm(i);
      }
    } else {
      render(this.#newEmptyListView, this.#newFilmListContainerView.element)
    }

    if (this.#boardMovies.length > FILM_PER_PAGE) {
      render(this.#newButtonShowMoreView, this.#newFilmsView.element);

      this.#newButtonShowMoreView.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }
  }
}
