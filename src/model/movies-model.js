import {generateMovie} from '../mock/movies.js';
import {generateComment} from '../mock/comments.js';

export default class MoviesModel {
  #movies =  Array.from({length: 15}, generateMovie);
  #comments =  Array.from({length: 15}, generateComment);

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies;
  }
}
