import {createElement} from '../render.js';

const createNewFilmListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class NewFilmListContainerView {
  #element = null;

  get template() {
    return createNewFilmListContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

}
