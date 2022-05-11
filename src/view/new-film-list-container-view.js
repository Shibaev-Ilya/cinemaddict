import AbstractView from '../framework/view/abstract-view.js';

const createNewFilmListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class NewFilmListContainerView extends AbstractView {

  get template() {
    return createNewFilmListContainerTemplate();
  }

}
