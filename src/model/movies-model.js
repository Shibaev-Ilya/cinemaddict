import Observable from '../framework/observable.js';
import {generateMovie} from '../mock/movies.js';

export default class MoviesModel extends Observable {

  #movies =  Array.from({length:  20}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
