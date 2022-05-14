import {generateMovie} from '../mock/movies.js';
import {generateComment} from '../mock/comments.js';

export default class MoviesModel {
  #films = 20;

  #movies =  Array.from({length:  this.#films}, generateMovie);
  #comments =  Array.from({length:  this.#films}, generateComment);

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies;
  }
}
