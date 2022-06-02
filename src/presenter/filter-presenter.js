import NewFilterView from '../view/new-filter-view.js';
import {render} from '../framework/render.js';

export default class FilterPresenter {

  #newFilterView = null;

  init(movies, container, callback) {
    this.#newFilterView = new NewFilterView(movies);
    this.#newFilterView.setClickFilterHandler(callback);
    render(this.#newFilterView, container);
  }

  get newFilterView() {
    return this.#newFilterView;
  }

}
