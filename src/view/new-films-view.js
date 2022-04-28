import {createElement} from '../render.js';

const createNewFilmsTemplate = () => (
  '<section class="films"></section>'
);

export default class NewFilmsView {

  getTemplate() {
    return createNewFilmsTemplate();
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
