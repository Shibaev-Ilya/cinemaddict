import Observable from '../framework/observable.js';
import {FilterType} from '../utils.js';

export default class FilterModel extends Observable {

  #filter =  FilterType.FILTER_ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };

}
