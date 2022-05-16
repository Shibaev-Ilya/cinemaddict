import NewFilmCardView from "../view/new-film-card-view.js";
import {render} from "../framework/render.js";
import NewPopupView from "../view/new-popup-view.js";

export default class MoviePresenter {
  #filmListContainer = null;
  #movieCard = null;

  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init(movie, comments) {
    this.#movieCard = new NewFilmCardView(movie);
    render(this.#movieCard, this.#filmListContainer);
    this.#renderPopup(movie, comments, this.#movieCard);
  }

  #renderPopup = (movie, comments, card) => {
    const body = document.querySelector('body');
    const popupView = new NewPopupView(movie, comments);

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
  }
}
