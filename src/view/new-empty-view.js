import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils.js';

const emptyListText = {
  [FilterType.FILTER_ALL] : 'There are no movies in our database',
  [FilterType.FILTER_WATCHLIST] : 'There are no movies to watch now',
  [FilterType.FILTER_HISTORY] : 'There are no watched movies now',
  [FilterType.FILTER_FAVORITES] : 'There are no favorite movies now',
};

const createNewEmptyListTemplate = (filterType) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${emptyListText[filterType]}</h2>
    </section>
  </section>`
);

export default class NewEmptyListView extends AbstractView {

  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNewEmptyListTemplate(this.#filterType);
  }

}
