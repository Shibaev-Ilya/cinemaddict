import {createElement} from '../render.js';

const createNewFilmListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class NewFilmListContainerView {

  getTemplate() {
    return createNewFilmListContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}
