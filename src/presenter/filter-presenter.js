import NewFilterView from '../view/new-filter-view.js';
import {render} from '../framework/render';

export default class FilterPresenter {

  #newFilterView = new NewFilterView;
  #filterContainer = null;

  constructor(container) {
    this.#filterContainer = container;
  }

  init() {
    render(this.#newFilterView, this. #filterContainer);
  }

  get newFilterView() {
    return this.#newFilterView;
  }

}
