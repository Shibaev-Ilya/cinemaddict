import ButtonShowMoreView from '../view/button-show-more-view.js';
import {render} from '../framework/render';

export default class ShowMorePresenter {

  #buttonShowMoreView = new ButtonShowMoreView;
  #buttonContainer = null;

  constructor(container) {
    this.#buttonContainer = container;
  }

  init(handler) {
    render(this.#buttonShowMoreView, this.#buttonContainer);
    this.#buttonShowMoreView.setClickHandler(handler);
  }

  get buttonShowMoreView() {
    return this.#buttonShowMoreView;
  }

}
