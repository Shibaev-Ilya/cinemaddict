import {generateMovie} from '../mock/movies.js';
import {generateComments} from '../mock/comments.js';

export default class MoviesModel {

  #movies =  Array.from({length:  20}, generateMovie);
  #comments = generateComments();

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies;
  }
}
