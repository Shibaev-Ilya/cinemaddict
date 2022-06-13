import ButtonShowMoreView from '../view/button-show-more-view.js';
import {render} from '../framework/render';

export default class ShowMorePresenter {

  #newButtonShowMoreView = new ButtonShowMoreView;
  #buttonContainer = null;

  constructor(container) {
    this.#buttonContainer = container;
  }

  init(handler) {
    render(this.#newButtonShowMoreView, this.#buttonContainer);
    this.#newButtonShowMoreView.setClickHandler(handler);
  }

  get newButtonShowMoreView() {
    return this.#newButtonShowMoreView;
  }

}
