import {render} from '../render.js';
import NewFilmsView from '../view/new-films-view.js';
import NewFilmListView from '../view/new-film-list-view.js';
import NewFilmListContainerView from '../view/new-film-list-container-view.js';
import NewFilmCardView from '../view/new-film-card-view.js';
import NewButtonShowMoreView from '../view/new-button-show-more-view.js';
import NewPopupView from "../view/new-popup-view.js";

export default class FilmsPresenter {
  newFilmsView = new NewFilmsView();
  newFilmListView = new NewFilmListView();
  newFilmListContainerView = new NewFilmListContainerView();

  init(FilmsContainer, popupContainer, MoviesModel) {
    this.moviesModel = MoviesModel;
    this.boardMovies = [...this.moviesModel.getMovies()];
    this.comments = [...this.moviesModel.getComments()];

    this.firstPopup = this.comments[0];
    this.firstMovie = this.boardMovies[0];

    render(this.newFilmsView, FilmsContainer);

    render(this.newFilmListView, this.newFilmsView.getElement());
    render(this.newFilmListContainerView, this.newFilmListView.getElement());

    for (let i = 0; i < this.boardMovies.length; i++) {
      render(new NewFilmCardView(this.boardMovies[i], this.comments[i]), this.newFilmListContainerView.getElement());
    }

    render(new NewButtonShowMoreView, this.newFilmsView.getElement());

    render(new NewPopupView(this.firstMovie, this.firstPopup), popupContainer, 'afterend');

  }
}
