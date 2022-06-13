import AbstractView from '../framework/view/abstract-view.js';

const createNewFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`
    <a href="#${type}"
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    data-filter-type="${type}">
    ${name}
    ${type !== 'all' ? `<span class="main-navigation__item-count">${  count  }</span>` : ''}
    </a>
  `);
};

const createNewFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createNewFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};

export default class FilterView extends AbstractView {

  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createNewFilterTemplate(this.#filters, this.#currentFilter);
  }

  setClickFilterHandler = (callback) => {
    this._callback.clickFilterButton = callback;
    this.element.querySelectorAll('a').forEach( (el) => el.addEventListener('click', this.#clickFilterHandler));
  };

  #clickFilterHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFilterButton(evt.currentTarget.dataset.filterType);
  };

}
