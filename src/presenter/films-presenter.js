import {render} from '../render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewFilmCardView from '../view/new-film-card-view.js';
import NewButtonShowMoreView from '../view/new-button-show-more-view.js';
import NewPopupView from '../view/new-popup-view.js';

export default class FilmsPresenter {
  newFilmsView = new NewFilmsView();
  newFilmListView = new NewFilmListView();
  newFilmListContainerView = new NewFilmListContainerView();

  init(FilmsContainer, MoviesModel) {
    this.moviesModel = MoviesModel;
    this.boardMovies = [...this.moviesModel.getMovies()];
    this.comments = [...this.moviesModel.getComments()];

    render(this.newFilmsView, FilmsContainer);
    render(this.newFilmListView, this.newFilmsView.getElement());
    render(this.newFilmListContainerView, this.newFilmListView.getElement());

    for (let i = 0; i < this.boardMovies.length; i++) {
      const filmCard = new NewFilmCardView(this.boardMovies[i], this.comments[i]);
      render(filmCard, this.newFilmListContainerView.getElement());

      this.#renderPopup(this.boardMovies[i], this.comments[i], filmCard.getElement());
    }

    render(new NewButtonShowMoreView, this.newFilmsView.getElement());

  }

  #renderPopup(movie, popup, card) {
    const body = document.querySelector('body');
    const popupView = new NewPopupView(movie, popup);
    const popupElement = popupView.getElement();

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
}
