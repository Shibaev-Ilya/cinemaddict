import {render, replace, remove} from '../framework/render.js';
import NewFilterView from '../view/new-filter-view.js';
import {filter, FilterType, ActionType} from '../utils.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #moviesModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const movies = this.#moviesModel.movies;

    return [
      {
        type: FilterType.FILTER_ALL,
        name: 'All movies',
        count: filter[FilterType.FILTER_ALL](movies).length,
      },
      {
        type: FilterType.FILTER_WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.FILTER_WATCHLIST](movies).length,
      },
      {
        type: FilterType.FILTER_HISTORY,
        name: 'History',
        count: filter[FilterType.FILTER_HISTORY](movies).length,
      },
      {
        type: FilterType.FILTER_FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FILTER_FAVORITES](movies).length,
      },

    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new NewFilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setClickFilterHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(ActionType.MAJOR, filterType);
  };
}
