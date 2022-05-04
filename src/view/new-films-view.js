import {createElement} from '../render.js';

const createNewFilmsTemplate = () => (
  '<section class="films"></section>'
);

export default class NewFilmsView {
  #element = null;

  get template() {
    return createNewFilmsTemplate();
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
