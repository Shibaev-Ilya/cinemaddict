import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../utils.js';

const createNewFilterTemplate = (currentSortType) => (`<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active': ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.SORT_DATE ? 'sort__button--active': ''}" data-sort-type="${SortType.SORT_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.SORT_RATING ? 'sort__button--active': ''}" data-sort-type="${SortType.SORT_RATING}">Sort by rating</a></li>
  </ul>`);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor (sortType) {
    super();
    this.#currentSortType = sortType;
  }

  get template() {
    return createNewFilterTemplate(this.#currentSortType);
  }

  setClickSortHandler = (callback) => {
    this._callback.clickSortButton = callback;
    this.element.addEventListener('click', this.#clickSortHandler);
  };

  #clickSortHandler = (evt) => {
    const sortType = evt.target.dataset.sortType;
    if (evt.target.tagName !== 'A' || this.#currentSortType === sortType) {
      return;
    }
    evt.preventDefault();
    this._callback.clickSortButton(sortType);
  };

}
