import {render} from '../render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewFilmCardView from '../view/new-film-card-view.js';
import NewButtonShowMoreView from '../view/new-button-show-more-view.js';

export default class FilmsPresenter {
  newFilmsView = new NewFilmsView();
  newFilmListView = new NewFilmListView();
  newFilmListContainerView = new NewFilmListContainerView();

  init(FilmsContainer) {

    render(this.newFilmsView, FilmsContainer);

    render(this.newFilmListView, this.newFilmsView.getElement());
    render(this.newFilmListContainerView, this.newFilmListView.getElement());

    for (let i = 0; i < 5; i++) {
      render(new NewFilmCardView, this.newFilmListContainerView.getElement());
    }

    render(new NewButtonShowMoreView, this.newFilmsView.getElement());

  }
}
