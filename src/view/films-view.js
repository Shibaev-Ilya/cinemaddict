import AbstractView from '../framework/view/abstract-view.js';

const createNewFilmsTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmsView extends AbstractView {

  get template() {
    return createNewFilmsTemplate();
  }

}
