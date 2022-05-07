import {generateMovie} from '../mock/movies.js';
import {generateComment} from '../mock/comments.js';

export default class MoviesModel {
  #movies =  Array.from({length: 13}, generateMovie);
  #comments =  Array.from({length: 13}, generateComment);

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies;
  }
}
